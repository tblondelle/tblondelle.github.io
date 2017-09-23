---
layout: page
title: "Posts"
permalink: /posts/
---

<div>

  <ul class="post-list">
    {% for post in site.posts %}
    <a class="post-meta" href="{{ post.url | prepend: site.baseurl }}">
       <li>
       <h3>{{ post.title }}</h3>
       {{ post.date | date: "%b %-d, %Y" }} </li>
    </a>
     

    {% endfor %}
  </ul>

</div>
