---
title: "SICP 問題 4.08"
published: 2015/12/19
tags:
  - scheme
  - SICP
---

<p>let->combinationの変更ですんでいるのでevalは変更しなくていい．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>named-let? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">symbol?</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>named-let-func-name <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>named-let-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">caddr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>named-let-variables <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synIdentifier">car</span> <span class="synSpecial">(</span>named-let-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>named-let-expressions <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synIdentifier">cadr</span> <span class="synSpecial">(</span>named-let-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>named-let-bodys <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdddr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-definition variable value<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>define variable value<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>named-let-&gt;define func-name variables expressions bodys<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>make-begin <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span>make-definition func-name <span class="synSpecial">(</span>make-lambda variables bodys<span class="synSpecial">))</span>
                    <span class="synSpecial">(</span><span class="synIdentifier">cons</span> func-name expressions<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>let-&gt;combination <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">symbol?</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span> <span class="synComment">;; 2番目の要素がシンボルならnamed-let</span>
      <span class="synSpecial">(</span>named-let-&gt;define <span class="synSpecial">(</span>named-let-func-name <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                         <span class="synSpecial">(</span>named-let-variables <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                         <span class="synSpecial">(</span>named-let-expressions <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                         <span class="synSpecial">(</span>named-let-bodys <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
      <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>make-lambda <span class="synSpecial">(</span>let-variables <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                     <span class="synSpecial">(</span>let-bodys <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">(</span>let-expressions <span class="synIdentifier">exp</span><span class="synSpecial">))))</span>
</pre>




<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span>let-&gt;combination <span class="synSpecial">'(</span>let fib-iter <span class="synSpecial">((</span>a <span class="synConstant">1</span><span class="synSpecial">)</span>
                                        <span class="synSpecial">(</span>b <span class="synConstant">0</span><span class="synSpecial">)</span>
                                        <span class="synSpecial">(</span>count n<span class="synSpecial">))</span>
                           <span class="synSpecial">(</span>= <span class="synConstant">1</span> <span class="synConstant">1</span><span class="synSpecial">)</span>
                           <span class="synSpecial">(</span>if <span class="synSpecial">(</span>= count <span class="synConstant">0</span><span class="synSpecial">)</span>
                               b
                               <span class="synSpecial">(</span>fib-iter <span class="synSpecial">(</span>+ a b<span class="synSpecial">)</span> a <span class="synSpecial">(</span>- count <span class="synConstant">1</span><span class="synSpecial">)))))</span>
      <span class="synSpecial">((</span><span class="synStatement">define</span> fib-iter
         <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>a b count<span class="synSpecial">)</span>
           <span class="synSpecial">(</span><span class="synIdentifier">=</span> <span class="synConstant">1</span> <span class="synConstant">1</span><span class="synSpecial">)</span>
           <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> count <span class="synConstant">0</span><span class="synSpecial">)</span>
               b
               <span class="synSpecial">(</span>fib-iter <span class="synSpecial">(</span><span class="synIdentifier">+</span> a b<span class="synSpecial">)</span> a <span class="synSpecial">(</span><span class="synIdentifier">-</span> count <span class="synConstant">1</span><span class="synSpecial">)))))</span>
       <span class="synSpecial">(</span>fib-iter <span class="synConstant">1</span> <span class="synConstant">0</span> n<span class="synSpecial">))</span>
</pre>


