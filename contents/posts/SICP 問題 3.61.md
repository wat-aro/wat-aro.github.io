---
title: "SICP 問題 3.61"
published: 2015/12/10
tags:
  - scheme
  - SICP
---

<p>べき<a class="keyword" href="http://d.hatena.ne.jp/keyword/%B5%E9%BF%F4">級数</a>Sの逆数を求める手続きinvert-unit-seriesを定義する．<br/>
問題文の通りですね．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>invert-unit-series stream<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>cons-stream <span class="synConstant">1</span>
               <span class="synSpecial">(</span>mul-series <span class="synSpecial">(</span>scale-stream <span class="synSpecial">(</span>stream-cdr s1<span class="synSpecial">)</span> <span class="synConstant">-1</span><span class="synSpecial">)</span>
                           <span class="synSpecial">(</span>invert-unit-series stream<span class="synSpecial">))))</span>
</pre>


