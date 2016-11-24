---
layout:     post
title:      Turkey and Birthday Cake
date:       2016-11-24 08:28:42
tags:       python dates
image:      https://c1.staticflickr.com/9/8594/28040104304_254e45ca52_k.jpg
img_loc:	  center 300%
---

Since my birthday is on November 22nd, it occasionally falls on the same day as Thanksgiving, which is always the [fourth Thursday of each November](https://en.wikipedia.org/wiki/Thanksgiving_(United_States)). Due to some quirks of the Gregorian calendar and leap years, there isn't a great pattern to the years when the 22nd falls on a Thursday.<!--break-->

Taking leap years out of consideration, I'd expect that Thanksgiving would be on a Thursday once in every 7 years (because `365 % 7 == 1`, so each year Thanksgiving day shifts by 1 weekday until it rolls over).

With the addition of leap years, things become more complicated. As leap years are every 4 years, and the periodicity of the week days is 7, the cycle of Thanksgiving days becomes more complicated. (Not to mention the added craziness of when you add in the '100 and 400 divisible' [leap year exceptions](https://en.wikipedia.org/wiki/Leap_year#Algorithm)).

This has been something that I've been mildly curious about for a while, so I threw together a little script which generated the dates in my (approximate) lifetime on which my birthday and Thanksgiving coincide:

* 2001 - 5th birthday
* 2007 - 11th birthday (6 year gap)
* 2012 - 16th birthday (5 year gap)
* 2018 - 22nd birthday (6 year gap)
* 2029 - 33rd birthday (11 year gap)
* 2035 - 39th birthday (6 year gap)
* 2040 - 44th birthday (5 year gap)
* 2046 - 50th birthday (6 year gap)
* 2057 - 61st birthday (11 year gap)
* 2063 - 67th birthday (6 year gap)
* 2068 - 72nd birthday (5 year gap)
* 2074 - 78th birthday (6 year gap)
* 2085 - 89th birthday (11 year gap)
* 2091 - 95th birthday (6 year gap)

It appears that as a basic rule, there's this `6-5-6-11` year 'Thanksgiving Gap' cycle between coincidences. The *average* gap in my lifetime ends up being ~6.92 years, so in the end, the 7 year rule-of-thumb still holds reasonably well. Extrapolating out another 5000 years yields an average gap of ~6.89 years, so it doesn't appear that the sequence converges to 7 (which is to be expected because of the aforementioned special leap year exceptions).

Then, I began to think about other November birthdays that have this same characteristic. It turns out that birthdays between Nov. 22 and Nov. 28 have a similar Thanksgiving periodicity.

* Nov. 22: 6.89 years
* Nov. 23: 7.14 years
* Nov. 24: 6.90 years
* Nov. 25: 7.13 years
* Nov. 26: 6.90 years
* Nov. 27: 7.01 years
* Nov. 28: 7.03 years

Huh. Lucky me. November 22 seams to be the 'luckiest' date for Thanksgiving coincidences (at least between the years 1996 and 6996).

Taking this to it's logical conclusion, I decided to find which birthdays would yield the most and least Thanksgiving coincidences. I considered a life expectancy of 78 years, and calculated the lifetime coincidence count. 

* The luckiest date/year combinations turned out to be **Nov 22** of 1913, 1914, 1915, 1916, 1917, 1941, 1942, 1943, 1944, 1945, 1969, 1970, 1971, 1972, 1973, 1997, 1998, 1999, or 2000 with **11** coincidences.[^1]
* The unluckiest dates/years were **Nov 23** of 2035, 2063, and 2091 with only **8** coincidences[^2]

[^1]: These are just the 20th century maximum coincidence years, the full list is much longer.

[^2]: Again, an abbreviated list. Interestingly, no date in the 20th century had this low a coincidence rate, so I picked the results from the 21st century.

So, just another quirk of the Gregorian calendar and the way we 'schedule' Holidays.

Happy Thanksgiving! (Also, the [obligatory xkcd](https://www.xkcd.com/1514/))

---

*Parts of this post were inspired by Scott Forbes' ["How often does my birthday fall on Thanksgiving?"](http://scottforbes.net/2010/07/07/how-often-does-my-birthday-fall-on-thanksgiving/)*

*Cover: [Flickr](https://www.flickr.com/photos/30748035@N08/28040104304/in/pool-publicdomain/)*