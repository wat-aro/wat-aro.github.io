---
title: "SICP 問題 2.87"
published: 2015/11/04
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; polynominal-package</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>=zero? p<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">=</span> <span class="synConstant">0</span> <span class="synSpecial">(</span>coeff p<span class="synSpecial">)))</span>

<span class="synSpecial">(</span>put <span class="synSpecial">'</span>=zero? <span class="synSpecial">'(</span>polynominal<span class="synSpecial">)</span>
     <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>p<span class="synSpecial">)</span> <span class="synSpecial">(</span>=zero? p<span class="synSpecial">)))</span>
</pre>


