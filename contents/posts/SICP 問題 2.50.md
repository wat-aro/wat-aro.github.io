---
title: "SICP 問題 2.50"
published: 2015/10/24
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>flip-horiz painter<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>transform-painter painter
                     <span class="synSpecial">(</span>make-vect <span class="synConstant">1.0</span> <span class="synConstant">0.0</span><span class="synSpecial">)</span>
                     <span class="synSpecial">(</span>make-vect <span class="synConstant">0.0</span> <span class="synConstant">0.0</span><span class="synSpecial">)</span>
                     <span class="synSpecial">(</span>make-vect <span class="synConstant">1.0</span> <span class="synConstant">1.0</span><span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>rotate180 painter<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>transform-painter painter
                     <span class="synSpecial">(</span>make-vect <span class="synConstant">1.0</span> <span class="synConstant">1.0</span><span class="synSpecial">)</span>
                     <span class="synSpecial">(</span>make-vect <span class="synConstant">0.0</span> <span class="synConstant">1.0</span><span class="synSpecial">)</span>
                     <span class="synSpecial">(</span>make-vect <span class="synConstant">1.0</span> <span class="synConstant">0.0</span><span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>rotate270 paitner<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>transform-painter painter
                     <span class="synSpecial">(</span>make-vect <span class="synConstant">0.0</span> <span class="synConstant">1.0</span><span class="synSpecial">)</span>
                     <span class="synSpecial">(</span>make-vect <span class="synConstant">0.0</span> <span class="synConstant">0.0</span><span class="synSpecial">)</span>
                     <span class="synSpecial">(</span>make-vect <span class="synConstant">1.0</span> <span class="synConstant">1.0</span><span class="synSpecial">)))</span>

</pre>


