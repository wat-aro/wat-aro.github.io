---
title: "SICP 問題 2.54"
published: 2015/10/25
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">equal?</span> a b<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">or</span> <span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">pair?</span> a<span class="synSpecial">))</span>
           <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">pair?</span> b<span class="synSpecial">))</span>
           <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> a b<span class="synSpecial">))</span>
      <span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span><span class="synIdentifier">pair?</span> a<span class="synSpecial">)</span>
           <span class="synSpecial">(</span><span class="synIdentifier">pair?</span> b<span class="synSpecial">)</span>
           <span class="synSpecial">(</span><span class="synIdentifier">equal?</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> a<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> b<span class="synSpecial">))</span>
           <span class="synSpecial">(</span><span class="synIdentifier">equal?</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> a<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> b<span class="synSpecial">)))))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (equal? &#39;(this is a list) &#39;(this is a list))
#t
gosh&gt; (equal? &#39;(this is a list) &#39;(this (is a) list))
#f</pre>


