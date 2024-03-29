---
title: "SICP 問題1.33"
published: 2015/10/08
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; 再帰的プロセスで</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>filtered-accumulate <span class="synIdentifier">filter</span> combiner null-value term a next b<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">&gt;</span> a b<span class="synSpecial">)</span> null-value<span class="synSpecial">)</span>
        <span class="synSpecial">((</span><span class="synIdentifier">filter</span> a<span class="synSpecial">)</span> <span class="synSpecial">(</span>combiner <span class="synSpecial">(</span>term a<span class="synSpecial">)</span>
                              <span class="synSpecial">(</span>filtered-accumulate <span class="synIdentifier">filter</span> combiner null-value
                                                   term <span class="synSpecial">(</span>next a<span class="synSpecial">)</span> next b<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>filterd-accumulate <span class="synIdentifier">filter</span> combiner null-value term <span class="synSpecial">(</span>next a<span class="synSpecial">)</span> next b<span class="synSpecial">))))</span>

<span class="synComment">;; 反復的プロセスで</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>filtered-accumulate <span class="synIdentifier">filter</span> combiner null-value term a next b<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>iter a result<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">&gt;</span> a b<span class="synSpecial">)</span> result<span class="synSpecial">)</span>
          <span class="synSpecial">((</span><span class="synIdentifier">filter</span> a<span class="synSpecial">)</span> <span class="synSpecial">(</span>iter <span class="synSpecial">(</span>next a<span class="synSpecial">)</span> <span class="synSpecial">(</span>combiner <span class="synSpecial">(</span>term a<span class="synSpecial">)</span> result<span class="synSpecial">)))</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>iter <span class="synSpecial">(</span>next a<span class="synSpecial">)</span> result<span class="synSpecial">))))</span>
  <span class="synSpecial">(</span>iter a null-value<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>sum-prime-square a b<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>filtered-accumulate prime? <span class="synIdentifier">+</span> <span class="synConstant">0</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>a<span class="synSpecial">)</span> <span class="synSpecial">(</span>square a<span class="synSpecial">))</span> a <span class="synConstant">1+</span> b<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>product-disjoint-n n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>disjoint-n? a<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">gcd</span> a b<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> b <span class="synConstant">0</span><span class="synSpecial">)</span>
          a
          <span class="synSpecial">(</span><span class="synIdentifier">gcd</span> b <span class="synSpecial">(</span><span class="synIdentifier">remainder</span> a b<span class="synSpecial">))))</span>
    <span class="synSpecial">(</span><span class="synIdentifier">=</span> <span class="synSpecial">(</span><span class="synIdentifier">gcd</span> a n<span class="synSpecial">)</span> <span class="synConstant">1</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span>filtered-accumulate disjoint-n? <span class="synIdentifier">*</span> <span class="synConstant">1</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>a<span class="synSpecial">)</span> a<span class="synSpecial">)</span> <span class="synConstant">1</span> <span class="synConstant">1+</span> n<span class="synSpecial">))</span>
</pre>


