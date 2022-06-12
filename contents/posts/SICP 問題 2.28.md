---
title: "SICP 問題 2.28"
published: 2015/10/20
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> x <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synConstant">1</span> <span class="synConstant">2</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synConstant">3</span> <span class="synConstant">4</span><span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>fringe l<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> l<span class="synSpecial">)</span> nil<span class="synSpecial">)</span>
        <span class="synSpecial">((</span><span class="synIdentifier">pair?</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> l<span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synIdentifier">append</span> <span class="synSpecial">(</span>fringe <span class="synSpecial">(</span><span class="synIdentifier">car</span> l<span class="synSpecial">))</span>
                                 <span class="synSpecial">(</span>fringe <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> l<span class="synSpecial">))))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> l<span class="synSpecial">)</span> <span class="synSpecial">(</span>fringe <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> l<span class="synSpecial">))))))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (fringe x)
(1 2 3 4)
gosh&gt; (fringe (list x x))
(1 2 3 4 1 2 3 4)</pre>


