---
title: "SICP 問題1.39"
published: 2015/10/08
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>tan-cf x k<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>cont-frac <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>i<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> i <span class="synConstant">1</span><span class="synSpecial">)</span> x <span class="synSpecial">(</span><span class="synIdentifier">-</span> <span class="synSpecial">(</span>square x<span class="synSpecial">))))</span>
             <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>i<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">-</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> <span class="synConstant">2.0</span> i<span class="synSpecial">)</span> <span class="synConstant">1.0</span><span class="synSpecial">))</span>
             k<span class="synSpecial">))</span>
</pre>


