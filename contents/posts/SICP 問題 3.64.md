---
title: "SICP 問題 3.64"
published: 2015/12/11
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>sqrt-improve guess x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>average guess <span class="synSpecial">(</span><span class="synIdentifier">/</span> x guess<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>average x y<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">/</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> x y<span class="synSpecial">)</span> <span class="synConstant">2</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>stream-limit s tolerance<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>s1 <span class="synSpecial">(</span>stream-car s<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>s2 <span class="synSpecial">(</span>stream-car <span class="synSpecial">(</span>stream-cdr s<span class="synSpecial">))))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">&gt;</span> tolerance <span class="synSpecial">(</span><span class="synIdentifier">abs</span> <span class="synSpecial">(</span><span class="synIdentifier">-</span> s1 s2<span class="synSpecial">)))</span>
        s2
        <span class="synSpecial">(</span>stream-limit <span class="synSpecial">(</span>stream-cdr s<span class="synSpecial">)</span> tolerance<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">sqrt</span> x tolerance<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>stream-limit <span class="synSpecial">(</span>sqrt-stream x<span class="synSpecial">)</span> tolerance<span class="synSpecial">))</span>
</pre>




<pre class="code" data-lang="" data-unlink>1.4142156862745097
gosh&gt; (sqrt 2 0.0001)
1.4142135623746899</pre>


