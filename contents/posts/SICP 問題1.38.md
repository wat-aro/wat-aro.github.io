---
title: "SICP 問題1.38"
published: 2015/10/08
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>e-2 k<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>cont-frac <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>i<span class="synSpecial">)</span> <span class="synConstant">1.0</span><span class="synSpecial">)</span>
             <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>i<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> <span class="synSpecial">(</span><span class="synIdentifier">modulo</span> i <span class="synConstant">3</span><span class="synSpecial">)</span> <span class="synConstant">2</span><span class="synSpecial">)</span>
                             <span class="synSpecial">(</span><span class="synIdentifier">*</span> <span class="synConstant">2</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synConstant">1</span> <span class="synSpecial">(</span><span class="synIdentifier">quotient</span> i <span class="synConstant">3</span><span class="synSpecial">)))</span>
                             <span class="synConstant">1.0</span><span class="synSpecial">))</span>
             k<span class="synSpecial">))</span>
</pre>


