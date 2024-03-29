---
title: "SICP 問題 2.56"
published: 2015/10/25
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>deriv <span class="synIdentifier">exp</span> var<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">number?</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synConstant">0</span><span class="synSpecial">)</span>
        <span class="synSpecial">((</span>variable? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>same-variable? <span class="synIdentifier">exp</span> var<span class="synSpecial">)</span> <span class="synConstant">1</span> <span class="synConstant">0</span><span class="synSpecial">))</span>
        <span class="synSpecial">((</span>sum? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span>make-sum <span class="synSpecial">(</span>deriv <span class="synSpecial">(</span>addend <span class="synIdentifier">exp</span><span class="synSpecial">)</span> var<span class="synSpecial">)</span>
                   <span class="synSpecial">(</span>deriv <span class="synSpecial">(</span>augend <span class="synIdentifier">exp</span><span class="synSpecial">)</span> var<span class="synSpecial">)))</span>
        <span class="synSpecial">((</span>product? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span>make-sum
          <span class="synSpecial">(</span>make-product <span class="synSpecial">(</span>multiplier <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                        <span class="synSpecial">(</span>deriv <span class="synSpecial">(</span>multiplicand <span class="synIdentifier">exp</span><span class="synSpecial">)</span> var<span class="synSpecial">))</span>
          <span class="synSpecial">(</span>make-product <span class="synSpecial">(</span>deriv <span class="synSpecial">(</span>multiplier <span class="synIdentifier">exp</span><span class="synSpecial">)</span> var<span class="synSpecial">)</span>
                        <span class="synSpecial">(</span>multiplicand <span class="synIdentifier">exp</span><span class="synSpecial">))))</span>
        <span class="synSpecial">((</span>exponentiation? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span>make-product
          <span class="synSpecial">(</span>make-product <span class="synSpecial">(</span>exponent <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                        <span class="synSpecial">(</span>make-exponentiation <span class="synSpecial">(</span>base <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                                             <span class="synSpecial">(</span><span class="synIdentifier">-</span> <span class="synSpecial">(</span>exponent <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synConstant">1</span><span class="synSpecial">)))</span>
          <span class="synSpecial">(</span>deriv <span class="synSpecial">(</span>base <span class="synIdentifier">exp</span><span class="synSpecial">)</span> var<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span>
         <span class="synSpecial">(</span>error <span class="synConstant">&quot;unknown expression type -- DERIV&quot;</span> <span class="synIdentifier">exp</span><span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>exponentiation? x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span><span class="synIdentifier">pair?</span> x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> x<span class="synSpecial">)</span> <span class="synSpecial">'</span>**<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>base x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> x<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>exponent x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">caddr</span> x<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-exponentiation b e<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>=number? e <span class="synConstant">0</span><span class="synSpecial">)</span> <span class="synConstant">1</span><span class="synSpecial">)</span>
        <span class="synSpecial">((</span>=number? e <span class="synConstant">1</span><span class="synSpecial">)</span> b<span class="synSpecial">)</span>
        <span class="synSpecial">((</span><span class="synStatement">and</span> <span class="synSpecial">(</span><span class="synIdentifier">number?</span> b<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">number?</span> e<span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synIdentifier">expt</span> b e<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>** b e<span class="synSpecial">))))</span>
</pre>


