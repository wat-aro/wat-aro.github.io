---
title: "SICP 問題 2.7"
published: 2015/10/11
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-interval a b<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> a b<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>upper-bound x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">&gt;</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> x<span class="synSpecial">))</span>
      <span class="synSpecial">(</span><span class="synIdentifier">car</span> x<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> x<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>lower-bound y<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">&lt;</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> y<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> y<span class="synSpecial">))</span>
      <span class="synSpecial">(</span><span class="synIdentifier">car</span> y<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> y<span class="synSpecial">)))</span>
</pre>


