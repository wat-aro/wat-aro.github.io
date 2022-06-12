---
title: "SICP 問題 2.26"
published: 2015/10/19
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> x <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> y <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synConstant">4</span> <span class="synConstant">5</span> <span class="synConstant">6</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synIdentifier">append</span> x y<span class="synSpecial">)</span>
<span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span> <span class="synConstant">4</span> <span class="synConstant">5</span> <span class="synConstant">6</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span><span class="synIdentifier">cons</span> x y<span class="synSpecial">)</span>
<span class="synSpecial">((</span><span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span><span class="synSpecial">)</span> <span class="synConstant">4</span> <span class="synConstant">5</span> <span class="synConstant">6</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span><span class="synIdentifier">list</span> x y<span class="synSpecial">)</span>
<span class="synSpecial">((</span><span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synConstant">4</span> <span class="synConstant">5</span> <span class="synConstant">6</span><span class="synSpecial">))</span>
</pre>


