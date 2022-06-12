---
title: "SICP 問題 2.5"
published: 2015/10/10
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> a b<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">*</span> <span class="synSpecial">(</span><span class="synIdentifier">expt</span> <span class="synConstant">2</span> a<span class="synSpecial">)</span>
     <span class="synSpecial">(</span><span class="synIdentifier">expt</span> <span class="synConstant">3</span> b<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> c<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>iter n count<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">&lt;</span> <span class="synConstant">0</span> <span class="synSpecial">(</span><span class="synIdentifier">remainder</span> n <span class="synConstant">2</span><span class="synSpecial">))</span>
        count
        <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">/</span> n <span class="synConstant">2</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> count <span class="synConstant">1</span><span class="synSpecial">))))</span>
  <span class="synSpecial">(</span>iter c <span class="synConstant">0</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> c<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>iter n count<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">&lt;</span> <span class="synConstant">0</span> <span class="synSpecial">(</span><span class="synIdentifier">remainder</span> n <span class="synConstant">3</span><span class="synSpecial">))</span>
        count
        <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">/</span> n <span class="synConstant">3</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> count <span class="synConstant">1</span><span class="synSpecial">))))</span>
  <span class="synSpecial">(</span>iter c <span class="synConstant">0</span><span class="synSpecial">))</span>
</pre>


<p>　<br/>
　<br/>
始め算術演算を使えって条件を見逃してlogを使って書いたのでそれも．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> c<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>iter n<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> <span class="synConstant">0</span> <span class="synSpecial">(</span><span class="synIdentifier">modulo</span> n <span class="synConstant">3</span><span class="synSpecial">))</span>
        <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">/</span> n <span class="synConstant">3</span><span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synIdentifier">log</span> n <span class="synConstant">2</span><span class="synSpecial">)))</span>
  <span class="synSpecial">(</span>iter c<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> c<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>iter n<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> <span class="synConstant">0</span> <span class="synSpecial">(</span><span class="synIdentifier">modulo</span> n <span class="synConstant">2</span><span class="synSpecial">))</span>
        <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">/</span> n <span class="synConstant">2</span><span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synIdentifier">log</span> n <span class="synConstant">3</span><span class="synSpecial">)))</span>
  <span class="synSpecial">(</span>iter c<span class="synSpecial">))</span>
</pre>


