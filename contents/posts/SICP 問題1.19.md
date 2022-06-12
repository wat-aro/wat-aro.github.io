---
title: "SICP 問題1.19"
published: 2015/10/06
tags:
  - scheme
  - SICP
---

<p><span itemscope itemtype="http://schema.org/Photograph"><img src="http://cdn-ak.f.st-hatena.com/images/fotolife/w/wat-aro/20151006/20151006041637.jpg" alt="f:id:wat-aro:20151006041637j:plain" title="f:id:wat-aro:20151006041637j:plain" class="hatena-fotolife" itemprop="image"></span></p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>fib n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>fib-iter <span class="synConstant">1</span> <span class="synConstant">0</span> <span class="synConstant">0</span> <span class="synConstant">1</span> n<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>fib-iter a b p q count<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">=</span> count <span class="synConstant">0</span><span class="synSpecial">)</span> b<span class="synSpecial">)</span>
        <span class="synSpecial">((</span><span class="synIdentifier">even?</span> count<span class="synSpecial">)</span>
         <span class="synSpecial">(</span>fib-iter a
                   b
                   <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span>square p<span class="synSpecial">)</span> <span class="synSpecial">(</span>square q<span class="synSpecial">))</span>
                   <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span>square q<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> <span class="synConstant">2</span> p q<span class="synSpecial">))</span>
                   <span class="synSpecial">(</span>halve count<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>fib-iter <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> b q<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> a q<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> a p<span class="synSpecial">))</span>
                        <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> b p<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> a q<span class="synSpecial">))</span>
                        p
                        q
                        <span class="synSpecial">(</span><span class="synIdentifier">-</span> count <span class="synConstant">1</span><span class="synSpecial">)))))</span>
</pre>


