---
title: "SICP 問題1.8"
published: 2015/10/03
tags:
  - scheme
  - SICP
---

<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%CB%A5%E5%A1%BC%A5%C8%A5%F3%CB%A1">ニュートン法</a>で立方根を求める　<br/>
　</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>cube-root-iter guess x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>good-enough? guess x<span class="synSpecial">)</span>
      guess
      <span class="synSpecial">(</span>cube-root-iter <span class="synSpecial">(</span>cube-improve guess x<span class="synSpecial">)</span>
                 x<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>cube-improve guess x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">/</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span><span class="synIdentifier">/</span> x
           <span class="synSpecial">(</span>square guess<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synIdentifier">*</span> <span class="synConstant">2</span> guess<span class="synSpecial">))</span>
     <span class="synConstant">3</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>good-enough? guess x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">&lt;</span> <span class="synSpecial">(</span><span class="synIdentifier">abs</span> <span class="synSpecial">(</span><span class="synIdentifier">-</span> <span class="synConstant">1.0</span> <span class="synSpecial">(</span><span class="synIdentifier">/</span> guess <span class="synSpecial">(</span>cube-improve guess x<span class="synSpecial">))))</span> <span class="synConstant">0.001</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>cube-root x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>cube-root-iter <span class="synConstant">1.0</span> x<span class="synSpecial">))</span>
</pre>


