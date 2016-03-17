---
layout:     post
title:      Watch Later, Offline
date:       2016-01-07 15:31:19
summary:    Streamlining Offline Youtube Viewing with Youtube-DL and Python
categories: projects
---

I watch a lot of Youtube, and have since I joined the site in 2007.

If you’re usage habits are similar to mine, you have a couple dozen videos sitting in your “Watch Later” playlist waiting to be viewed. That’s great, because Youtube gives you a handy way to save the content you’re interested in, but don’t have time to watch when you see it.

![watchLater](https://cdn-images-1.medium.com/max/1600/1*jbci0mqf9Ui1FwDBUmAwPw.png)

What’s not so great is that if you want to consume this content offline, there aren’t many good options of doing so. In the past, there were desktop applications, such as [TubeSock](http://stinkbot.com/), that could download Youtube videos for offline viewing. However, these apps would often break, and now feel quite antiquated. The best of these services that still seams to work is Keepvid, but even this feels rather rough around the edges and you can only download 1 video at a time.

Enter **[Youtube-dl](https://github.com/rg3/youtube-dl/)**, an awesome Python command-line program / library that allows downloading video from a [multitude](https://github.com/rg3/youtube-dl/blob/master/docs/supportedsites.md) of online content platforms. Personally, I really only watch videos on Youtube, but the rest of this article could easily apply to any of these services.

The great thing about Youtube-dl is its versatility. It can intelligently recognize and download playlists, extract audio from videos, recode videos using FFMPEG, and a variety of other handy functions. It’s primarily a CLI tool, but also works as a library, which allows for Python scripts to leverage it’s features.

Before I found Youtube-dl, if I wanted to download videos to watch while traveling, I’d have to manually copy and paste each link into something like TubeSock or Keepvid. However, using Youtube-dl I was able to write a python script to automatically sync my *Watch Later* playlist to a folder on my computer! Youtube-dl handles the Google login and allows me pull down the playlist (*Watch Later* is, unfortunately, always private).

What’s better is that logging options in Youtube-dl allow me to see which infer which videos have been removed from the playlist, allowing me to delete stale video files to keep the sync folder from growing too large.

It’s probably a bit strange that I’m so excited about this, but this is such a perfect example of using an open-sourced library and Python scripting to solve an annoyance (albeit slight) that I’ve had for *years*.