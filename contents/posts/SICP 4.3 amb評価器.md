---
title: "SICP 4.3 amb評価器"
published: 2016/01/14
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> true <span class="synConstant">#t</span><span class="synSpecial">)</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> false <span class="synConstant">#f</span><span class="synSpecial">)</span>

<span class="synComment">;; eval</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>ambeval <span class="synIdentifier">exp</span> env succeed fail<span class="synSpecial">)</span>
  <span class="synSpecial">((</span>analyze <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env succeed fail<span class="synSpecial">))</span>

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

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>amb? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>amb<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>amb-choices <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>analyze-self-evaluating <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>env succeed fail<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>succeed <span class="synIdentifier">exp</span> fail<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>analyze-quoted <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>qval <span class="synSpecial">(</span>text-of-quotation <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
      <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>env succeed fail<span class="synSpecial">)</span> <span class="synSpecial">(</span>succeed qval fail<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>analyze-variable <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>env succeed fail<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>succeed <span class="synSpecial">(</span>lookup-variable-value <span class="synIdentifier">exp</span> env<span class="synSpecial">)</span>
             fail<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>analyze-assignment <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>var <span class="synSpecial">(</span>assignment-variable <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">(</span>vproc <span class="synSpecial">(</span>analyze <span class="synSpecial">(</span>assignment-value <span class="synIdentifier">exp</span><span class="synSpecial">))))</span>
    <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>env succeed fail<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>vproc env
             <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>val fail2<span class="synSpecial">)</span>
               <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>old-value <span class="synSpecial">(</span>lookup-variable-value var env<span class="synSpecial">)))</span>
                 <span class="synSpecial">(</span>set-variable-value! var val env<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span>succeed <span class="synSpecial">'</span>ok
                          <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">()</span>
                            <span class="synSpecial">(</span>set-variable-value! var
                                                 old-value
                                                 env<span class="synSpecial">)</span>
                            <span class="synSpecial">(</span>fail2<span class="synSpecial">)))))</span>
             fail<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>analyze-definition <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>var <span class="synSpecial">(</span>definition-variable <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">(</span>vproc <span class="synSpecial">(</span>analyze <span class="synSpecial">(</span>definition-value <span class="synIdentifier">exp</span><span class="synSpecial">))))</span>
    <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>env succeed fail<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>vproc env
             <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>val fail2<span class="synSpecial">)</span>
               <span class="synSpecial">(</span>define-variable! var val env<span class="synSpecial">)</span>
               <span class="synSpecial">(</span>succeed <span class="synSpecial">'</span>ok fail2<span class="synSpecial">))</span>
             fail<span class="synSpecial">))))</span>

<span class="synComment">;; (succeed (analyze exp) fail)という形になる．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>analyze-if <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>pproc <span class="synSpecial">(</span>analyze <span class="synSpecial">(</span>if-predicate <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
        <span class="synSpecial">(</span>cproc <span class="synSpecial">(</span>analyze <span class="synSpecial">(</span>if-consequent <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
        <span class="synSpecial">(</span>aproc <span class="synSpecial">(</span>analyze <span class="synSpecial">(</span>if-alternative <span class="synIdentifier">exp</span><span class="synSpecial">))))</span>
    <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>env succeed fail<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>pproc env
             <span class="synComment">;; pred-valueを得るための</span>
             <span class="synComment">;; 術後の評価の成功継続</span>
             <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>pred-value fail2<span class="synSpecial">)</span>
               <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>true? pred-value<span class="synSpecial">)</span>
                   <span class="synSpecial">(</span>cproc env succeed fail2<span class="synSpecial">)</span>
                   <span class="synSpecial">(</span>aproc env succeed fail2<span class="synSpecial">)))</span>
             fail<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>analyze-lambda <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>vars <span class="synSpecial">(</span>lambda-parameters <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">(</span>bproc <span class="synSpecial">(</span>analyze-sequence <span class="synSpecial">(</span>lambda-body <span class="synIdentifier">exp</span><span class="synSpecial">))))</span>
    <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>env succeed fail<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>succeed <span class="synSpecial">(</span>make-procedure vars bproc env<span class="synSpecial">)</span>
               fail<span class="synSpecial">))))</span>

<span class="synComment">;; 本文のanalyze-sequence</span>
<span class="synComment">;; loopからsequentiallyの流れ．</span>
<span class="synComment">;; (lambda (env) (p1 env) (p2 env))</span>
<span class="synComment">;; (lambda (ENV) ((lambda (env) (p1 env) (p2 env)) ENV) (p3 env))</span>
<span class="synComment">;; (lambda (ENV) (p1 ENV) (p2 ENV) (p3 ENV))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>analyze-sequence exps<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>sequentially a b<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>env succeed fail<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>a env
         <span class="synComment">;; aを呼び出すときの成功継続</span>
         <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>a-value fail2<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>b env succeed fail2<span class="synSpecial">))</span>
         <span class="synComment">;; aを呼び出すときの失敗継続</span>
         fail<span class="synSpecial">)))</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>loop first-proc rest-procs<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> rest-procs<span class="synSpecial">)</span>
        first-proc
        <span class="synSpecial">(</span>loop <span class="synSpecial">(</span>sequentially first-proc <span class="synSpecial">(</span><span class="synIdentifier">car</span> rest-procs<span class="synSpecial">))</span>
              <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> rest-procs<span class="synSpecial">))))</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>procs <span class="synSpecial">(</span><span class="synIdentifier">map</span> analyze exps<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> procs<span class="synSpecial">)</span>
        <span class="synSpecial">(</span>error <span class="synConstant">&quot;Empty sequence: ANALYZE&quot;</span><span class="synSpecial">))</span>
    <span class="synSpecial">(</span>loop <span class="synSpecial">(</span><span class="synIdentifier">car</span> procs<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> procs<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>analyze-application <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>pproc <span class="synSpecial">(</span>analyze <span class="synSpecial">(</span>operator <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
        <span class="synSpecial">(</span>aprocs <span class="synSpecial">(</span><span class="synIdentifier">map</span> analyze <span class="synSpecial">(</span>operands <span class="synIdentifier">exp</span><span class="synSpecial">))))</span>
    <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>env succeed fail<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>pproc env
             <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>proc fail2<span class="synSpecial">)</span>
               <span class="synSpecial">(</span>get-args aprocs
                         env
                         <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>args fail3<span class="synSpecial">)</span>
                           <span class="synSpecial">(</span>execute-application
                            proc args succeed fail3<span class="synSpecial">))</span>
                         fail2<span class="synSpecial">))</span>
             fail<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>get-args aprocs env succeed fail<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> aprocs<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>succeed <span class="synSpecial">'()</span> fail<span class="synSpecial">)</span>
      <span class="synSpecial">((</span><span class="synIdentifier">car</span> aprocs<span class="synSpecial">)</span> env
       <span class="synComment">;; このaprocの成功継続</span>
       <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>arg fail2<span class="synSpecial">)</span>
         <span class="synSpecial">(</span>get-args <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> aprocs<span class="synSpecial">)</span>
                   env
                   <span class="synComment">;; get-argsの再帰呼び出しの成功継続</span>
                   <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>args fail3<span class="synSpecial">)</span>
                     <span class="synSpecial">(</span>succeed <span class="synSpecial">(</span><span class="synIdentifier">cons</span> arg args<span class="synSpecial">)</span>
                              fail3<span class="synSpecial">))</span>
                   fail2<span class="synSpecial">))</span>
       fail<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>execute-application proc args succeed fail<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>primitive-procedure? proc<span class="synSpecial">)</span>
         <span class="synSpecial">(</span>succeed <span class="synSpecial">(</span>apply-primitive-procedure proc args<span class="synSpecial">)</span>
                  fail<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>compound-procedure? proc<span class="synSpecial">)</span>
         <span class="synSpecial">((</span>procedure-body proc<span class="synSpecial">)</span>
          <span class="synSpecial">(</span>extend-environment <span class="synSpecial">(</span>procedure-parameters proc<span class="synSpecial">)</span>
                             args
                             <span class="synSpecial">(</span>procedure-environment proc<span class="synSpecial">))</span>
         succeed
         fail<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synConstant">&quot;Unknown procedure type -- EXECUTE-APPLICATION&quot;</span> proc<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>analyze-amb <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>cprocs <span class="synSpecial">(</span><span class="synIdentifier">map</span> analyze <span class="synSpecial">(</span>amb-choices <span class="synIdentifier">exp</span><span class="synSpecial">))))</span>
    <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>env succeed fail<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>try-next choices<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> choices<span class="synSpecial">)</span>
            <span class="synSpecial">(</span>fail<span class="synSpecial">)</span>
            <span class="synSpecial">((</span><span class="synIdentifier">car</span> choices<span class="synSpecial">)</span> env succeed <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">()</span>
                                         <span class="synSpecial">(</span>try-next <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> choices<span class="synSpecial">))))))</span>
      <span class="synSpecial">(</span>try-next cprocs<span class="synSpecial">))))</span>


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

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>text-of-quotation <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>

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

<span class="synComment">;; (define (def-body-list proc-body)</span>
<span class="synComment">;;   (let iter ((proc-body proc-body)</span>
<span class="synComment">;;              (def '())</span>
<span class="synComment">;;              (body '()))</span>
<span class="synComment">;;     (cond ((null? proc-body) (cons (reverse def) (reverse body)))</span>
<span class="synComment">;;           ((definition? (car proc-body)) (iter (cdr proc-body)</span>
<span class="synComment">;;                                                (cons (car proc-body) def)</span>
<span class="synComment">;;                                                body))</span>
<span class="synComment">;;           (else (iter (cdr proc-body)</span>
<span class="synComment">;;                       def</span>
<span class="synComment">;;                       (cons (car proc-body) body))))))</span>
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
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span>make-let <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span>definition-variable x<span class="synSpecial">)</span> <span class="synSpecial">''</span><span class="synConstant">*unassigned*</span><span class="synSpecial">))</span>
                             def-list<span class="synSpecial">)</span>
                        <span class="synSpecial">(</span><span class="synIdentifier">append</span> <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>set! <span class="synSpecial">(</span>definition-variable x<span class="synSpecial">)</span>
                                                       <span class="synSpecial">(</span>definition-value x<span class="synSpecial">)))</span>
                                     def-list<span class="synSpecial">)</span>
                                body-list<span class="synSpecial">))))))</span>

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
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>first-exp aseq<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> seq<span class="synSpecial">))</span>
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
  <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>procedure parameters body env<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>compound-procedure? p<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>tagged-list? p <span class="synSpecial">'</span>procedure<span class="synSpecial">))</span>
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

<span class="synComment">;; 環境</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>setup-environment<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>initial-env
         <span class="synSpecial">(</span>extend-environment <span class="synSpecial">(</span>primitive-procedure-names<span class="synSpecial">)</span>
                             <span class="synSpecial">(</span>primitive-procedure-objects<span class="synSpecial">)</span>
                             the-empty-environment<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span>define-variable! <span class="synSpecial">'</span>true <span class="synConstant">#t</span> initial-env<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>define-variable! <span class="synSpecial">'</span>false <span class="synConstant">#f</span> initial-env<span class="synSpecial">)</span>
    initial-env<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>primitive-procedure-names<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synIdentifier">car</span> primitive-procedures<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> primitive-procedures
  <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>car <span class="synIdentifier">car</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>cdr <span class="synIdentifier">cdr</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>cons <span class="synIdentifier">cons</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>null? <span class="synIdentifier">null?</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>= <span class="synIdentifier">=</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>- <span class="synIdentifier">-</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>+ <span class="synIdentifier">+</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>* <span class="synIdentifier">*</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>/ <span class="synIdentifier">/</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>list <span class="synIdentifier">list</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>not <span class="synIdentifier">not</span><span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>primitive-procedure-objects<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>proc<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>primitive <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> proc<span class="synSpecial">)))</span>
       primitive-procedures<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>apply-primitive-procedure proc args<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>apply-in-underlying-scheme
   <span class="synSpecial">(</span>primitive-implementation proc<span class="synSpecial">)</span> args<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>primitive-procedure? proc<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>tagged-list? proc <span class="synSpecial">'</span>primitive<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>primitive-implementation proc<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> proc<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> the-global-environment <span class="synSpecial">(</span>setup-environment<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> apply-in-underlying-scheme <span class="synIdentifier">apply</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> input-prompt <span class="synConstant">&quot;;;; Amb-Eval input:&quot;</span><span class="synSpecial">)</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> output-prompt <span class="synConstant">&quot;;;; Amb-Eval value:&quot;</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>driver-loop<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>internal-loop try-again<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>prompt-for-input input-prompt<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>input <span class="synSpecial">(</span><span class="synIdentifier">read</span><span class="synSpecial">)))</span>
      <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> input <span class="synSpecial">'</span>try-again<span class="synSpecial">)</span>
          <span class="synSpecial">(</span>try-again<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synStatement">begin</span>
            <span class="synSpecial">(</span><span class="synIdentifier">newline</span><span class="synSpecial">)</span>
            <span class="synSpecial">(</span><span class="synIdentifier">display</span> <span class="synConstant">&quot;;;; Starting a new problem &quot;</span><span class="synSpecial">)</span>
            <span class="synSpecial">(</span>ambeval input
                     the-global-environment
                     <span class="synComment">;; ambeval 成功</span>
                     <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>val next-alternative<span class="synSpecial">)</span>
                       <span class="synSpecial">(</span>announce-output output-prompt<span class="synSpecial">)</span>
                       <span class="synSpecial">(</span>user-print val<span class="synSpecial">)</span>
                       <span class="synSpecial">(</span>internal-loop next-alternative<span class="synSpecial">))</span>
                     <span class="synComment">;; ambeval 失敗</span>
                     <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">()</span>
                       <span class="synSpecial">(</span>announce-output <span class="synConstant">&quot;;;; There are no more values of&quot;</span><span class="synSpecial">)</span>
                       <span class="synSpecial">(</span>user-print input<span class="synSpecial">)</span>
                       <span class="synSpecial">(</span>driver-loop<span class="synSpecial">)))))))</span>
  <span class="synSpecial">(</span>internal-loop
   <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">()</span>
     <span class="synSpecial">(</span><span class="synIdentifier">newline</span><span class="synSpecial">)</span>
     <span class="synSpecial">(</span><span class="synIdentifier">display</span> <span class="synConstant">&quot;;;; There is no current problem&quot;</span><span class="synSpecial">)</span>
     <span class="synSpecial">(</span>driver-loop<span class="synSpecial">))))</span>

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
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>compound-procedure? object<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synIdentifier">display</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>compound-procedure
                     <span class="synSpecial">(</span>procedure-parameters object<span class="synSpecial">)</span>
                     <span class="synSpecial">(</span>procedure-body object<span class="synSpecial">)</span>
                     <span class="synSpecial">'</span><span class="synConstant">&lt;procedure-env&gt;</span><span class="synSpecial">))</span>
      <span class="synSpecial">(</span><span class="synIdentifier">display</span> object<span class="synSpecial">)))</span>
</pre>


