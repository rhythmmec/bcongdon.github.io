---
layout:     post
title:      Converting My Unused Desktop into a Home Server
date:       2017-02-18 07:14:25
tags:       tech servers unraid nas
---

Over the past year, my self-built Windows "gaming" desktop has gone from something that I use daily, to a computer that I *rarely* used. I had a Plex Media Server instance running on it, but since Windows *loves* to restart itself, my desktop was really unreliable as a server.

I decided it was time for a change, and looked to reinvent my unused desktop as a home server.<!--break-->

I had a couple goals for this new server. Namely I wanted:

1. A centralized place to store all of my media. (Plex, my Lightroom Catalog, family photo backups)
2. An always-on server capable of running linux VMs for running some of my projects/scripts in the background all the time.

### Choosing My OS

I wanted something a bit less involved than building a NAS/Home Server up from a bare linux distro, so I looked into a variety of NAS OS platforms. The options I considered most strongly were:

* **[FreeNAS](www.freenas.org)**
	* Pros:
		* Good community support.
		* Known to be stable.
		* Plugins for everything-under-the-sun.
		* FOSS
	* Cons:
		* ZFS Mandatory. I'd need to upgrade my RAM/Motherboard to support ECC RAM. 
		* Built on FreeBSD with no good story for Linux virtualization. phpVirtualBox (ew...) is supported, but you can only create 32-bit VMs. Docker support is coming soon™, but isn't quite here yet.
* **[UnRAID](https://lime-technology.com/)**
	* Pros:
		* Very good support for virtualization - can even virtualize Windows with GPU passthrough
		* Drive array expandability - can add drives to the array without having to recreate the array
		* Great support for Docker containers
	* Cons:
		* Non-Free software. I don't mind *paying* for software, but I would prefer something that's FOSS. (Price: $60 for "[Basic](https://lime-technology.com/buy-it/)" License)
		* Weird approach to parity: One drive stores all the parity bits for the entire array. However, still allows for single-drive failures without data loss
* **[OpenMediaVault](http://www.openmediavault.org/)**
	* Pros:
		* Built on Debian.
		* Doesn't require ZFS, and handles setting up RAID and/or automatic rsync mirroring.
		* FOSS
	* Cons:
		* Not as widely used, fewer community plugins.
		* Saw user reports that indicated adding services to the Debian install could cause the web interface to become unstable.
* **[Proxmox](https://www.proxmox.com/en/)**
	* Pros:
		* Built for virtualization
		* FOSS
	* Cons:
		* Not designed for being a NAS.
		* Virtualizing a NAS isn't advisable
		* Would need to be much more hands-on

#### The Winner: UnRAID

At least for now, I'm going with UnRAID for it's excellent support for VMs, its large set of plugins, and its reputation as a stable, commercially supported platform.

I bought 2 Western Digital 3TB Red NAS drives to populate my array. So, right now my server has a capacity of 3 TB: 1 drive for data, and the other for 'parity' - which is just a mirror right now.

However, if I end up needing more space, I can just toss in another 3TB drive and effectively *double* the amount of space in my array while still maintaining the ability to withstand a single drive failure. 👌

### Setting up the New Server

While I'm transitioning my Desktop away from being a Desktop, I didn't want to deal with the mess of going through all my old data. So, I'm kicking that can down the road (😳) and leaving my old drives/SSD in tact. I bought a couple extra SATA cables and tossed in my new drives - glad my [Fractal Design R5](http://www.fractal-design.com/home/product/cases/define-series/define-r5-black-window) supports a ludicrously large number of 3.5" HDDs.

I installed UnRAID on a 16GB [Cruzer Flashdrive](https://www.amazon.com/gp/product/B005FYNSZA), booted up UnRAID, and formatted my array. Whoop, 3TB!

![Array Setup](/img/unraid-setup/array.png){: class="blog-img" }

> My god, it's full of terabytes...

I did run into the slight pitfall that UnRAID doesn't support Wifi, in any capacity. 👎 I have an ethernet hookup to my Desktop, but this caused a bit of confusion as I wanted to get UnRAID setup over Wifi before fixing my janky ethernet-over-[powerline](http://uk.tp-link.com/products/list-18.html) setup.

### Data Onloading

All of my Plex Media was on an old NTFS drive that I'd been using with my desktop. There isn't a built-in way to mount and copy data from a non-array drive in UnRAID, so I used the [Unassigned Devices](https://lime-technology.com/forum/index.php?topic=45807.0) plugin to mount my NTFS drive, and then SSH'd in to UnRAID to do the copy.

Speaking of copying data, I "discovered" a bunch of awesome Linux utilities to make that process easier. [Midnight Commander](https://midnight-commander.org/) is a great visual tool for copying data, and [rsync](https://en.wikipedia.org/wiki/Rsync) (which I'm sure everybody but me knows about) is also powerful.

![Midnight Commander](/img/unraid-setup/mc.png){: class="blog-img" }

> Midnight Commander

I'd highly recommend using the [NerdPack](https://lime-technology.com/forum/index.php?topic=37541.0) plugin for UnRAID to get super useful utilities like `screen`. Copying files takes a while, so it's best to do it in something more persistent than an SSH session.

Getting data onto UnRAID was surprisingly easy. I copied ~600GB of photos and media in less than an evening's worth of time. And it all... just works. UnRAID handled getting all the SMB/AFP shares setup, and deals with allocating hard drive space to all my files. I just point a data stream at it, and it obliges. Awesome. 🤓

Of course, I also installed the [Plex plugin](https://lime-technology.com/forum/index.php?topic=33341.0) and got my new Plex server setup. The result was much faster than the Plex instance running under windows (surprisingly), and the transcoding was also more reliable. Another win for UnRAID. 

### Docker / VMs

I was most drawn to UnRAID for it's virtualization support, and the options are plentiful. Not only does it handle spinning up VMs really well - just look at the number of OS's it supports - but it also handles Docker containers natively.

![OS Choices](/img/unraid-setup/vm-os.png){: class="blog-img" }

I spun up a Docker container running [Huginn](https://github.com/cantino/huginn), and the setup process was totally painless. 👍

In fact, I'm now even more interested in Docker, because it seams like a great way to abstract away the setup/infrastructure needs of a project.

### In Conclusion...

I'm feeling pretty confident that my desktop will get more use now as a server than it has been getting as a PC. This whole project was about killing two birds with one stone: repurposing old hardware, while also creating a new space to safely store media. I think UnRAID has been successful in accomplishing both those goals.

Time will tell if UnRAID becomes a reliable appliance, or a patchwork side project. There's always the possibility of misbehaving plugins and data rot, so I'm not going to prejudge UnRAID's stability.

From a *usability* perspective, I'm very happy. (in large part because I don't have to deal with Windows anymore... 😛)

So yeah, Desktop => "Server". Hopefully it doesn't all go up in flames in a few months. \**knocks on wood*\*

### Additional Resources

If you're also looking into setting up a home server, or plan to build one from scratch, I'd highly recommend the following subreddits:

* [/r/homeserver](https://www.reddit.com/r/HomeServer/)
* [/r/homelab](https://www.reddit.com/r/homelab/)
* [/r/datahoarder](https://www.reddit.com/r/DataHoarder/)