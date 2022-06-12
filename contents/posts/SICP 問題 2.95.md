---
title: "SICP 問題 2.95"
published: 2015/10/26
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>element-of-set? x set<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> set<span class="synSpecial">)</span> false<span class="synSpecial">)</span>
        <span class="synSpecial">((</span><span class="synIdentifier">equal?</span> x <span class="synSpecial">(</span><span class="synIdentifier">car</span> set<span class="synSpecial">))</span> true<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>element-of-set? x <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> set<span class="synSpecial">)))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>unionset s t<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> s<span class="synSpecial">)</span> t<span class="synSpecial">)</span>
        <span class="synSpecial">((</span>element-of-set? <span class="synSpecial">(</span><span class="synIdentifier">car</span> s<span class="synSpecial">)</span> t<span class="synSpecial">)</span>
         <span class="synSpecial">(</span>unionset <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> s<span class="synSpecial">)</span> t<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> s<span class="synSpecial">)</span>
                    <span class="synSpecial">(</span>unionset <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> s<span class="synSpecial">)</span> t<span class="synSpecial">)))))</span>
</pre>


