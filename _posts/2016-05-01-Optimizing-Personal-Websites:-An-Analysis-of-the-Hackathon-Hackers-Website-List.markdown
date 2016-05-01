---
layout:     post
title:      "Optimizing Personal Websites: An Analysis of the Hackathon Hackers Website List"
date:       2016-05-01 14:00:00
tags:       dataviz web
---

I spent a bunch of time setting up my personal website early last Fall. Not owning a domain, I checked the availability of a bunch of URLs, and eventually settled on [benjamincongdon.me](http://benjamincongdon.me). A bit verbose, but it serves the job. I would have preferred 'bencongdon' or 'bcongdon', etc. but, being late to the party, all of those domains were taken.

During this time, I developed a habit of checking the [Hackathon Hackers site list](https://github.com/HackathonHackers/personal-sites) and randomly clicking on people's sites to get inspiration for my own. Some of these sites are amazing works of front-end art, others are clearly templates - or worse, offline. Not being great at visual design, I strove for the middle-of-the-road: something simple, lightweight, and presentable.

Recently, I thought it would be a fun 'data science' project to look at this cohort of websites. I'm always looking for an interesting dataset to throw at Excel or, as of late, [matplotlib](http://matplotlib.org/). It's worth disclaiming that my methods are by no means scientific, but nevertheless, they show some interesting results. Here's what I found:

## Site Availability
Right out of the gate, I thought it would be interesting to see just how many of the sites on the list were inaccessible. Surprisingly, about a quarter of the ~400 listed sites just couldn't be reached. Tsk, tsk...
![availability](/img/hh-graphs/availability.png)
Unfortunately, I had to throw out the failing websites when I did tests on the sites' content. You'd think that people would be more diligent with keeping their domain registration and web hosting current. It's really not a ton of work to throw a site on Github pages to keep it up. Not sure why there's so much churn here.

## Top Level Domain Selection
Let's move onto something more substantive: TLDs. This was another point I thought about when selecting my URL. Do I go with the `.com` or the `.me`. In the data, both seam to be fairly popular, though it would seam that `.com` is still the favorite, beating out `.me` around 2:1.
![tlds](/img/hh-graphs/tlds.png)
Unsurprisingly, `.io` is also pretty strongly represented. I was honestly somewhat surprised there weren't more vanity TLDs. `.xyz` and `.rocks` only had a measly handful of people choosing them for their personal site. I've been fascinated with some of the 'domain hacks' that people have come up with since ICANN openned up the flood gates to new TLDs. Though, maybe it's not a bad thing that no one chooses `.soy` or `.limo` for their personal site.

## URL Length
What I was really interested to see was the distribution of personal site URLs lengths. Short URLs seem to be coveted internet real-estate. I suppose if you can get a version of your name - not necessarily all that short of a URL - that would be appealing too.
![url_lens](/img/hh-graphs/url_lens.png)
I didn't really expect this 'bell curve' type distribution. I predicted more of a spike on the lower end of lengths as a result of people choosing short vanity URLs. The median URL length (TLD included) was 13.

So, how does `benjamincongdon.me` fall on this distribution? Well, at 18 characters, I'm in the 87.2th percentile for URL length - not stellar, but not one of the worst URL length offenders.

Who has those illusive shortest URLs? Well, it was a 4-way tie between:

* [ian.sh](http://ian.sh)
* [ian.pw](http://ian.pw)
* [yef.im](http://yef.im)
* [zfo.gg](http://zfo.gg)

👏 \*Applause\* 👏

And who was the worst offender for url length? Well, it was a tie between `christinaplatt.weebly.com` and `rodrigoargumedo.github.io`, evidently both long because they're subdomain URLs.

## Site Size
This one is a bit unscientific. This test looked at the size of whatever HTML was at the index page of each site. While this would be an invalid testing procedure for most web crawling, most of the HH-listed sites are single-page sites without at ton of media, so this methodology is *relatively* sound.
![site_size_dist](/img/hh-graphs/site_size_dist.png)
As can be seen, my assumption bears out pretty well hear. Most of the sites - the HTML anyways - was under 20kb. I took a look at some of the outliers on the high side of the size scale. Most were either redirects (the 'largest' site was a redirect to Twitter), or pre-created templates that had bloated HTML.

## Bootstrap
Bootstrap is the savior of non-front-end-savvy people (myself included). I use it on my site - probably overkill - so I did a simple check to see which sites also used Bootstrap. The result? About 50/50 adoption, which was a little lower than I expected.
![bootstrap](/img/hh-graphs/bootstrap.png)

## jQuery
This one surprised me. I really didn't expect personal sites - most of which aren't interactive at all - to use jQuery. I have jQuery to do some scrolling stuff, but I could probably do without it fairly easily. I'm not sure of the incentives/motivations, but evidently around two-thirds of HH sites run with jQuery.
![jQuery](/img/hh-graphs/jquery.png)

# Takeaways?
Is their much to learn from this data? Not much other than what would already appear to be self-evident tenets of designing a personal website:

1. Pick a short-ish URL with a sensible TLD. Optimally, 13 characters or shorter.
2. Keep it small. Write your own HTML and avoid premade templates.
3. Keep it running. If you're going to use your site as an online resume-of-sorts, keep it up!

To me, this was an interesting project. Matplotlab and iPython/Jupyter make simple data analysis like this almost trivial, so often the real difficulty is finding an interesting dataset and then deciding what features of that dataset make it intruiging.

---

If you're interested in seeing the source code of my analysis, you can check the Jupyter notebook out on my Github [here](https://github.com/benjamincongdon/Data-Science-Projects/blob/master/Hackathon%20Hackers%20Sites.ipynb).