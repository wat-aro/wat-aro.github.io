---
title: "SICP 問題1.46"
published: 2015/10/09
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>iterative-improve enough? improve<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>guess<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>iter guess<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>enough? guess<span class="synSpecial">)</span>
          <span class="synSpecial">(</span>improve guess<span class="synSpecial">)</span>
          <span class="synSpecial">(</span>iter <span class="synSpecial">(</span>improve guess<span class="synSpecial">))))</span>
    <span class="synSpecial">(</span>iter guess<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">sqrt</span> x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>improve guess<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>average guess <span class="synSpecial">(</span><span class="synIdentifier">/</span> x guess<span class="synSpecial">)))</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>good-enough? guess<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synIdentifier">&lt;</span> <span class="synSpecial">(</span><span class="synIdentifier">abs</span> <span class="synSpecial">(</span><span class="synIdentifier">-</span> <span class="synConstant">1</span> <span class="synSpecial">(</span><span class="synIdentifier">/</span> guess <span class="synSpecial">(</span>improve guess<span class="synSpecial">))))</span> <span class="synConstant">0.001</span><span class="synSpecial">))</span>
  <span class="synSpecial">((</span>iterative-improve good-enough? improve<span class="synSpecial">)</span> <span class="synConstant">1.0</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>fixed-point f first-guess<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>improve guess<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>f guess<span class="synSpecial">))</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>close-enough? guess<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synIdentifier">&lt;</span> <span class="synSpecial">(</span><span class="synIdentifier">abs</span> <span class="synSpecial">(</span><span class="synIdentifier">-</span> guess <span class="synSpecial">(</span>improve guess<span class="synSpecial">)))</span> <span class="synConstant">0.00001</span><span class="synSpecial">))</span>
  <span class="synSpecial">((</span>iterative-improve close-enough? improve<span class="synSpecial">)</span> first-guess<span class="synSpecial">))</span>
</pre>


