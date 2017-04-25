---
layout:     post
title:      Deploying Microservices with Docker
date:       2017-04-25 06:46:41
tags:       docker automation servers web
---

I've been using Docker rather heavily over the past few months, and I've come to appreciate its utility in working on side projects. I'd been rather hesitant to use Docker in the past - mostly due to the FUD spread around about it not being *web scale*™. However, for small-ish projects and in certain situations, I've found it to be a great way to automate environment production and code deployment.<!--break-->

At my university's ACM chapter, we've been working for the past few months on reworking our internal web infrastructure. We've moved from a monolithic Django app to a collection of microservices connected by a Go API gateway created by one of our members called [arbor](https://github.com/acm-uiuc/arbor).

Right now, we have about a dozen processes that need to be spun-up to get a full instance of the server going: the gateway, our frontend web server, and about 10 small services. We'd be doing deployments with a really simple bash script that had this structure:

```
./api-gateway && \
python service1.py && \
node service2.js && \
...
ruby service10.rb
```

{% include blog_image.html url="/img/docker-microservices/Docker-Monolith.svg" description="Initial setup without Docker" %}

This worked, but there were a couple pain points:

1. Killing the script would occasionally fail to cleanup all the processes, so you'd have to do a `ps aux` and grep for the remaining services that you would then have to manually kill.
2. The production server had to have a pristine environment for all the languages and frameworks we were using. Setting up an environment from scratch would take around an hour (installing Go, Node, Ruby, Python, and fixing any strange incompatibilities that you'd inevitably encounter)
3. Receiving `stdout` from the script was extremely hit-or-miss. The *correct* thing to do would be to have each server write its own log files, but this was a rather high-work fix to make, so we did all of our logging from `stdout`. We tried using `tee` to make saving persistent logs easier, but this was still an imperfect solution. We settled on using `nohup` and piping its output to a file, but again this was a short-term hack.

We were able to live with this setup when we only had about half the services we now have, but as thing were starting to scale up, our bash deployment script became untenable.

## The Transition to Docker

Someone floated the idea of deploying our stack with Docker, so I took a look at how we might accomplish this. Initially, I threw together a deployment wherein we had just 1 container that contained all of our services, and a separate database container.

{% include blog_image.html url="/img/docker-microservices/Docker-SingleContainer.svg" description="Setup with all services in a single Docker container" %}

This had many of the same disadvantages of our original deployment scheme: we were still needing to manually install a bunch of language dependencies, and everything was running in the same environment. The only saving grace was that at least the setup was automated, which negated some of the setup cost we incurred with our original system.

Eventually, I decided that it would be worth the effort to split out each service into its own container. This ended up being a great decision. This allowed us to leverage community-supplied environments for each of the languages we relied on; there are plenty of pre-baked `python`, `node`, and `ruby` Docker images. Installing the dependencies and app files for each service only involved a trivial amount of Dockerfile scripting.

Each of our resulting Dockerfiles had a similar structure:

1. Derive the environment from a community-supplied language-specific image.
2. Copy dependency list from app directory and run the service's package manager.
3. Copy in the service's app files.
4. Compile the app (if necessary).
5. Expose ports that the app uses.

Each service now lives in its own container, and `docker-compose` manages the inter-container relationships and networking.

{% include blog_image.html url="/img/docker-microservices/Docker-MultiContainer.svg" description="Final setup with a Docker container per service" %}

With our new architecture, we could reliably build an environment and spin up our entire stack with a single command:

```
docker-compose up -d --build
```

And the entire stack could be reliably stopped with a single command:

```
docker-compose down
```

Furthermore, `docker` automatically saves logs, so we could tail the logs of a service rather easily:

```
docker logs my-service_1 -f
```

Another awesome side-effect of having all of our services in separate containers is that we can now do hot-swap reloads of individual services. An update to, say, our user service used to necessitate bringing down the entire site. Using a bash script to start all the services meant that restarting one service forced us to restart them all.

Now, we could just run the same `docker-compose up -d --build` command, and docker-compose would figure our that the user service image was out-of-date, rebuild it, and redeploy that container - all without disturbing the operation of any of the other services. Awesome!

{% include blog_image.html url="/img/docker-microservices/Docker-Rebuild.svg" description="Service Hot-Swap Rebuilds" %}

## Docker Pain Points

There were a few frustrations with migrating to Docker. Namely, that any changes made to a service - even just in configuration - necessitates a rebuild of the entire image of that service. Unfortunately, I was experiencing 2+ minute build times due to reinstalling dependencies each time I built the image. Being a novice at writing Dockerfiles, I wasn't correctly exploiting the caching that Docker can use internally to avoid fetching dependencies that were already present in a previous image.

<blockquote class="twitter-tweet tw-align-center" data-lang="en"><p lang="en" dir="ltr">Switching the order of gem installation allows for a cache hit, reducing Ruby app container build time by a factor of 10+. Nice. 👍</p>&mdash; Benjamin Congdon (@BenRCongdon) <a href="https://twitter.com/BenRCongdon/status/848898467552514048">April 3, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Turns out, if you load your dependency list and install it before importing your app files, if your dependencies don't change, Docker will be able to use a cached version of the dependencies in subsequent builds. However, if you import your app files first, and then install dependencies, you'll get a cache miss if the app files change at all between builds.

```
...
### This results in a cache miss.
### Non-dependency-changing build time = ~2 minutes

# Bundle app source
COPY . /usr/src/app

# Install app dependencies
COPY Gemfile* /usr/src/app/
RUN bundle install
...
```

```
...
### This results in a cache hit. 
### Non-dependency-changing build time = ~5 seconds

# Install app dependencies
COPY Gemfile* /usr/src/app/
RUN bundle install

# Bundle app source
COPY . /usr/src/app
...
```

Subtle, right?

Additionally, having our database live in a Docker container still makes me nervous. MySQL stores its data in a Docker volume which, while persistent across container restarts, still *feel* somewhat ephemeral. It's never a good thing when a single inconspicuous command can nuke your entire database:

```
docker-compose down --volumes
```

> Deleted your volumes? Yeah, all your MySQL data is gone now

However, database backups *really* should be a thing that were were doing anyways, so the actual impact of having all of our data in a Docker volume is minimal.

Finally, there was a bit of difficulty in getting our services to talk to one another. In the old model, the assumption was that all of the services and our gateway were on the same machine, and addressed each other over `localhost`. This assumption no longer held when each service was moved to a container, as each container is (more or less) treated as a separate host for networking purposes.

However, fixing the networking issues mostly boiled down to changing hardcoded URLs to be configurable, and allowing remote connections on our database.

## Final Thoughts

Moving our stack to Dockerized deployment required a bit of grunt work to setup all of the Dockerfiles, but from a service perspective, not much heavy lifting was required. Also, many of our developers have moved to using Docker as their primary dev environment. This was a big win for our developer experience, as setting up environments for all of our services was a big hurdle to bringing in new developers.

There is a bit of overhead introduced by the Docker virtualization layer, but the resultant modularity of the deployment made it worth the performance trade off.

In truth, I'd been itching to try using Docker for something more substantial than a toy project for a while now, and I've been reasonably impressed with the results.