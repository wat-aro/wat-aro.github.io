---
title: "SICP 問題 4.50"
published: 2016/01/15
tags:
  - scheme
  - SICP
---

<p>ランダムな順に探すrambを実装する．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span>use srfi-27<span class="synSpecial">)</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>random-car lst<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">list-ref</span> lst <span class="synSpecial">(</span>random-integer <span class="synSpecial">(</span><span class="synIdentifier">length</span> lst<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>rember item lst<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> lst<span class="synSpecial">)</span> <span class="synSpecial">'())</span>
        <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> lst<span class="synSpecial">)</span> item<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lst<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> lst<span class="synSpecial">)</span>
                    <span class="synSpecial">(</span>rember item <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lst<span class="synSpecial">))))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>analyze-amb <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>cprocs <span class="synSpecial">(</span><span class="synIdentifier">map</span> analyze <span class="synSpecial">(</span>amb-choices <span class="synIdentifier">exp</span><span class="synSpecial">))))</span>
    <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>env succeed fail<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>try-next choices<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> choices<span class="synSpecial">)</span>
            <span class="synSpecial">(</span>fail<span class="synSpecial">)</span>
            <span class="synSpecial">((</span><span class="synIdentifier">car</span> choices<span class="synSpecial">)</span> env succeed <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">()</span>
                                         <span class="synSpecial">(</span>try-next <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> choices<span class="synSpecial">))))))</span>
      <span class="synSpecial">(</span>try-next cprocs<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>analyze-ramb <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>cprocs <span class="synSpecial">(</span><span class="synIdentifier">map</span> analyze <span class="synSpecial">(</span>amb-choices <span class="synIdentifier">exp</span><span class="synSpecial">))))</span>
    <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>env succeed fail<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>try-next choices<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> choices<span class="synSpecial">)</span>
            <span class="synSpecial">(</span>fail<span class="synSpecial">)</span>
            <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>first <span class="synSpecial">(</span>random-car choices<span class="synSpecial">)))</span>
              <span class="synSpecial">(</span>first env succeed <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">()</span>
                                   <span class="synSpecial">(</span>try-next <span class="synSpecial">(</span>rember first choices<span class="synSpecial">)))))))</span>
      <span class="synSpecial">(</span>try-next cprocs<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>ramb? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>ramb<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>analyze <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>self-evaluating? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze-self-evaluating <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">((</span>quoted? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze-quoted <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">((</span>variable? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze-variable <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">((</span>assignment? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze-assignment <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">((</span>definition? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze-definition <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">((</span>amb? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze-amb <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">((</span>ramb? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze-ramb <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">((</span>if? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze-if <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">((</span>lambda? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze-lambda <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">((</span>let? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze <span class="synSpecial">(</span>let-&gt;combination <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
        <span class="synSpecial">((</span>begin? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze-sequence <span class="synSpecial">(</span>begin-actions <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
        <span class="synSpecial">((</span>cond? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze <span class="synSpecial">(</span>cond-&gt;if <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
        <span class="synSpecial">((</span>application? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze-application <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown expression type: ANALYZE&quot;</span> <span class="synIdentifier">exp</span><span class="synSpecial">))))</span>
</pre>


<p>test</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;;; Amb-Eval input:</span>
<span class="synSpecial">(</span>ramb <span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span> <span class="synConstant">4</span> <span class="synConstant">5</span> <span class="synConstant">6</span><span class="synSpecial">)</span>

<span class="synComment">;;; Starting a new problem</span>
<span class="synComment">;;; Amb-Eval value:</span>
<span class="synConstant">6</span>

<span class="synComment">;;; Amb-Eval input:</span>
try-again

<span class="synComment">;;; Amb-Eval value:</span>
<span class="synConstant">5</span>

<span class="synComment">;;; Amb-Eval input:</span>
try-again

<span class="synComment">;;; Amb-Eval value:</span>
<span class="synConstant">1</span>

<span class="synComment">;;; Amb-Eval input:</span>
try-again

<span class="synComment">;;; Amb-Eval value:</span>
<span class="synConstant">4</span>
</pre>


