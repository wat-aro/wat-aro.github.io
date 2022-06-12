---
title: "SICP 問題1.11"
published: 2015/10/05
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; 再帰的プロセス</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>f n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">&lt;</span> n <span class="synConstant">3</span><span class="synSpecial">)</span>
      n
      <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span>f <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">1</span><span class="synSpecial">))</span>
         <span class="synSpecial">(</span><span class="synIdentifier">*</span> <span class="synConstant">2</span> <span class="synSpecial">(</span>f <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">2</span><span class="synSpecial">)))</span>
         <span class="synSpecial">(</span><span class="synIdentifier">*</span> <span class="synConstant">3</span> <span class="synSpecial">(</span>f <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">3</span><span class="synSpecial">))))))</span>

<span class="synComment">;; 反復的プロセス</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>g n<span class="synSpecial">)</span>
  <span class="synComment">;; iterでは3 ≦ nの時のみの処理．n1 はf(n-1),n2はf(n-2),n3はf(n-3)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>iter n1 n2 n3 count<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> count <span class="synConstant">0</span><span class="synSpecial">)</span>
        n1
        <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">+</span> n1 <span class="synSpecial">(</span><span class="synIdentifier">*</span> <span class="synConstant">2</span> n2<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> <span class="synConstant">3</span> n3<span class="synSpecial">))</span>
              n1
              n2
              <span class="synSpecial">(</span><span class="synIdentifier">-</span> count <span class="synConstant">1</span><span class="synSpecial">))))</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">&lt;</span> n <span class="synConstant">3</span><span class="synSpecial">)</span>
      n
      <span class="synSpecial">(</span>iter <span class="synConstant">2</span> <span class="synConstant">1</span> <span class="synConstant">0</span> <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">2</span><span class="synSpecial">))))</span> <span class="synComment">;;3≦nの時iter．n=1,2の時はn1,n2に渡してあるのでcountに渡す引数は(- n 2)</span>
</pre>


