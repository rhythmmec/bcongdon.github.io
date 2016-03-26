---
layout:     post
title:      Custom Python Interpreters
date:       2016-03-25 21:16:46
categories: coding python
---

Recently, I was creating a command line application for a [Project-based coding 'interview'](http://ejohn.org/blog/project-based-interviews/). I wanted the application to have a degree of interactivity, but for various reasons, I couldn't easily keep a file-based save state of the application, which would allow me to use some of the `CLI` modules that Python has.

I felt a bit stuck, because I wanted something like the Python interpreter, but with behavior that I defined. All of the `CLI` modules seemed to only allow 'one-off' commands, and I wanted something that was persistent and would allow the user to issue multiple commands at will.

My 'on-the-fly' solution was kludgey. String manipulation to get command sequences, then cascading conditionals to check and execute the functionality. It worked (mostly), and had the user experience I wanted, but the solution felt like I had unnecessarily reinvented the wheel - and in a rather inelegant way.

After a bit of Google-foo, I've found what I believe may be a better solution. The `code` class in Python allows you to emulate features of the Python interpreter, which means you can embed an interpreter session within your project.

As shown in [this](http://stackoverflow.com/a/5597918/2421634) Stack Overflow answer, 6 lines of code will get you a fully functioning interpreter:
{% highlight python %}
import readline
import code
vars = globals().copy()
vars.update(locals())
shell = code.InteractiveConsole(vars)
shell.interact()
{% endhighlight %}

Never mind my initial use case, I could see this being extremely useful as a drop-in debugging tool. (Yeah, you can do the same thing with `pdb`, but this could be just as quick as a `print` statement if you setup a macro.)

You also get a lot of quality-of-life improvements like saved history, `Ctrl-C`, et cetera.

It does have the drawback of not being as 'locked down' as my solution was, and (as is a characteristic flaw of Python) you could mess up a lot of stuff if you have unfettered access to whatever the heck you want in my module.

So, it's not the perfect fix. 

Nevertheless, this once again proves you can some interesting stuff by digging into the arcane world of core Python functionality.