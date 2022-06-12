---
title: "SICP 問題 4.52"
published: 2016/01/15
tags:
  - scheme
  - SICP
---

<p>利用者が失敗を捉えることができるif-failを実装する．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>analyze <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>self-evaluating? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze-self-evaluating <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">((</span>quoted? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze-quoted <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">((</span>variable? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze-variable <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">((</span>assignment? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze-assignment <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">((</span>permanent-assignment? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze-permanent-assignment <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">((</span>definition? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze-definition <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">((</span>amb? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze-amb <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">((</span>ramb? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze-ramb <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">((</span>if? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze-if <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">((</span>if-fail? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze-if-fail <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">((</span>lambda? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze-lambda <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">((</span>let? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze <span class="synSpecial">(</span>let-&gt;combination <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
        <span class="synSpecial">((</span>begin? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze-sequence <span class="synSpecial">(</span>begin-actions <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
        <span class="synSpecial">((</span>cond? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze <span class="synSpecial">(</span>cond-&gt;if <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
        <span class="synSpecial">((</span>application? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze-application <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown expression type: ANALYZE&quot;</span> <span class="synIdentifier">exp</span><span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>if-fail? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>if-fail<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>analyze-if-fail <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>proc <span class="synSpecial">(</span>analyze <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
        <span class="synSpecial">(</span>fail-proc <span class="synSpecial">(</span>analyze <span class="synSpecial">(</span><span class="synIdentifier">caddr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))))</span>
    <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>env succeed fail<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>proc env succeed
            <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">()</span>
              <span class="synSpecial">(</span>announce-output output-prompt<span class="synSpecial">)</span>
              <span class="synSpecial">(</span>user-print <span class="synSpecial">(</span>fail-proc env succeed fail<span class="synSpecial">))</span>
              <span class="synSpecial">(</span>driver-loop<span class="synSpecial">))))))</span>
</pre>


<p>test</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;;; Amb-Eval input:</span>
<span class="synSpecial">(</span>if-fail <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>x <span class="synSpecial">(</span>an-element-of <span class="synSpecial">'(</span><span class="synConstant">1</span> <span class="synConstant">3</span> <span class="synConstant">5</span><span class="synSpecial">))))</span>
           <span class="synSpecial">(</span>require <span class="synSpecial">(</span><span class="synIdentifier">even?</span> x<span class="synSpecial">))</span>
           x<span class="synSpecial">)</span>
         <span class="synSpecial">'</span>all-odd<span class="synSpecial">)</span>

<span class="synComment">;;; Starting a new problem</span>
<span class="synComment">;;; Amb-Eval value:</span>
<span class="synSpecial">'</span>all-odd

<span class="synComment">;;; Amb-Eval input:</span>
<span class="synSpecial">(</span>if-fail <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>x <span class="synSpecial">(</span>an-element-of <span class="synSpecial">'(</span><span class="synConstant">1</span> <span class="synConstant">3</span> <span class="synConstant">5</span> <span class="synConstant">8</span><span class="synSpecial">))))</span>
           <span class="synSpecial">(</span>require <span class="synSpecial">(</span><span class="synIdentifier">even?</span> x<span class="synSpecial">))</span>
           x<span class="synSpecial">)</span>
         <span class="synSpecial">'</span>all-odd<span class="synSpecial">)</span>

<span class="synComment">;;; Starting a new problem</span>
<span class="synComment">;;; Amb-Eval value:</span>
<span class="synConstant">8</span>
</pre>


