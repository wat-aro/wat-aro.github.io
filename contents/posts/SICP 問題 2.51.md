---
title: "SICP 問題 2.51"
published: 2015/10/24
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>below painter1 painter2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let*</span> <span class="synSpecial">((</span>split-point <span class="synSpecial">(</span>make-vect <span class="synConstant">0.0</span> <span class="synConstant">0.5</span><span class="synSpecial">))</span>
         <span class="synSpecial">(</span>paint-bottom <span class="synSpecial">(</span>transform-painter painter1
                                          <span class="synSpecial">(</span>make-vect <span class="synConstant">0.0</span> <span class="synConstant">0.0</span><span class="synSpecial">)</span>
                                          <span class="synSpecial">(</span>make-vect <span class="synConstant">1.0</span> <span class="synConstant">0.0</span><span class="synSpecial">)</span>
                                          split-point<span class="synSpecial">))</span>
         <span class="synSpecial">(</span>paint-upper <span class="synSpecial">(</span>transform-painter painter2
                                         split-point
                                         <span class="synSpecial">(</span>make-vect <span class="synConstant">1.0</span> <span class="synConstant">0.5</span><span class="synSpecial">)</span>
                                         <span class="synConstant">0.0</span> <span class="synConstant">1.0</span><span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>frame<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>paint-bottom<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>paint-upper<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>below painter1 painter2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>frame<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>rotate270 <span class="synSpecial">(</span>beside <span class="synSpecial">(</span>rotate90 painter2<span class="synSpecial">)</span>
                       <span class="synSpecial">(</span>rotate90 painter1<span class="synSpecial">)))))</span>
</pre>


