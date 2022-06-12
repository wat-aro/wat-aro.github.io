---
title: "SICP 問題1.31"
published: 2015/10/08
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; 再帰的プロセスでproduct</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>product term a next b<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">&gt;</span> a b<span class="synSpecial">)</span>
      <span class="synConstant">0</span>
      <span class="synSpecial">(</span><span class="synIdentifier">*</span> <span class="synSpecial">(</span>term a<span class="synSpecial">)</span>
         <span class="synSpecial">(</span>product term <span class="synSpecial">(</span>next a<span class="synSpecial">)</span> next b<span class="synSpecial">))))</span>

<span class="synComment">;; 反復的プロセスでproduct</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>product term a next b<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>iter a result<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">&gt;</span> a b<span class="synSpecial">)</span>
        result
        <span class="synSpecial">(</span>iter <span class="synSpecial">(</span>next a<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> <span class="synSpecial">(</span>term a<span class="synSpecial">)</span> result<span class="synSpecial">))))</span>
  <span class="synSpecial">(</span>iter a <span class="synConstant">1</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>factorial n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>product identity <span class="synConstant">1</span> <span class="synConstant">1+</span> n<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>pi-product n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>term i<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">odd?</span> i<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">/</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> i <span class="synConstant">1</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> i <span class="synConstant">2</span><span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synIdentifier">/</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> i <span class="synConstant">2</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> i <span class="synConstant">1</span><span class="synSpecial">))))</span>
    <span class="synSpecial">(</span>product term <span class="synConstant">1</span> <span class="synConstant">1+</span> n<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>pi n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">*</span> <span class="synConstant">4</span> <span class="synSpecial">(</span>pi-product n<span class="synSpecial">)))</span>
</pre>


