---
title: "SICP 問題 2.48"
published: 2015/10/23
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-segment v1 v2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>make-vect v1 v2<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>start-segment seg<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">car</span> seg<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>end-segment seg<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> seg<span class="synSpecial">))</span>
</pre>


