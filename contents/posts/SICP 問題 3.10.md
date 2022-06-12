---
title: "SICP 問題 3.10"
published: 2015/11/19
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> w1 <span class="synSpecial">(</span>make-withdraw <span class="synConstant">100</span><span class="synSpecial">))</span>
<span class="synComment">;; E2(balance:100)-&gt;E1(initial-amount:100)-&gt;global</span>

<span class="synSpecial">(</span>w1 <span class="synConstant">50</span><span class="synSpecial">)</span>
<span class="synComment">;; E3-&gt;(amount:50)-&gt;E2(balance:50)-&gt;E1(initial-amount:100)-&gt;global</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>w2 <span class="synSpecial">(</span>make-withdraw <span class="synConstant">100</span><span class="synSpecial">)))</span>
<span class="synComment">;; E5(balance:100)-&gt;E4(initial-amount:100)-&gt;global</span>
</pre>


