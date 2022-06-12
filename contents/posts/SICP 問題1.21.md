---
title: "SICP 問題1.21"
published: 2015/10/07
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>smallest-divisor n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>find-divisor n <span class="synConstant">2</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>find-divisor n test-divisor<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">&gt;</span> <span class="synSpecial">(</span>square test-divisor<span class="synSpecial">)</span> n<span class="synSpecial">)</span> n<span class="synSpecial">)</span>
        <span class="synSpecial">((</span>divides? test-divisor n<span class="synSpecial">)</span> test-divisor<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>find-divisor n <span class="synSpecial">(</span><span class="synIdentifier">+</span> test-divisor <span class="synConstant">1</span><span class="synSpecial">)))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>divides? a b<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">=</span> <span class="synSpecial">(</span><span class="synIdentifier">remainder</span> b a<span class="synSpecial">)</span> <span class="synConstant">0</span><span class="synSpecial">))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (smallest-divisor 199)
199
gosh&gt; (smallest-divisor 1999)
1999
gosh&gt;(smallest-divisor 19999)
7</pre>


