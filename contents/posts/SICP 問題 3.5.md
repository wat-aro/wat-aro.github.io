---
title: "SICP 問題 3.5"
published: 2015/11/06
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span>use srfi-27<span class="synSpecial">)</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>random-in-range low high<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>range <span class="synSpecial">(</span><span class="synIdentifier">-</span> high low<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synIdentifier">+</span> low <span class="synSpecial">(</span><span class="synIdentifier">*</span> <span class="synSpecial">(</span>random-real<span class="synSpecial">)</span> range<span class="synSpecial">))))</span>
<span class="synComment">;; 問題分には(+ low (random range))となっている．</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>estimate-integral P x1 x2 y1 y2 trials<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>x-length <span class="synSpecial">(</span><span class="synIdentifier">-</span> x2 x1<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>y-length <span class="synSpecial">(</span><span class="synIdentifier">-</span> y2 y1<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>square-area <span class="synSpecial">(</span><span class="synIdentifier">*</span> x-length y-length<span class="synSpecial">)))</span>
      <span class="synSpecial">(</span><span class="synIdentifier">*</span> square-area <span class="synSpecial">(</span>monte-carlo trials
                                  <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">()</span> <span class="synSpecial">(</span>P <span class="synSpecial">(</span>random-in-range x1 x2<span class="synSpecial">)</span>
                                                <span class="synSpecial">(</span>random-in-range y1 y2<span class="synSpecial">))))))))</span>

<span class="synSpecial">(</span>estimate-integral <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x y<span class="synSpecial">)</span>
                           <span class="synSpecial">(</span><span class="synIdentifier">&lt;=</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span>square x<span class="synSpecial">)</span> <span class="synSpecial">(</span>square y<span class="synSpecial">))</span> <span class="synConstant">1</span><span class="synSpecial">))</span>
                   <span class="synConstant">-1.0</span> <span class="synConstant">1.0</span> <span class="synConstant">-1.0</span> <span class="synConstant">1.0</span> <span class="synConstant">10000</span><span class="synSpecial">)</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; 3.1436</pre>


<p><code>estimate-integral</code>の中で<code>(random-in-range x1 x2)</code>と<code>(random-in-range x1 x2)</code>をletで束縛して<code>monte-carlo</code>に渡していたためなかなかうまくいきまんでした．</p>

