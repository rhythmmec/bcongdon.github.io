---
layout:     post
title:      Running a Factorio Server on DigitalOcean
date:       2016-04-08 16:14:04
tags:       servers gaming scripts
---

If you haven't yet played [Factorio](http://www.factorio.com/), I think you should. Especially if you have any interest in logistics problems, circuit design, or coding. Sure, you don't *do* any coding or circuit design in Factorio, but the main gameplay loop will have you tackling similar problems.

<iframe style="display: block; margin: auto;" width="560" height="315" src="https://www.youtube.com/embed/DR01YdFtWFI" frameborder="0" allowfullscreen></iframe>
<br>
One of the most fun aspects of Factorio is that it now has a multiplayer mode. Friends = fun! However, sometimes peer-to-peer connections can be perilous or impossible - if you're not on the same network - and it can be nice to have a persistent server to allow your friends to play online while you're offline and *vice versa*.

Enter DigitalOcean[^1]. For ~$5 a month, you can have your own self-hosted Factorio server that can handle around ~5 concurrent players without and problems.
<!--break-->
**Let's get started.**

## Setting up your Droplet
1. Make an account on [DigitalOcean](https://www.digitalocean.com/) and add your payment details to be able to create droplets[^2].
2. Go to your "Droplets" page and click `Create a New Droplet`.
3. Select `Ubuntu 14.04` as your Droplet image. 
4. Select the `$5 / month` tier for your Droplet size.
5. Select the closest datacenter region to where the majority of your players will be located.
6. Enter a sensible name in the `hostname` box, and click create.
4. Give DigitalOcean a few minutes to setup and configure your Droplet.
5. Once configured, go into your Droplet and copy/record your `IPv4` address.
    ![/img/do-panel](/img/do-panel.png)
6. Now you'll need to SSH into your droplet:
    * **Mac** (& Linux): Open Terminal (it's in your Utilities folder) and run 

        ```ssh root@YOUR_IP_ADDRESS```

    * **Windows**: Download and install [PuTTY](http://www.putty.org/) and follow [this guide](https://mediatemple.net/community/products/dv/204404604/using-ssh-in-putty-) for setting up an SSH session at ```root@YOUR_IP_ADDRESS```
7. Check your email for the root `password`. DigitalOcean sends you an email with the default root password.
8. Create a sensibly secure password when you are prompted to do so.

## Setting up your Server
9. Go to the [Factorio Download Page](https://www.factorio.com/download-headless/stable) for the headless server package and download the `.tar.gz` to your local machine.
10. Now you'll use SFTP to upload the server files to your Droplet.
    * **Mac**: Open a new Terminal. Run `sftp root@YOUR_IP_ADDRESS`.
    * **Windows**: Follow [this guide](http://www.math.tamu.edu/~mpilant/math696/psftp.html) to get a PSFTP shell running at ```root@YOUR_IP_ADDRESS```. Login with your password.

    After getting into your Droplet with SFTP, run 

    `put /path/to/your/server/download/factorio_headless_x64_.X.X.X.tar.gz`

    after filling in the correct file path and name for the server `tar.gz`.
11. Go back to your SSH shell. If you run `ls` you'll see that the server `tar.gz` is in you're root directory!
12. Run `tar -zxvf factorio_headless_x64_.X.X.X.tar.gz` to unzip the server files.
13. Run `cd factorio` to enter your server folder.
14. Run `./bin/x64/factorio --create MAP` to create a map named `MAP`[^3]. 
15. Run `nano start.sh` and copy in the following code:

    ~~~bash
    #!/bin/sh
    ./bin/x64/factorio --latency-ms 150 --autosave-interval 2 --autosave-slots 10 --disallow-commands --start-server MAP
    ~~~

    (Of course, these settings can be customized to your liking. You can see all the available settings by running `./bin/x64/factorio --help`)
16. Type `Ctrl-X` then `Y` to save and exit `nano`.
17. Run `chmod +x start.sh` to make `start.sh` executable.

## Running your server
18. Run `./start.sh` to start your server. (Remember: When you first connect to your Droplet, you'll need to do `cd factorio` to get into your server folder)
7. Launch Factorio on your PC. Click `Play -> Multiplayer -> Connect to Game`.
8. Paste in your newly minted IP (the same one as you used for `SSH` and `SFTP`), and you're good to go!

Good luck, and have fun. Factorio is a super addicting, afternoon-consuming type of game, so get ready to spend a lot of time in this new server.

---
[^1]: *Though I write about how to do this with DigitalOcean, you could easily run these same settings on AWS, or perhaps even a RaspberryPi with similar results.*
[^2]: *'Droplets' are DigitalOcean's naming convention for server instances.*
[^3]: *You can customize your map name, or upload a custom map to the `/factorio/saves/` folder if you wish.*
