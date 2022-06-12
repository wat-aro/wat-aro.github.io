---
title: "SICP 問題 2.20"
published: 2015/10/19
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>same-parity x <span class="synSpecial">.</span> y<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>recur lis pred?<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span>
     <span class="synSpecial">((</span><span class="synIdentifier">null?</span> lis<span class="synSpecial">)</span> nil<span class="synSpecial">)</span>
     <span class="synSpecial">((</span>pred? <span class="synSpecial">(</span><span class="synIdentifier">car</span> lis<span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> lis<span class="synSpecial">)</span> <span class="synSpecial">(</span>recur <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lis<span class="synSpecial">)</span> pred?<span class="synSpecial">)))</span>
     <span class="synSpecial">(</span><span class="synStatement">else</span>
      <span class="synSpecial">(</span>recur <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lis<span class="synSpecial">)</span> pred?<span class="synSpecial">))))</span>
  <span class="synSpecial">(</span><span class="synIdentifier">cons</span> x <span class="synSpecial">(</span>recur y <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">odd?</span> x<span class="synSpecial">)</span>
                       <span class="synIdentifier">odd?</span>
                       <span class="synIdentifier">even?</span><span class="synSpecial">))))</span>
</pre>


<p>　</p>

<pre class="code" data-lang="" data-unlink>gosh&gt; (same-parity 1 2 3 4 5 6 7)
(1 3 5 7)
gosh&gt; (same-parity 2 3 4 5 6 7)
(2 4 6)</pre>


<p>　<br/>
<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B0%A5%B0%A4%EB">ググる</a>といろんなやり方でみんな解いてますね．</p>

