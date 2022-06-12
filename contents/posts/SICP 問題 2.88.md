---
title: "SICP 問題 2.88"
published: 2015/11/04
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; polynominal-package</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>=zero? p<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">=</span> <span class="synConstant">0</span> <span class="synSpecial">(</span>coeff p<span class="synSpecial">)))</span>

<span class="synSpecial">(</span>put <span class="synSpecial">'</span>=zero? <span class="synSpecial">'(</span>polynominal<span class="synSpecial">)</span>
     <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>p<span class="synSpecial">)</span> <span class="synSpecial">(</span>=zero? p<span class="synSpecial">)))</span>


<span class="synComment">;; 2.88</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>negative x<span class="synSpecial">)</span> <span class="synSpecial">(</span>apply-generic <span class="synSpecial">'</span>negative x<span class="synSpecial">))</span>

<span class="synComment">;; scheme-number</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>negative-integer x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">-</span> x<span class="synSpecial">))</span>
<span class="synSpecial">(</span>put <span class="synSpecial">'</span>negative <span class="synSpecial">'(</span>scheme-number<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span>negative-integer x<span class="synSpecial">)))</span>

<span class="synComment">;; rational</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>negative-rational x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>make-rational <span class="synSpecial">(</span>negative <span class="synSpecial">(</span>numer x<span class="synSpecial">))</span>
                 <span class="synSpecial">(</span>denom x<span class="synSpecial">)))</span>
<span class="synSpecial">(</span>put <span class="synSpecial">'</span>negative <span class="synSpecial">'(</span>rational<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span>negative-raitonal x<span class="synSpecial">)))</span>

<span class="synComment">;; real</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>negative-real x<span class="synSpecial">)</span> <span class="synSpecial">(</span>make-real <span class="synSpecial">(</span><span class="synIdentifier">-</span> x<span class="synSpecial">)))</span>
<span class="synSpecial">(</span>put <span class="synSpecial">'</span>negative <span class="synSpecial">'(</span>real<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span>negative-real x<span class="synSpecial">)))</span>

<span class="synComment">;; complex</span>
<span class="synSpecial">(</span>put <span class="synSpecial">'</span>negative <span class="synSpecial">'(</span>complex<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span>negative x<span class="synSpecial">)))</span>

<span class="synComment">;; rect-angler</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>negative-rectangler x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>make-complex-from-mag-ang <span class="synSpecial">(</span><span class="synIdentifier">magnitude</span> x<span class="synSpecial">)</span>
                             <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synConstant">180</span> <span class="synSpecial">(</span><span class="synIdentifier">angle</span> x<span class="synSpecial">))))</span>
<span class="synSpecial">(</span>put <span class="synSpecial">'</span>negative <span class="synSpecial">'(</span>rectangler<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span>negative-rectangler x<span class="synSpecial">))</span> <span class="synSpecial">)</span>

<span class="synComment">;; real-imag</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>negative-polar x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>make-complex-from-real-imag <span class="synSpecial">(</span>negative <span class="synSpecial">(</span><span class="synIdentifier">real-part</span> x<span class="synSpecial">))</span>
                               <span class="synSpecial">(</span>negative <span class="synSpecial">(</span><span class="synIdentifier">imag-part</span> x<span class="synSpecial">))))</span>
<span class="synSpecial">(</span>put <span class="synSpecial">'</span>negative <span class="synSpecial">'(</span>polar<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span>negative-polar x<span class="synSpecial">)))</span>


<span class="synComment">;; polynomial</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>negative-term p<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>mul-term <span class="synSpecial">(</span>make-term <span class="synConstant">0</span> <span class="synConstant">-1</span><span class="synSpecial">)</span> p<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>sub-terms L1 L2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>empty-termlist? L2<span class="synSpecial">)</span> L1<span class="synSpecial">)</span>
        <span class="synSpecial">((</span>empty-termlist? L1<span class="synSpecial">)</span>
         <span class="synSpecial">(</span>negative-term L2<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span>
         <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>t1 <span class="synSpecial">(</span>first-term L1<span class="synSpecial">))</span>
               <span class="synSpecial">(</span>t2 <span class="synSpecial">(</span>first-term L2<span class="synSpecial">)))</span>
           <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">&gt;</span> <span class="synSpecial">(</span>order t1<span class="synSpecial">)</span> <span class="synSpecial">(</span>order t2<span class="synSpecial">))</span>
                  <span class="synSpecial">(</span>adjoin-term
                   t1 <span class="synSpecial">(</span>sub-term <span class="synSpecial">(</span>rest-terms L1<span class="synSpecial">)</span> L2<span class="synSpecial">)))</span>
                 <span class="synSpecial">((</span><span class="synIdentifier">&lt;</span> <span class="synSpecial">(</span>order t1<span class="synSpecial">)</span> <span class="synSpecial">(</span>order t2<span class="synSpecial">))</span>
                  <span class="synSpecial">(</span>adjoin-term
                   <span class="synSpecial">(</span>negative-term L2<span class="synSpecial">)</span>
                   <span class="synSpecial">(</span>sub-term L1 <span class="synSpecial">(</span>rest-term L2<span class="synSpecial">))))</span>
                 <span class="synSpecial">(</span><span class="synStatement">else</span>
                  <span class="synSpecial">(</span>adjoin-term
                   <span class="synSpecial">(</span>make-term <span class="synSpecial">(</span>order t1<span class="synSpecial">)</span>
                              <span class="synSpecial">(</span>sub <span class="synSpecial">(</span>coeff t1<span class="synSpecial">)</span> <span class="synSpecial">(</span>coeff t2<span class="synSpecial">)))</span>
                   <span class="synSpecial">(</span>sub-term <span class="synSpecial">(</span>rest-term L1<span class="synSpecial">)</span>
                             <span class="synSpecial">(</span>rest-term L2<span class="synSpecial">)))))))))</span>

<span class="synSpecial">(</span>put <span class="synSpecial">'</span>negative <span class="synSpecial">'(</span>polynomil<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span>negative-term x<span class="synSpecial">)))</span>
<span class="synSpecial">(</span>put <span class="synSpecial">'</span>sub <span class="synSpecial">'(</span>polynomiial <span class="synSpecial">(</span>lambda <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span>sub-terms L1 L2<span class="synSpecial">))))</span>
</pre>


