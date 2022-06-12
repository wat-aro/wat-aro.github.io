---
title: "SICP 問題 2.12"
published: 2015/10/13
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-center-width c w<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>make-interval <span class="synSpecial">(</span><span class="synIdentifier">-</span> c w<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> c w<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>center i<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">/</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span>lower-bound i<span class="synSpecial">)</span> <span class="synSpecial">(</span>upper-bound i<span class="synSpecial">))</span> <span class="synConstant">2</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>width i<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">/</span> <span class="synSpecial">(</span><span class="synIdentifier">-</span> <span class="synSpecial">(</span>upper-bound i<span class="synSpecial">)</span> <span class="synSpecial">(</span>lower-bound i<span class="synSpecial">))</span> <span class="synConstant">2</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-center-percent c p<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>make-interval c <span class="synSpecial">(</span><span class="synIdentifier">*</span> c <span class="synSpecial">(</span><span class="synIdentifier">/</span> w <span class="synConstant">100</span><span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>percent i<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">*</span> <span class="synSpecial">(</span><span class="synIdentifier">/</span> <span class="synSpecial">(</span>width i<span class="synSpecial">)</span> <span class="synSpecial">(</span>center i<span class="synSpecial">))</span> <span class="synConstant">100</span><span class="synSpecial">))</span>
</pre>


