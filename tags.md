---
layout: page
title: Tags
---

<script src="{{ site.baseurl }}/js/index.js"></script>


# Tags
<ul>
  {% capture tags %}{% for tag in site.tags %}{{tag[0] | downcase}}{{','}}{{tag[0]}}{{'|'}}{% endfor %}{% endcapture %}
  {% assign tags_list = tags | split:"|" | sort %}


  {% for tag in tags_list %}
    {% assign tag_arr = tag | split:"," %}
    <a href="#{{ tag_arr[1] }}" class='label label-primary glyph-label'>
      <span class='glyphicon glyphicon-tags' style='padding-right: 5px; white-space: nowrap;'></span>
      {{ tag_arr[1] }}
    </a>
  {% endfor %}
</ul>


{% for tag in tags_list %}
  {% assign tag_arr = tag | split:"," %}
  <h2 class='tag-header' id="{{ tag_arr[1] }}">{{ tag_arr[1] }}</h2>
  <ul>
    {% assign pages_list = site.tags[tag_arr[1]] %}
    {% for post in site.posts %}
      {% if post.tags contains tag_arr[1] %}
        <li><a href="{{post.url}}">{{post.title}}</a></li>
      {% endif %}
    {% endfor %}
  </ul>
{% endfor %}
{% assign tags_list = nil %}
