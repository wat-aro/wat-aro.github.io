---
title: "SICP 問題 2.49"
published: 2015/10/24
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; a</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>outline-painter frame<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let*</span> <span class="synSpecial">((</span>v00 <span class="synSpecial">(</span>make-vect <span class="synConstant">0</span> <span class="synConstant">0</span><span class="synSpecial">))</span>
         <span class="synSpecial">(</span>v01 <span class="synSpecial">(</span>make-vect <span class="synConstant">0</span> <span class="synConstant">1</span><span class="synSpecial">))</span>
         <span class="synSpecial">(</span>v10 <span class="synSpecial">(</span>make-vect <span class="synConstant">1</span> <span class="synConstant">0</span><span class="synSpecial">))</span>
         <span class="synSpecial">(</span>v11 <span class="synSpecial">(</span>make-vect <span class="synConstant">1</span> <span class="synConstant">1</span><span class="synSpecial">)))</span>
    <span class="synSpecial">((</span>segments-&gt;painter <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span>make-segment v00 v01<span class="synSpecial">)</span>
                              <span class="synSpecial">(</span>make-segment v00 v10<span class="synSpecial">)</span>
                              <span class="synSpecial">(</span>make-segment v10 v01<span class="synSpecial">)</span>
                              <span class="synSpecial">(</span>make-segment v01 v10<span class="synSpecial">)))</span>
     frame<span class="synSpecial">)))</span>

<span class="synComment">;; b</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>x-painter frame<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let*</span> <span class="synSpecial">((</span>v00 <span class="synSpecial">(</span>make-vect <span class="synConstant">0</span> <span class="synConstant">0</span><span class="synSpecial">))</span>
         <span class="synSpecial">(</span>v01 <span class="synSpecial">(</span>make-vect <span class="synConstant">0</span> <span class="synConstant">1</span><span class="synSpecial">))</span>
         <span class="synSpecial">(</span>v11 <span class="synSpecial">(</span>make-vect <span class="synConstant">1</span> <span class="synConstant">1</span><span class="synSpecial">))</span>
         <span class="synSpecial">(</span>v10 <span class="synSpecial">(</span>make-vect <span class="synConstant">1</span> <span class="synConstant">0</span><span class="synSpecial">)))</span>
    <span class="synSpecial">((</span>segments-&gt;painter <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span>make-segment v00 v11<span class="synSpecial">)</span>
                              <span class="synSpecial">(</span>make-segment v01 v10<span class="synSpecial">)))</span>
     frame<span class="synSpecial">)))</span>

<span class="synComment">;; c</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>Rhombus-painter frame<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let*</span> <span class="synSpecial">((</span>va <span class="synSpecial">(</span>make-vect <span class="synConstant">0.5</span> <span class="synConstant">0</span><span class="synSpecial">))</span>
         <span class="synSpecial">(</span>vb <span class="synSpecial">(</span>make-vect <span class="synConstant">1</span> <span class="synConstant">0.5</span><span class="synSpecial">))</span>
         <span class="synSpecial">(</span>vc <span class="synSpecial">(</span>make-vect <span class="synConstant">0.5</span> <span class="synConstant">1</span><span class="synSpecial">))</span>
         <span class="synSpecial">(</span>vd <span class="synSpecial">(</span>make-vect <span class="synConstant">0</span> <span class="synConstant">0.5</span><span class="synSpecial">)))</span>
    <span class="synSpecial">((</span>segments-&gt;painter <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span>make-segment va vb<span class="synSpecial">)</span>
                              <span class="synSpecial">(</span>make-segment vb vc<span class="synSpecial">)</span>
                              <span class="synSpecial">(</span>make-segment vc vd<span class="synSpecial">)</span>
                              <span class="synSpecial">(</span>make-segment vd va<span class="synSpecial">)))</span>
     frame<span class="synSpecial">)))</span>

<span class="synComment">;; d</span>
<span class="synComment">;;  パス</span>
</pre>


