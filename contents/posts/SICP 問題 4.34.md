---
title: "SICP 問題 4.34"
published: 2016/01/10
tags:
  - scheme
  - SICP
---

<p>遅延対とリストを正当に印字できるようにする．<br/>
consへのタグづけがどうしてもうまくいかなくてここを参考にしました．</p>

<p><a href="https://wqzhang.wordpress.com/2010/04/21/sicp-exercise-4-34/">SICP Exercise 4.34 | Weiqun Zhang&#39;s Blog</a></p>

<p>前回からの変更箇所のみ</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synIdentifier">exp</span> env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>self-evaluating? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
        <span class="synSpecial">((</span>variable? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>lookup-variable-value <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>quoted? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>eval-quote <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>assignment? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>eval-assignment <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>definition? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>eval-definition <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>if? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>eval-if <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>lambda? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span>make-procedure <span class="synSpecial">(</span>lambda-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                         <span class="synSpecial">(</span>lambda-body <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                         env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>list-lambda? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synComment">;;list-lambda?とmake-list-procedureの追加</span>
         <span class="synSpecial">(</span>make-list-procedure <span class="synSpecial">(</span>lambda-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
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

<span class="synComment">;; 追加</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>list-lambda? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>list-lambda<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-list-procedure parameters body env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>list-proc parameters <span class="synSpecial">(</span>scan-out-defines body<span class="synSpecial">)</span> env<span class="synSpecial">))</span>

<span class="synComment">;; list-procに対応</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>compound-procedure? p<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">or</span> <span class="synSpecial">(</span>tagged-list? p <span class="synSpecial">'</span>procedure<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>tagged-list? p <span class="synSpecial">'</span>list-proc<span class="synSpecial">)))</span>

<span class="synComment">;; cons,car,cdrを削除</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> primitive-procedures
  <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>null? <span class="synIdentifier">null?</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>= <span class="synIdentifier">=</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>- <span class="synIdentifier">-</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>+ <span class="synIdentifier">+</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>* <span class="synIdentifier">*</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>/ <span class="synIdentifier">/</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>newline <span class="synIdentifier">newline</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>display <span class="synIdentifier">display</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'()</span> <span class="synSpecial">'())))</span>

<span class="synComment">;; list-procの時はlist-display</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>user-print object<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>tagged-list? object <span class="synSpecial">'</span>list-proc<span class="synSpecial">)</span>
         <span class="synSpecial">(</span>list-display <span class="synSpecial">(</span>match-to object<span class="synSpecial">)))</span>
        <span class="synSpecial">((</span>compound-procedure? object<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">display</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>compound-procedure
                        <span class="synSpecial">(</span>procedure-parameters object<span class="synSpecial">)</span>
                        <span class="synSpecial">(</span>procedure-body object<span class="synSpecial">)</span>
                        <span class="synSpecial">'</span><span class="synConstant">&lt;procedure-env&gt;</span><span class="synSpecial">)))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">display</span> object<span class="synSpecial">))))</span>

<span class="synComment">;; 以下はlist-displayのための手続き</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>match-to obj<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>match obj
    <span class="synSpecial">((</span>procedure <span class="synSpecial">(</span>m<span class="synSpecial">)</span> body <span class="synSpecial">((</span>parameters exp1 exp2<span class="synSpecial">)</span> env<span class="synSpecial">))</span>
     <span class="synSpecial">(</span><span class="synIdentifier">cons</span> exp1 exp2<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>first-list-value <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">display</span> <span class="synSpecial">(</span>force-it <span class="synSpecial">(</span><span class="synIdentifier">car</span> <span class="synIdentifier">exp</span><span class="synSpecial">))))</span>


<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>list-display <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span>list-display-iter <span class="synIdentifier">exp</span> <span class="synConstant">10</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>list-display-iter <span class="synIdentifier">exp</span> n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">=</span> n <span class="synConstant">0</span><span class="synSpecial">)</span>
             <span class="synSpecial">(</span><span class="synIdentifier">display</span> <span class="synConstant">&quot;...)&quot;</span><span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>when <span class="synSpecial">(</span><span class="synIdentifier">=</span> n <span class="synConstant">10</span><span class="synSpecial">)</span>
                <span class="synSpecial">(</span><span class="synIdentifier">display</span> <span class="synConstant">&quot;(&quot;</span><span class="synSpecial">))</span>
              <span class="synSpecial">(</span>continue-display <span class="synIdentifier">exp</span> n<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>continue-display <span class="synIdentifier">exp</span> n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>first-list-value <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>second <span class="synSpecial">(</span>force-it <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))))</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> second<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">display</span> <span class="synConstant">&quot;)&quot;</span><span class="synSpecial">))</span>
          <span class="synSpecial">((</span><span class="synStatement">or</span> <span class="synSpecial">(</span>self-evaluating? second<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">symbol?</span> second<span class="synSpecial">))</span>
           <span class="synSpecial">(</span><span class="synIdentifier">display</span> <span class="synConstant">&quot; . &quot;</span><span class="synSpecial">)</span>
           <span class="synSpecial">(</span><span class="synIdentifier">display</span> second<span class="synSpecial">)</span>
           <span class="synSpecial">(</span><span class="synIdentifier">display</span> <span class="synConstant">&quot;)&quot;</span><span class="synSpecial">))</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">display</span> <span class="synConstant">&quot; &quot;</span><span class="synSpecial">)</span>
                <span class="synSpecial">(</span>list-display-iter <span class="synSpecial">(</span>match-to second<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">1</span><span class="synSpecial">))))))</span>

<span class="synComment">;; 遅延リスト用の手続き</span>
<span class="synSpecial">(</span>actual-value
 <span class="synSpecial">'(</span>begin <span class="synSpecial">(</span>define <span class="synSpecial">(</span>cons x y<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>list-lambda <span class="synSpecial">(</span>m<span class="synSpecial">)</span> <span class="synSpecial">(</span>m x y<span class="synSpecial">)))</span>
         <span class="synSpecial">(</span>define <span class="synSpecial">(</span>car z<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>z <span class="synSpecial">(</span>lambda <span class="synSpecial">(</span>p q<span class="synSpecial">)</span> p<span class="synSpecial">)))</span>
         <span class="synSpecial">(</span>define <span class="synSpecial">(</span>cdr z<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>z <span class="synSpecial">(</span>lambda <span class="synSpecial">(</span>p q<span class="synSpecial">)</span> q<span class="synSpecial">)))</span>

         <span class="synSpecial">(</span>define <span class="synSpecial">(</span>list-ref items n<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>if <span class="synSpecial">(</span>= n <span class="synConstant">0</span><span class="synSpecial">)</span>
               <span class="synSpecial">(</span>car items<span class="synSpecial">)</span>
               <span class="synSpecial">(</span>list-ref <span class="synSpecial">(</span>cdr items<span class="synSpecial">)</span> <span class="synSpecial">(</span>- n <span class="synConstant">1</span><span class="synSpecial">))))</span>

         <span class="synSpecial">(</span>define <span class="synSpecial">(</span>map proc items<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>if <span class="synSpecial">(</span>null? items<span class="synSpecial">)</span>
               <span class="synSpecial">'()</span>
               <span class="synSpecial">(</span>cons <span class="synSpecial">(</span>proc <span class="synSpecial">(</span>car items<span class="synSpecial">))</span>
                     <span class="synSpecial">(</span>map proc <span class="synSpecial">(</span>cdr items<span class="synSpecial">)))))</span>

         <span class="synSpecial">(</span>define <span class="synSpecial">(</span>scale-list items factor<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>map <span class="synSpecial">(</span>lambda <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span>* x factor<span class="synSpecial">))</span>
                items<span class="synSpecial">))</span>

         <span class="synSpecial">(</span>define <span class="synSpecial">(</span>add-lists list1 list2<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>cond <span class="synSpecial">((</span>null? list1<span class="synSpecial">)</span> list2<span class="synSpecial">)</span>
                 <span class="synSpecial">((</span>null? list2<span class="synSpecial">)</span> list1<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span>else <span class="synSpecial">(</span>cons <span class="synSpecial">(</span>+ <span class="synSpecial">(</span>car list1<span class="synSpecial">)</span> <span class="synSpecial">(</span>car list2<span class="synSpecial">))</span>
                             <span class="synSpecial">(</span>add-lists <span class="synSpecial">(</span>cdr list1<span class="synSpecial">)</span> <span class="synSpecial">(</span>cdr list2<span class="synSpecial">))))))</span>
         <span class="synSpecial">(</span>define ones <span class="synSpecial">(</span>cons <span class="synConstant">1</span> ones<span class="synSpecial">))</span>

         <span class="synSpecial">(</span>define integers <span class="synSpecial">(</span>cons <span class="synConstant">0</span> <span class="synSpecial">(</span>add-lists ones integers<span class="synSpecial">)))</span>

         <span class="synSpecial">(</span>define <span class="synSpecial">(</span>integral integrand initial-value dt<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>define int
             <span class="synSpecial">(</span>cons initial-value
                   <span class="synSpecial">(</span>add-lists <span class="synSpecial">(</span>scale-list integrand dt<span class="synSpecial">)</span>
                              int<span class="synSpecial">)))</span>
           int<span class="synSpecial">)</span>

         <span class="synSpecial">(</span>define <span class="synSpecial">(</span>solve f y0 dt<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>define y <span class="synSpecial">(</span>integral dy y0 dt<span class="synSpecial">))</span>
           <span class="synSpecial">(</span>define dy <span class="synSpecial">(</span>map f y<span class="synSpecial">))</span>
           y<span class="synSpecial">)</span>


         <span class="synSpecial">)</span>
 the-global-environment<span class="synSpecial">)</span>
</pre>


<p>test</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;;; M-Eval input:</span>
ones

<span class="synComment">;;; M-Eval value:</span>
<span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synConstant">1</span> <span class="synConstant">1</span> <span class="synConstant">1</span> <span class="synConstant">1</span> <span class="synConstant">1</span> <span class="synConstant">1</span> <span class="synConstant">1</span> <span class="synConstant">1</span> <span class="synConstant">1</span> ...<span class="synSpecial">)</span>

<span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synConstant">1</span> <span class="synConstant">2</span><span class="synSpecial">)</span>

<span class="synComment">;;; M-Eval value:</span>
<span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synSpecial">.</span> <span class="synConstant">2</span><span class="synSpecial">)</span>

<span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">'</span>a <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">'</span>b <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">'</span>c <span class="synSpecial">'</span>d<span class="synSpecial">)))</span>

<span class="synComment">;;; M-Eval value:</span>
<span class="synSpecial">(</span>a b c <span class="synSpecial">.</span> d<span class="synSpecial">)</span>

<span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">'</span>a <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">'</span>b <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">'</span>c <span class="synSpecial">'())))</span>

<span class="synComment">;;; M-Eval value:</span>
<span class="synSpecial">(</span>a b c<span class="synSpecial">)</span>

<span class="synComment">;;; M-Eval input:</span>
integers

<span class="synComment">;;; M-Eval value:</span>
<span class="synSpecial">(</span><span class="synConstant">0</span> <span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span> <span class="synConstant">4</span> <span class="synConstant">5</span> <span class="synConstant">6</span> <span class="synConstant">7</span> <span class="synConstant">8</span> <span class="synConstant">9</span> ...<span class="synSpecial">)</span>

<span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">'(</span><span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span><span class="synSpecial">)</span>

<span class="synComment">;;; M-Eval value:</span>
<span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span><span class="synSpecial">)</span>

<span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">'()</span>

<span class="synComment">;;; M-Eval value:</span>
<span class="synSpecial">()</span>

<span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">'()</span> <span class="synSpecial">'())</span>

<span class="synComment">;;; M-Eval value:</span>
<span class="synSpecial">(())</span>
</pre>


<p>以下がこの遅延評価器の全文</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span>use util.match<span class="synSpecial">)</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> true <span class="synConstant">#t</span><span class="synSpecial">)</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> false <span class="synConstant">#f</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synIdentifier">exp</span> env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>self-evaluating? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
        <span class="synSpecial">((</span>variable? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>lookup-variable-value <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>quoted? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>eval-quote <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>assignment? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>eval-assignment <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>definition? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>eval-definition <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>if? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>eval-if <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>lambda? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span>make-procedure <span class="synSpecial">(</span>lambda-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                         <span class="synSpecial">(</span>lambda-body <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                         env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>list-lambda? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synComment">;;list-lambda?とmake-list-procedureの追加</span>
         <span class="synSpecial">(</span>make-list-procedure <span class="synSpecial">(</span>lambda-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
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

<span class="synComment">;; メモ化する評価器</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>force-it obj<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>thunk? obj<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>result <span class="synSpecial">(</span>actual-value <span class="synSpecial">(</span>thunk-exp obj<span class="synSpecial">)</span>
                                     <span class="synSpecial">(</span>thunk-env obj<span class="synSpecial">))))</span>
           <span class="synSpecial">(</span><span class="synIdentifier">set-car!</span> obj <span class="synSpecial">'</span>evaluated-thunk<span class="synSpecial">)</span>
           <span class="synSpecial">(</span><span class="synIdentifier">set-car!</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> obj<span class="synSpecial">)</span> result<span class="synSpecial">)</span> <span class="synComment">;;expをその値で置き換える</span>
           <span class="synSpecial">(</span><span class="synIdentifier">set-cdr!</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> obj<span class="synSpecial">)</span> <span class="synSpecial">'())</span>    <span class="synComment">;;必要のなくなったenvを忘れる</span>
           result<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>evaluated-thunk? obj<span class="synSpecial">)</span> <span class="synSpecial">(</span>thunk-value obj<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> obj<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>delay-it <span class="synIdentifier">exp</span> env<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>thunk <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>thunk? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>thunk<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>thunk-exp thunk<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> thunk<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>thunk-env thunk<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">caddr</span> thunk<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>evaluated-thunk? obj<span class="synSpecial">)</span> <span class="synSpecial">(</span>tagged-list? obj <span class="synSpecial">'</span>evaluated-thunk<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>thunk-value evaluated-thunk<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> evaluated-thunk<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>actual-value <span class="synIdentifier">exp</span> env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>force-it <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synIdentifier">exp</span> env<span class="synSpecial">)))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>foo bar<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>bar <span class="synSpecial">'</span>a<span class="synSpecial">))</span>

<span class="synComment">;; apply</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>my-apply procedure arguments env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>primitive-procedure? procedure<span class="synSpecial">)</span>
         <span class="synSpecial">(</span>apply-primitive-procedure
          procedure
          <span class="synSpecial">(</span>list-of-arg-values arguments env<span class="synSpecial">)))</span> <span class="synComment">; changed</span>
        <span class="synSpecial">((</span>compound-procedure? procedure<span class="synSpecial">)</span>
         <span class="synSpecial">(</span>eval-sequence
          <span class="synSpecial">(</span>procedure-body procedure<span class="synSpecial">)</span>
          <span class="synSpecial">(</span>extend-environment <span class="synSpecial">(</span>procedure-parameters procedure<span class="synSpecial">)</span>
                              <span class="synSpecial">(</span>list-of-delayed-args arguments env<span class="synSpecial">)</span> <span class="synComment">; changed</span>
                              <span class="synSpecial">(</span>procedure-environment procedure<span class="synSpecial">))))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown procedure type: APPLY&quot;</span> procedure<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>list-of-arg-values exps env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>no-operands? exps<span class="synSpecial">)</span>
      <span class="synSpecial">'()</span>
      <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>actual-value <span class="synSpecial">(</span>first-operand exps<span class="synSpecial">)</span> env<span class="synSpecial">)</span>
            <span class="synSpecial">(</span>list-of-arg-values <span class="synSpecial">(</span>rest-operands exps<span class="synSpecial">)</span> env<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>list-of-delayed-args exps env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>no-operands? exps<span class="synSpecial">)</span>
      <span class="synSpecial">'()</span>
      <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>delay-it <span class="synSpecial">(</span>first-operand exps<span class="synSpecial">)</span> env<span class="synSpecial">)</span>
            <span class="synSpecial">(</span>list-of-delayed-args <span class="synSpecial">(</span>rest-operands exps<span class="synSpecial">)</span> env<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>eval-if <span class="synIdentifier">exp</span> env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>true? <span class="synSpecial">(</span>actual-value <span class="synSpecial">(</span>if-predicate <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">))</span>
      <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>if-consequent <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>if-alternative <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">)))</span>

<span class="synComment">;; 並び</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>eval-sequence exps env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>last-exp? exps<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>first-exp exps<span class="synSpecial">)</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>first-exp exps<span class="synSpecial">)</span> env<span class="synSpecial">)</span>
              <span class="synSpecial">(</span>eval-sequence <span class="synSpecial">(</span>rest-exps exps<span class="synSpecial">)</span> env<span class="synSpecial">))))</span>

<span class="synComment">;; 代入</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>eval-assignment <span class="synIdentifier">exp</span> env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>set-variable-value! <span class="synSpecial">(</span>assignment-variable <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                       <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>assignment-value <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">)</span>
                       env<span class="synSpecial">)</span>
  <span class="synSpecial">'</span>ok<span class="synSpecial">)</span>

<span class="synComment">;; 定義</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>eval-definition <span class="synIdentifier">exp</span> env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>define-variable!
    <span class="synSpecial">(</span>definition-variable <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>definition-value <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">)</span>
    env<span class="synSpecial">)</span>
  <span class="synSpecial">'</span>ok<span class="synSpecial">)</span>

<span class="synComment">;; 自己評価式</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>self-evaluating? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">number?</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span> true<span class="synSpecial">)</span>
        <span class="synSpecial">((</span><span class="synIdentifier">string?</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span> true<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> false<span class="synSpecial">)))</span>

<span class="synComment">;; 変数</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>variable? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">symbol?</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>

<span class="synComment">;; クオート</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>quoted? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>quote<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-quote obj<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>quote obj<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>quote-body <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>eval-quote <span class="synIdentifier">exp</span> env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>obj <span class="synSpecial">(</span>quote-body <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> obj<span class="synSpecial">)</span> obj<span class="synSpecial">)</span>
          <span class="synSpecial">((</span><span class="synIdentifier">symbol?</span> obj<span class="synSpecial">)</span> obj<span class="synSpecial">)</span>
          <span class="synSpecial">((</span>self-evaluating? obj<span class="synSpecial">)</span> obj<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>quote-&gt;cons obj<span class="synSpecial">)</span> env<span class="synSpecial">)))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>quote-&gt;cons obj<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> obj<span class="synSpecial">)</span> <span class="synSpecial">(</span>make-quote obj<span class="synSpecial">))</span>
        <span class="synSpecial">((</span><span class="synIdentifier">symbol?</span> obj<span class="synSpecial">)</span> <span class="synSpecial">(</span>make-quote obj<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>cons <span class="synSpecial">(</span>make-quote <span class="synSpecial">(</span><span class="synIdentifier">car</span> obj<span class="synSpecial">))</span>
                    <span class="synSpecial">(</span>quote-&gt;cons <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> obj<span class="synSpecial">))))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> tag<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">pair?</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span> tag<span class="synSpecial">)</span>
      false<span class="synSpecial">))</span>

<span class="synComment">;; 代入</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>assignment? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>set!<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>assignment-variable <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>assignment-value <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">caddr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>

<span class="synComment">;; 定義</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>definition? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>define<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>definition-variable <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">symbol?</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
      <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synIdentifier">caadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>definition-value <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">symbol?</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
      <span class="synSpecial">(</span><span class="synIdentifier">caddr</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
      <span class="synSpecial">(</span>make-lambda <span class="synSpecial">(</span><span class="synIdentifier">cdadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synComment">;;仮パラメタ</span>
                   <span class="synSpecial">(</span><span class="synIdentifier">cddr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))))</span> <span class="synComment">;;本体</span>

<span class="synComment">;; lambda式</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>lambda? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>lambda<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>lambda-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>lambda-body <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cddr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-lambda parameters body<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">'</span>lambda <span class="synSpecial">(</span><span class="synIdentifier">cons</span> parameters body<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>def-body-list proc-body<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> iter <span class="synSpecial">((</span>proc-body proc-body<span class="synSpecial">)</span>
             <span class="synSpecial">(</span>def <span class="synSpecial">'())</span>
             <span class="synSpecial">(</span>body <span class="synSpecial">'()))</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> proc-body<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">reverse</span> def<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">reverse</span> body<span class="synSpecial">)))</span>
          <span class="synSpecial">((</span>definition? <span class="synSpecial">(</span><span class="synIdentifier">car</span> proc-body<span class="synSpecial">))</span> <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> proc-body<span class="synSpecial">)</span>
                                               <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> proc-body<span class="synSpecial">)</span> def<span class="synSpecial">)</span>
                                               body<span class="synSpecial">))</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> proc-body<span class="synSpecial">)</span>
                      def
                      <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> proc-body<span class="synSpecial">)</span> body<span class="synSpecial">))))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>list-lambda? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>list-lambda<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-list-procedure parameters body env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>list-proc parameters <span class="synSpecial">(</span>scan-out-defines body<span class="synSpecial">)</span> env<span class="synSpecial">))</span>

<span class="synComment">;; 4.17</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>scan-out-defines body<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>split-def-body proc-body<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> iter <span class="synSpecial">((</span>proc-body proc-body<span class="synSpecial">)</span>
               <span class="synSpecial">(</span>def <span class="synSpecial">'())</span>
               <span class="synSpecial">(</span>body <span class="synSpecial">'()))</span>
      <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> proc-body<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">reverse</span> def<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">reverse</span> body<span class="synSpecial">)))</span>
            <span class="synSpecial">((</span>definition? <span class="synSpecial">(</span><span class="synIdentifier">car</span> proc-body<span class="synSpecial">))</span> <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> proc-body<span class="synSpecial">)</span>
                                                 <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> proc-body<span class="synSpecial">)</span> def<span class="synSpecial">)</span>
                                                 body<span class="synSpecial">))</span>
            <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> proc-body<span class="synSpecial">)</span>
                        def
                        <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> proc-body<span class="synSpecial">)</span> body<span class="synSpecial">))))))</span>
  <span class="synSpecial">(</span><span class="synStatement">let*</span> <span class="synSpecial">((</span>def-body-list <span class="synSpecial">(</span>split-def-body body<span class="synSpecial">))</span>
         <span class="synSpecial">(</span>def-list <span class="synSpecial">(</span><span class="synIdentifier">car</span> def-body-list<span class="synSpecial">))</span>
         <span class="synSpecial">(</span>body-list <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> def-body-list<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> def-list<span class="synSpecial">)</span>
        body
        <span class="synSpecial">(</span><span class="synIdentifier">append</span>  <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span>make-definition <span class="synSpecial">(</span>definition-variable x<span class="synSpecial">)</span> <span class="synSpecial">''</span><span class="synConstant">*unassigned*</span><span class="synSpecial">))</span>
                    def-list<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>set! <span class="synSpecial">(</span>definition-variable x<span class="synSpecial">)</span>
                                        <span class="synSpecial">(</span>definition-value x<span class="synSpecial">)))</span>
                      def-list<span class="synSpecial">)</span>
                 body-list<span class="synSpecial">))))</span>

<span class="synComment">;; if</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>if? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>if<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>if-predicate <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>if-consequent <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">caddr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>if-alternative <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span><span class="synIdentifier">cdddr</span> <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
      <span class="synSpecial">(</span><span class="synIdentifier">cadddr</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
      <span class="synSpecial">'</span>false<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-if predicate consequent alternative<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>if predicate consequent alternative<span class="synSpecial">))</span>

<span class="synComment">;; begin</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>begin? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>begin<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>begin-actions <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>last-exp? seq<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> seq<span class="synSpecial">)))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>first-exp seq<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> seq<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>rest-exps seq<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> seq<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>sequence-&gt;exp seq<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> seq<span class="synSpecial">)</span> seq<span class="synSpecial">)</span>
        <span class="synSpecial">((</span>last-exp? seq<span class="synSpecial">)</span> <span class="synSpecial">(</span>first-exp seq<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>make-begin seq<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-begin seq<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">'</span>begin seq<span class="synSpecial">))</span>


<span class="synComment">;; 任意の合成式</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>application? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">pair?</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>operator <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>operands <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>no-operands? ops<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> ops<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>first-operand ops<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> ops<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>rest-operands ops<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> ops<span class="synSpecial">))</span>

<span class="synComment">;; 派生式</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>cond? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>cond<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>cond-clauses <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>cond-else-clause? clause<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span>cond-predicate clause<span class="synSpecial">)</span> <span class="synSpecial">'</span>else<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>cond-predicate clause<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> clause<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>cond-actions clause<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> clause<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>cond-&gt;if <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span>expand-clauses <span class="synSpecial">(</span>cond-clauses <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>expand-clauses clauses<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> clauses<span class="synSpecial">)</span>
      <span class="synSpecial">'</span>false
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>first <span class="synSpecial">(</span><span class="synIdentifier">car</span> clauses<span class="synSpecial">))</span>
            <span class="synSpecial">(</span>rest <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> clauses<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>cond-else-clause? first<span class="synSpecial">)</span>
            <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> rest<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>sequence-&gt;exp <span class="synSpecial">(</span>cond-actions first<span class="synSpecial">))</span>
                <span class="synSpecial">(</span>error <span class="synConstant">&quot;ELSE clause isn't last -- COND-&gt;IF&quot;</span> clauses<span class="synSpecial">))</span>
            <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>action <span class="synSpecial">(</span>cond-actions first<span class="synSpecial">))</span>
                  <span class="synSpecial">(</span>predicate <span class="synSpecial">(</span>cond-predicate first<span class="synSpecial">)))</span>
              <span class="synSpecial">(</span>make-if predicate
                       <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> action<span class="synSpecial">)</span> <span class="synSpecial">'</span>=&gt;<span class="synSpecial">)</span>
                           <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> action<span class="synSpecial">)</span> predicate<span class="synSpecial">)</span>
                           <span class="synSpecial">(</span>sequence-&gt;exp action<span class="synSpecial">))</span>
                       <span class="synSpecial">(</span>expand-clauses rest<span class="synSpecial">)))))))</span>

<span class="synComment">;; and</span>
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


<span class="synComment">;; let</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>let? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>let<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>let-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>let-variables <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synIdentifier">car</span> <span class="synSpecial">(</span>let-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>let-expressions <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synIdentifier">cadr</span> <span class="synSpecial">(</span>let-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>let-bodys <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cddr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>let-&gt;combination <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">symbol?</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span> <span class="synComment">;; 2番目の要素がシンボルならnamed-let</span>
      <span class="synSpecial">(</span>named-let-&gt;define <span class="synSpecial">(</span>named-let-func-name <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                         <span class="synSpecial">(</span>named-let-variables <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                         <span class="synSpecial">(</span>named-let-expressions <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                         <span class="synSpecial">(</span>named-let-bodys <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
      <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>make-lambda <span class="synSpecial">(</span>let-variables <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                     <span class="synSpecial">(</span>let-bodys <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">(</span>let-expressions <span class="synIdentifier">exp</span><span class="synSpecial">))))</span>

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


<span class="synComment">;; named-let</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>named-let? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">symbol?</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
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

<span class="synComment">;; 4.20</span>
<span class="synComment">;; 選択子</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>letrec? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>letrec<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>letrec-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>letrec-variables <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synIdentifier">car</span> <span class="synSpecial">(</span>letrec-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>letrec-expressions <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synIdentifier">cadr</span> <span class="synSpecial">(</span>letrec-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>letrec-body <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cddr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>letrec-&gt;let <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span>make-let <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> x <span class="synSpecial">''</span><span class="synConstant">*unassigned*</span><span class="synSpecial">))</span>
                 <span class="synSpecial">(</span>letrec-variables <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
            <span class="synSpecial">(</span><span class="synIdentifier">append</span> <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x y<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>set! x y<span class="synSpecial">))</span>
                         <span class="synSpecial">(</span>letrec-variables <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                         <span class="synSpecial">(</span>letrec-expressions <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
                    <span class="synSpecial">(</span>letrec-body <span class="synIdentifier">exp</span><span class="synSpecial">))))</span>

<span class="synComment">;; 術後のテスト</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>true? x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> x <span class="synSpecial">'</span><span class="synConstant">#f</span><span class="synSpecial">)))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>false? x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> x <span class="synSpecial">'</span><span class="synConstant">#f</span><span class="synSpecial">))</span>

<span class="synComment">;; 手続きの表現</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-procedure parameters body env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>procedure parameters <span class="synSpecial">(</span>scan-out-defines body<span class="synSpecial">)</span> env<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>compound-procedure? p<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">or</span> <span class="synSpecial">(</span>tagged-list? p <span class="synSpecial">'</span>procedure<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>tagged-list? p <span class="synSpecial">'</span>list-proc<span class="synSpecial">)))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>procedure-parameters p<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> p<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>procedure-body p<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">caddr</span> p<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>procedure-environment p<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadddr</span> p<span class="synSpecial">))</span>

<span class="synComment">;; 環境に対する操作</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>enclosing-environment env<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> env<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>first-frame env<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> env<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> the-empty-environment <span class="synSpecial">'())</span>

<span class="synComment">;; フレーム</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-frame variables <span class="synIdentifier">values</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">cons</span> variables <span class="synIdentifier">values</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>frame-variables frame<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> frame<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>frame-values frame<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> frame<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>add-binding-to-frame! var val frame<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">set-car!</span> frame <span class="synSpecial">(</span><span class="synIdentifier">cons</span> var <span class="synSpecial">(</span>frame-variables frame<span class="synSpecial">)))</span>
  <span class="synSpecial">(</span><span class="synIdentifier">set-cdr!</span> frame <span class="synSpecial">(</span><span class="synIdentifier">cons</span> val <span class="synSpecial">(</span>frame-values frame<span class="synSpecial">))))</span>

<span class="synComment">;; 変数を値に対応づける新しいフレーム</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>extend-environment vars vals base-env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> <span class="synSpecial">(</span><span class="synIdentifier">length</span> vars<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">length</span> vals<span class="synSpecial">))</span>
      <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>make-frame vars vals<span class="synSpecial">)</span> base-env<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">&lt;</span> <span class="synSpecial">(</span><span class="synIdentifier">length</span> vars<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">length</span> vals<span class="synSpecial">))</span>
          <span class="synSpecial">(</span>error <span class="synConstant">&quot;Too many arguments supplied&quot;</span> vars vals<span class="synSpecial">)</span>
          <span class="synSpecial">(</span>error <span class="synConstant">&quot;Too few arguments supplied&quot;</span> vars vals<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>lookup-variable-value var env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>env-loop env<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>scan vars vals<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> vars<span class="synSpecial">)</span>
             <span class="synSpecial">(</span>env-loop <span class="synSpecial">(</span>enclosing-environment env<span class="synSpecial">)))</span>
            <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> var <span class="synSpecial">(</span><span class="synIdentifier">car</span> vars<span class="synSpecial">))</span>
             <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> vals<span class="synSpecial">)</span> <span class="synSpecial">'</span><span class="synConstant">*unassigned*</span><span class="synSpecial">)</span>
                 <span class="synSpecial">(</span>error <span class="synConstant">&quot;*Unassigned* variable&quot;</span> var<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span><span class="synIdentifier">car</span> vals<span class="synSpecial">)))</span>
            <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>scan <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> vars<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> vals<span class="synSpecial">)))))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> env the-empty-environment<span class="synSpecial">)</span>
        <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unbound variable&quot;</span> var<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>frame <span class="synSpecial">(</span>first-frame env<span class="synSpecial">)))</span>
          <span class="synSpecial">(</span>scan <span class="synSpecial">(</span>frame-variables frame<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>frame-values frame<span class="synSpecial">)))))</span>
  <span class="synSpecial">(</span>env-loop env<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>set-variable-value! var val env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>env-loop env<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>scan vars vals<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> vars<span class="synSpecial">)</span>
             <span class="synSpecial">(</span>env-loop <span class="synSpecial">(</span>enclosing-environment env<span class="synSpecial">)))</span>
            <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> var <span class="synSpecial">(</span><span class="synIdentifier">car</span> vars<span class="synSpecial">))</span>
             <span class="synSpecial">(</span><span class="synIdentifier">set-car!</span> vals val<span class="synSpecial">))</span>
            <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>scan <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> vars<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> vals<span class="synSpecial">)))))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> env the-empty-environment<span class="synSpecial">)</span>
        <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unbound variable -- SET!&quot;</span> var<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>frame <span class="synSpecial">(</span>first-frame env<span class="synSpecial">)))</span>
          <span class="synSpecial">(</span>scan <span class="synSpecial">(</span>frame-variables frame<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>frame-values frame<span class="synSpecial">)))))</span>
  <span class="synSpecial">(</span>env-loop env<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>define-variable! var val env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>frame <span class="synSpecial">(</span>first-frame env<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>scan vars vals<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> vars<span class="synSpecial">)</span>
             <span class="synSpecial">(</span>add-binding-to-frame! var val frame<span class="synSpecial">))</span>
            <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> var <span class="synSpecial">(</span><span class="synIdentifier">car</span> vars<span class="synSpecial">))</span>
             <span class="synSpecial">(</span><span class="synIdentifier">set-car!</span> vals val<span class="synSpecial">))</span>
            <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>scan <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> vars<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> vals<span class="synSpecial">)))))</span>
    <span class="synSpecial">(</span>scan <span class="synSpecial">(</span>frame-variables frame<span class="synSpecial">)</span>
          <span class="synSpecial">(</span>frame-values frame<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>primitive-procedure? proc<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>tagged-list? proc <span class="synSpecial">'</span>primitive<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>primitive-implementation proc<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> proc<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> primitive-procedures
  <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>null? <span class="synIdentifier">null?</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>= <span class="synIdentifier">=</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>- <span class="synIdentifier">-</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>+ <span class="synIdentifier">+</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>* <span class="synIdentifier">*</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>/ <span class="synIdentifier">/</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>newline <span class="synIdentifier">newline</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>display <span class="synIdentifier">display</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'()</span> <span class="synSpecial">'())))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>primitive-procedure-names<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synIdentifier">car</span> primitive-procedures<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>primitive-procedure-objects<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>proc<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>primitive <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> proc<span class="synSpecial">)))</span>
       primitive-procedures<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>apply-primitive-procedure proc args<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>apply-in-underlying-scheme
   <span class="synSpecial">(</span>primitive-implementation proc<span class="synSpecial">)</span> args<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> apply-in-underlying-scheme <span class="synIdentifier">apply</span><span class="synSpecial">)</span>

<span class="synComment">;; 環境</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>setup-environment<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>initial-env
         <span class="synSpecial">(</span>extend-environment <span class="synSpecial">(</span>primitive-procedure-names<span class="synSpecial">)</span>
                             <span class="synSpecial">(</span>primitive-procedure-objects<span class="synSpecial">)</span>
                             the-empty-environment<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span>define-variable! <span class="synSpecial">'</span>true <span class="synConstant">#t</span> initial-env<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>define-variable! <span class="synSpecial">'</span>false <span class="synConstant">#f</span> initial-env<span class="synSpecial">)</span>
    initial-env<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> the-global-environment <span class="synSpecial">(</span>setup-environment<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> input-prompt <span class="synConstant">&quot;;;; M-Eval input:&quot;</span><span class="synSpecial">)</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> output-prompt <span class="synConstant">&quot;;;; M-Eval value:&quot;</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>driver-loop<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>prompt-for-input input-prompt<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>input <span class="synSpecial">(</span><span class="synIdentifier">read</span><span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>output <span class="synSpecial">(</span>actual-value input the-global-environment<span class="synSpecial">)))</span>
      <span class="synSpecial">(</span>announce-output output-prompt<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>user-print output<span class="synSpecial">)))</span>
  <span class="synSpecial">(</span>driver-loop<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>prompt-for-input <span class="synIdentifier">string</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">newline</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">newline</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">display</span> <span class="synIdentifier">string</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">newline</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>announce-output <span class="synIdentifier">string</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">newline</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">display</span> <span class="synIdentifier">string</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">newline</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>user-print object<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>tagged-list? object <span class="synSpecial">'</span>list-proc<span class="synSpecial">)</span>
         <span class="synSpecial">(</span>list-display <span class="synSpecial">(</span>match-to object<span class="synSpecial">)))</span>
        <span class="synSpecial">((</span>compound-procedure? object<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">display</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>compound-procedure
                        <span class="synSpecial">(</span>procedure-parameters object<span class="synSpecial">)</span>
                        <span class="synSpecial">(</span>procedure-body object<span class="synSpecial">)</span>
                        <span class="synSpecial">'</span><span class="synConstant">&lt;procedure-env&gt;</span><span class="synSpecial">)))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">display</span> object<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>match-to obj<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>match obj
    <span class="synSpecial">((</span>procedure <span class="synSpecial">(</span>m<span class="synSpecial">)</span> body <span class="synSpecial">((</span>parameters exp1 exp2<span class="synSpecial">)</span> env<span class="synSpecial">))</span>
     <span class="synSpecial">(</span><span class="synIdentifier">cons</span> exp1 exp2<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>first-list-value <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">display</span> <span class="synSpecial">(</span>force-it <span class="synSpecial">(</span><span class="synIdentifier">car</span> <span class="synIdentifier">exp</span><span class="synSpecial">))))</span>


<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>list-display <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span>list-display-iter <span class="synIdentifier">exp</span> <span class="synConstant">10</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>list-display-iter <span class="synIdentifier">exp</span> n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">=</span> n <span class="synConstant">0</span><span class="synSpecial">)</span>
             <span class="synSpecial">(</span><span class="synIdentifier">display</span> <span class="synConstant">&quot;...)&quot;</span><span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>when <span class="synSpecial">(</span><span class="synIdentifier">=</span> n <span class="synConstant">10</span><span class="synSpecial">)</span>
                <span class="synSpecial">(</span><span class="synIdentifier">display</span> <span class="synConstant">&quot;(&quot;</span><span class="synSpecial">))</span>
              <span class="synSpecial">(</span>continue-display <span class="synIdentifier">exp</span> n<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>continue-display <span class="synIdentifier">exp</span> n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>first-list-value <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>second <span class="synSpecial">(</span>force-it <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))))</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> second<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">display</span> <span class="synConstant">&quot;)&quot;</span><span class="synSpecial">))</span>
          <span class="synSpecial">((</span><span class="synStatement">or</span> <span class="synSpecial">(</span>self-evaluating? second<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">symbol?</span> second<span class="synSpecial">))</span>
           <span class="synSpecial">(</span><span class="synIdentifier">display</span> <span class="synConstant">&quot; . &quot;</span><span class="synSpecial">)</span>
           <span class="synSpecial">(</span><span class="synIdentifier">display</span> second<span class="synSpecial">)</span>
           <span class="synSpecial">(</span><span class="synIdentifier">display</span> <span class="synConstant">&quot;)&quot;</span><span class="synSpecial">))</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">display</span> <span class="synConstant">&quot; &quot;</span><span class="synSpecial">)</span>
                <span class="synSpecial">(</span>list-display-iter <span class="synSpecial">(</span>match-to second<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">1</span><span class="synSpecial">))))))</span>


<span class="synSpecial">(</span>actual-value
 <span class="synSpecial">'(</span>begin <span class="synSpecial">(</span>define <span class="synSpecial">(</span>cons x y<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>list-lambda <span class="synSpecial">(</span>m<span class="synSpecial">)</span> <span class="synSpecial">(</span>m x y<span class="synSpecial">)))</span>
         <span class="synSpecial">(</span>define <span class="synSpecial">(</span>car z<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>z <span class="synSpecial">(</span>lambda <span class="synSpecial">(</span>p q<span class="synSpecial">)</span> p<span class="synSpecial">)))</span>
         <span class="synSpecial">(</span>define <span class="synSpecial">(</span>cdr z<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>z <span class="synSpecial">(</span>lambda <span class="synSpecial">(</span>p q<span class="synSpecial">)</span> q<span class="synSpecial">)))</span>

         <span class="synSpecial">(</span>define <span class="synSpecial">(</span>list-ref items n<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>if <span class="synSpecial">(</span>= n <span class="synConstant">0</span><span class="synSpecial">)</span>
               <span class="synSpecial">(</span>car items<span class="synSpecial">)</span>
               <span class="synSpecial">(</span>list-ref <span class="synSpecial">(</span>cdr items<span class="synSpecial">)</span> <span class="synSpecial">(</span>- n <span class="synConstant">1</span><span class="synSpecial">))))</span>

         <span class="synSpecial">(</span>define <span class="synSpecial">(</span>map proc items<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>if <span class="synSpecial">(</span>null? items<span class="synSpecial">)</span>
               <span class="synSpecial">'()</span>
               <span class="synSpecial">(</span>cons <span class="synSpecial">(</span>proc <span class="synSpecial">(</span>car items<span class="synSpecial">))</span>
                     <span class="synSpecial">(</span>map proc <span class="synSpecial">(</span>cdr items<span class="synSpecial">)))))</span>

         <span class="synSpecial">(</span>define <span class="synSpecial">(</span>scale-list items factor<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>map <span class="synSpecial">(</span>lambda <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span>* x factor<span class="synSpecial">))</span>
                items<span class="synSpecial">))</span>

         <span class="synSpecial">(</span>define <span class="synSpecial">(</span>add-lists list1 list2<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>cond <span class="synSpecial">((</span>null? list1<span class="synSpecial">)</span> list2<span class="synSpecial">)</span>
                 <span class="synSpecial">((</span>null? list2<span class="synSpecial">)</span> list1<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span>else <span class="synSpecial">(</span>cons <span class="synSpecial">(</span>+ <span class="synSpecial">(</span>car list1<span class="synSpecial">)</span> <span class="synSpecial">(</span>car list2<span class="synSpecial">))</span>
                             <span class="synSpecial">(</span>add-lists <span class="synSpecial">(</span>cdr list1<span class="synSpecial">)</span> <span class="synSpecial">(</span>cdr list2<span class="synSpecial">))))))</span>
         <span class="synSpecial">(</span>define ones <span class="synSpecial">(</span>cons <span class="synConstant">1</span> ones<span class="synSpecial">))</span>

         <span class="synSpecial">(</span>define integers <span class="synSpecial">(</span>cons <span class="synConstant">0</span> <span class="synSpecial">(</span>add-lists ones integers<span class="synSpecial">)))</span>

         <span class="synSpecial">(</span>define <span class="synSpecial">(</span>integral integrand initial-value dt<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>define int
             <span class="synSpecial">(</span>cons initial-value
                   <span class="synSpecial">(</span>add-lists <span class="synSpecial">(</span>scale-list integrand dt<span class="synSpecial">)</span>
                              int<span class="synSpecial">)))</span>
           int<span class="synSpecial">)</span>

         <span class="synSpecial">(</span>define <span class="synSpecial">(</span>solve f y0 dt<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>define y <span class="synSpecial">(</span>integral dy y0 dt<span class="synSpecial">))</span>
           <span class="synSpecial">(</span>define dy <span class="synSpecial">(</span>map f y<span class="synSpecial">))</span>
           y<span class="synSpecial">)</span>


         <span class="synSpecial">)</span>
 the-global-environment<span class="synSpecial">)</span>
</pre>


