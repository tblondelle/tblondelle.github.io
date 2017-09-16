---
layout: page
title: "Experiments"
permalink: /experiments/
---

<div>

<h3> 1. Authentification</h3>

<p>I implemented recently an authentification page for a GitHub Pages. The tricky part is that it is meant to accept only static files and every file is public. So how can "secrets" be kept on GitHub Pages? I crypted my "secret" data into a series of integers that can be decrypted with my username and my password (look at the code, and you'll see it is in fact one concatenated field). The cryptographic algorithm I used ("AES-CBC", 128 bits) is rather weak but I can increase the key size rather easily.</p>

<p>The technology I used is the Web Crypto API, which crypts your data directly in JavaScript. This video was useful indeed <a href="https://www.youtube.com/watch?v=rUi1j1NhGow">[link]</a>.</p>

<p> Try decrypting my implementation and drop me an email if you crack it!</p>

<div class='center'>
<a class='button' href="{{site.github.url}}/experiments/authentification/">Go now!</a> 
</div>
</div>
