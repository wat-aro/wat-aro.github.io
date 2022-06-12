---
title: "SICP 問題 2.62"
published: 2015/10/26
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>union-set s t<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> s<span class="synSpecial">)</span> t<span class="synSpecial">)</span>
        <span class="synSpecial">((</span><span class="synIdentifier">null?</span> t<span class="synSpecial">)</span> s<span class="synSpecial">)</span>
        <span class="synSpecial">((</span><span class="synIdentifier">=</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> s<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> t<span class="synSpecial">))</span>
         <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> s<span class="synSpecial">)</span>
               <span class="synSpecial">(</span>union-set <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> s<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> t<span class="synSpecial">))))</span>
        <span class="synSpecial">((</span><span class="synIdentifier">&lt;</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> s<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> t<span class="synSpecial">))</span>
         <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> s<span class="synSpecial">)</span>
               <span class="synSpecial">(</span>union-set <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> s<span class="synSpecial">)</span> t<span class="synSpecial">)))</span>
        <span class="synSpecial">((</span><span class="synIdentifier">&lt;</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> t<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> s<span class="synSpecial">))</span>
         <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> t<span class="synSpecial">)</span>
               <span class="synSpecial">(</span>union-set s <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> t<span class="synSpecial">))))))</span>
</pre>


