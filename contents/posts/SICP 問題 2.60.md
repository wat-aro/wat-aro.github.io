---
title: "SICP 問題 2.60"
published: 2015/10/26
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; element-of-set? intersection-setはそのまま</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>adjoin-set x s<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">cons</span> x s<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>union-set s t<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">append</span> s t<span class="synSpecial">))</span>

<span class="synComment">;; element-of-set?やintersection-setについてはsetの中身が増えることで比較回数が増えて効率は下がる．</span>
<span class="synComment">;; adjoin-set union-setについては条件分岐がなくなるので効率がよくなる．</span>
</pre>


