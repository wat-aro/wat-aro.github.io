---
title: "SICP 問題 2.17"
published: 2015/10/18
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>last-pair items<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> items<span class="synSpecial">))</span>
      items
      <span class="synSpecial">(</span>last-pair <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> items<span class="synSpecial">))))</span>
</pre>


