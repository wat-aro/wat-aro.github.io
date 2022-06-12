---
title: "SICP 問題1.29"
published: 2015/10/07
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>integral-simpson f a b n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> h <span class="synSpecial">(</span><span class="synIdentifier">/</span> <span class="synSpecial">(</span><span class="synIdentifier">-</span> b a<span class="synSpecial">)</span> n<span class="synSpecial">))</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>y k<span class="synSpecial">)</span> <span class="synSpecial">(</span>f <span class="synSpecial">(</span><span class="synIdentifier">+</span> a <span class="synSpecial">(</span><span class="synIdentifier">*</span> k h<span class="synSpecial">))))</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>next i<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> i <span class="synConstant">1</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>term i<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synIdentifier">*</span> <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synStatement">or</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> i <span class="synConstant">0</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> i n<span class="synSpecial">))</span> <span class="synConstant">1</span><span class="synSpecial">)</span>
             <span class="synSpecial">((</span><span class="synIdentifier">even?</span> i<span class="synSpecial">)</span> <span class="synConstant">2</span><span class="synSpecial">)</span>
             <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synConstant">4</span><span class="synSpecial">))</span>
       <span class="synSpecial">(</span>y i<span class="synSpecial">)))</span>
  <span class="synSpecial">(</span><span class="synIdentifier">*</span> <span class="synSpecial">(</span><span class="synIdentifier">/</span> h <span class="synConstant">3.0</span><span class="synSpecial">)</span>
     <span class="synSpecial">(</span>sum term
          a
          next
          n<span class="synSpecial">)))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (integral-simpson cube 0 1 100)
0.25
gosh&gt; (integral-simpson cube 0 1 1000)
0.25</pre>


