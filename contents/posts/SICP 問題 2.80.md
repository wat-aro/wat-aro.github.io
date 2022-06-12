---
title: "SICP 問題 2.80"
published: 2015/10/31
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>=zero? x<span class="synSpecial">)</span> <span class="synSpecial">(</span>apply-generic <span class="synSpecial">'</span>=zero? x y<span class="synSpecial">))</span>

<span class="synComment">;; scheme-numberパッケージに追加</span>
<span class="synSpecial">(</span>put <span class="synSpecial">'</span>=zero? <span class="synSpecial">'(</span>scheme-number<span class="synSpecial">)</span>
     <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> x <span class="synConstant">0</span><span class="synSpecial">)))</span>

<span class="synComment">;; rationalパッケージに追加</span>
<span class="synSpecial">(</span>put <span class="synSpecial">'</span>=zero? <span class="synSpecial">'(</span>rational<span class="synSpecial">)</span>
     <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> <span class="synSpecial">(</span>numer x<span class="synSpecial">)</span> <span class="synConstant">0</span><span class="synSpecial">)))</span>

<span class="synComment">;; complexパッケージに追加</span>
<span class="synSpecial">(</span>put <span class="synSpecial">'</span>=zero? <span class="synSpecial">'(</span>complex<span class="synSpecial">)</span>
     <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> <span class="synConstant">0</span> <span class="synSpecial">(</span><span class="synIdentifier">real-part</span> x<span class="synSpecial">))</span>
                      <span class="synSpecial">(</span><span class="synIdentifier">=</span> <span class="synConstant">0</span> <span class="synSpecial">(</span><span class="synIdentifier">imag-part</span> x<span class="synSpecial">)))))</span>
</pre>


