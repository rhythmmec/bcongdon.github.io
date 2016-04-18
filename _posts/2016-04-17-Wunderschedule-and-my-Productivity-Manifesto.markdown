---
layout:     post
title:      Wunderschedule and My Productivity Manifesto
date:       2016-04-17 19:49:06
tags:       nodejs coding productivity raspberrypi
---

Recently, I finished the first version of a NodeJS module that's been in the back of my mind for some time: [Wunderschedule](https://github.com/benjamincongdon/WunderSchedule). The module itself is (in my use case) very useful, and has also given a new purpose for my rapidly expanding collection of Raspberry Pis. 

## Why I switched to Wunderlist

The idea for Wunderschedule started over a year ago when I switch from Google Tasks to Wunderlist for it's more robust feature set.

For one, Wunderlist lets you actually repeat tasks. Previously, I used to *manually* copy and paste repeated tasks with Google Tasks. (Think of all the seconds wasted!) Really though, this was a tax on the usefulness of Google Tasks. If I had to *remember* to create all the tasks so I could *remember* to do them, the load taken off my brain was relatively load.

And this was great. I have a certain number of atomized tasks ('Clean out my desk', 'Make sure the laptop gets backed up', later 'Commit to Github') that *should* be scheduled at a certain date every week. And Wunderlist supports this well. Immediately, I ran into the obstacle that, unlike Google Calendar, I could not schedule things for multiple, specific days of the week. (You get "Weekly" rather than "Weekly on Mondays and Fridays") This was a tad frustrating, but work-arounds were quick and easy.

And so I stuck with Wunderlist.

## Why I created Wunderschedule

Sometime in the past few months, as occasionally happens, my productivity pendulum swung way to one side and suddenly I'd have something absurd like *18* tasks for a given weekday that were just repeated tasks - not even specific to that particular day. And there was again a tax on my brain as I'd think more about optimally prioritizing these dozens of todos instead of, you know, actually doing them.

To start out, I systematically went through and deleted the 'nagging' tasks that I literally would do by default every day, but had added a todo to feel 'accomplished'. Then, I combined tasks that I had granulated into several 'sub steps' into one tasks. This cut out a *lot* of the bulk crap todos, but still left something to be desired.

The core problem still was this: I'd look at a list of things I had to do throughout the day when I woke up (6am) and see things that I wouldn't be able to accomplish until late in the afternoon. (i.e. I could only work on homework *after* I'd been to that day's lecture). So that was frustrating. I'm an 'inbox zero' type of guy, so to have things sitting on my list that I *cannot* accomplish is an aggravation of Sisyphean proportions.

And thus the idea of Wunderschedule was fully formed and two-faced:

  1. Allow me to set start times on tasks so they would only appear when I should be doing them.
  2. Facilitate better scheduling so that I could have the granularity that I love *à la* Google Calendar.

## Implementation

Wunderschedule could have easily been a Python script, but I wanted to step out of my comfort zone. Basically, I used it as an excuse to learn NodeJS.

Learning NodeJS turned out to be as much learning the ecosystem as learning Javascript - which I already was familiar with. For example, there are multiple Wunderlist API wrappers hosted on npm, but they were all inexplicably broken in one way or another. So, I had to wrap the API myself. Not a big deal, and hints from [Wunderline](http://www.wunderline.rocks/) helped a lot.

I used [Configstore](https://www.npmjs.com/package/configstore) and [Commander](https://www.npmjs.com/package/commander) to make saving credentials and CLI options easier. I also learned that NodeJS allows you to specify binaries in `package.json` which allows you to alias commands to `PATH`. So, I could do the simple npm install call then run `wunderschedule` as a standalone command rather than having to run `node wunderschedule.js` in the correct directory. Cool!

I also used [Mocha](https://www.npmjs.com/package/mocha) with [Chai](https://www.npmjs.com/package/chai) as my unit test platform. I didn't go crazy with writing unit tests, but the two packages certainly seam feature rich and I found some cool widgets that I might use in future projects.

Javascript behaved surprisingly well throughout the project. Callbacks and promises are a bit of an intuitive leap, but once you 'get' them, it's fine. The one hurdle that I ran into with the language was some weirdness of parameter by value that was brought about by async execution. 

Basically, I had an object holding data that I sent to a function, which did an async call, then used that same object to send to another function, which synchronously altered the object. My understanding was that Javascript passed by value, so I would have a deep copy of the original state of the object in my async function. Not so. I observed that it always was already altered by the time the callback occurred. I got around this by synchronously saving the data that I didn't want to change, but this still felt like a shortcut. I probably should have implemented an actual deep copy method.

Finally, I published the package to NPM. I was blown away at how easy this process was. `npm` automatically grabbed the Github README, and publishing was like a 1-2 command process. Sweet.

## Running on a Raspberry Pi

I want Wunderschedule to check for tasks every minute, and while I could have this run on my laptop or desktop, an 'always on' solution like the Raspberry Pi fit the bill better.

I wrote a simple script to setup `wunderschedule` running in a `tmux` session, and set this script to run on startup.

The Raspberry Pi now sits silently under my desk and diligently schedules my todos. 

All in all, the project worked out really well.

## Final Notes on Productivity
Google Tasks is great. It dead simple and it's integration with Google Calendar give it a UI clarity that I still miss in Wunderlist. (The ability to drag-and-drop tasks for due date setting is killer). But, it still feels very MVP-ish and there has been zero progress on it from Google's side in all the time I used it.

Wunderlist, on the other hand, is constantly tweaked with nice little updates. It feels much more 'lived in' - except for some gimmicky 'premium features'. It's due date repetition and reminder system are refreshingly robust, but the team seams reluctant to implement features that have been *widely* requested. All of the features in Wunderschedule were in the top-most-voted requests on their forums.

With Wunderlist's power tools, you also risk burdening yourself with 'overscheduling.' Google Tasks kinda self-regulated in that by forcing you to create every task. Regardless, in the year that I've spent on the platform, I feel like the risk is worth the added ability to offload thinking about each daily task.

Google Tasks largely got me through my IB career. By the end, I had *severely* outgrown its simplicity. Switching to Wunderlist was necessary, though it was a bit disorienting for a few weeks. Wunderlist has gotten me through my first year of college. It feels much more dynamic, and I think with the added features I've made in Wunderschedule, I'm that much closer to a productivity nirvana of knowing exactly what I should be doing at any given moment to maximize productivity.