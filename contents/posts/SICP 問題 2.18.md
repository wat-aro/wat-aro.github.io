---
title: "SICP 問題 2.18"
published: 2015/10/18
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">reverse</span> items<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>iter lis result<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> lis<span class="synSpecial">)</span>
        result
        <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lis<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> lis<span class="synSpecial">)</span> result<span class="synSpecial">))))</span>
  <span class="synSpecial">(</span>iter items nil<span class="synSpecial">))</span>
</pre>


