---
title: "SICP 問題1.45"
published: 2015/10/09
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;;実験用に作った手続き</span>
<span class="synComment">;; x^n k回平均緩和</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>test x n k<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>fixed-point-of-transform <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>y<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">/</span> x <span class="synSpecial">(</span><span class="synIdentifier">expt</span> y <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">1</span><span class="synSpecial">))))</span>
                            <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>z<span class="synSpecial">)</span> <span class="synSpecial">((</span>repeated average-damp k<span class="synSpecial">)</span> z<span class="synSpecial">))</span>
                            <span class="synConstant">1.0</span><span class="synSpecial">))</span>
</pre>


<p>実験の結果，<br/>
2 ≦ n &lt; 4 の時 k=1<br/>
4 ≦ n &lt; 8 の時 k=2<br/>
8 ≦ n &lt; 16 の時 k=3<br/>
16 ≦ n &lt; 32 の時 k=4<br/>
32 ≦ n &lt; 64 の時 k=5<br/>
n乗根に必要な平均緩和の回数は(log2 n) 回(小数部分切り捨て)．<br/>
n√xを求めるnth-rootを実装する．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>nth-root x n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>k <span class="synSpecial">(</span><span class="synIdentifier">floor</span> <span class="synSpecial">(</span><span class="synIdentifier">log</span> n <span class="synConstant">2</span><span class="synSpecial">))))</span>
    <span class="synSpecial">(</span>fixed-point <span class="synSpecial">((</span>repeated average-damp k<span class="synSpecial">)</span>
                  <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>y<span class="synSpecial">)</span>
                    <span class="synSpecial">(</span><span class="synIdentifier">/</span> x <span class="synSpecial">(</span><span class="synIdentifier">expt</span> y
                               <span class="synSpecial">(</span><span class="synIdentifier">-</span> x <span class="synConstant">1</span><span class="synSpecial">)))))</span>
                 <span class="synConstant">1.0</span><span class="synSpecial">)))</span>
</pre>


