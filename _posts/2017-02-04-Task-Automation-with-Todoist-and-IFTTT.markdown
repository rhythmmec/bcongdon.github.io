---
layout:     post
title:      Task Automation with Todoist and IFTTT
date:       2017-02-04 07:12:47
tags:       productivity ifttt todoist automation
---

I love keeping track of my todo list. Lists free my mind to think about what I'm working on, and reduce that back-of-the-mind anxiety about forgetting something important. So, I consider it a big win when I can automate any aspect of the management of my todos. Something I've been trying out recently is what I'm calling "Task Chaining", which leverages the Todoist integration with IFTTT to automate the creation of follow-up tasks.<!--break-->

When I use Todoist or Wunderlist, 99% of the time, I'm locked in on the Today tab - which displays all the tasks that I've marked as needing to be done today. However, I've noticed that I strongly prefer that the tasks on my Today panel be items that I can do at any point in the day. It irks me to have tasks that can only be completed at the end of the day sit on my Today tab for the whole day, so in some instances I use IFTTT to schedule the creation of certain tasks throughout the day.

The procedure to do this is pretty simple: Just use a Date/Time trigger to create the Todoist task you want.

I don't use this type of scheduling often as I find that Todoist's task scheduling is pretty great, but this is still useful for things that - for example - I can only do in the evenings.

My new discovery is how to automate "follow-up" tasks. Another annoying trope of my todo list is tasks that can only be completed after the completion of another task. For instance, maybe you can only complete "Fold Laundry" after "Do Laundry" has been completed. There's a mental tax of having both of these tasks appear at the same time. They both need to be completed, but the second task is irrelevant until the first one has been completed.

This can be automated with IFTTT: Simply add a unique tag on the first task - I usually use the task's full name - and create an IFTTT applet that triggers upon completion of that tag, which the creates the next task in that "task chain".

![Trigger Based on Task Tag](/img/ifttt_todoist/label_trigger.png){: class="blog-img" }

This also works for setting reminders at a certain time interval after the completion of a task. Going back to my example, you could set the reminder time to "Fold Laundry" to be an hour after you finished "Do Laundry". When you create a task in Todoist through IFTTT, you can specify relative due dates by entering something like "+1 hour" in the due date box.

![Relative Task Due Date](/img/ifttt_todoist/relative_timing.png){: class="blog-img" }

It's a bit of a hack, and (I believe) it requires Todoist Premium - a service that I happily pay for - but this technique works like magic. I realize how esoteric this type of productivity automation is, but every bit counts. I've been experimenting a bunch with IFTTT and [Workflow](https://workflow.is/) recently, and have found that as automated as my productivity management environment is, there's still room for growth.

Just today, I figured out how to get Todoist to remind me to pickup my packages when I get a delivery notification from Amazon Locker.

This stuff is awesome when it works. Abstracting away having to rely on your memory gives the impression that your technology is working *for* you, and that's a great feeling.