---
title: "SICP 問題 2.4"
published: 2015/10/10
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> x y<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>m<span class="synSpecial">)</span> <span class="synSpecial">(</span>m x y<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> z<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>z <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>p q<span class="synSpecial">)</span> p<span class="synSpecial">)))</span>

<span class="synComment">;; (car (cons x y)) </span>
<span class="synSpecial">(</span><span class="synIdentifier">car</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> x y<span class="synSpecial">))</span>
<span class="synSpecial">((</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>m<span class="synSpecial">)</span> <span class="synSpecial">(</span>m x y<span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>p q<span class="synSpecial">)</span> p<span class="synSpecial">))</span>
<span class="synSpecial">((</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>p q<span class="synSpecial">)</span> p<span class="synSpecial">)</span> x y<span class="synSpecial">)</span>
x

<span class="synComment">;; cdr</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> z<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>p q<span class="synSpecial">)</span> q<span class="synSpecial">))</span>
</pre>


