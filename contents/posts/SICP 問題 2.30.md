---
title: "SICP 問題 2.30"
published: 2015/10/20
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>square-tree tree<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> tree<span class="synSpecial">)</span> nil<span class="synSpecial">)</span>
        <span class="synSpecial">((</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">pair?</span> tree<span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> tree tree<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>square-tree <span class="synSpecial">(</span><span class="synIdentifier">car</span> tree<span class="synSpecial">))</span>
                    <span class="synSpecial">(</span>square-tree <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> tree<span class="synSpecial">))))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>square-tree tree<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>sub-tree<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">pair?</span> sub-tree<span class="synSpecial">)</span>
             <span class="synSpecial">(</span>square-tree sub-tree<span class="synSpecial">)</span>
             <span class="synSpecial">(</span><span class="synIdentifier">*</span> sub-tree sub-tree<span class="synSpecial">)))</span>
       tree<span class="synSpecial">))</span>
</pre>


