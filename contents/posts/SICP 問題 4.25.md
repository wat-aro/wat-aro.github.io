---
title: "SICP 問題 4.25"
published: 2016/01/03
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; 作用的順序のschemeで本文中のunlessを使用してfactorialを定義した時，  </span>
<span class="synSpecial">``(</span>factorial <span class="synConstant">5</span><span class="synSpecial">)``</span><span class="synError">を評価しようとすると何が起きるか.</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>unless condition usual-value exceptional-value<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> condition exceptional-value usual-value<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>factorial n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>unless <span class="synSpecial">(</span><span class="synIdentifier">=</span> n <span class="synConstant">1</span><span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synIdentifier">*</span> n <span class="synSpecial">(</span>factorial <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">1</span><span class="synSpecial">)))</span>
    <span class="synConstant">1</span><span class="synSpecial">))</span>

<span class="synComment">;; 作用的順序なのでまず引数を評価しようとする．</span>
<span class="synSpecial">(</span>unless <span class="synSpecial">(</span><span class="synIdentifier">=</span> n <span class="synConstant">1</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> n <span class="synSpecial">(</span>factorial <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">1</span><span class="synSpecial">))</span> <span class="synConstant">1</span><span class="synSpecial">)</span>
<span class="synComment">;; を評価する時に(factorial (- n 1))の部分でループになる．</span>

<span class="synComment">;; 正規順序の言語では引数は必要になった時に初めて評価されるのでこの問題は起こらない．</span>
</pre>


