---
title: "SICP 問題 3.13"
published: 2015/11/19
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-cycle x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">set-cdr!</span> <span class="synSpecial">(</span>last-pair x<span class="synSpecial">)</span> x<span class="synSpecial">)</span>
  s<span class="synSpecial">)</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> z <span class="synSpecial">(</span>make-cycle <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>a <span class="synSpecial">'</span>b <span class="synSpecial">'</span>c<span class="synSpecial">)))</span>
</pre>


<p>zのポインタ図．</p>

<p><span itemscope itemtype="http://schema.org/Photograph"><a href="http://f.hatena.ne.jp/wat-aro/20151119224757" class="hatena-fotolife" itemprop="url"><img src="http://cdn-ak.f.st-hatena.com/images/fotolife/w/wat-aro/20151119/20151119224757.jpg" alt="f:id:wat-aro:20151119224757j:image" title="f:id:wat-aro:20151119224757j:image" class="hatena-fotolife" itemprop="image"></a></span></p>

<p><code>(last-pair z)</code>を計算しようとするとlast-pair?が#tになることがないので終わらない．</p>

