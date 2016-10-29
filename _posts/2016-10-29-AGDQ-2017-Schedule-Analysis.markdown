---
layout:     post
title:      AGDQ 2017 Schedule Analysis
date:       2016-10-29 13:32:14
tags:       python gaming dataviz
image:	    https://farm6.staticflickr.com/5507/11995786214_4b3dff6826_k_d.jpg
img_loc:    bottom center
---

The AGDQ 2017 schedule was released last weekend, and I've once again digested it into some neat looking graphs!<!--break-->

### Genre Breakdown

I received a bit of criticism the last time I produced these graphs for not taking into account the genres or speedrun categories of the games being played.

Unfortunately, the schedule doesn't (now) give me much information about the category of each speedrun, and even if it did, the small sample size would make it difficult to produce meaningful visualizations.

However, genre is much more readily normalized. Here's what the cohort of games being played looks like broken down by genre. (Note that some games fall into multiple genres, so the sum of all of these categories is greater than the actual number of games in the marathon)

![Genre Counts](/img/agdq-2017-graphs/genre_counts.png){: class="blog-img" }

I also looked at how genre correlates to the run time of the speed run. The results were not super surprising, but the graph is interesting nonetheless.

![Genre Runtimes](/img/agdq-2017-graphs/genre_runtimes.png){: class="blog-img" }

### Platform Representation

One of the most interesting ways to look at this dataset is the platform representations of the games being played. Every \*GDQ event seams to include (nearly) the entire spectrum of game consoles from the past several decades. AGDQ 2017 is no exception; here's a breakdown of the number of games that *exist* on each platform:

![Game platform existence](/img/agdq-2017-graphs/general_platform_counts.png){: class="blog-img" }
... and here's a graph of the platforms that each game is actually being played on during the marathon:

![Game platform actual](/img/agdq-2017-graphs/platforms_run.png){: class="blog-img" }

### Release Date Distributions

Another aspect of the Games Done Quick marathons that I find interesting is the diverse time range from which games are drawn. This year, the oldest game being run is [Dragon's Lair](http://www.giantbomb.com/dragons-lair/3030-23/), from 1983, and the newest game is [The Turing Test](http://www.giantbomb.com/the-turing-test/3030-52970/), released on Aug. 30 of this year.

![Games run by year](/img/agdq-2017-graphs/num_games_by_year.png){: class="blog-img" }

Interestingly, there seems to be 3 spikes in this distribution. The first around recent releases, the second around the early 2000's, and the third around the late 80's / early 90's. This seams to fit reasonably well with the distibution from this summer's [SGDQ](/blog/2016/06/25/SGDQ-2016-Schedule-Analysis/). If anything, it looks like AGDQ 2017 is skewed a bit towards more recent games.

As far as any discernible between release date and game runtime, there isn't a steadfast correlation, but it interesting to see that the longer runtimes occur in the 2000's and 2010's.

![game times by release date](/img/agdq-2017-graphs/time_by_release_date.png){: class="blog-img" }

### Misc

Here's a histogram of the runtimes of all games in the marathon, not broken down by any specific categories.

![game times by release date](/img/agdq-2017-graphs/time_to_run_histogram.png){: class="blog-img" }

Unsurprisingly, most games are run pretty fast (< 1 hr), with a few notable exceptions that simply take a *long* time, like [Paper Mario: The Thousand-Year Door](http://www.giantbomb.com/paper-mario-the-thousand-year-door/3030-7481/) and [The Legend of Zelda: The Wind Waker](http://www.giantbomb.com/the-legend-of-zelda-the-wind-waker/3030-18508/)

I'll close with this final graph, plotting release date against run time and platform. It's again cool to see the clustering of platforms. The NES and PS2 'eras' are particularly clearly seen.

![game times by release date](/img/agdq-2017-graphs/running_time_v_release_date.png){: class="blog-img" }

### In Closing
* All the code for these visualizations is on my [Github](https://github.com/bcongdon/agdq-2017-schedule-analysis).
* If you haven't already, check out the [realtime data visualizations](http://gdqstat.us/) and [schedule analysis](/blog/2016/06/25/SGDQ-2016-Schedule-Analysis/) I did for last summer's SGDQ.
* Check out the [GamesDoneQuick](https://gamesdonequick.com/) website for more information about this awesome event!

*Cover: [Flickr](https://www.flickr.com/photos/city-amsterdam/11995786214/in/pool-publicdomain/)*