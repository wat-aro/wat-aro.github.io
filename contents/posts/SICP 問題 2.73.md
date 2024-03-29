---
title: "SICP 問題 2.73"
published: 2015/10/28
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>deriv <span class="synIdentifier">exp</span> var<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">number?</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synConstant">0</span><span class="synSpecial">)</span>
        <span class="synSpecial">((</span>variable? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>same-variable? <span class="synIdentifier">exp</span> var<span class="synSpecial">)</span> <span class="synConstant">1</span> <span class="synConstant">0</span><span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>get <span class="synSpecial">'</span>deriv <span class="synSpecial">(</span>operator <span class="synIdentifier">exp</span><span class="synSpecial">))</span> <span class="synSpecial">(</span>operands <span class="synIdentifier">exp</span><span class="synSpecial">)</span> var<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>operator <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>operands <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
</pre>


<p>;; a
元のプログラムと違うのはelseの行．<br/>
operatorの型に合わせたderivが呼ばれ残りの要素を処理する．<br/>
numberとvariableはリストでないので型を持たないため，データ主導の振り分けに吸収できない．</p>

<p>;; b</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>install-deriv-sum-package<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>deriv-sum <span class="synIdentifier">exp</span> var<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>make-sum <span class="synSpecial">(</span>deriv <span class="synSpecial">(</span>addend <span class="synIdentifier">exp</span><span class="synSpecial">)</span> var<span class="synSpecial">)</span>
              <span class="synSpecial">(</span>deriv <span class="synSpecial">(</span>augend <span class="synIdentifier">exp</span><span class="synSpecial">)</span> var<span class="synSpecial">)))</span>

  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-sum a1 a2<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">=</span> a1 <span class="synConstant">0</span><span class="synSpecial">)</span> a2<span class="synSpecial">)</span>
          <span class="synSpecial">((</span><span class="synIdentifier">=</span> a2 <span class="synConstant">0</span><span class="synSpecial">)</span> a1<span class="synSpecial">)</span>
          <span class="synSpecial">((</span><span class="synStatement">and</span> <span class="synSpecial">(</span><span class="synIdentifier">number?</span> a1<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">number?</span> a2<span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> a1 a2<span class="synSpecial">))</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>+ a1 a2<span class="synSpecial">))))</span>

  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>addend x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> x<span class="synSpecial">))</span>

  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>augend x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">caddr</span> x<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span><span class="synIdentifier">cdddr</span> x<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synIdentifier">caddr</span> x<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">'</span>+ <span class="synSpecial">(</span><span class="synIdentifier">cddr</span> x<span class="synSpecial">))))</span>

  <span class="synSpecial">(</span>put <span class="synSpecial">'</span>deriv <span class="synSpecial">'</span>+ deriv-sum<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>put <span class="synSpecial">'</span>make <span class="synSpecial">'</span>+ make-sum<span class="synSpecial">)</span>
  <span class="synSpecial">'</span>done<span class="synSpecial">)</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>install-deriv-product-package<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>deriv-product <span class="synIdentifier">exp</span> var<span class="synSpecial">)</span>
    <span class="synSpecial">((</span>get <span class="synSpecial">'</span>make-sum <span class="synSpecial">'</span>+<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>make-product <span class="synSpecial">(</span>multiplier <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                   <span class="synSpecial">(</span>deriv <span class="synSpecial">(</span>multiplicand <span class="synIdentifier">exp</span><span class="synSpecial">)</span> var<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>make-product <span class="synSpecial">(</span>multiplicand <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                   <span class="synSpecial">(</span>deriv <span class="synSpecial">(</span>multiplier <span class="synIdentifier">exp</span><span class="synSpecial">)</span> var<span class="synSpecial">))))</span>

  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-product m1 m2<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synStatement">or</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> m1 <span class="synConstant">0</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> m2 <span class="synConstant">0</span><span class="synSpecial">))</span> <span class="synConstant">0</span><span class="synSpecial">)</span>
          <span class="synSpecial">((</span><span class="synIdentifier">=</span> m1 <span class="synConstant">1</span><span class="synSpecial">)</span> m2<span class="synSpecial">)</span>
          <span class="synSpecial">((</span><span class="synIdentifier">=</span> m2 <span class="synConstant">1</span><span class="synSpecial">)</span> m1<span class="synSpecial">)</span>
          <span class="synSpecial">((</span><span class="synStatement">and</span> <span class="synSpecial">(</span><span class="synIdentifier">number?</span> m1<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">number?</span> m2<span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> m1 m2<span class="synSpecial">))</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>* m1 m2<span class="synSpecial">))))</span>

  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>multiplier x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> x<span class="synSpecial">))</span>

  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>multiplicand x<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span><span class="synIdentifier">cdddr</span> x<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synIdentifier">caddr</span> x<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">'</span>* <span class="synSpecial">(</span><span class="synIdentifier">cddr</span> x<span class="synSpecial">))))</span>

  <span class="synSpecial">(</span>put <span class="synSpecial">'</span>deriv <span class="synSpecial">'</span>* deriv-product<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>put <span class="synSpecial">'</span>make <span class="synSpecial">'</span>* make-product<span class="synSpecial">)</span>

  <span class="synSpecial">'</span>done<span class="synSpecial">)</span>
</pre>


<p>;; c</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>install-exponent-package<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>deriv-exponent <span class="synIdentifier">exp</span> var<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>make-product <span class="synSpecial">(</span>get make <span class="synSpecial">'</span>*<span class="synSpecial">)))</span>
      <span class="synSpecial">(</span>make-product
       <span class="synSpecial">(</span>make-product <span class="synSpecial">(</span>exponent x<span class="synSpecial">)</span>
                     <span class="synSpecial">(</span>make-exponentiation <span class="synSpecial">(</span>base x<span class="synSpecial">)</span>
                                          <span class="synSpecial">(</span><span class="synIdentifier">-</span> <span class="synSpecial">(</span>exponent x<span class="synSpecial">)</span> <span class="synConstant">1</span><span class="synSpecial">)))</span>
       <span class="synSpecial">(</span>deriv <span class="synSpecial">(</span>base x<span class="synSpecial">)</span> var<span class="synSpecial">))))</span>

  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>exponent x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> x<span class="synSpecial">))</span>

  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>base x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">caddr</span> x<span class="synSpecial">))</span>

  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-exponent b e<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">=</span> e <span class="synConstant">0</span><span class="synSpecial">)</span> <span class="synConstant">1</span><span class="synSpecial">)</span>
          <span class="synSpecial">((</span><span class="synIdentifier">=</span> e <span class="synConstant">1</span><span class="synSpecial">)</span> b<span class="synSpecial">)</span>
          <span class="synSpecial">((</span><span class="synIdentifier">=</span> b <span class="synConstant">0</span><span class="synSpecial">)</span> <span class="synConstant">0</span><span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>** b e<span class="synSpecial">))))</span>

  <span class="synSpecial">(</span>put <span class="synSpecial">'</span>deriv <span class="synSpecial">'</span>** deriv-exponent<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>put <span class="synSpecial">'</span>make <span class="synSpecial">'</span>** make-exponent<span class="synSpecial">)</span>
  <span class="synSpecial">'</span>done<span class="synSpecial">)</span>
</pre>


<p>;; d
putの演算と型を入れ替える</p>

