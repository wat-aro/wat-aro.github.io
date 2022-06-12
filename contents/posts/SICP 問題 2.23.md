---
title: "SICP 問題 2.23"
published: 2015/10/19
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">for-each</span> proc items<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span>
   <span class="synSpecial">((</span><span class="synIdentifier">null?</span> items<span class="synSpecial">)</span> <span class="synSpecial">'</span>done<span class="synSpecial">)</span>
   <span class="synSpecial">(</span><span class="synStatement">else</span>
    <span class="synSpecial">(</span>proc <span class="synSpecial">(</span><span class="synIdentifier">car</span> items<span class="synSpecial">))</span>
    <span class="synSpecial">(</span><span class="synIdentifier">for-each</span> proc <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> items<span class="synSpecial">)))))</span>
</pre>


<p>　</p>

<pre class="code" data-lang="" data-unlink>gosh&gt; (for-each (lambda (x) (newline) (display x))
                (list 57 321 88))

57
321
88done</pre>


