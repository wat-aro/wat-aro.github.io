---
title: "SICP 問題1.10"
published: 2015/10/04
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>A x y<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">=</span> y <span class="synConstant">0</span><span class="synSpecial">)</span> <span class="synConstant">0</span><span class="synSpecial">)</span>
        <span class="synSpecial">((</span><span class="synIdentifier">=</span> x <span class="synConstant">0</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> <span class="synConstant">2</span> y<span class="synSpecial">))</span>
        <span class="synSpecial">((</span><span class="synIdentifier">=</span> y <span class="synConstant">1</span><span class="synSpecial">)</span> <span class="synConstant">2</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>A <span class="synSpecial">(</span><span class="synIdentifier">-</span> x <span class="synConstant">1</span><span class="synSpecial">)</span>
                 <span class="synSpecial">(</span>A x <span class="synSpecial">(</span><span class="synIdentifier">-</span> y <span class="synConstant">1</span><span class="synSpecial">))))))</span>

<span class="synSpecial">(</span>A <span class="synConstant">1</span> <span class="synConstant">10</span><span class="synSpecial">)</span>
<span class="synComment">;; gosh&gt; 1024</span>

<span class="synSpecial">(</span>A <span class="synConstant">2</span> <span class="synConstant">4</span><span class="synSpecial">)</span>
<span class="synComment">;; gosh&gt; 65536</span>

<span class="synSpecial">(</span>A <span class="synConstant">3</span> <span class="synConstant">3</span><span class="synSpecial">)</span>
<span class="synComment">;; gosh&gt; 65536</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>f n<span class="synSpecial">)</span> <span class="synSpecial">(</span>A <span class="synConstant">0</span> n<span class="synSpecial">))</span>
<span class="synComment">;; =&gt; f(n) = 2n</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>g n<span class="synSpecial">)</span> <span class="synSpecial">(</span>A <span class="synConstant">1</span> n<span class="synSpecial">))</span>
<span class="synComment">;; =&gt; g(n) = 2^n</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>h n<span class="synSpecial">)</span> <span class="synSpecial">(</span>A <span class="synConstant">2</span> n<span class="synSpecial">))</span>
<span class="synComment">;; =&gt; h(1) = 2</span>
<span class="synComment">;; =&gt; h(2) = 2^2</span>
<span class="synComment">;; =&gt; h(3) = 2^(2^2)</span>
<span class="synComment">;; =&gt; h(4) = 2^(2^(2^2))</span>
<span class="synComment">;; 2の2乗をn回繰り返したもの？</span>
</pre>


