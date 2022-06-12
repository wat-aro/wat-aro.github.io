---
title: "SICP 問題 3.37"
published: 2015/12/03
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>c+ x y<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>z <span class="synSpecial">(</span>make-connector<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span>adder x y z<span class="synSpecial">)</span>
    z<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>c- x y<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>z <span class="synSpecial">(</span>make-connector<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span>adder x z y<span class="synSpecial">)</span>
    z<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>c* x y<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>z <span class="synSpecial">(</span>make-connector<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span>multiplier x y z<span class="synSpecial">)</span>
    z<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>c/ x y<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>z <span class="synSpecial">(</span>make-connector<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span>multiplier x z y<span class="synSpecial">)</span>
    z<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>cv x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>z <span class="synSpecial">(</span>make-connector<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span>constant x z<span class="synSpecial">)</span>
    z<span class="synSpecial">))</span>
</pre>


