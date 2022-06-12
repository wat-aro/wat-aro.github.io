---
title: "SICP 問題 2.69"
published: 2015/10/27
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>generate-huffman-tree pairs<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>successive-merge <span class="synSpecial">(</span>make-leaf-set pairs<span class="synSpecial">)))</span>

<span class="synComment">;; pairsは昇順に並んでいるので先頭の2要素をmake-code-pairsする．</span>
<span class="synComment">;; それを(cddr pairs)にadjoin-setすればまた昇順に並んだpairsができるのでそれを繰り返す．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>successive-merge pairs<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> pairs<span class="synSpecial">))</span>
      <span class="synSpecial">(</span><span class="synIdentifier">car</span> pairs<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>successive-merge <span class="synSpecial">(</span>adjoin-set <span class="synSpecial">(</span>make-code-pairs <span class="synSpecial">(</span><span class="synIdentifier">car</span> pairs<span class="synSpecial">)</span>
                                                     <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> pairs<span class="synSpecial">))</span>
                                    <span class="synSpecial">(</span><span class="synIdentifier">cddr</span> pairs<span class="synSpecial">)))))</span>
</pre>


