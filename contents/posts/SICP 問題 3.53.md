---
title: "SICP 問題 3.53"
published: 2015/12/09
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>add-streams s1 s2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>stream-map <span class="synIdentifier">+</span> s1 s2<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> s <span class="synSpecial">(</span>cons-stream <span class="synConstant">1</span> <span class="synSpecial">(</span>add-streams s s<span class="synSpecial">)))</span>
</pre>


<p>sは2のn乗のストリームを作る．</p>

