---
layout:     post
title:      A Better Way to Wrangle Python Environments
date:       2017-02-19 18:44:45
tags:       python coding environments
---

I use `virtualenv` begrudgingly. I know it's what you _should_ do, but setting up and maintaining virtualenvs manually gets old quickly. For the past few months, I've been using [autoenv](https://github.com/kennethreitz/autoenv) to automate this process, and now I use virtual environments much more consistently.<!--break-->

## Why You Should Care

Python's import system takes a bit of time to get used to. For the first \~year of my Python journey, just seeing the `$PYTHONPATH` environment variable threw up so many ["Here Be Dragons"](https://en.wikipedia.org/wiki/Here_be_dragons) red flags that I'd break down and nuke my Python setup to avoid dealing with it.

`PYTHONPATH`, really, is just the same as the normal `PATH`: it specifies to python where it should look for packages when you call `import`. However, for most projects you'll want to maintain a `requirements.txt` to allow your users to install the `pip` requirements for your project.

However, if your `PYTHONPATH` is cluttered with packages that are irrelevant to the project you're working on, getting a consistently correct, lean `requirements.txt` is impossible.

This is why you _really should_ use virtual environments for all python projects. Virtual environments allow you to create a separate set of python packages away from your system-level packages, thus keeping your `PYTHONPATH` clean and your `pip freeze > requirements.txt` runs accurate.

This keeps your system-level packages in-tact, your project dependencies clear, and you'll probably never have to go down the rabbit hole of fixing a broken `$PYTHONPATH`. If worse comes to worst, just nuke your virtual environment and reinstall painlessly from your `requirements.txt`.

## Setting up Autoenv

Installing Autoenv is pretty trivial. It's as simple as:

```
pip install autoenv
echo "source `which activate.sh`" >> ~/.bashrc
```

Autoenv acts like a `.bashrc` for every folder on your machine. Just put a `.env` file in your project with some commands to execute, and every time you `cd` into that directory you'll automatically get everything setup.

Your `.env` file should do two things:

1. Clear your `PYTHONPATH` variable to prevent confusion with system-level installed packages.
2. Activate your `virtualenv`.

Here's my ideal `.env` file:

```
export PYTHONPATH=.
source /path/to/project/directory/venv/bin/activate
```

Short. Simple. Extensible. Just add additional exports as necessary if you want to set other environment variables.

In fact, you can get this all setup with two commands:

```
virtualenv venv
echo "export PYTHONPATH=.\nsource `pwd`/venv/bin/activate" > .env
``` 

Then, just `cd` into your project directory, and you'll have your virtual environment setup and ready for package installations.