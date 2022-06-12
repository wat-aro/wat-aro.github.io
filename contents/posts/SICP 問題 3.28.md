---
title: "SICP 問題 3.28"
published: 2015/11/24
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>or-gate a1 a2 output<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>or-action-procedure<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>new-value
           <span class="synSpecial">(</span>logical-or <span class="synSpecial">(</span>get-signal a1<span class="synSpecial">)</span> <span class="synSpecial">(</span>get-signal a2<span class="synSpecial">))))</span>
      <span class="synSpecial">(</span>after-delay or-gate-delay
                   <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">()</span>
                     <span class="synSpecial">(</span>set-signal! output new-value<span class="synSpecial">)))))</span>
  <span class="synSpecial">(</span>add-action! a1 or-action-procedure<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>add-action! a2 or-action-procedure<span class="synSpecial">)</span>
  <span class="synSpecial">'</span>ok<span class="synSpecial">)</span>
</pre>


