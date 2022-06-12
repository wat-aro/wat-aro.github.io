---
title: "SICP 問題 2.37"
published: 2015/10/21
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>dot-product v w<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>accumulate <span class="synIdentifier">+</span> <span class="synConstant">0</span> <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synIdentifier">*</span> v w<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>matrix-*-vector m v<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span>dot-product x v<span class="synSpecial">))</span> m<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>transpose mat<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>accumulate-n <span class="synIdentifier">cons</span> nil mat<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>matrix-*-matrix m n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>cols <span class="synSpecial">(</span>transpose n<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>matrix-*-vector cols x<span class="synSpecial">))</span>
         m<span class="synSpecial">)))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (matrix-*-vector &#39;((1 2)
                        (3 4))
                      &#39;(5 6))
(17 39)
gosh&gt; (dot-product &#39;(1 2) &#39;(3 4))
11
gosh&gt; (matrix-*-vector &#39;((1 2)
                        (3 4))
                      &#39;(5 6))
(17 39)
gosh&gt; (matrix-*-matrix &#39;((1 2 3)
                         (4 5 6))
                       &#39;((7 10)
                         (8 11)
                         (9 12)))
((50 68) (122 167))</pre>


