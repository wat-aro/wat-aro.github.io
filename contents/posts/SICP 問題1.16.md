---
title: "SICP 問題1.16"
published: 2015/10/06
tags:
  - scheme
  - SICP
---

<p>反復的べき上プロセスを生成する手続き</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>fast-expt b n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>fast-expt-iter b n <span class="synConstant">1</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>fast-expt-iter b count product<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">=</span> count <span class="synConstant">0</span><span class="synSpecial">)</span> product<span class="synSpecial">)</span>
        <span class="synSpecial">((</span><span class="synIdentifier">even?</span> count<span class="synSpecial">)</span>
         <span class="synSpecial">(</span>fast-expt-iter <span class="synSpecial">(</span>square b<span class="synSpecial">)</span>
                        <span class="synSpecial">(</span><span class="synIdentifier">/</span> count <span class="synConstant">2</span><span class="synSpecial">)</span>
                        product<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>fast-expt-iter b <span class="synSpecial">(</span><span class="synIdentifier">-</span> count <span class="synConstant">1</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> b product<span class="synSpecial">)))))</span>
</pre>


