---
title: "SICP 問題 4.49"
published: 2016/01/13
tags:
  - scheme
  - SICP
---

<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/%BC%AB%C1%B3%B8%C0%B8%EC">自然言語</a>の<a class="keyword" href="http://d.hatena.ne.jp/keyword/%B9%BD%CA%B8%B2%F2%C0%CF">構文解析</a>用プログラムを少し改造するだけで文章の生成ができる．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>an-element-of items<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>require <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> items<span class="synSpecial">)))</span>
  <span class="synSpecial">(</span>amb <span class="synSpecial">(</span><span class="synIdentifier">car</span> items<span class="synSpecial">)</span> <span class="synSpecial">(</span>amb <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> items<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>parse-word word-list<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> word-list<span class="synSpecial">)</span>
        <span class="synSpecial">(</span>an-element-of <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> word-list<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>generate-sentence<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>parse-sentence<span class="synSpecial">))</span>
</pre>


