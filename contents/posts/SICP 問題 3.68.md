---
title: "SICP 問題 3.68"
published: 2015/12/15
tags:
  - scheme
  - SICP
---

<p>元のpairsと違ってcons-streamを使っていないためdelayされないので無限ループになる．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>pairs s t<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>interleave
   <span class="synSpecial">(</span>stream-map <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span>stream-car s<span class="synSpecial">)</span> x<span class="synSpecial">))</span>
               t<span class="synSpecial">)</span>
   <span class="synSpecial">(</span>pairs <span class="synSpecial">(</span>stream-cdr s<span class="synSpecial">)</span> <span class="synSpecial">(</span>stream-cdr t<span class="synSpecial">))))</span>
</pre>


