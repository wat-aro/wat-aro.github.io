---
title: "SICP 問題1.30"
published: 2015/10/07
tags:
  - scheme
  - SICP
---

<p>sumを末尾<a class="keyword" href="http://d.hatena.ne.jp/keyword/%BA%C6%B5%A2">再帰</a>で書き直す</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>sum term a next b<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>iter a result<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">&gt;</span> a b<span class="synSpecial">)</span>
        result
        <span class="synSpecial">(</span>iter <span class="synSpecial">(</span>next a<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span>term a<span class="synSpecial">)</span> result<span class="synSpecial">))))</span>
  <span class="synSpecial">(</span>iter a <span class="synConstant">0</span><span class="synSpecial">))</span>
</pre>


