---
title: "SICP 問題 2.78"
published: 2015/10/31
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>attach-tag type-tag contents<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> type-tag <span class="synSpecial">'</span>scheme-number<span class="synSpecial">)</span>
      contents
      <span class="synSpecial">(</span><span class="synIdentifier">cons</span> type-tag contents<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>type-tag datum<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">number?</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> datum<span class="synSpecial">))</span> <span class="synSpecial">'</span>scheme-number<span class="synSpecial">)</span>
        <span class="synSpecial">((</span><span class="synIdentifier">pair?</span> datum<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> datum<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>error <span class="synConstant">&quot;Bad tagged datum -- TYPE-TAG&quot;</span> datum<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>contents datum<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">number?</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> datum<span class="synSpecial">))</span> <span class="synSpecial">'</span>scheme-number<span class="synSpecial">)</span>
        <span class="synSpecial">((</span><span class="synIdentifier">pair?</span> datum<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> datum<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>error <span class="synConstant">&quot;Bad tagged datum -- CONTENTS&quot;</span> datum<span class="synSpecial">))))</span>
</pre>


