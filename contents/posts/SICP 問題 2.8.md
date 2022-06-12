---
title: "SICP 問題 2.8"
published: 2015/10/11
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>upper-bound x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> x<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>lower-bound x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">car</span> x<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>sub-interval x y<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>make-interval <span class="synSpecial">(</span><span class="synIdentifier">-</span> <span class="synSpecial">(</span>upper-bound x<span class="synSpecial">)</span> <span class="synSpecial">(</span>lower-bound y<span class="synSpecial">))</span>
                 <span class="synSpecial">(</span><span class="synIdentifier">-</span> <span class="synSpecial">(</span>upper-bound y<span class="synSpecial">)</span> <span class="synSpecial">(</span>lower-bound x<span class="synSpecial">))))</span>
</pre>


