---
title: "SICP 問題 2.3"
published: 2015/10/10
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; 長方形を高さと幅で定義</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-rectangle height width<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">cons</span> height width<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>perimeter-rect rect<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> <span class="synConstant">2</span> <span class="synSpecial">(</span>height-rect rect<span class="synSpecial">))</span>
     <span class="synSpecial">(</span><span class="synIdentifier">*</span> <span class="synConstant">2</span> <span class="synSpecial">(</span>width-rect rect<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>area-rect rect<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">*</span> <span class="synSpecial">(</span>height-rect rect<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>width-rect rect<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>height-rect rect<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">car</span> rect<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>width-rect rect<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> rect<span class="synSpecial">))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (define r1 (make-rectangle 10 5))
r1
gosh&gt; (perimeter-rect r1)
30
gosh&gt; (area-rect r1)
50</pre>


<p>　<br/>
　</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; 長方形を対角の二点によって定義</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-rect p1 p2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">cons</span> p1 p2<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>point-1 rect<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">car</span> rect<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>point-2 rect<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> rect<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>height-rect rect<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">abs</span> <span class="synSpecial">(</span><span class="synIdentifier">-</span> <span class="synSpecial">(</span>y-point <span class="synSpecial">(</span>point-1 rect<span class="synSpecial">))</span>
          <span class="synSpecial">(</span>y-point <span class="synSpecial">(</span>point-2 rect<span class="synSpecial">)))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>width-rect rect<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">abs</span> <span class="synSpecial">(</span><span class="synIdentifier">-</span> <span class="synSpecial">(</span>x-point <span class="synSpecial">(</span>point-1 rect<span class="synSpecial">))</span>
          <span class="synSpecial">(</span>x-point <span class="synSpecial">(</span>point-2 rect<span class="synSpecial">)))))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (define r2 (make-rect (make-point 0 0) (make-point 10 5)))
r2
gosh&gt; (perimeter-rect r2)
30
gosh&gt; (area-rect r2)
50</pre>


