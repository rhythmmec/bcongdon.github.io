---
layout:     post
title:      GDQStat.us AGDQ 2017 Post Mortem
date:       2017-01-22 16:36:26
tags:       aws python lambda gaming
image: 	  https://c1.staticflickr.com/1/775/31543753654_2ef43a66d1_k.jpg
img_loc:	  center 110%
---

I took another swing at a realtime data visualization with my second version of GDQStat.us - this time, built on AWS. Though not much changed visually on the site, there's a lot more cool stuff going on the backend now.<!--break-->

## Rebuilding for AGDQ 2017

This version of GDQStat.us, in retrospect, took much less time to complete than the first version. I was able to use essentially all of the frontend code from the first event. The only frontend code that changed was the connection to the backend.

The first version of GDQStat.us was built on a amalgamation of different services: Github Pages for static hosting, Google Compute for running the collection scripts, Google Datastore for caching, and Firebase for the backend database. It worked, but I had to spend a lot of time getting around Firebase's limitations. It's realtime API is great, but if you want to pull down a lot of data - i.e. tens of thousands of timeseries entries - then you'll be looking at a 5-6 second page load time. Not workable.

I decided to build on top of AWS for a 2 main reasons:

1. I wanted an excuse to do more with AWS. I've interacted with small bits and pieces of AWS before, but I thought it'd be interesting to work on a project more fully integrated with their stack.

2. Lambda is cheap. GDQStat.us has an API component, so I needed some type of dynamic host. However, I wasn't expecting much traffic and my app is fairly simple, so I didn't need a full web server. My static hosting was already taken care of (for free) by Github Pages, and Lambda's price made it fairly compelling.

### Compute

AWS Lambda, for those who haven't used it yet, is an infrastructure for creating "serverless" services. Instead of having a web server that is constantly listening for requests, AWS creates a tiny instance of your code when a request comes in, allows your code to service the request, and then kills that instance when the request has completed.

There are tradeoffs for choosing Lambda but, in principal, it should allow you to build webapps that scale (both down and up) well. It also allows you to (for the most part) forget about how your infrastructure is setup. Just deploy to lambda, and you're given an endpoint that you can use in production.

Unfortunately, I still couldn't go full-serverless because some of my data collection scripts (i.e. Twitter and Twitch) listen to streams instead of polling for discrete data. So, I still had to shell out for a week's worth of EC2 micro-instance compute time.


### Database

Switching away from Firebase was a no-brainer. Firebase simply did not scale the way I needed it to. Storing ~10,000 timeseries entries in Firebase made it's web app (understandably) unusable. This would be forgivable if it was easier to do SQL-like maintenance on it, but that isn't really possible because it's schema-less. `¯\_(ツ)_/¯`

I wasn't a big fan of SQL when I wrote the initial version of this site, and I definitely haven't figured out all the ins-and-outs of writing good schemas / queries as of now. However, I have a much more favorable view of SQL now - especially PostgreSQL - than I did last year. 

Unfortunately, switching away from Firebase meant losing its legitimately fantastic realtime push API. I had to revert to polling on the frontend, which was a bit of a shame. In the end, this didn't change the functionality of the site dramatically, so it wasn't actually that much of a drawback.

What I *gained* from switching to a SQL database was my sanity. There's nothing like the Zen of enforced, structured data. For those rare occasions where I had to tinker with some faulty rows in my DB, being able to open up [Postico](https://eggerapps.at/postico/) and execute raw SQL was totally worth the pains of switching databases. 👌

## My New Stack

After the AWS migration, my full 'stack' for GDQStat.us looks like this:

- AWS EC2
	- Continuously running data collection scripts.
- AWS RDS (PostgreSQL)
	- Datastore for event timeseries data.
- AWS Lamba
	- Periodically cache database to S3 as a JSON blob.
	- Monitor API response and send alerts through SNS on errors.
- AWS S3
	- Hold / serve the cached JSON data.
- Github Pages
	- Static hosting for frontend assets / HTML / JS.

Hosting most of my stuff on AWS was actually pretty awesome. There was a steep learning curve of figuring out AWS' idiosyncrasies - getting VPC's, Subnets, and Routing tables to play nicely together, for example - but the payoff was a very stable resulting service.

SNS and CloudWatch were especially great bonuses. Lambda automatically logs to CloudWatch, and I was able to send all my logs from my EC2 Python Scripts to CW with [watchtower](https://github.com/kislyuk/watchtower). AWS' insight into the infrastructure meant that I could automatically send myself SMS messages whenever something broke.

This felt like a legitimate monitoring system, unlike my previous experiments with Twilio / IFTTT.

You also get sweet dashboards with AWS, and... uh... yeah, if you haven't noticed, cool graphs are kinda my thing. 😍

![dashboard](/img/gdqstatus-agdq-2017/GDQStatus-dashboard.png){: .center-image }

## What I Neglected to Consider

Unfortunately, while Lambda and S3 are cheap, RDS is not. Even at the very lowest tier of RDS PostgreSQL server with the lowest amount of provisioned storage, the cost of RDS over the life of the event dwarfed all of my other AWS costs combined.

To be fair, RDS is overkill for what I was trying to do. RDS doesn't seam to be designed to 'scale down' well. It's goals appear to be: data consistency and scalability - especially with database clusters / sharding.

In the future, I'll probably look into just hosting the Postgres server on my EC2 instance. Since I already have the sunk cost of EC2 usage, I might as well take full advantage of that VM.


## What I Didn't Have Time For

Last GDQ, I did some [cool 'extra' graphs](http://gdqstat.us/previous-events/sgdq-2016/other_graphs.html) that supplemented the main realtime display. Unfortunately, I didn't really have time to get these working in time for AGDQ. I did briefly put up a [Kill-vs-Save-the-animals](https://www.reddit.com/r/speedrun/comments/2rcqjn/agdq_so_what_does_killsave_the_animals_mean_is/) graph, but that component of the site needs more work.

## Conclusions

This GDQ was much more hands off for GDQStatus once the event started. I focussed on simplifying my workload, and making things more stable. This was a success in that, once I got all the pieces up and running, everything ran without intervention from me. The monitoring worked great. On the couple occasions where something did crash, I got notified immediately and was able to resolve problems without loss of data.

Unfortunately, fewer 'hot' changes to the code during the event meant that I sacrificed some of my opportunities for doing additional cool visualizations. I didn't have as much free time to dedicate to GDQStatus during the event this year, so maybe I'll have more time to add cooler stuff on the frontend for the next GDQ. (I was able to catch more of the livestream this GDQ, which was quite fun to watch 👍)

Overall, I'm really happy with this deployment of the site. There are still areas that need improvement, but the infrastructure switch-out should prove to have many benefits for the sustainability / maintainability of the project in events to come.

*Cover: [Flickr](https://www.flickr.com/photos/cc0/31543753654/in/pool-publicdomain/)*