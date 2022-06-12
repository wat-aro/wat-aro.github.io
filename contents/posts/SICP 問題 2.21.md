---
title: "SICP 問題 2.21"
published: 2015/10/19
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>square-list items<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> items<span class="synSpecial">)</span>
      nil
      <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> items<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> items<span class="synSpecial">))</span>
            <span class="synSpecial">(</span>square-list <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> items<span class="synSpecial">)))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>square-list items<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> x x<span class="synSpecial">))</span>
       items<span class="synSpecial">))</span>
</pre>


