---
title: "SICP 問題 3.1"
published: 2015/11/05
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-accumulator n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>sum n<span class="synSpecial">))</span>
    <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>num<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">set!</span> sum <span class="synSpecial">(</span><span class="synIdentifier">+</span> sum num<span class="synSpecial">))</span>
      sum<span class="synSpecial">)))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (define A (make-accumulator 5))
A
gosh&gt; (A 10)
15
gosh&gt; (A 10)
25</pre>


