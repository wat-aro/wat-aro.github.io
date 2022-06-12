---
title: "SICP 問題 2.46"
published: 2015/10/23
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-vect x y<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> x y<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>xcor-vect v<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> v<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>ycor-vect v<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> v<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>add-vect v1 v2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>make-vect <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span>xcor-vect v1<span class="synSpecial">)</span> <span class="synSpecial">(</span>xcor-vect v2<span class="synSpecial">))</span>
             <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span>ycor-vect v1<span class="synSpecial">)</span> <span class="synSpecial">(</span>ycor-vect v2<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>sub-vect v1 v2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>make-vect <span class="synSpecial">(</span><span class="synIdentifier">-</span> <span class="synSpecial">(</span>xcor-vect v1<span class="synSpecial">)</span> <span class="synSpecial">(</span>xcor-vect v2<span class="synSpecial">))</span>
             <span class="synSpecial">(</span><span class="synIdentifier">-</span> <span class="synSpecial">(</span>ycor-vect v1<span class="synSpecial">)</span> <span class="synSpecial">(</span>ycor-vect v2<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>scale-vect s v<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>make-vect <span class="synSpecial">(</span><span class="synIdentifier">*</span> s <span class="synSpecial">(</span>xcor-vect v<span class="synSpecial">))</span>
             <span class="synSpecial">(</span><span class="synIdentifier">*</span> s <span class="synSpecial">(</span>ycor-vect v<span class="synSpecial">))))</span>
</pre>


