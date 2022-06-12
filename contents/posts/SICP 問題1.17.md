---
title: "SICP 問題1.17"
published: 2015/10/06
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> a b<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> b <span class="synConstant">0</span><span class="synSpecial">)</span>
      <span class="synConstant">0</span>
      <span class="synSpecial">(</span><span class="synIdentifier">+</span> a <span class="synSpecial">(</span><span class="synIdentifier">*</span> a <span class="synSpecial">(</span><span class="synIdentifier">-</span> b <span class="synConstant">1</span><span class="synSpecial">)))))</span>

<span class="synComment">;; 末尾再帰にしてみた</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> a b<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>*iter a b <span class="synConstant">0</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>*iter a b sum<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> b <span class="synConstant">0</span><span class="synSpecial">)</span>
      sum
      <span class="synSpecial">(</span>*iter a <span class="synSpecial">(</span><span class="synIdentifier">-</span> b <span class="synConstant">1</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> a sum<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>double n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">*</span> <span class="synConstant">2</span> n<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>halve n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">/</span> n <span class="synConstant">2</span><span class="synSpecial">))</span>


<span class="synComment">;; fast-exptのように</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>fast-* n m<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">=</span> m <span class="synConstant">0</span><span class="synSpecial">)</span> <span class="synConstant">0</span><span class="synSpecial">)</span>
        <span class="synSpecial">((</span><span class="synIdentifier">even?</span> m<span class="synSpecial">)</span> <span class="synSpecial">(</span>double <span class="synSpecial">(</span>fast-* n <span class="synSpecial">(</span>halve m<span class="synSpecial">))))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> n <span class="synSpecial">(</span>fast-* n <span class="synSpecial">(</span><span class="synIdentifier">-</span> m <span class="synConstant">1</span><span class="synSpecial">))))))</span>
</pre>


