---
title: "SICP 問題 2.89"
published: 2015/11/05
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; 2.89</span>
<span class="synComment">;; 濃い多項式に適している実装</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-polynomial valiable term-list<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">cons</span> valiable term-list<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>valiable p<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">car</span> p<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>term-list p<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> p<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>valiable? v<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">symbol?</span> v<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>same-valiable? v1 v2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span>valiable? v1<span class="synSpecial">)</span> <span class="synSpecial">(</span>valiable? v2<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> v1 v2<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>=zero-term? L<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>L1 <span class="synSpecial">(</span>term-list L<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">or</span> <span class="synSpecial">(</span>empty-termlist? L1<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span>=zero? <span class="synSpecial">(</span>coeff <span class="synSpecial">(</span>first L1<span class="synSpecial">)))</span>
             <span class="synSpecial">(</span>=zero-term? <span class="synSpecial">(</span>rest-terms L1<span class="synSpecial">))))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>adjoin-term term term-list<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> term term-list<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>empty-termlist<span class="synSpecial">)</span> <span class="synSpecial">'())</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>first-term term-list<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> term-list<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>rest-terms term-list<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> term-list<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>empty-termlist? term-list<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> term-list<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-term order coeff<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> coeff <span class="synSpecial">(</span>iota order <span class="synConstant">0</span> <span class="synConstant">0</span><span class="synSpecial">)))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>order term<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">length</span> <span class="synSpecial">(</span>rest-terms term<span class="synSpecial">)))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>coeff term<span class="synSpecial">)</span> <span class="synSpecial">(</span>first-term term<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>negative-terms L<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>empty-termlist? L<span class="synSpecial">)</span>
      empty-termlist
      <span class="synSpecial">(</span>addjoin-term <span class="synSpecial">(</span>negative <span class="synSpecial">(</span>first term<span class="synSpecial">))</span>
                    <span class="synSpecial">(</span>negative-terms <span class="synSpecial">(</span>rest-terms L<span class="synSpecial">)))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>add-terms L1 L2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>empty-termlist? L1<span class="synSpecial">)</span> L2<span class="synSpecial">)</span>
        <span class="synSpecial">((</span>empty-termlist? L2<span class="synSpecial">)</span> L1<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span>
         <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>t1 <span class="synSpecial">(</span>first-term L1<span class="synSpecial">))</span>
               <span class="synSpecial">(</span>t2 <span class="synSpecial">(</span>first-term L2<span class="synSpecial">))</span>
               <span class="synSpecial">(</span>o1 <span class="synSpecial">(</span>order L1<span class="synSpecial">))</span>
               <span class="synSpecial">(</span>o2 <span class="synSpecial">(</span>order L2<span class="synSpecial">)))</span>
           <span class="synSpecial">((</span><span class="synIdentifier">&gt;</span> o1 o2<span class="synSpecial">)</span>
            <span class="synSpecial">(</span>adjoin-term t1 <span class="synSpecial">(</span>add-terms <span class="synSpecial">(</span>rest-terms L1<span class="synSpecial">)</span> L2<span class="synSpecial">)))</span>
           <span class="synSpecial">((</span><span class="synIdentifier">&lt;</span> o1 o2<span class="synSpecial">)</span>
            <span class="synSpecial">(</span>adjoin-term t2 <span class="synSpecial">(</span>add-terms L1 <span class="synSpecial">(</span>rest-terms L2<span class="synSpecial">))))</span>
           <span class="synSpecial">(</span><span class="synStatement">else</span>
            <span class="synSpecial">(</span>addjoin-term <span class="synSpecial">(</span>add t1 t2<span class="synSpecial">)</span>
                          <span class="synSpecial">(</span>add-terms <span class="synSpecial">(</span>rest-terms L1<span class="synSpecial">)</span> <span class="synSpecial">(</span>rest-terms L2<span class="synSpecial">))))))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>sub-terms L1 L2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>empty-termlist? L2<span class="synSpecial">)</span> L1<span class="synSpecial">)</span>
        <span class="synSpecial">((</span>empty-termlist? L1<span class="synSpecial">)</span> <span class="synSpecial">(</span>negative-terms L1<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span>
         <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>t1 <span class="synSpecial">(</span>first-term L1<span class="synSpecial">))</span>
               <span class="synSpecial">(</span>t2 <span class="synSpecial">(</span>first-term L2<span class="synSpecial">))</span>
               <span class="synSpecial">(</span>o1 <span class="synSpecial">(</span>order L1<span class="synSpecial">))</span>
               <span class="synSpecial">(</span>o2 <span class="synSpecial">(</span>order L2<span class="synSpecial">)))</span>
           <span class="synSpecial">((</span><span class="synIdentifier">&gt;</span> o1 o2<span class="synSpecial">)</span>
            <span class="synSpecial">(</span>adjoin-term t1
                         <span class="synSpecial">(</span>sub-terms <span class="synSpecial">(</span>rest-terms L1<span class="synSpecial">)</span> L2<span class="synSpecial">)))</span>
           <span class="synSpecial">((</span><span class="synIdentifier">&lt;</span> o1 o2<span class="synSpecial">)</span>
            <span class="synSpecial">(</span>adjoin-term <span class="synSpecial">(</span>negative t2<span class="synSpecial">)</span>
                         <span class="synSpecial">(</span>sub-terms L1 <span class="synSpecial">(</span>rest-terms L2<span class="synSpecial">))))</span>
           <span class="synSpecial">(</span><span class="synStatement">else</span>
            <span class="synSpecial">(</span>adjoin-term <span class="synSpecial">(</span>sub t1 t2<span class="synSpecial">)</span>
                         <span class="synSpecial">(</span>sub-terms <span class="synSpecial">(</span>rest-terms L1<span class="synSpecial">)</span> <span class="synSpecial">(</span>rest-terms L2<span class="synSpecial">))))))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>mul-terms L1 L2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>empty-termlist? L1<span class="synSpecial">)</span> <span class="synSpecial">(</span>the-empty-termlist<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>empty-termlist? L2<span class="synSpecial">)</span> <span class="synSpecial">(</span>the-empty-termlist<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span>
         <span class="synSpecial">(</span>add-terms
          <span class="synSpecial">(</span>mul-term-by-all-terms
           <span class="synSpecial">(</span>make-term <span class="synSpecial">(</span>first-term L1<span class="synSpecial">)</span>
                      <span class="synSpecial">(</span>iota <span class="synSpecial">(</span><span class="synIdentifier">length</span> <span class="synSpecial">(</span>rest-terms L1<span class="synSpecial">)</span> <span class="synConstant">0</span> <span class="synConstant">0</span><span class="synSpecial">)))</span>
           L2<span class="synSpecial">)</span>
          <span class="synSpecial">(</span>mul-terms <span class="synSpecial">(</span>rest-terms L1<span class="synSpecial">)</span> L2<span class="synSpecial">)))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>mul-term-by-all-terms t L<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>empty-termlist L<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>rest-terms t<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>add-join-term <span class="synSpecial">(</span>mul <span class="synSpecial">(</span>first-term t<span class="synSpecial">)</span> <span class="synSpecial">(</span>first-term L<span class="synSpecial">))</span>
                     <span class="synSpecial">(</span>mul-term-by-all-terms t <span class="synSpecial">(</span>rest-terms L<span class="synSpecial">)))))</span>
</pre>


