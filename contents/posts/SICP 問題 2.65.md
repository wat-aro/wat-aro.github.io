---
title: "SICP 問題 2.65"
published: 2015/10/27
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>union-tree s t<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>list-&gt;tree
   <span class="synSpecial">(</span>union-set <span class="synSpecial">(</span>tree-&gt;list-2 s<span class="synSpecial">)</span>
              <span class="synSpecial">(</span>tree-&gt;list-2 t<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>intersection-tree s t<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>list-&gt;tree
   <span class="synSpecial">(</span>intersection-set-local <span class="synSpecial">(</span>tree-&gt;list-2 s<span class="synSpecial">)</span>
                           <span class="synSpecial">(</span>tree-&gt;list-2 t<span class="synSpecial">))))</span>
</pre>


