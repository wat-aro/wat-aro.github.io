---
title: "SICP 問題 4.04"
published: 2015/12/18
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; and</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>and? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>and<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>and-clauses <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>eval-and <span class="synIdentifier">exp</span> env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> iter <span class="synSpecial">((</span>clauses <span class="synSpecial">(</span>and-clauses <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> clauses<span class="synSpecial">)</span>
        <span class="synSpecial">'</span>true
        <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>first <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> clauses<span class="synSpecial">)</span> env<span class="synSpecial">)))</span>
          <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> clauses<span class="synSpecial">))</span> first<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>first <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> clauses<span class="synSpecial">)))</span>
                <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">'</span>false<span class="synSpecial">))))))</span>


<span class="synComment">;; or</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>or? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>or<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>or-clauses <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>eval-or <span class="synIdentifier">exp</span> env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> iter <span class="synSpecial">((</span>clauses <span class="synSpecial">(</span>or-clauses <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> clauses<span class="synSpecial">)</span>
        <span class="synSpecial">'</span>false
        <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>first <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> clauses<span class="synSpecial">)</span> env<span class="synSpecial">)))</span>
          <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> clauses<span class="synSpecial">))</span> first<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>first <span class="synSpecial">'</span>true<span class="synSpecial">)</span>
                <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> clauses<span class="synSpecial">))))))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synIdentifier">exp</span> env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>self-evaluating? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
        <span class="synSpecial">((</span>variable? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>lookup-valiable-value <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>quoted? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>text-of-quotation <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">((</span>assignment? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>eval-assignment <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>definition? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>eval-definition <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>if? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>eval-if <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>lambda? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>make-procedure <span class="synSpecial">(</span>lambda-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                                       <span class="synSpecial">(</span>lambda-body <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                                       env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>begin? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span>eval-sequence <span class="synSpecial">(</span>begin-actions <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>cond? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>cond-&gt;if <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>and? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>eval-and <span class="synSpecial">(</span>and-clauses <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>or? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>eval-or <span class="synSpecial">(</span>or-clauses <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>application? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">apply</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>operator <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>list-of-values <span class="synSpecial">(</span>operands <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span>
         <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown expression type: EVAL&quot;</span> <span class="synIdentifier">exp</span><span class="synSpecial">))))</span>

<span class="synComment">;; 派生式としてのandとor</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>and-&gt;if <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>expand-and-clause <span class="synSpecial">(</span>and-clauses <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>expand-and-clause clauses<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> clauses<span class="synSpecial">)</span>
      <span class="synSpecial">'</span>true
      <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>lst-exp? clauses<span class="synSpecial">)</span>
          <span class="synSpecial">(</span>first-exp clauses<span class="synSpecial">)</span> <span class="synComment">;;最後の式の値を返す.</span>
          <span class="synSpecial">(</span>make-if <span class="synSpecial">(</span>first-exp clauses<span class="synSpecial">)</span>
                   <span class="synSpecial">(</span>expand-and-clause <span class="synSpecial">(</span>rest-exps clauses<span class="synSpecial">))</span>
                   <span class="synSpecial">'</span>false<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>or-&gt;if <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>expand-or-clause <span class="synSpecial">(</span>or-clauses <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>expand-or-clause clauses<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> clauses<span class="synSpecial">)</span>
      <span class="synSpecial">'</span>false
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>first <span class="synSpecial">(</span>first-exp clauses<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span>make-if first
                 first
                 <span class="synSpecial">(</span>expand-or-clause <span class="synSpecial">(</span>rest-exps clauses<span class="synSpecial">))))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synIdentifier">exp</span> env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>self-evaluating? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
        <span class="synSpecial">((</span>variable? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>lookup-valiable-value <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>quoted? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>text-of-quotation <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">((</span>assignment? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>eval-assignment <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>definition? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>eval-definition <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>if? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>eval-if <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>lambda? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>make-procedure <span class="synSpecial">(</span>lambda-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                                       <span class="synSpecial">(</span>lambda-body <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                                       env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>begin? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span>eval-sequence <span class="synSpecial">(</span>begin-actions <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>cond? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>cond-&gt;if <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>and? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>and-&gt;if <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>or? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>or-&gt;if <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>application? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">apply</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>operator <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>list-of-values <span class="synSpecial">(</span>operands <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span>
         <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown expression type: EVAL&quot;</span> <span class="synIdentifier">exp</span><span class="synSpecial">))))</span>
</pre>


