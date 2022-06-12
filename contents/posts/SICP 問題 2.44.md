---
title: "SICP 問題 2.44"
published: 2015/10/23
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>up-split painter n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> n <span class="synConstant">0</span><span class="synSpecial">)</span>
      painter
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>smaller <span class="synSpecial">(</span>up-split painter <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">1</span><span class="synSpecial">))))</span>
        <span class="synSpecial">(</span>below painter <span class="synSpecial">(</span>beside smaller smaller<span class="synSpecial">)))))</span>
</pre>


