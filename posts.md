---
layout: page
title: "Posts"
permalink: /posts/
---

<div>

  <ul class="post-list">
    {% for post in site.posts %}
      <li>
        <div class="post-meta">
          <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
          <br>{{ post.date | date: "%b %-d, %Y" }}
        </div>
      </li>

    {% endfor %}
  </ul>

</div>
