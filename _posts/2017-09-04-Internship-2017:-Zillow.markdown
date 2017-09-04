---
layout:     post
title:      'Internship 2017: Zillow'
date:       2017-09-04 15:16:16
tags:       internship java web development
image:      /img/2017-09-02-Internship-2017-Zillow/sunset.JPG
img_loc:    20% 85%
---

This summer, I had the opportunity to do a Software Engineering internship at [Zillow](http://www.zillow.com/). I grew quite a bit as a developer during my time at Zillow, and gained a lot of experiential knowledge in practically applying the technologies that I've learned in school and in my side projects.<!--break-->

The majority of my summer was spent working on developing a new backend service for Zillow's advertising platform -- I was placed in the Ads team. I did a some frontend work too, so I did get to touch the whole stack. As such, I had breadth and depth in the work that I did, which was a great experience.

I've done a decent amount of work with web backends in the past, so not much about the underlying technical processes of creating a backend service were new to me. However, many of the techniques of *software development* - as distinct from programming - were new to me.

## Feature-Driven Development

My side projects tend to be describable in a single sentence. The majority of the time I spend on my projects is spent developing features that vaguely support the core thesis of the project. At some point, I feel like I've fulfilled that statement, and I ship the project.

Software development in-industry feels markedly different. Projects still tend to be explicable in a single sentence (otherwise, you begin to violate the separation-of-concerns), but the details of features is more important than the general concept of the project.

Other teams consume your APIs; consumers, designers, and product managers create requirements on how things act and look; technology decisions impact the implementation of the project. While these constraints sound obvious, I was surprised at how much time I spent clarifying specifications in comparison to the time I spent actually implementing features.

I'm not trying to make this sound tedious; in practice, it felt more like a "measure twice, cut once" approach. This actually felt *more* satisfying in some ways to the side project "shotgun approach". Building systems that *scale*, *solve* a set of problems, and are designed to *last* is gratifying in an orthogonal way to creating a novel one-off project.

### JIRA / Issue Tracking

Once I was underway implementing the service I worked on, I spent a good amount of time tracking my work in JIRA. Again, this may sound tedious; it was not.

Organizing work into digestible chunks - using feature branches, opening plentiful small PRs instead of few large ones - changed the way that I coded. It caused me to think more deeply about changes I made, and reduced the amount code churn I left in my wake.

In the beginning, it felt a bit bureaucratic that each PR needed to have an associated JIRA ticket, but I came to like this structure. Changes to a code base are kept accountable this way; there is always a minimal amount of reasoning for why something was altered.

## The Importance of Design Patterns

In addition to learning better processes for *how* to develop software, I got a better sense of *what* to build as well. In previous backend services I've created, most of the logic for routes would live in the controller routes. This works for small services, but doesn't scale well.

Spring-Boot, the framework I wrote my project in, promotes a controller-service design pattern. The Controller contains just the routing logic, and the Service contains all the business logic. We extended this to a design pattern I think of as "Controller, Service, Client". Controllers handle the routing (specifying URLs and HTTP methods), and ideally send 1 or 2 requests to a service to fetch or send data. The Service handles all the business logic, and has methods for each route. Clients do the actual "work" -- updating databases, making service calls, etc. Client methods are designed to be composable and reusable. As such, there is a clear separation of concerns.

I really enjoyed working in this design pattern. Factoring code this way made everything "feel" like it was in the right place, and was enabled by Java's heavy Object-Oriented approach.

The frontend work I did also had some design-pattern implications. The pages I created were fairly simple landing pages. Initially, I spun up a rather complicated React+Redux app to do this, but was talked down into using vanilla React and managing state locally.

This, too, was an interesting lesson in choosing the right way to design code. Going for an overkill solution just because it might "scale" better later on is not always the best approach -- especially if the project is *unlikely* to scale.

## Hackweek

One thing that was unique about my Zillow internship was the experiences I had during our "Hackweek". During our Hackweek, everyone on the engineering team was given free rein to prototype a blue-sky idea, or work something that they'd been meaning to work on, and never had the time.

Coworkers of mine built awesome tools for interacting with our internal APIs, and improved our Javascript linting/testing tools. I had 2 projects that I got to work on, both of which were right up my alley.

The first was improving Python3 support in Zillow's build system. As somewhat of a Pythonista, Python3 non-compatibility gives me a little tinge of sadness. The team that I worked on for this project found some low-hanging fruit towards enabling Python2/3 testing for our internal libraries, and allowing new services to be developed on Python3. Even though most of the work I did this summer was in "Java land", I felt proud of this project.

The second was working on further developing Zillow's [open source](https://github.com/zillow) efforts. Open source is near-and-dear to me, so I was really happy to get involved with another team of Zillow engineers working to improve our public OSS contributions. Teammates of mine did work on contributor documentation, and other cool projects that I hope will become public-facing in the near future. I worked on collecting metrics of our projects to assess project health.

Again, this was one of the most memorable weeks of my internship. It was pretty amazing how much everyone got done in such a short time period.


## Company Culture

I would be remiss if I didn't touch upon Zillow's company culture. I'm not at a point in my career where I have enough perspective to offer an informed opinion about a company's work culture, but for what it's worth, I *adored* Zillow's culture.

The culture is based around [6 Core Values](https://www.geekwire.com/2016/zillow-built-culture-around-6-core-values-empower-employees/), which encompass transparency, a commitment to acting ethically, and working cohesively as a team. This sounds, from the outside, like a bad corporate cliche. However, everyone I worked with exhibited these values earnestly, and I'd hear mention of them nearly every day.

The company was incredibly open and transparent: The interns had weekly lunches with company executives (VPs, our CEO, group leads), who'd give us perspective on what they work on, and what in their career brought them the success they've fostered. You could reach out to anyone on Slack, and expect a friendly, helpful response.

As for my own experience, I really enjoyed the team that I worked on. We made a point of celebrating successes; setbacks were met with level-headed responses. Everyone on my team is amazing at what they do, and were very generous with their time.

Without gushing too much, it tangibly felt like everyone in the management hierarchy -- form our CEO downward -- and in our development teams actively fostered this positive company culture.

(Also, the views from the office were seriously amazing. I've lived in Seattle for over half my life, and I still couldn't get over how gorgeous Puget Sound looks from our downtown office. 😮 )

{% include blog_image.html url="/img/2017-09-02-Internship-2017-Zillow/office_view.JPG" description="View from the Zillow Office" %}


## Conclusion

So, yeah; I really enjoyed my time at Zillow. I anticipated some of the things that I'd learn: better software development techniques, experience with working in a team as part of a larger organization, etc. There were other lessons that I didn't expect I'd come away with. Distilling these into short descriptions:

- **Anticipate time for on-boarding adjustments.** There will always be new processes to learn when joining a new organization. Anticipating this allows you to set expectations, and not become discouraged while you're "ramping up" your ability to work in a new space.
- **Don't dismiss technologies out-of-hand.** Just because a language doesn't have the best reputation, doesn't mean it doesn't have value. Admittedly, I wasn't thrilled about working in Java. However, over the course of the summer I grew to respect the language and enjoy working in a Java environment.
- **Nail down requirements before beginning.** Having a minimal set of requirements is super important before beginning a project/feature. Being smart about estimating requirements is fine for "interpolation" during projects, but when starting something new, it's important to know where you're going. Even though it can be annoying to wait for a full picture, you'll probably save time in the long term for not having to do a rewrite/refactor later on.


Coming out of my internship, I feel a great sense of accomplishment at the work I did during my summer. I'm so appreciative to all the people at Zillow that provided this valuable experience -- especially to my team -- as I definitely grew as a developer and as an engineer during my time there.
