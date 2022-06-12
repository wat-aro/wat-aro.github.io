---
title: "SICP 問題1.18"
published: 2015/10/06
tags:
  - scheme
  - SICP
---

<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/%C2%D0%BF%F4">対数</a>的ステップ数の，二つの整数の乗算の反復的プロセスを生成する手続き</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>fast-* a b<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>fast-*-iter a b <span class="synConstant">0</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>fast-*-iter a b sum<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">=</span> b <span class="synConstant">0</span><span class="synSpecial">)</span> sum<span class="synSpecial">)</span>
        <span class="synSpecial">((</span><span class="synIdentifier">even?</span> b<span class="synSpecial">)</span> <span class="synSpecial">(</span>fast-*-iter <span class="synSpecial">(</span>double a<span class="synSpecial">)</span> <span class="synSpecial">(</span>halve b<span class="synSpecial">)</span> sum<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>fast-*-iter a <span class="synSpecial">(</span><span class="synIdentifier">-</span> b <span class="synConstant">1</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> a sum<span class="synSpecial">)))))</span>
</pre>


