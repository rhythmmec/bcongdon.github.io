---
layout:     post
title:      Username Grab!
date:       2016-05-28 12:57:01
tags:       github
---

I was working on a script for grabbing recent commit messages from Github this week when I realized that the Github handle `bcongdon` was available!
<!--break-->

I've written about my psuedo-obsession with short handles before, so naturally I grabbed it as soon as I could with an alternate email account.

I then realized how much of a [PITA](http://www.netlingo.com/word/pita.php) it would be migrating all the links and remotes I'd have to transfer from `benjamincongdon` to `bcongdon`.

I still haven't solved that problem - though I've spitballed some ideas about writing a script to recursively alter the remotes in my `~/Documents/SideProjects` folder.

However, what could have been a bigger problem was all the dead links that I'd have on my personal website. I pre-emptively solved this problem by using Liquid tags for all my Github links. So, instead of linking to a repo as 

`github.com/benjamincongdon/foo`

I'd setup the link as 

`github.com/{% raw %}{{ site.github_username }}{% endraw %}/foo`

Then, when my markdown files are parsed and my site's HTML is rendered, Jekyll/Liquid fills in all the relevant usernames. (I do this with Twitter, Quora, etc. for similar reasons)

This contingency plan worked quite well. One simple switch in my `_config.yml` fixed 95% of what would be broken links. My TravisCI build pipeline caught the rest of the dead links, which I manually fixed back to use Liquid tags.

I'm really happy with Jekyll and static site generation as a concept right now. It's a bit frustrating to wrap your mind around the templating and inclusion system at the beginning, and as a beginner it was tempting to use draw up raw HTML. However, once scaling past 3 or 4 static pages, the templating system saves a massive amount of time.

So anyways, now I'm `github.com/bcongdon`. Score!