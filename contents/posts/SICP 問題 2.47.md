---
title: "SICP 問題 2.47"
published: 2015/10/23
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; listでmake</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-frame origin edge1 edge2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">list</span> origin edge1 edge2<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>origin-frame frame<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">car</span> frame<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>edge1-frame frame<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> frame<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>edge2-frame frame<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">caddr</span> frame<span class="synSpecial">))</span>

<span class="synComment">;; consでmake</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-frame origin edge1 edge2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">cons</span> origin <span class="synSpecial">(</span><span class="synIdentifier">cons</span> edge1 edge2<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>origin-frame frame<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">car</span> frame<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>edge1-frame frame<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> frame<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>edge2-frame frame<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">cddr</span> frame<span class="synSpecial">))</span>
</pre>


