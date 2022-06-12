---
title: "SICP 問題 3.73"
published: 2015/12/17
tags:
  - scheme
  - SICP
---

<p>問題文と図の通りに．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>integral integrand initial-value dt<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> int
    <span class="synSpecial">(</span>cons-stream initial-value
                 <span class="synSpecial">(</span>add-streams <span class="synSpecial">(</span>scale-stream integrand dt<span class="synSpecial">)</span>
                              int<span class="synSpecial">)))</span>
  int<span class="synSpecial">)</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>RC R C dt<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>i v0<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>add-streams <span class="synSpecial">(</span>scale-stream i R<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span>integral <span class="synSpecial">(</span>scale-stream i <span class="synSpecial">(</span><span class="synIdentifier">/</span> <span class="synConstant">1</span> C<span class="synSpecial">))</span>
                           vo dt<span class="synSpecial">))))</span>
</pre>


