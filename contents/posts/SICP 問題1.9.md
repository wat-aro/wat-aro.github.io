---
title: "SICP 問題1.9"
published: 2015/10/04
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> a b<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> a <span class="synConstant">0</span><span class="synSpecial">)</span>
      b
      <span class="synSpecial">(</span>inc <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span>dec a<span class="synSpecial">)</span> b<span class="synSpecial">))))</span>
<span class="synComment">;; 再帰的</span>
<span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synConstant">4</span> <span class="synConstant">5</span><span class="synSpecial">)</span>
<span class="synSpecial">(</span>inc <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synConstant">3</span> <span class="synConstant">5</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span>inc <span class="synSpecial">(</span>inc <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synConstant">2</span> <span class="synConstant">5</span><span class="synSpecial">)))</span>
<span class="synSpecial">(</span>inc <span class="synSpecial">(</span>inc <span class="synSpecial">(</span>inc <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synConstant">1</span> <span class="synConstant">5</span><span class="synSpecial">))))</span>
<span class="synSpecial">(</span>inc <span class="synSpecial">(</span>inc <span class="synSpecial">(</span>inc <span class="synSpecial">(</span>inc <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synConstant">0</span> <span class="synConstant">5</span><span class="synSpecial">)))))</span>
<span class="synSpecial">(</span>inc <span class="synSpecial">(</span>inc <span class="synSpecial">(</span>inc <span class="synSpecial">(</span>inc <span class="synConstant">5</span><span class="synSpecial">))))</span>
<span class="synSpecial">(</span>inc <span class="synSpecial">(</span>inc <span class="synSpecial">(</span>inc <span class="synConstant">6</span><span class="synSpecial">)))</span>
<span class="synSpecial">(</span>inc <span class="synSpecial">(</span>inc <span class="synConstant">7</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span>inc <span class="synConstant">8</span><span class="synSpecial">)</span>
<span class="synConstant">9</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> a b<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> a <span class="synConstant">0</span><span class="synSpecial">)</span>
      b
      <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span>dec a<span class="synSpecial">)</span> <span class="synSpecial">(</span>inc b<span class="synSpecial">))))</span>
<span class="synComment">;; 反復的</span>
<span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synConstant">4</span> <span class="synConstant">5</span><span class="synSpecial">)</span>
<span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synConstant">3</span> <span class="synConstant">6</span><span class="synSpecial">)</span>
<span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synConstant">2</span> <span class="synConstant">7</span><span class="synSpecial">)</span>
<span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synConstant">1</span> <span class="synConstant">8</span><span class="synSpecial">)</span>
<span class="synConstant">9</span>
</pre>


