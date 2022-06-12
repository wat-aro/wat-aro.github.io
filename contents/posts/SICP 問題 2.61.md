---
title: "SICP 問題 2.61"
published: 2015/10/26
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>adjoin-set x s<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> s<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> x<span class="synSpecial">))</span>
        <span class="synSpecial">((</span><span class="synIdentifier">=</span> x <span class="synSpecial">(</span><span class="synIdentifier">car</span> s<span class="synSpecial">))</span> s<span class="synSpecial">)</span>
        <span class="synSpecial">((</span><span class="synIdentifier">&lt;</span> x <span class="synSpecial">(</span><span class="synIdentifier">car</span> s<span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> x s<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> s<span class="synSpecial">)</span> <span class="synSpecial">(</span>adjoin-set x <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> s<span class="synSpecial">))))))</span>

<span class="synComment">;; 同じ数字，またはxより大きい数字が出てきた時点で計算が終わるので順序付けられない表現に比べ半分のステップ数ですむ．</span>
</pre>


