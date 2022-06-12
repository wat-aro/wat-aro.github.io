---
title: "SICP 問題 2.38"
published: 2015/10/21
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">fold-left</span> op initial sequence<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>iter result rest<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> rest<span class="synSpecial">)</span>
        result
        <span class="synSpecial">(</span>iter <span class="synSpecial">(</span>op result <span class="synSpecial">(</span><span class="synIdentifier">car</span> rest<span class="synSpecial">))</span>
              <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> rest<span class="synSpecial">))))</span>
  <span class="synSpecial">(</span>iter initial sequence<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">fold-right</span> op initial sequence<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> sequence<span class="synSpecial">)</span>
      initial
      <span class="synSpecial">(</span>op <span class="synSpecial">(</span><span class="synIdentifier">car</span> sequence<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synIdentifier">fold-right</span> op initial <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> sequence<span class="synSpecial">)))))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (fold-right / 1 (list 1 2 3))
3/2
gosh&gt; (fold-left / 1 (list 1 2 3))
1/6
gosh&gt; (fold-right list nil (list 1 2 3))
(1 (2 (3 ())))
gosh&gt; (fold-left list nil (list 1 2 3))
(((() 1) 2) 3)</pre>


<p>fold-rightとfold-leftによってopが満たすべき条件は＋や×のように順番に影響されない手続きであること．</p>

