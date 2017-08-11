---
layout:     post
title:      Building GitTrophy
date:       2017-08-11 07:38:51
tags:       aws lambda react dataviz github javascript python s3 web
---

I've been working on a site for the past month that generates 3D models from Github's contribution graphs.

After a month of work, it's complete! So, I'm happy to announce [GitTrophy](https://gittrophy.com). It's pretty slick: type in a Github user or repo name, and you'll get a 3D preview of the contribution model. I 3D printed my chart from 2016, and it turned out pretty well.<!--break-->

// TODO: Chart image

## Inspiration

Looking at my [Github profile](https://github.com/bcongdon), it's not hard to tell that I care about my contribution history. That's why I've found previous projects like [Github Report Card](https://githubreportcard.reflect.io/), [Commit Print](commitprint.com), and [Isometric Contributions](https://github.com/jasonlong/isometric-contributions) so interesting.[^1]

My initial idea was to have some type of generator to create 3d models of Github contributions. I wasn't sure if I'd be able to hack it to work in a browser (though that was the ultimate goal), or if it'd be just a script.

The design for the models was largely inspired by Isometric Contributions, and the resulting web page was inspired heavily by Commit Print.

## Initial Prototype

My initial thought was that model creation would *have* to be done server-side. After looking at the landscape of Python 3d modeling frameworks, I was left pretty disappointed. The only tool that seemed to fit all my requirements -- scriptable modeling, output to commonly accepted file formats, ability to run headless, and ability to apply colors/textures -- was [Blender](http://www.blender.org). Obviously, Blender is a great project. But... it was a bit heavy-weight for what I was trying to accomplish.

### Model Generation

I tooled around with creating a Blender Python script (against [bpy](https://docs.blender.org/api/blender_python_api_2_77_0/info_overview.html)), and came up with something that could take a list of days and colors, and transform it into something that looked like the Github contributions chart.

// TODO: Blender model image

Then, I wrote a simple Python module ([github_contributions](https://github.com/bcongdon/github_contributions)) to help scraping a user's contribution history.[^2]

Combining these two components, I had something that worked "on my machine" for generating contribution models. I was elated! It took me about a week to get this prototype up and running, but when I saw the first model using real contribution data, I knew I was on to something pretty neat.

### Backend

The other design constraint I imposed on myself is that rendering needed to be done quickly and cheaply. [AWS Lambda](https://aws.amazon.com/lambda/) was my platform of choice -- as it is for many of my projects. Using a serverless platform allows 

However, it is a bit of a pain to get anything that requires binaries or libraries to run in Lambda. I spent about a week getting Blender to compile statically into a binary that could be shipped off to lambda. This was _not fun_. The fruit of this work was [bpy_lambda](https://github.com/bcongdon/bpy_lambda), which should allow anyone to use Blender inside Lambda with minimal effort.

 

## Current Architecture

### Backend

#### Scraping Repo Contribution Data

#### S3 Cache

### Frontend

#### Model Generation

#### Model Exports

[^1]: I'm aware that there's been some controversy in the past months about contribution graphs being [harmful](https://github.com/isaacs/github/issues/627) to contributors. I agree that there's merit to these arguments. But, for the time being, I still enjoy the "gamification" of making contributions.

[^2]: Unfortunately, Github doesn't provide a public API that provides this data, so I used BeautifulSoup to scrape the SVG data of the actual contributions chart.
