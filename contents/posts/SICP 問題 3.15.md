---
title: "SICP 問題 3.15"
published: 2015/11/19
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> x <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>a <span class="synSpecial">'</span>b<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> z1 <span class="synSpecial">(</span><span class="synIdentifier">cons</span> x x<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> z2 <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>a <span class="synSpecial">'</span>b<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>a <span class="synSpecial">'</span>b<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>set-to-wow! x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">set-car!</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> x<span class="synSpecial">)</span> <span class="synSpecial">'</span>wow<span class="synSpecial">)</span>
  x<span class="synSpecial">)</span>
</pre>


<p>(set-to-wow! z1)と(set-to-wow! z2)の結果の箱とポインタ図</p>

<p><span itemscope itemtype="http://schema.org/Photograph"><a href="http://f.hatena.ne.jp/wat-aro/20151119231205" class="hatena-fotolife" itemprop="url"><img src="http://cdn-ak.f.st-hatena.com/images/fotolife/w/wat-aro/20151119/20151119231205.jpg" alt="f:id:wat-aro:20151119231205j:image" title="f:id:wat-aro:20151119231205j:image" class="hatena-fotolife" itemprop="image"></a></span></p>

