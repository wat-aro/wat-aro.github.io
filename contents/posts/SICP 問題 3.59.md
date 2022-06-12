---
title: "SICP 問題 3.59"
published: 2015/12/10
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; a</span>
<span class="synComment">;; 引数としてべき級数を表現するストリームをとり，級数の積分の定数項を除いた項の係数のストリーム</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>integrate-series stream<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>stream-map <span class="synIdentifier">/</span> stream integers<span class="synSpecial">))</span>

<span class="synComment">;; b</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> exp-series
  <span class="synSpecial">(</span>cons-stream <span class="synConstant">1</span> <span class="synSpecial">(</span>integrate-series exp-series<span class="synSpecial">)))</span>

<span class="synComment">;; 余弦の微分は正弦なので</span>
<span class="synComment">;; cos xの微分は-sin x</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> cosine-series
  <span class="synSpecial">(</span>cons-stream <span class="synConstant">0</span> <span class="synSpecial">(</span>stream-map <span class="synIdentifier">-</span> <span class="synSpecial">(</span>integrate-series sine-series<span class="synSpecial">))))</span>

<span class="synComment">;; 正弦の微分は余弦</span>
<span class="synComment">;; sin xの微分は cos x</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> sine-series
  <span class="synSpecial">(</span>cons-stream <span class="synConstant">1</span> <span class="synSpecial">(</span>integrate-series cosine-series<span class="synSpecial">)))</span>
</pre>


