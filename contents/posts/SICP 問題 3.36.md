---
title: "SICP 問題 3.36"
published: 2015/12/03
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> a <span class="synSpecial">(</span>make-connector<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> b <span class="synSpecial">(</span>make-connector<span class="synSpecial">))</span>
<span class="synSpecial">(</span>set-value! a <span class="synConstant">10</span> <span class="synSpecial">'</span>user<span class="synSpecial">)</span>
</pre>


<p>set-value!を評価している間で</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span>foreach-except setter inform-about-value constraints<span class="synSpecial">)</span>
</pre>


<p>が評価される環境を示す環境図を書け．</p>

<p><span itemscope itemtype="http://schema.org/Photograph"><a href="http://f.hatena.ne.jp/wat-aro/20151203003621" class="hatena-fotolife" itemprop="url"><img src="http://cdn-ak.f.st-hatena.com/images/fotolife/w/wat-aro/20151203/20151203003621.jpg" alt="f:id:wat-aro:20151203003621j:image" title="f:id:wat-aro:20151203003621j:image" class="hatena-fotolife" itemprop="image"></a></span></p>

