---
title: "SICP 問題 3.67"
published: 2015/12/15
tags:
  - scheme
  - SICP
---

<p>二通りやってみました．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; interleave</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>pairs s t<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>cons-stream
   <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span>stream-car s<span class="synSpecial">)</span> <span class="synSpecial">(</span>stream-car t<span class="synSpecial">))</span>
   <span class="synSpecial">(</span>interleave
    <span class="synSpecial">(</span>interleave <span class="synSpecial">(</span>stream-map <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span>stream-car s<span class="synSpecial">)</span> x<span class="synSpecial">))</span>
                            <span class="synSpecial">(</span>stream-cdr t<span class="synSpecial">))</span>
                <span class="synSpecial">(</span>stream-map <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> x <span class="synSpecial">(</span>stream-car s<span class="synSpecial">)))</span>
                            <span class="synSpecial">(</span>stream-cdr t<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span>pairs <span class="synSpecial">(</span>stream-cdr s<span class="synSpecial">)</span> <span class="synSpecial">(</span>stream-cdr t<span class="synSpecial">)))))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (stream-head (pairs integers integers) 20)
(1 1)
(1 2)
(2 2)
(2 1)
(2 3)
(1 3)
(3 3)
(3 1)
(3 2)
(1 4)
(3 4)
(4 1)
(2 4)
(1 5)
(4 4)
(5 1)
(4 2)
(1 6)
(4 3)
(6 1)
done</pre>




<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; 三つのストリームを混ぜるinterleave</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>interleave3 s1 s2 s3<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>stream-null? s1<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>interleave s2 s3<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>cons-stream <span class="synSpecial">(</span>stream-car s1<span class="synSpecial">)</span>
                   <span class="synSpecial">(</span>interleave3 s2 s3 <span class="synSpecial">(</span>stream-cdr s1<span class="synSpecial">)))))</span>

<span class="synComment">;; interleave3を使う</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>pairs s t<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>cons-stream
   <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span>stream-car s<span class="synSpecial">)</span> <span class="synSpecial">(</span>stream-car t<span class="synSpecial">))</span>
   <span class="synSpecial">(</span>interleave3
    <span class="synSpecial">(</span>stream-map <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span>stream-car s<span class="synSpecial">)</span> x<span class="synSpecial">))</span>
                <span class="synSpecial">(</span>stream-cdr t<span class="synSpecial">))</span>
    <span class="synSpecial">(</span>stream-map <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> x <span class="synSpecial">(</span>stream-car s<span class="synSpecial">)))</span>
                <span class="synSpecial">(</span>stream-cdr t<span class="synSpecial">))</span>
    <span class="synSpecial">(</span>pairs <span class="synSpecial">(</span>stream-cdr s<span class="synSpecial">)</span> <span class="synSpecial">(</span>stream-cdr t<span class="synSpecial">)))))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (stream-head (pairs integers integers) 20)
(1 1)
(1 2)
(2 1)
(2 2)
(1 3)
(3 1)
(2 3)
(1 4)
(4 1)
(3 2)
(1 5)
(5 1)
(3 3)
(1 6)
(6 1)
(2 4)
(1 7)
(7 1)
(4 2)
(1 8)
done</pre>


