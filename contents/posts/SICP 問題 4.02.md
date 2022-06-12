---
title: "SICP 問題 4.02"
published: 2015/12/18
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; 本文のeval</span>
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
        <span class="synSpecial">((</span>application? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">apply</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>operator <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>list-of-values <span class="synSpecial">(</span>operands <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span>
         <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown expression type: EVAL&quot;</span> <span class="synIdentifier">exp</span><span class="synSpecial">))))</span>

<span class="synComment">;; evalのcondの順番を変えてapplyをassignmentより前にしようとしている</span>
<span class="synComment">;; a</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> x <span class="synConstant">3</span><span class="synSpecial">)</span>
<span class="synComment">;; (application? exp)は(pair? exp)なので(define x 3)もapplyされる．</span>
<span class="synComment">;; applyの節はすべてのリストにマッチするので最後でないといけない．</span>

<span class="synComment">;; b</span>
<span class="synComment">;; 手続き適用がcallで始まるように構文を変える．</span>
<span class="synComment">;; Louisの希望通り，assignmentよりも前にapplyをもってくる．</span>
<span class="synComment">;; 後はselectorとapplication?を変更すればよい．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synIdentifier">exp</span> env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>self-evaluating? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
        <span class="synSpecial">((</span>variable? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>lookup-valiable-value <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>quoted? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>text-of-quotation <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">((</span>application? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">apply</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>operator <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>list-of-values <span class="synSpecial">(</span>operands <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">)))</span>
        <span class="synSpecial">((</span>assignment? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>eval-assignment <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>definition? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>eval-definition <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>if? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>eval-if <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>lambda? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>make-procedure <span class="synSpecial">(</span>lambda-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                                       <span class="synSpecial">(</span>lambda-body <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                                       env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>begin? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span>eval-sequence <span class="synSpecial">(</span>begin-actions <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>cond? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>cond-&gt;if <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span>
         <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown expression type: EVAL&quot;</span> <span class="synIdentifier">exp</span><span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>application? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>call<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>operator <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>operands <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>csdr <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
</pre>


