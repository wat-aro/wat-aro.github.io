---
title: "SICP 問題 3.50"
published: 2015/12/07
tags:
  - scheme
  - SICP
---

<p>マクロを使ってる部分は<br/>
<a href="http://d.hatena.ne.jp/nrvct/20091223/1261518527">&#x30B9;&#x30C8;&#x30EA;&#x30FC;&#x30E0;&#x306E;&#x5B9F;&#x88C5;&#x3068;&#x554F;&#x984C;3.50-3.51 - nrvct&#x306E;&#x65E5;&#x8A18;</a><br/>
ここから引用．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; 次の二つは引用元から</span>
<span class="synComment">;; cons-streamは評価順序を変えたいのでマクロ</span>
<span class="synSpecial">(</span><span class="synStatement">define-syntax</span> cons-stream
  <span class="synSpecial">(</span><span class="synStatement">syntax-rules</span> <span class="synSpecial">()</span>
    <span class="synSpecial">((</span>_ a b<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> a <span class="synSpecial">(</span><span class="synStatement">delay</span> b<span class="synSpecial">)))))</span>

<span class="synComment">;; delayもマクロ．マクロよくわかってない．</span>
<span class="synComment">;; メモ化する．</span>
<span class="synSpecial">(</span><span class="synStatement">define-syntax</span> <span class="synStatement">delay</span>
  <span class="synSpecial">(</span><span class="synStatement">syntax-rules</span> <span class="synSpecial">()</span>
    <span class="synSpecial">((</span>_ <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>memo-proc <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">()</span> <span class="synIdentifier">exp</span><span class="synSpecial">)))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>stream-car stream<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> stream<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>stream-cdr stream<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">force</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> stream<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>stream-ref s n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> n <span class="synConstant">0</span><span class="synSpecial">)</span>
      <span class="synSpecial">(</span>stream-car s<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>stream-ref <span class="synSpecial">(</span>stream-cdr s<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">1</span><span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>stream-map proc s<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>stream-null? s<span class="synSpecial">)</span>
      the-empty-stream
      <span class="synSpecial">(</span>cons-stream <span class="synSpecial">(</span>proc <span class="synSpecial">(</span>stream-car s<span class="synSpecial">))</span>
                   <span class="synSpecial">(</span>stream-map proc <span class="synSpecial">(</span>stream-cdr s<span class="synSpecial">)))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>stream-for-each proc s<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>stream-null? s<span class="synSpecial">)</span>
      <span class="synSpecial">'</span>done
      <span class="synSpecial">(</span><span class="synStatement">begin</span> <span class="synSpecial">(</span>proc <span class="synSpecial">(</span>stream-car s<span class="synSpecial">))</span>
             <span class="synSpecial">(</span>stream-for-each proc <span class="synSpecial">(</span>stream-cdr s<span class="synSpecial">)))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>display-stream s<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>stream-for-each display-line s<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>display-line x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">newline</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">display</span> x<span class="synSpecial">))</span>


<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>stream-null? stream<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">null?</span> stream<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> the-empty-stream <span class="synSpecial">'())</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>stream-enumerate-interval low high<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">&gt;</span> low high<span class="synSpecial">)</span>
      the-empty-stream
      <span class="synSpecial">(</span>cons-stream
       low
       <span class="synSpecial">(</span>stream-enumerate-interval <span class="synSpecial">(</span><span class="synIdentifier">+</span> low <span class="synConstant">1</span><span class="synSpecial">)</span> high<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>stream-filter pred stream<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>stream-null? stream<span class="synSpecial">)</span> the-empty-stream<span class="synSpecial">)</span>
        <span class="synSpecial">((</span>pred <span class="synSpecial">(</span>stream-car stream<span class="synSpecial">))</span>
         <span class="synSpecial">(</span>cons-stream <span class="synSpecial">(</span>stream-car stream<span class="synSpecial">)</span>
                      <span class="synSpecial">(</span>stream-filter pred
                                     <span class="synSpecial">(</span>stream-cdr stream<span class="synSpecial">))))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>stream-filter pred <span class="synSpecial">(</span>stream-cdr stream<span class="synSpecial">)))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">force</span> delayed-object<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>delayed-object<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>memo-proc proc<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>already-run? false<span class="synSpecial">)</span> <span class="synSpecial">(</span>result false<span class="synSpecial">))</span>
    <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">()</span>
      <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">not</span> already-run?<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synStatement">begin</span> <span class="synSpecial">(</span><span class="synStatement">set!</span> result <span class="synSpecial">(</span>proc<span class="synSpecial">))</span>
                 <span class="synSpecial">(</span><span class="synStatement">set!</span> already-run? true<span class="synSpecial">)</span>
                 result<span class="synSpecial">)</span>
          result<span class="synSpecial">))))</span>


<span class="synComment">;; 3.50</span>
<span class="synComment">;; stream-map</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>stream-map proc <span class="synSpecial">.</span> argstreams<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>stream-null? <span class="synSpecial">(</span><span class="synIdentifier">car</span> argstreams<span class="synSpecial">))</span>
      the-empty-stream
      <span class="synSpecial">(</span><span class="synStatement">begin</span>
        <span class="synSpecial">(</span>cons-stream <span class="synSpecial">(</span><span class="synIdentifier">apply</span> proc <span class="synSpecial">(</span><span class="synIdentifier">map</span> stream-car argstreams<span class="synSpecial">))</span>
                     <span class="synSpecial">(</span><span class="synIdentifier">apply</span> stream-map
                            <span class="synSpecial">(</span><span class="synIdentifier">cons</span> proc <span class="synSpecial">(</span><span class="synIdentifier">map</span> stream-cdr argstreams<span class="synSpecial">)))))))</span>
</pre>


