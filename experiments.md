---
layout: page
title: "Experiments"
permalink: /experiments/
---

<div class="post-summary">

	<h3> 1. Authentification <a href="{{site.github.url}}/experiments/authentification"><i class="material-icons">open_in_new</i></a></h3>

	<p>I recently implemented an authentification page for a GitHub Pages website. The tricky part is that you normally need a server to send you the message once the username and password have been accepted. GitHub Pages only offers a static website, thus preventing any dynamic response of private data. </p>

	<p> To go around the problem, I crypted my secret data into a JavaScript file as a series of integers. You can actually see the whole process for the decryption but you miss the private key, which can be recovered with my username and password. The cryptographic algorithm I used ("AES-CBC", 128 bits) is rather weak but I can increase the key size rather easily.</p>

	<p>The technology I used is the Web Crypto API, which crypts your data directly in JavaScript. <a href="https://www.youtube.com/watch?v=rUi1j1NhGow">This video</a> was useful indeed.</p>

	<p> Try decrypting my implementation and drop me an email if you crack it!</p>

</div>


<div class="post-summary">
	<h3> 2. Notepad online <a href="{{site.github.url}}/experiments/notepad-online"><i class="material-icons">open_in_new</i></a></h3>

	<p>Pretending this is actually Notepad++ Online is a bit pretentious for now on. But it could still be useful.</p>

	<p>I am not the first one inventing the concept: <a href="http://www.rapidtables.com/tools/notepad.htm">rapidtables.com</a> provides a similar tool with more options, as well as <a href="http://www.mytextarea.com/">mytextarea.com</a>. </p>

	<p>I have added the "automatically saved" option.</p>

</div>


<div class="post-summary">
	<h3> 3. Chess (17/10/05) <a href="{{site.github.url}}/experiments/chess"><i class="material-icons">open_in_new</i></a></h3>

	<p>It is harder than you would think to find a simple chess game online, without ads and countless scripts. I then wrote mine with the great help of  <a href="http://chessboardjs.com">chessboardjs</a>.</p>

    <p>The "autosave" is activated. Further modifications are to be added but the point here is just being able to play...</p>
    
    <p>(17/10/09) I have added a Redo option as well as the possiblity to save and upload the whole game.</p>
</div>


<div class="center logo_site">-- &#664; --</div>


