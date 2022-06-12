---
title: "SICP 問題 2.43"
published: 2015/10/22
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>queens board-size<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>queen-cols k<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> k <span class="synConstant">0</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> empty-board<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">filter</span>
         <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>positions<span class="synSpecial">)</span> <span class="synSpecial">(</span>safe? k positions<span class="synSpecial">))</span>
         <span class="synSpecial">(</span>flatmap
          <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>rest-of-queens<span class="synSpecial">)</span>
            <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>new-row<span class="synSpecial">)</span>
                   <span class="synSpecial">(</span>adjoin-position new-row k rest-of-queens<span class="synSpecial">))</span>
                 <span class="synSpecial">(</span>enumerate-interval <span class="synConstant">1</span> board-size<span class="synSpecial">)))</span>
          <span class="synSpecial">(</span>queen-cols <span class="synSpecial">(</span><span class="synIdentifier">-</span> k <span class="synConstant">1</span><span class="synSpecial">))))))</span>
  <span class="synSpecial">(</span>queen-cols board-size<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>l-queens board-size<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>queen-cols k<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> k <span class="synConstant">0</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> empty-board<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">filter</span>
         <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>positions<span class="synSpecial">)</span> <span class="synSpecial">(</span>safe? k positions<span class="synSpecial">))</span>
         <span class="synSpecial">(</span>flatmap
          <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>new-row<span class="synSpecial">)</span>
            <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>rest-of-queens<span class="synSpecial">)</span>
                   <span class="synSpecial">(</span>adjoin-position new-row k rest-of-queens<span class="synSpecial">))</span>
                 <span class="synSpecial">(</span>queen-cols <span class="synSpecial">(</span><span class="synIdentifier">-</span> k <span class="synConstant">1</span><span class="synSpecial">))))</span>
          <span class="synSpecial">(</span>enumerate-interval <span class="synConstant">1</span> board-size<span class="synSpecial">)))))</span>
  <span class="synSpecial">(</span>queen-cols board-size<span class="synSpecial">))</span>
</pre>


<p>元のqueensでは<a class="keyword" href="http://d.hatena.ne.jp/keyword/queen">queen</a>-colsはboard-size回呼ばれている．<br/>
それがLouisのqueensでは(new-row k)一個につき1回呼ばれている．<br/>
つまり　border-size = xとして<br/>
<code>1 + x^1 + x^2 + ... x^(x-1) = (x^x - 1)/ (x - 1)</code>回呼ばれている．<br/>
よってLouisのqueensがかかる時間は　<code>T * ((x^x - 1/ (x * (x - 1)))</code>．</p>

