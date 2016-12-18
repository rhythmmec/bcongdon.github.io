---
layout: page
title: Tags
---

<script src="{{ site.baseurl }}/js/index.js"></script>


# Tags
<ul>
  {% assign tags_list = (site.tags | sort:0) %}

  {% if tags_list.first[0] == null %}
    {% for tag in tags_list %}
      <li><a href="#{{ tag }}" class=''>
        {{ tag }} <span class='badge'>{{ site.tags[tag].size }}</span>
      </a>
    {% endfor %}
  {% else %}
    {% for tag in tags_list %}
      <a href="#{{ tag[0] }}" class='label label-primary glyph-label'>
        <span class='glyphicon glyphicon-tags' style='padding-right: 5px; white-space: nowrap;'></span>
        {{ tag[0] }}
        <!-- <span class='badge'>{{ tag[1].size }}</span> -->
      </a>
    {% endfor %}
  {% endif %}
</ul>


{% for tag in tags_list %}
  <h2 class='tag-header' id="{{ tag[0] }}">{{ tag[0] }}</h2>
  <ul>
    {% assign pages_list = tag[1] %}

    {% for node in pages_list %}
      {% if node.title != null %}
        {% if group == null or group == node.group %}
          {% if page.url == node.url %}
          <li class="active"><a href="{{node.url}}" class="active">{{node.title}}</a></li>
          {% else %}
          <li><a href="{{node.url}}">{{node.title}}</a></li>
          {% endif %}
        {% endif %}
      {% endif %}
    {% endfor %}

    {% assign pages_list = nil %}
    {% assign group = nil %}
  </ul>
{% endfor %}
{% assign tags_list = nil %}