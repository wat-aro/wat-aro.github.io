---
title: "SICP 問題 3.81"
published: 2015/12/17
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span>use srfi-19<span class="synSpecial">)</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>rand-update x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">modulo</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> x <span class="synConstant">1103515245</span><span class="synSpecial">)</span> <span class="synConstant">12345</span><span class="synSpecial">)</span> <span class="synConstant">2147483647</span><span class="synSpecial">))</span>

<span class="synComment">;; 命令のストリームを引数にとる</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>rand stream<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>randoming s<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">number?</span> s<span class="synSpecial">)</span>
        <span class="synSpecial">(</span>random-update <span class="synSpecial">(</span>time-nanosecond <span class="synSpecial">(</span>current-time<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span>random-update s<span class="synSpecial">)))</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> random-stream
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>stream-null? stream<span class="synSpecial">)</span>
        the-empty-stream
        <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>s1 <span class="synSpecial">(</span>stream-car stream<span class="synSpecial">)))</span>
          <span class="synSpecial">(</span>cons-stream <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">number?</span> s1<span class="synSpecial">)</span>
                           <span class="synSpecial">(</span>rand-update s1<span class="synSpecial">)</span>
                           <span class="synSpecial">(</span>rand-update <span class="synSpecial">(</span>time-nanosecond <span class="synSpecial">(</span>current-time<span class="synSpecial">))))</span>
                       <span class="synSpecial">(</span>stream-map randoming
                                   random-stream<span class="synSpecial">)))))</span>
  random-stream<span class="synSpecial">)</span>
</pre>


