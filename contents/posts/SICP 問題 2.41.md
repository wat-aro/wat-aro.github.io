---
title: "SICP 問題 2.41"
published: 2015/10/22
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>equal-sum-of-unique-trio n s<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">filter</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>l<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> s <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> l<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> l<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">caddr</span> l<span class="synSpecial">))))</span>
          <span class="synSpecial">(</span>flatmap
           <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>i<span class="synSpecial">)</span>
             <span class="synSpecial">(</span>flatmap <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>j<span class="synSpecial">)</span>
                        <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>k<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> i j k<span class="synSpecial">))</span>
                             <span class="synSpecial">(</span>enumerate-interval <span class="synConstant">1</span> <span class="synSpecial">(</span><span class="synIdentifier">-</span> j <span class="synConstant">1</span><span class="synSpecial">))))</span>
                      <span class="synSpecial">(</span>enumerate-interval <span class="synConstant">1</span> <span class="synSpecial">(</span><span class="synIdentifier">-</span> i <span class="synConstant">1</span><span class="synSpecial">))))</span>
           <span class="synSpecial">(</span>enumerate-interval <span class="synConstant">1</span> n<span class="synSpecial">))))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (equal-sum-of-unique-trio 10 20)
((8 7 5) (9 6 5) (9 7 4) (9 8 3) (10 6 4) (10 7 3) (10 8 2) (10 9 1))</pre>


