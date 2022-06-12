---
title: "SICP 問題 3.72"
published: 2015/12/16
tags:
  - scheme
  - SICP
---

<p>sum-squareのところで間違えて立方数をたしていたせいで，<br/>
　</p>

<pre class="code" data-lang="" data-unlink>gosh&gt; (stream-ref triple-way-sum-square-number 0)
87539319</pre>


<p>って出てきて驚きました．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>sum-square x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>a <span class="synSpecial">(</span><span class="synIdentifier">car</span> x<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>b <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> x<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> a a<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> b b<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>triple-way-sum-square stream<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>s1 <span class="synSpecial">(</span>stream-car stream<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>s2 <span class="synSpecial">(</span>stream-car <span class="synSpecial">(</span>stream-cdr stream<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span>s3 <span class="synSpecial">(</span>stream-car <span class="synSpecial">(</span>stream-cdr <span class="synSpecial">(</span>stream-cdr stream<span class="synSpecial">)))))</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>w1 <span class="synSpecial">(</span>sum-square s1<span class="synSpecial">))</span>
          <span class="synSpecial">(</span>w2 <span class="synSpecial">(</span>sum-square s2<span class="synSpecial">))</span>
          <span class="synSpecial">(</span>w3 <span class="synSpecial">(</span>sum-square s3<span class="synSpecial">)))</span>
      <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">=</span> w1 w2 w3<span class="synSpecial">)</span>
             <span class="synSpecial">(</span>cons-stream w1
                          <span class="synSpecial">(</span>triple-way-sum-square
                           <span class="synSpecial">(</span>stream-cdr <span class="synSpecial">(</span>stream-cdr stream<span class="synSpecial">)))))</span>
            <span class="synSpecial">(</span><span class="synStatement">else</span>
             <span class="synSpecial">(</span>triple-way-sum-square <span class="synSpecial">(</span>stream-cdr stream<span class="synSpecial">)))))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> triple-way-sum-square-number
  <span class="synSpecial">(</span>triple-way-sum-square <span class="synSpecial">(</span>weighted-pairs integers integers sum-square<span class="synSpecial">)))</span>
</pre>


<p>gosh> (stream-head triple-way-sum-square-number 20)
325
425
650
725
845
850
925
1025
1105
1250
1300
1325
1445
1450
1525
1625
1690
1700
1825
1850
done</p>

