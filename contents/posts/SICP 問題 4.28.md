---
title: "SICP 問題 4.28"
published: 2016/01/07
tags:
  - scheme
  - SICP
---

<p>引数に手続きをとる手続きを考える．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>foo bar<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>bar <span class="synSpecial">'</span>a<span class="synSpecial">))</span>
</pre>


<p>引数はすべてthunkなので<code>(bar 'a)</code>でbarをevalしても手続きとならない．
applyでoperatorをactual-valueを使わないと手続きを引数に取る場合に困る．</p>

