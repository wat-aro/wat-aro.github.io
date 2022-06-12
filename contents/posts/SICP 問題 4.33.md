---
title: "SICP 問題 4.33"
published: 2016/01/10
tags:
  - scheme
  - SICP
---

<p>遅延リストの実装に合わせて，quoteを遅延リストに対応させる．<br/>
<code>(car '(a b c))</code>で正しく<code>a</code>が表示できるようにする．</p>

<p><s>make-lambdaの<code>(make-quote (car obj))</code>のところ，始め<code>(car obj)</code>だけにしていたら，<br/>
数字ではうまくいくのに<code>'(a b c)</code>だとunbound variable: aとなる． <br/>
それならばと<code>(list 'quote (car obj))</code>とすると今度は<code>(car '(1 2 3))</code>が'1になってそれをさらにeval-quoteに渡すのでエラー．<br/>
make-quoteで数字とそれ以外を分けるようにしました．</s><br/>
<code>(symbol? 1)</code>でtrueが返ると思ってたのが間違っていました．<br/>
predicateを追加したらmake-quoteは(list 'quote obj)だけでよくなりました．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synIdentifier">exp</span> env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>self-evaluating? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
        <span class="synSpecial">((</span>variable? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>lookup-variable-value <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>quoted? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>eval-quote <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span> <span class="synComment">;;eval-quoteに変更</span>
        <span class="synSpecial">((</span>assignment? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>eval-assignment <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>definition? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>eval-definition <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>if? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>eval-if <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>lambda? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span>make-procedure <span class="synSpecial">(</span>lambda-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                         <span class="synSpecial">(</span>lambda-body <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                         env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>let? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>let-&gt;combination <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>let*? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>let*-&gt;nested-lets <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>letrec? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>letrec-&gt;let <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>begin? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span>eval-sequence <span class="synSpecial">(</span>begin-actions <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>cond? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>cond-&gt;if <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>and? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>eval-and <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>or? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>eval-or <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>application? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span>my-apply <span class="synSpecial">(</span>actual-value <span class="synSpecial">(</span>operator <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">)</span>
                   <span class="synSpecial">(</span>operands <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                   env<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span>
         <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown expression type --EVAL&quot;</span> <span class="synIdentifier">exp</span><span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-quote obj<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>quote obj<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>quote-body <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>eval-quote <span class="synIdentifier">exp</span> env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>obj <span class="synSpecial">(</span>quote-body <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> obj<span class="synSpecial">)</span> obj<span class="synSpecial">)</span>
          <span class="synSpecial">((</span><span class="synIdentifier">symbol?</span> obj<span class="synSpecial">)</span> obj<span class="synSpecial">)</span>
          <span class="synSpecial">((</span><span class="synIdentifier">number?</span> obj<span class="synSpecial">)</span> obj<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>quote-&gt;cons obj<span class="synSpecial">)</span> env<span class="synSpecial">)))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>quote-&gt;cons obj<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> obj<span class="synSpecial">)</span> <span class="synSpecial">(</span>make-quote obj<span class="synSpecial">))</span>
        <span class="synSpecial">((</span><span class="synIdentifier">symbol?</span> obj<span class="synSpecial">)</span> <span class="synSpecial">(</span>make-quote obj<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>cons <span class="synSpecial">(</span>make-quote <span class="synSpecial">(</span><span class="synIdentifier">car</span> obj<span class="synSpecial">))</span>
                    <span class="synSpecial">(</span>quote-&gt;cons <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> obj<span class="synSpecial">))))))</span>
</pre>


<p>test</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">'(</span><span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span><span class="synSpecial">)</span>

<span class="synComment">;;; M-Eval value:</span>
<span class="synSpecial">(</span>compound-procedure <span class="synSpecial">(</span>m<span class="synSpecial">)</span> <span class="synSpecial">((</span>m x y<span class="synSpecial">))</span> <span class="synConstant">&lt;procedure-env&gt;</span><span class="synSpecial">)</span>

<span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span><span class="synIdentifier">car</span> <span class="synSpecial">'(</span><span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span><span class="synSpecial">))</span>

<span class="synComment">;;; M-Eval value:</span>
<span class="synConstant">1</span>

<span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span><span class="synIdentifier">car</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> <span class="synSpecial">'(</span><span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span><span class="synSpecial">)))</span>

<span class="synComment">;;; M-Eval value:</span>
<span class="synConstant">2</span>

<span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">'(</span>a b c<span class="synSpecial">)</span>

<span class="synComment">;;; M-Eval value:</span>
<span class="synSpecial">(</span>compound-procedure <span class="synSpecial">(</span>m<span class="synSpecial">)</span> <span class="synSpecial">((</span>m x y<span class="synSpecial">))</span> <span class="synConstant">&lt;procedure-env&gt;</span><span class="synSpecial">)</span>

<span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span><span class="synIdentifier">car</span> <span class="synSpecial">'(</span>a b c<span class="synSpecial">))</span>

<span class="synComment">;;; M-Eval value:</span>
a

<span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span><span class="synIdentifier">car</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> <span class="synSpecial">'(</span>a b c<span class="synSpecial">)))</span>

<span class="synComment">;;; M-Eval value:</span>
b

<span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span><span class="synIdentifier">car</span> <span class="synSpecial">'(</span>a b c<span class="synSpecial">))</span>

<span class="synComment">;;; M-Eval value:</span>
a

<span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span><span class="synIdentifier">cdr</span> <span class="synSpecial">'(</span>a<span class="synSpecial">))</span>

<span class="synComment">;;; M-Eval value:</span>
<span class="synSpecial">()</span>

<span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> <span class="synSpecial">'(</span>a<span class="synSpecial">)))</span>

<span class="synComment">;;; M-Eval value:</span>
<span class="synConstant">#t</span>

<span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span><span class="synIdentifier">cdr</span> <span class="synSpecial">'(</span>a <span class="synSpecial">.</span> b<span class="synSpecial">))</span>

<span class="synComment">;;; M-Eval value:</span>
b
</pre>


