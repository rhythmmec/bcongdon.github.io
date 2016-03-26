---
layout:     post
title:      Jekyll 'New Post' Script
date:       2016-03-21 07:21:17
categories: python coding scripts
---

On the blogging platform I've decided to use for the time being, [Jekyll](https://jekyllrb.com/), I found it a tad annoying to create new posts in a timely way.

It's not difficult to create a `.markdown` file and copy in a template, but the naming convention of the files, `YYYY-MM-DD-Title` combined with the front matter metadata you have to put in the headers made the process take just a few seconds longer than I was comfortable with. You have to enter the date twice in a specified format, and it just *'felt'* like something a computer should be doing, instead of me.

This seamed like an excellent place for a Python script to step in!

So, I wrote the following tiny snippet of code, and now I can create a new markdown file in a few seconds flat!

{% highlight python %}
#new_post.py

from datetime import datetime

TEMPLATE = """\
---
layout:     post
title:      {0}
date:       {1}
categories: {2}
---

"""

if __name__ == "__main__":

    title = raw_input("Title:\n")
    categories = raw_input("Categories:\n")

    timestamp = datetime.today().strftime("%Y-%m-%d %H:%M:%S")
    datestamp = datetime.today().strftime("%Y-%m-%d")

    file_name = datestamp + "-" + 
        "-".join(title.split(" ")) + ".markdown"
    
    with open(file_name, "w+") as file:
        file.write(TEMPLATE.format(title, timestamp, categories))
{% endhighlight %}

Just execute with `python new_post.py` in your `_posts` directory. It'll prompt you for a `title` and `categories` and then save all of that information, along with the current date/time, into a handy markdown file. 

**Neat!**