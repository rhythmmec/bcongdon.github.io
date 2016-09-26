---
layout:     post
title:      Breaking Up with Wunderlist
date:       2016-09-25 18:20:25
tags:       productivity
image: 	  https://c1.staticflickr.com/1/438/19980799311_28f551e0f4_k.jpg
---

Welp. I've switched Todo apps *again*. Wunderlist had a huge multi-day outage that prompted me to switch to my new favorite productivity app, Todoist.<!--break-->

## Why I Liked Wunderlist

**Interface:** I really enjoyed the Wunderlist app and I used it for a solid 2 years. It's is refreshingly simple: You can make setup different lists, set due dates and reminders, have repeating tasks, and filter by due date. It also has awesome cross-platform sync (more on that later) which allows you to use it across Mac, Windows, Web, Mobile, etc. You can invite others and have shared lists - a feature that I rarely used, but was nice to have - and even assign emojis as list icons to give a bit of visual flair to your task lists.

![Wunderlist Interface](/img/wunderlist-breaking-up/wunderlist.png){: class="blog-img" }

**API:** I'm an unashamed power user, so the API of my todo app really does matter to me. Wunderlist's API is a bit finicky, and doesn't follow some of the best practices that have come to dominate REST on the web. It seams to really only be focused at doing full sync instead of filters and searches. The only way to query your data is to literally download every single task you've ever created and then filter locally. I can only imagine that the number of users that interact directly with the API must be small, else the bandwidth alone on their end would get prohibitive quickly.

**Design Philosophy:** As far as I can tell, Wunderlist prides itself on having a slick, approachable UI that you don't have to dig into to just get something done. This unfortunately means that there isn't a ton under the surface - you can't create tasks that repeat on Mondays and Fridays, for example, just weekly on a specific day. It's a great app for the aspiring productivity-enthusiast, but I began to outgrow it. (As a side note, I built my own extension to Wunderlist called [Wunderschedule](https://github.com/bcongdon/WunderSchedule) which tried to add in a lot of the depth that Wunderlist didn't support natively)

## The Outage

Suffice it to say, I liked Wunderlist. Then, it stopped working. I noticed it first as an inability for my phone to sync some tasks that I completed. This had happened before, so I restarted the app and tried various troubleshooting steps to get the sync back online. No luck.

Then, I looked at the Wunderlist Support Twitter feed to see that there was a *'major outage'* with the cross-platform sync. Ok, outages happen. I can live with a few hours of only having my tasks on my laptop. No big deal.

Then a day passed.

By this point, my productivity was taking a dive. I couldn't enter anything on my phone, so when I wasn't at my laptop I had no way of marking something down as a task that I should do. Even worse, all my repeated tasks ceased updating, which meant that a bunch of the daily workflows I have setup for myself fell through.

I noticed - unsurprisingly - that this was having an impact on my mental load. I 'programmed' in all these repeated tasks so that I *wouldn't have to think* about due dates. Having that support drop out bogged me down.

Then, another day passed.

By this point I was fed up. It's fairly unprecedented that a cloud service be offline for this long, and with no ETA or really any indication of progress from the Wunderlist developers, I jumped ship.
I should note that the Wunderlist Support staff seemed to be doing all they could to keep people calm. They were doing their jobs well, and the company as a whole was very communicative about the outage, but after 48 hours of downtime, I was skeptical of more systematic problems with the platform.

And thus ends my really happy time with Wunderlist, at least for now. The interface which I loved going to everyday is now associated with the frustration of having all of my mindspace in limbo. I might come back to it, but I think there are some legitimate concerns about its stability given the duration of the outage.

## Enter Todoist

I'd seen Todoist mentioned in the past in the same sentence as Wunderlist. It's a freemium productivity-nerd oriented app that has many of the same features as Wunderlist (sync, lists, sharing, etc), but some of those features are behind a paywall. At this point, I was definitely willing to pay $30/yr for something better, so I jumped onboard.

Todoist is great.

It has many of the same paradigms as Wunderlist, so transferring my scheduled tasks over was a breeze. It uses some great NLP for scheduling tasks, so I can just say something like 'Lookup Arrow on PyPI tomorrow' and it'll create a task due tomorrow. It handles repetition much more gracefully than Wunderlist - I can finally have a task repeat on Mondays *and* Wednesdays, for example.

![Todoist Interface](/img/wunderlist-breaking-up/todoist.png){: class="blog-img" width="600px"}

Todoist also has, get this, **built in** analytics with its Karma system. It tells you how many tasks you've completed each day for the last week (4 weeks on Premium), and even gives you a breakdown by color label. Fantastic. This was *exactly* what I wanted from Wunderlist and could only get periodically by downloading all my data and `matplotlib`'ing it, or using my [dashing widget](https://github.com/bcongdon/dashing-wunderlist-stats). *In app* analytics is a killer feature.

![Todoist Karma](/img/wunderlist-breaking-up/todoist-karma.png){: class="blog-img" }

Funnily enough, the thing that I miss most about Wunderlist is the little *'ding'* that you got for completing a task. That little dopamine hit really drove the experience and helped develop the virtuous cycle of productivity. The Wunderlist Ding will be missed.

## Long-Winded Conclusions

All in all, I'm very happy with Todoist. I'm also just happy to have all my tasks back where I left them. If there's one lesson to take away from the Wunderlist outage, it's that cloud services can and will fail. The failure state we've become accustomed to of sub-hour outages will not always be the case, and the services that we rely heavily on can and will fail.

It's not even an understatement to say that I offloaded significant portions of my brain into Wunderlist. When it went down, it really was a shock to realize (the hard way) how much I've become reliant on it.

I'm still comfortable having this data be in the cloud, but I'd be remiss if I didn't admit that really, Todoist is probably no better than Wunderlist as far as stability. What I *really* want at some point is a self-hosted solution. The `awesome-selfhosted` OSS list has some decent enough [choices](https://github.com/Kickball/awesome-selfhosted#task-managementto-do-lists), but none that I'd really want to throw my weight behind. (Honestly, it's pretty surprising that there isn't an established OSS solution to this problem, as building a Todo app is pretty much everyone's second or third project.)

In the absence of a good self-hosted solution, I'm sticking with the cloud. Anything's better than the old pen-and-paper todos... 😉

*Cover: [Flickr](https://www.flickr.com/photos/carloszgz/19980799311/in/pool-publicdomain/)*
