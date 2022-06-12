---
title: "SICP 問題1.43"
published: 2015/10/09
tags:
  - scheme
  - SICP
---

<p>関数fをn回作用を計算する手続きrepeated</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>repeated f n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>iter fn count<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> count n<span class="synSpecial">)</span>
        fn
        <span class="synSpecial">(</span>iter <span class="synSpecial">(</span>compose f fn<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> count <span class="synConstant">1</span><span class="synSpecial">))))</span>
  <span class="synSpecial">(</span>iter f <span class="synConstant">1</span><span class="synSpecial">))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; ((repeated inc 5) 0)
5</pre>


