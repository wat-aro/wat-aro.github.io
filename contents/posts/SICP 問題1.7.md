---
title: "SICP 問題1.7"
published: 2015/10/03
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>sqrt-iter guess x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>new-if <span class="synSpecial">(</span>good-enough? guess x<span class="synSpecial">)</span>
      guess
      <span class="synSpecial">(</span>sqrt-iter <span class="synSpecial">(</span>improve guess x<span class="synSpecial">)</span>
                 x<span class="synSpecial">)))</span>
</pre>


<p>を動かすと値が返ってこない．new-ifは通常の手続きであるので作用的順序の評価に従って引数がまず評価される．<br/>
そのため(sqrt-<a class="keyword" href="http://d.hatena.ne.jp/keyword/iter">iter</a> (improve guess x) x)が評価され続けるループに入っている．</p>

