---
title: "SICP 問題 2.36"
published: 2015/10/21
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; accumulate</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>accumulate op initial sequence<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> sequence<span class="synSpecial">)</span>
      initial
      <span class="synSpecial">(</span>op <span class="synSpecial">(</span><span class="synIdentifier">car</span> sequence<span class="synSpecial">)</span>
          <span class="synSpecial">(</span>accumulate op initial <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> sequence<span class="synSpecial">)))))</span>

<span class="synComment">;; accumulate-n</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>accumulate-n op init seqs<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> seqs<span class="synSpecial">))</span>
             nil
             <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>accumulate op init <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synIdentifier">car</span> seqs<span class="synSpecial">))</span>
                   <span class="synSpecial">(</span>accumulate-n op init <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synIdentifier">cdr</span> seqs<span class="synSpecial">)))))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (accumulate-n + 0 &#39;((1 2 3) (4 5 6) (7 8 9) (10 11 12)))
(22 26 30)</pre>


