---
title: "SICP 問題 2.83"
published: 2015/11/01
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>raise x<span class="synSpecial">)</span> <span class="synSpecial">(</span>apply-generic <span class="synSpecial">'</span>raise x<span class="synSpecial">))</span>

<span class="synComment">;; scheme-numberパッケージで</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>scheme-number-&gt;rational n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>make-rational n <span class="synConstant">1</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span>put <span class="synSpecial">'</span>raise <span class="synSpecial">'</span>scheme-number scheme-number-&gt;rational<span class="synSpecial">)</span>

<span class="synComment">;; rationalパッケージで</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>rational-&gt;real x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">/</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> <span class="synConstant">1.0</span> <span class="synSpecial">(</span>numer x<span class="synSpecial">))</span> <span class="synSpecial">(</span>denom x<span class="synSpecial">)))</span>
<span class="synSpecial">(</span>put <span class="synSpecial">'</span>raise <span class="synSpecial">'</span>rational rational-&gt;real<span class="synSpecial">)</span>

<span class="synComment">;; real-numberパッケージで</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>real-&gt;complex<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>make-complex-from-real-imag x <span class="synConstant">0</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span>put <span class="synSpecial">'</span>raise <span class="synSpecial">'</span>real-number real-&gt;complex<span class="synSpecial">)</span>
</pre>


