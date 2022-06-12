---
title: "SICP 問題 3.78"
published: 2015/12/17
tags:
  - scheme
  - SICP
---

<p>問題文のまま</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>solve-2nd a b dt y0 dy0<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> y <span class="synSpecial">(</span>integral <span class="synSpecial">(</span><span class="synStatement">delay</span> dy<span class="synSpecial">)</span> y0 dt<span class="synSpecial">))</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> dy <span class="synSpecial">(</span>integral <span class="synSpecial">(</span><span class="synStatement">delay</span> ddy<span class="synSpecial">)</span> dy0 dt<span class="synSpecial">))</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> ddy <span class="synSpecial">(</span>add-streams <span class="synSpecial">(</span>scale-stream dy a<span class="synSpecial">)</span>
                           <span class="synSpecial">(</span>scale-stream y b<span class="synSpecial">)))</span>
  y<span class="synSpecial">)</span>
</pre>


