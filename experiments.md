---
layout: page
title: "Experiments"
permalink: /experiments/
---

<div>

<h3> 1. Authentification</h3>

<p>I recently implemented an authentification page for a GitHub Pages website. The tricky part is that you normally need a server to send you the message once the username and password have been accepted. GitHub Pages only offers a static website, thus preventing any dynamic response of private data. </p>

<p> To go around the problem, I crypted my secret data into a JavaScript file as a series of integers. You can actually see the whole process for the decryption but you miss the private key, which can be recovered with my username and password. The cryptographic algorithm I used ("AES-CBC", 128 bits) is rather weak but I can increase the key size rather easily.</p>

<p>The technology I used is the Web Crypto API, which crypts your data directly in JavaScript. This video was useful indeed <a href="https://www.youtube.com/watch?v=rUi1j1NhGow">[link]</a>.</p>

<p> Try decrypting my implementation and drop me an email if you crack it!</p>

<div class='center'>
<a class='button' href="{{site.github.url}}/experiments/authentification/">Go now!</a> 
</div>
</div>
