---
title: "SICP 問題 3.55"
published: 2015/12/09
tags:
  - scheme
  - SICP
---

<p>s0, s0 + s1, s0 + s1 + s2, ...<br/>
という要素なのでstreamの次の要素とsum-integersの今の要素を足したものがsum-integersの次の要素となる．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>partial-sums stream<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>cons-stream <span class="synSpecial">(</span>stream-car stream<span class="synSpecial">)</span>
               <span class="synSpecial">(</span>add-streams <span class="synSpecial">(</span>stream-cdr stream<span class="synSpecial">)</span>
                            sum-integers<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> sum-integers
  <span class="synSpecial">(</span>partial-sums integers<span class="synSpecial">))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (stream-ref sum-integers 0)
1
gosh&gt; (stream-ref sum-integers 1)
3
gosh&gt; (stream-ref sum-integers 2)
6
gosh&gt; (stream-ref sum-integers 3)
10
gosh&gt; (stream-ref sum-integers 4)
15</pre>


