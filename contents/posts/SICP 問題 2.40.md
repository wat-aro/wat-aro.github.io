---
title: "SICP 問題 2.40"
published: 2015/10/22
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>unique-pairs n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>flatmap
   <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>i<span class="synSpecial">)</span>
     <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>j<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> i j<span class="synSpecial">))</span>
          <span class="synSpecial">(</span>enumerate-interval <span class="synConstant">1</span> <span class="synSpecial">(</span><span class="synIdentifier">-</span> i <span class="synConstant">1</span><span class="synSpecial">))))</span>
   <span class="synSpecial">(</span>enumerate-interval <span class="synConstant">1</span> n<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>prime-sum-pairs n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">map</span> make-pair-sum
       <span class="synSpecial">(</span><span class="synIdentifier">filter</span> prime-sum?
               <span class="synSpecial">(</span>unique-pairs n<span class="synSpecial">))))</span>
</pre>


