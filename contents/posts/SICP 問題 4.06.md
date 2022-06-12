---
title: "SICP 問題 4.06"
published: 2015/12/19
tags:
  - scheme
  - SICP
---

<p>letを導入．<br/>
lambdaに変形することで定義する．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; (let ((a 1) (b 2) (c 3))</span>
<span class="synComment">;;   (+ a b c))</span>

<span class="synComment">;; ((lambda (a b c)</span>
<span class="synComment">;;    (+ a b c)) 1 2 3)</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>let? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>let<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>let-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>let-variables <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synIdentifier">car</span> <span class="synSpecial">(</span>let-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>let-expressions <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synIdentifier">cadr</span> <span class="synSpecial">(</span>let-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>let-bodys <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cddr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>let-&gt;lambda <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>make-lambda <span class="synSpecial">(</span>let-variables <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                     <span class="synSpecial">(</span>let-bodys <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">(</span>let-expressions <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
</pre>




<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span>let-&gt;lambda <span class="synSpecial">'(</span>let <span class="synSpecial">((</span>var1 exp1<span class="synSpecial">)</span>
                              <span class="synSpecial">(</span>var2 exp2<span class="synSpecial">)</span>
                              <span class="synSpecial">(</span>var3 exp3<span class="synSpecial">))</span>
                          body1
                          body2<span class="synSpecial">))</span>
<span class="synSpecial">((</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>var1 var2 var3<span class="synSpecial">)</span>
   body1
   body2<span class="synSpecial">)</span>
 exp1 exp2 exp3<span class="synSpecial">)</span>
</pre>




<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synIdentifier">exp</span> env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>self-evaluating? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
        <span class="synSpecial">((</span>variable? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>lookup-valiable-value <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>quoted? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>text-of-quotation <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">((</span>assignment? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>eval-assignment <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>definition? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>eval-definition <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>if? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>eval-if <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>lambda? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>make-procedure <span class="synSpecial">(</span>lambda-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                                       <span class="synSpecial">(</span>lambda-body <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                                       env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>let? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>let-&gt;lambda <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">))</span> <span class="synComment">;;letを追加</span>
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


