---
title: "SICP 問題 4.71"
published: 2016/01/21
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; 本文中のsimple-query</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>simple-query query-pattern frame-stream<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>stream-flatmap
   <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>frame<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>stream-append-delayed
      <span class="synSpecial">(</span>find-assertions query-pattern frame<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">delay</span> <span class="synSpecial">(</span>apply-rules query-pattern frame<span class="synSpecial">))))</span>
   frame-stream<span class="synSpecial">))</span>

<span class="synComment">;; 本文中のdisjoin</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>disjoin disjuncts frame-stream<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>empty-disjunction? disjuncts<span class="synSpecial">)</span>
      the-empty-stream
      <span class="synSpecial">(</span>interleave-delayed
       <span class="synSpecial">(</span>qeval <span class="synSpecial">(</span>first-disjunct disjuncts<span class="synSpecial">)</span> frame-stream<span class="synSpecial">)</span>
       <span class="synSpecial">(</span><span class="synStatement">delay</span> <span class="synSpecial">(</span>disjoin <span class="synSpecial">(</span>rest-disjuncts disjuncts<span class="synSpecial">)</span>
                       frame-stream<span class="synSpecial">)))))</span>

<span class="synComment">;; Louis Reasonerが提案したsimple-query</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>simple-query query-pattern frame-stream<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>stream-flatmap
   <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>frame<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>stream-append-delayed
      <span class="synSpecial">(</span>find-assertions query-pattern frame<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>apply-rules query-pattern frame<span class="synSpecial">)))</span>
   frame-stream<span class="synSpecial">))</span>

<span class="synComment">;; Louis Reasonerが提案したdisjoin</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>disjoin disjuncts frame-stream<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>empty-disjunction? disjuncts<span class="synSpecial">)</span>
      the-empty-stream
      <span class="synSpecial">(</span>interleave-delayed
       <span class="synSpecial">(</span>qeval <span class="synSpecial">(</span>first-disjunct disjuncts<span class="synSpecial">)</span> frame-stream<span class="synSpecial">)</span>
       <span class="synSpecial">(</span>disjoin <span class="synSpecial">(</span>rest-disjuncts disjuncts<span class="synSpecial">)</span>
                frame-stream<span class="synSpecial">))))</span>

<span class="synComment">;; Louis Readonerの提案したものだとinterleaveの二つ目のストリームが遅延されていないので</span>
<span class="synComment">;; 評価が終わるまで印字されない．</span>
<span class="synComment">;; 仮にruleのほうで無限ループに陥った時に，delayする場合は一つ一つの評価結果を印字しながらループし</span>
<span class="synComment">;; delayがない場合は何も印字せずに無限ループする．</span>
<span class="synComment">;; 本文でも出てきたmarriedを使って試してみる．</span>

<span class="synSpecial">(</span>assert! <span class="synSpecial">(</span>married Minnie Mickey<span class="synSpecial">))</span>

<span class="synSpecial">(</span>assert! <span class="synSpecial">(</span>rule <span class="synSpecial">(</span>married ?x ?y<span class="synSpecial">)</span>
               <span class="synSpecial">(</span>married ?y ?x<span class="synSpecial">)))</span>
</pre>




<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; delayありの場合</span>
<span class="synComment">;;; Query input:</span>
<span class="synSpecial">(</span>assert! <span class="synSpecial">(</span>married Minnie Mickey<span class="synSpecial">))</span>

Assertion added to data base.

<span class="synComment">;;; Query input:</span>
<span class="synSpecial">(</span>assert! <span class="synSpecial">(</span>rule <span class="synSpecial">(</span>married ?x ?y<span class="synSpecial">)</span>
               <span class="synSpecial">(</span>married ?y ?x<span class="synSpecial">)))</span>

Assertion added to data base.

<span class="synComment">;;; Query input:</span>
<span class="synSpecial">(</span>married Mickey ?x<span class="synSpecial">)</span>

<span class="synComment">;;; Query result:</span>
<span class="synSpecial">(</span>married Mickey Minnie<span class="synSpecial">)</span>
<span class="synSpecial">(</span>married Mickey Minnie<span class="synSpecial">)</span>
<span class="synSpecial">(</span>married Mickey Minnie<span class="synSpecial">)</span>
<span class="synSpecial">(</span>married Mickey Minnie<span class="synSpecial">)</span>
<span class="synSpecial">(</span>married Mickey Minnie<span class="synSpecial">)</span>
<span class="synSpecial">(</span>married Mickey Minnie<span class="synSpecial">)</span>
<span class="synSpecial">(</span>married Mickey Minnie<span class="synSpecial">)</span>
<span class="synSpecial">(</span>married Mickey Minnie<span class="synSpecial">)</span>
<span class="synSpecial">(</span>married Mickey Minnie<span class="synSpecial">)</span>
<span class="synSpecial">(</span>married Mickey Minnie<span class="synSpecial">)</span>
<span class="synSpecial">(</span>married Mickey Minnie<span class="synSpecial">)</span>
...
</pre>




<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; delayなしの場合</span>
<span class="synComment">;;; Query input:</span>
<span class="synSpecial">(</span>assert! <span class="synSpecial">(</span>married Minnie Mickey<span class="synSpecial">))</span>

Assertion added to data base.

<span class="synComment">;;; Query input:</span>
<span class="synSpecial">(</span>assert! <span class="synSpecial">(</span>rule <span class="synSpecial">(</span>married ?x ?y<span class="synSpecial">)</span>
               <span class="synSpecial">(</span>married ?y ?x<span class="synSpecial">)))</span>

Assertion added to data base.

<span class="synComment">;;; Query input:</span>
<span class="synSpecial">(</span>married Mickey ?x<span class="synSpecial">)</span>


</pre>


<p>;;; Query result:
の表示も出てこない</p>

