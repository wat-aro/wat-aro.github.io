---
title: "SICP 問題 2.58"
published: 2015/10/26
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; a</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-sum a1 a2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>=number? a1 <span class="synConstant">0</span><span class="synSpecial">)</span> a2<span class="synSpecial">)</span>
        <span class="synSpecial">((</span>=number? a2 <span class="synConstant">0</span><span class="synSpecial">)</span> a1<span class="synSpecial">)</span>
        <span class="synSpecial">((</span><span class="synStatement">and</span> <span class="synSpecial">(</span><span class="synIdentifier">number?</span> a1<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">number?</span> a2<span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> a1 a2<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> a1 <span class="synSpecial">'</span>+ a2<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-product m1 m2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synStatement">or</span> <span class="synSpecial">(</span>=number? m1 <span class="synConstant">0</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>=number? m2 <span class="synConstant">0</span><span class="synSpecial">))</span> <span class="synConstant">0</span><span class="synSpecial">)</span>
        <span class="synSpecial">((</span>=number? m1 <span class="synConstant">1</span><span class="synSpecial">)</span> m2<span class="synSpecial">)</span>
        <span class="synSpecial">((</span>=number? m2 <span class="synConstant">1</span><span class="synSpecial">)</span> m1<span class="synSpecial">)</span>
        <span class="synSpecial">((</span><span class="synStatement">and</span> <span class="synSpecial">(</span><span class="synIdentifier">number?</span> m1<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">number?</span> m2<span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> m1 m2<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> m1 <span class="synSpecial">'</span>* m2<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>sum? x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span><span class="synIdentifier">pair?</span> x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> x<span class="synSpecial">)</span> <span class="synSpecial">'</span>+<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>addend s<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> s<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>product? x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span><span class="synIdentifier">pair?</span> x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> x<span class="synSpecial">)</span> <span class="synSpecial">'</span>*<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>multiplier p<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> p<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>exponentiation? x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span><span class="synIdentifier">pair?</span> x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> x<span class="synSpecial">)</span> <span class="synSpecial">'</span>**<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>base x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">car</span> x<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-exponentiation b e<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>=number? e <span class="synConstant">0</span><span class="synSpecial">)</span> <span class="synConstant">1</span><span class="synSpecial">)</span>
        <span class="synSpecial">((</span>=number? e <span class="synConstant">1</span><span class="synSpecial">)</span> b<span class="synSpecial">)</span>
        <span class="synSpecial">((</span><span class="synStatement">and</span> <span class="synSpecial">(</span><span class="synIdentifier">number?</span> b<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">number?</span> e<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">expt</span> b e<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> b <span class="synSpecial">'</span>** e<span class="synSpecial">))))</span>


<span class="synComment">;; b</span>
<span class="synComment">; パス</span>
</pre>


