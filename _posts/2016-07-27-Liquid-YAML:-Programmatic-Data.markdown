---
layout:     post
title:      'Liquid YAML: Programmatic Data'
date:       2016-07-27 19:38:01
tags:       ruby markdown yaml coding
---

I've been working on a configuration management project recently, and as a consequence have been working regularly with YAML. It's a very capable markdown language, but it gets unwieldy very quickly.

I've come up with a hacky - yet, in my mind, pretty awesome - 'solution' to cut down on YAML bulk and allow for some pretty surprising templatization of data.<!--break-->

First, the problem: Say, for example, I wish to describe a simple object set of 'cats'. Suppose I have 5 cats, which map to 5 food dishes. Here would by my YAML:

```
- name: cat_01
  dish: dish_01
- name: cat_02
  dish: dish_02
- name: cat_03
  dish: dish_03
- name: cat_04
  dish: dish_04
- name: cat_04
  dish: dish_04
```

This, obviously, isn't a very efficient method of describing my situation, but my goal here is to save serialized objects. Verbosity in my YAML allows me to be more lazy about loading objects, to remove complexity from that portion of my project.

Besides, there may come a time when some system engineer decides that it's necessary from `cat_02` to eat from `dish_34`, and if I were to describe this set with ranges, I would lose that expressiveness.

However, the problem compounds. Suppose now that my cat problem is actually an animal shelter, and I now have to describe multiple shelter locations in my definitions.

By my specification, I need to have a `seattle.yaml` and a `boston.yaml` which contain my serialized cats, but now the leg work of writing out all these YAML defs gets much more intensive:

```
seattle.yaml
---
- name: cat_sea_01
  dish: dish_sea_01
- name: cat_sea_02
  dish: dish_sea_02
- name: cat_sea_03
  dish: dish_sea_03
- name: cat_sea_04
  dish: dish_sea_04
- name: cat_sea_04
  dish: dish_sea_04

boston.yaml
---
- name: cat_bos_01
  dish: dish_bos_01
- name: cat_bos_02
  dish: dish_bos_02
- name: cat_bos_03
  dish: dish_bos_03
- name: cat_bos_04
  dish: dish_bos_04
- name: cat_bos_04
  dish: dish_bos_04
```

Easy to read, but quickly becoming unwieldy. Suppose I double my number of shelters, suppose I need to make a systematic change to the formatting of some of these fields. Storing data this way will cause you to waste literally *seconds* of time.

Enter [Liquid](https://shopify.github.io/liquid/), a Ruby-based templating language. Liquid allows us to template this YAML, so as to cut down on the lines we need to change to effectively change the entire structure of our data.

Liquid also is easily extendable, and has basic control flow mechanics, so we can automate much of the creation of this YAML data.

Here is what our 'shelter' template could look like:

```
template.yaml
---
{% raw  %}{% for i in (1..num_cats) %}
- name: cat_{{ location }}_{{ i }}
  dish: dish_{{ location }}_{{ i }}
{% endfor %}{% endraw  %}
```

Then, we just save parameters for our locations:

```
vars.yaml
---
seattle:
  location: sea
  num_cats: 5
boston:
  location: bos
  num_cats: 5
```

And run our YAML through Liquid's renderer before actually loading it:

```ruby
def get_config
  template = Liquid::Template.parse(File.read('template.yaml'))
  vars = YAML.load_file('vars.yaml')
  final_config  = {}
  vars.each do |loc, loc_vars| {
    final_config[loc] = template.render loc_vars
  }
  final_config
end
```

The result is the same two sets of YAML definition files, but now we've effectively templatized this workflow so future updates will require only a change to the template and the variables, not the rendered data. However, we can still use the rendered template data as an input to whatever configuration management tool we've come up with, and as such can make on-the-fly changes to single 'instances' of objects in the rendered YAML.

For me, this solved what was quickly becoming a rather frustrating problem. I felt a bit like I was reinventing the 'ERB + YAML' workflow, but the syntax of Liquid *feels* a lot more intuitive. ERB probably would have added some more flexibility as well, because the tool I was writing is also written in Ruby, but I wanted a templating system that was easily readable by someone who had no idea about the inner workings of Ruby.

So yeah, Liquid + YAML: a novel concept. Potentially very powerful if templating fits well with the type of data you're working with.