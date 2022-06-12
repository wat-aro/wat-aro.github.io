---
title: "SICP 問題 3.62"
published: 2015/12/10
tags:
  - scheme
  - SICP
---

<p>二つのべき<a class="keyword" href="http://d.hatena.ne.jp/keyword/%B5%E9%BF%F4">級数</a>を割る手続きdiv-stream</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>div-stream s1 s2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> s2 <span class="synConstant">0</span><span class="synSpecial">)</span>
      <span class="synSpecial">(</span>error <span class="synConstant">&quot;ZERO-DIVISOR&quot;</span> s2<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>mul-streams s1
                   <span class="synSpecial">(</span>invert-unit-series s2<span class="synSpecial">))))</span>
</pre>


