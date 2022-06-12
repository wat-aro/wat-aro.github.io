---
title: "SICP 問題 2.31"
published: 2015/10/20
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>tree-map fn tree<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>sub-tree<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">pair?</span> sub-tree<span class="synSpecial">)</span>
             <span class="synSpecial">(</span>tree-map fn sub-tree<span class="synSpecial">)</span>
             <span class="synSpecial">(</span>fn sub-tree<span class="synSpecial">)))</span>
       tree<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>sqaure x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">*</span> x x<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>square-tree tree<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>tree-map square tree<span class="synSpecial">))</span>
</pre>


