---
title: "SICP 問題 2.42"
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

<span class="synSpecial">(</span><span class="synStatement">define</span> empty-board nil<span class="synSpecial">)</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>adjoin-position new-row k rest-of-queens<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> new-row k<span class="synSpecial">)</span> rest-of-queens<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>safe? k positions<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>iter lis<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> lis<span class="synSpecial">)</span> <span class="synConstant">#t</span><span class="synSpecial">)</span>
          <span class="synSpecial">((</span><span class="synIdentifier">=</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> positions<span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> lis<span class="synSpecial">)))</span> <span class="synConstant">#f</span><span class="synSpecial">)</span>
          <span class="synSpecial">((</span><span class="synIdentifier">=</span> <span class="synSpecial">(</span><span class="synIdentifier">-</span> <span class="synSpecial">(</span><span class="synIdentifier">cadar</span> positions<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadar</span> lis<span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synIdentifier">abs</span> <span class="synSpecial">(</span><span class="synIdentifier">-</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> positions<span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> lis<span class="synSpecial">)))))</span> <span class="synConstant">#f</span><span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lis<span class="synSpecial">)))))</span>
  <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> positions<span class="synSpecial">)))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (queens 5)
(((4 5) (2 4) (5 3) (3 2) (1 1)) ((3 5) (5 4) (2 3) (4 2) (1 1)) ((5 5) (3 4) (1 3) (4 2) (2 1)) ((4 5) (1 4) (3 3) (5 2) (2 1)) ((5 5) (2 4) (4 3) (1 2) (3 1)) ((1 5) (4 4) (2 3) (5 2) (3 1)) ((2 5) (5 4) (3 3) (1 2) (4 1)) ((1 5) (3 4) (5 3) (2 2) (4 1)) ((3 5) (1 4) (4 3) (2 2) (5 1)) ((2 5) (4 4) (1 3) (3 2) (5 1)))
</pre>


