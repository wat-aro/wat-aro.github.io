---
title: "SICP 問題 3.16"
published: 2015/11/19
tags:
  - scheme
  - SICP
---

<p>ポインタが同じ構造を指していた場合に重複して数えてしまう．<br/>
さらに，循環リストの場合は結果が返ってこない．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>count-pairs x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">pair?</span> x<span class="synSpecial">))</span>
      <span class="synConstant">0</span>
      <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span>count-pairs <span class="synSpecial">(</span><span class="synIdentifier">car</span> x<span class="synSpecial">))</span>
         <span class="synSpecial">(</span>count-pairs <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> x<span class="synSpecial">))</span>
         <span class="synConstant">1</span><span class="synSpecial">)))</span>
</pre>


<p><span itemscope itemtype="http://schema.org/Photograph"><a href="http://f.hatena.ne.jp/wat-aro/20151119232255" class="hatena-fotolife" itemprop="url"><img src="http://cdn-ak.f.st-hatena.com/images/fotolife/w/wat-aro/20151119/20151119232255.jpg" alt="f:id:wat-aro:20151119232255j:image" title="f:id:wat-aro:20151119232255j:image" class="hatena-fotolife" itemprop="image"></a></span></p>

