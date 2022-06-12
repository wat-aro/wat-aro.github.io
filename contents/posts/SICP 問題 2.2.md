---
title: "SICP 問題 2.2"
published: 2015/10/10
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-segment start end<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">cons</span> start end<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>start-segment seg<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">car</span> seg<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>end-segment seg<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> seg<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-point x y<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">cons</span> x y<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>x-point point<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">car</span> point<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>y-point point<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> point<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>midpoint-segment seg<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>s-seg <span class="synSpecial">(</span>start-segment seg<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>e-seg <span class="synSpecial">(</span>end-segment seg<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span>make-point <span class="synSpecial">(</span><span class="synIdentifier">/</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span>x-point s-seg<span class="synSpecial">)</span>
                      <span class="synSpecial">(</span>x-point e-seg<span class="synSpecial">))</span>
                   <span class="synConstant">2</span><span class="synSpecial">)</span>
                <span class="synSpecial">(</span><span class="synIdentifier">/</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span>y-point s-seg<span class="synSpecial">)</span>
                      <span class="synSpecial">(</span>y-point e-seg<span class="synSpecial">))</span>
                   <span class="synConstant">2</span><span class="synSpecial">))))</span>
</pre>


<p>　  <br/>
　　　<br/>
　　　<br/>
印字用手続きで確かめてみる.</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>print-point p<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">newline</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">display</span> <span class="synConstant">&quot;(&quot;</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">display</span> <span class="synSpecial">(</span>x-point p<span class="synSpecial">))</span>
  <span class="synSpecial">(</span><span class="synIdentifier">display</span> <span class="synConstant">&quot;,&quot;</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">display</span> <span class="synSpecial">(</span>y-point p<span class="synSpecial">))</span>
  <span class="synSpecial">(</span><span class="synIdentifier">display</span> <span class="synConstant">&quot;)&quot;</span><span class="synSpecial">))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (define my-segment (make-segment &#39;(0 . 0) &#39;(2 . 2)))
my-segment
gosh&gt; (cdr my-segment)
(2 . 2)
gosh&gt; (car my-segment)
(0 . 0)
gosh&gt; (print-point my-segment)

((0 . 0),(2 . 2))#&lt;undef&gt;
gosh&gt; (print-point (midpoint-segment my-segment))

(1,1)#&lt;undef&gt;</pre>


