---
title: "SICP 問題1.12"
published: 2015/10/05
tags:
  - scheme
  - SICP
---

<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%D1%A5%B9%A5%AB%A5%EB">パスカル</a>の三角形のn行目のk番目を求める手続き<br/>
　</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>pascals-triangle n k<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synStatement">or</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> k <span class="synConstant">1</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> n k<span class="synSpecial">))</span>
      <span class="synConstant">1</span>
      <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span>pascals-triangle <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">1</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">-</span> k <span class="synConstant">1</span><span class="synSpecial">))</span>
         <span class="synSpecial">(</span>pascals-triangle <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">1</span><span class="synSpecial">)</span> k<span class="synSpecial">))))</span>
</pre>


