---
title: "SICP 問題 3.09"
published: 2015/11/19
tags:
  - scheme
  - SICP
---

<p>階乗を計算する手続き<code>(factorial 6)</code>の環境構造を示す．</p>

<p> </p>

<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/%BA%C6%B5%A2">再帰</a></p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>factorial n<span class="synSpecial">)</span>
<span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> n <span class="synConstant">1</span><span class="synSpecial">)</span>
<span class="synConstant">1</span>
<span class="synSpecial">(</span><span class="synIdentifier">*</span> n <span class="synSpecial">(</span>factorial <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">1</span><span class="synSpecial">)))))</span>
</pre>


<p><span itemscope itemtype="http://schema.org/Photograph"><img src="http://cdn-ak.f.st-hatena.com/images/fotolife/w/wat-aro/20151119/20151119211757.jpg" alt="f:id:wat-aro:20151119211757j:plain" title="f:id:wat-aro:20151119211757j:plain" class="hatena-fotolife" itemprop="image"></span></p>

<p> 
 
反復</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> factorial
<span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>n<span class="synSpecial">)</span>
<span class="synSpecial">(</span>fact-iter <span class="synConstant">1</span> <span class="synConstant">1</span> n<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> fact-iter
<span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>product counter max-count<span class="synSpecial">)</span>
<span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">&gt;</span> counter max-count<span class="synSpecial">)</span>
product
<span class="synSpecial">(</span>fact-iter <span class="synSpecial">(</span><span class="synIdentifier">*</span> counter product<span class="synSpecial">)</span>
<span class="synSpecial">(</span><span class="synIdentifier">+</span> counter <span class="synConstant">1</span><span class="synSpecial">)</span>
max-count<span class="synSpecial">))))</span>
</pre>


<p><span itemscope itemtype="http://schema.org/Photograph"><img src="http://cdn-ak.f.st-hatena.com/images/fotolife/w/wat-aro/20151119/20151119211800.jpg" alt="f:id:wat-aro:20151119211800j:plain" title="f:id:wat-aro:20151119211800j:plain" class="hatena-fotolife" itemprop="image"></span></p>

