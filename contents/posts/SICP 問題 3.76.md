---
title: "SICP 問題 3.76"
published: 2015/12/17
tags:
  - scheme
  - SICP
---

<p>前回のデータと比べて平均化する．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>smooth stream<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>cons-stream <span class="synSpecial">(</span>average <span class="synSpecial">(</span><span class="synIdentifier">car</span> stream<span class="synSpecial">)</span> <span class="synConstant">0</span><span class="synSpecial">)</span>
               <span class="synSpecial">(</span>stream-map average
                           <span class="synSpecial">(</span>stream-cdr stream<span class="synSpecial">)</span>
                           stream<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-zero-crossings sense-data<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>smooth-data <span class="synSpecial">(</span>smooth sense-data<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span>stream-map sign-change-detector
                smooth-data
                <span class="synSpecial">(</span>cons-stream <span class="synConstant">0</span> smooth-data<span class="synSpecial">))))</span>
</pre>


