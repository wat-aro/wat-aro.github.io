---
title: "SICP 問題 2.57"
published: 2015/10/26
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>augend s<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span><span class="synIdentifier">cdddr</span> s<span class="synSpecial">))</span>
      <span class="synSpecial">(</span><span class="synIdentifier">caddr</span> s<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">'</span>+ <span class="synSpecial">(</span><span class="synIdentifier">cddr</span> s<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>multiplicand p<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span><span class="synIdentifier">cdddr</span> p<span class="synSpecial">))</span>
      <span class="synSpecial">(</span><span class="synIdentifier">caddr</span> p<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">'</span>* <span class="synSpecial">(</span><span class="synIdentifier">cddr</span> p<span class="synSpecial">))))</span>
</pre>


<p>これ作るので精一杯でした．<br/>
make-sumやmake-productを可変長引数に対応できるように変更するのは難しい．．．</p>

