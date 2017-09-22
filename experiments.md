---
layout: page
title: "Experiments"
permalink: /experiments/
---

<div class="post-summary">

	<h3> 1. Authentification</h3>

	<p>I recently implemented an authentification page for a GitHub Pages website. The tricky part is that you normally need a server to send you the message once the username and password have been accepted. GitHub Pages only offers a static website, thus preventing any dynamic response of private data. </p>

	<p> To go around the problem, I crypted my secret data into a JavaScript file as a series of integers. You can actually see the whole process for the decryption but you miss the private key, which can be recovered with my username and password. The cryptographic algorithm I used ("AES-CBC", 128 bits) is rather weak but I can increase the key size rather easily.</p>

	<p>The technology I used is the Web Crypto API, which crypts your data directly in JavaScript. This video was useful indeed <a href="https://www.youtube.com/watch?v=rUi1j1NhGow">[link]</a>.</p>

	<p> Try decrypting my implementation and drop me an email if you crack it!</p>
	
	<div class='center'>
	<a class='btn btn-default' href="{{site.github.url}}/experiments/authentification/">Go now!</a> 
	</div>

</div>


<div class="post-summary">
	<h3> 2. Notepad Online</h3>

	<p>Pretending this is actually Notepad++ Online is a bit pretentious for now on. But it could still be useful.</p>

	<p>I am not the first one inventing the concept: <a href="http://www.rapidtables.com/tools/notepad.htm">rapidtables.com</a> provides a similar tool with more options, as well as <a href="http://www.mytextarea.com/">mytextarea.com</a>. </p>

	<p>I added here the "automatically saved" option.</p>

	<br>
	<div class='center'>
	<a class='btn btn-default' href="{{site.github.url}}/experiments/notepad-online/">Test it!</a> 
	</div>
</div>


