---
title: "SICP 問題 4.07"
published: 2015/12/19
tags:
  - scheme
  - SICP
---

<p>let*をネストしたletで置き換える．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; (let* ((x 3)</span>
<span class="synComment">;;        (y (+ x 2))</span>
<span class="synComment">;;        (z (+ x y 5)))</span>
<span class="synComment">;;   (* x z))</span>

<span class="synComment">;; (let ((x 3))</span>
<span class="synComment">;;   (let ((y (+ x 2)))</span>
<span class="synComment">;;     (let ((z (+ x y 5)))</span>
<span class="synComment">;;       (* x z))))</span>

<span class="synComment">;; let*</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>let*? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>let*<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>let*-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>let*-variables <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synIdentifier">car</span> <span class="synSpecial">(</span>let*-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>let*-expressions <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synIdentifier">cadr</span> <span class="synSpecial">(</span>let*-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>let*-body <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cddr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-let parameters bodys<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">'</span>let <span class="synSpecial">(</span><span class="synIdentifier">cons</span> parameters bodys<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>let*-&gt;nested-lets <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span>expand-lets <span class="synSpecial">(</span>let-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>let-bodys <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>expand-lets parameters bodys<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> parameters<span class="synSpecial">)</span> <span class="synSpecial">(</span>error <span class="synConstant">&quot;EXPAND-LETS required pair, but &quot;</span> parameters<span class="synSpecial">))</span>
        <span class="synSpecial">((</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> parameters<span class="synSpecial">))</span>
         <span class="synSpecial">(</span>make-let <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> parameters<span class="synSpecial">))</span>
                   bodys<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>make-let <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> parameters<span class="synSpecial">))</span>
                        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span>expand-lets <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> parameters<span class="synSpecial">)</span> bodys<span class="synSpecial">))))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synIdentifier">exp</span> env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>self-evaluating? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
        <span class="synSpecial">((</span>variable? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>lookup-variable-value <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>quoted? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>text-of-quotation <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">((</span>assignment? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>eval-assignment <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>definition? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>eval-definition <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>if? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>eval-if <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>lambda? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>make-procedure <span class="synSpecial">(</span>lambda-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                                       <span class="synSpecial">(</span>lambda-body <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                                       env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>let? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>let-&gt;combination <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>let*? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>let*-&gt;nested-lets <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">))</span> <span class="synComment">;;let*を追加</span>
        <span class="synSpecial">((</span>begin? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span>eval-sequence <span class="synSpecial">(</span>begin-actions <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>cond? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>cond-&gt;if <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>and? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>and-&gt;if <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>or? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>or-&gt;if <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>application? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span>my-apply <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>operator <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">)</span>
                   <span class="synSpecial">(</span>list-of-values <span class="synSpecial">(</span>operands <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span>
         <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown expression type: EVAL&quot;</span> <span class="synIdentifier">exp</span><span class="synSpecial">))))</span>
</pre>




<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span>let*-&gt;nested-lets <span class="synSpecial">'(</span>let* <span class="synSpecial">((</span>x <span class="synConstant">1</span><span class="synSpecial">)</span>
                                 <span class="synSpecial">(</span>y <span class="synSpecial">(</span>+ x x<span class="synSpecial">))</span>
                                 <span class="synSpecial">(</span>z <span class="synSpecial">(</span>* x y<span class="synSpecial">)))</span>
                            <span class="synSpecial">(</span>+ x y z<span class="synSpecial">)</span>
                            <span class="synSpecial">(</span>* x y z<span class="synSpecial">)))</span>
<span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>x <span class="synConstant">1</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>y <span class="synSpecial">(</span><span class="synIdentifier">+</span> x x<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>z <span class="synSpecial">(</span><span class="synIdentifier">*</span> x y<span class="synSpecial">)))</span>
      <span class="synSpecial">(</span><span class="synIdentifier">+</span> x y z<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synIdentifier">*</span> x y z<span class="synSpecial">))))</span>
</pre>


