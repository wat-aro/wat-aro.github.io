---
title: "SICP 問題 3.71"
published: 2015/12/16
tags:
  - scheme
  - SICP
---

<p>問題文通りに．<br/>
<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%E9%A5%DE%A5%CC%A5%B8%A5%E3%A5%F3">ラマヌジャン</a>数のストリームを作る．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>sum-cube x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>a <span class="synSpecial">(</span><span class="synIdentifier">car</span> x<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>b <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> x<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> a a a<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> b b b<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>ramanujan stream<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>s1 <span class="synSpecial">(</span>stream-car stream<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>s2 <span class="synSpecial">(</span>stream-car <span class="synSpecial">(</span>stream-cdr stream<span class="synSpecial">))))</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>weight1 <span class="synSpecial">(</span>sum-cube s1<span class="synSpecial">))</span>
          <span class="synSpecial">(</span>weight2 <span class="synSpecial">(</span>sum-cube s2<span class="synSpecial">)))</span>
      <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">=</span> weight1 weight2<span class="synSpecial">)</span>
             <span class="synSpecial">(</span>cons-stream weight1
                          <span class="synSpecial">(</span>ramanujan <span class="synSpecial">(</span>stream-cdr stream<span class="synSpecial">))))</span>
            <span class="synSpecial">(</span><span class="synStatement">else</span>
             <span class="synSpecial">(</span>ramanujan <span class="synSpecial">(</span>stream-cdr stream<span class="synSpecial">)))))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> ramanujan-number
  <span class="synSpecial">(</span>ramanujan <span class="synSpecial">(</span>weighted-pairs integers integers sum-cube<span class="synSpecial">)))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (stream-head ramanujan-number 6)
1729
4104
13832
20683
32832
39312
done</pre>


