---
title: "SICP 問題 2.19"
published: 2015/10/18
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>cc amount coin-values<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">=</span> amount <span class="synConstant">0</span><span class="synSpecial">)</span> <span class="synConstant">1</span><span class="synSpecial">)</span>
        <span class="synSpecial">((</span><span class="synStatement">or</span> <span class="synSpecial">(</span><span class="synIdentifier">&lt;</span> amount <span class="synConstant">0</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>no-more? coin-values<span class="synSpecial">))</span> <span class="synConstant">0</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span>
         <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span>cc amount
                <span class="synSpecial">(</span>except-first-denomination coin-values<span class="synSpecial">))</span>
            <span class="synSpecial">(</span>cc <span class="synSpecial">(</span><span class="synIdentifier">-</span> amount
                   <span class="synSpecial">(</span>first-denomination coin-values<span class="synSpecial">))</span>
                coin-values<span class="synSpecial">)))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> first-denomination <span class="synIdentifier">car</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> except-first-denomination <span class="synIdentifier">cdr</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> no-more? <span class="synIdentifier">null?</span><span class="synSpecial">)</span>
</pre>


<p>coins-valueの順番は答えに関係ない．<br/>
list内のすべての組み合わせを行っているためである．<br/>
ただし，降順にしたほうが繰り返しが少なくなるため効率がよくなる．<br/>
　</p>

<pre class="code" data-lang="" data-unlink>gosh&gt; (define us-coins (list 50 25 10 5 1))
us-coins
gosh&gt; (cc 100 us-coins)
292
gosh&gt; (cc 100 (list 25 50 10 5 1))
292
gosh&gt; (cc 100 (list 25 10 5 1 50))
292
gosh&gt; (cc 51 (list 25 10 5 1 50))
50
gosh&gt; (cc 51 us-coins)
50</pre>


