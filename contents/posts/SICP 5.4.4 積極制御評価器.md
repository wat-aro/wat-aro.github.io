---
title: "SICP 5.4.4 積極制御評価器"
published: 2016/02/02
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;;; 5.2 で実装したシミュレータ．トレース機能追加済み．</span>
<span class="synComment">;;; 事前に登録したレジスタを使用するのではなく，初めてassignするレジスタを登録していく(問題5.13).</span>
<span class="synSpecial">(</span><span class="synIdentifier">load</span> <span class="synConstant">&quot;./register-machine-simulator.scm&quot;</span><span class="synSpecial">)</span>
<span class="synComment">;;; 4.1で実装した評価器</span>
<span class="synSpecial">(</span><span class="synIdentifier">load</span> <span class="synConstant">&quot;./eval.scm&quot;</span><span class="synSpecial">)</span>

<span class="synComment">;;; 5.4.1-5.4.4までの注釈でかかれていた手続き</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> the-global-environment <span class="synSpecial">(</span>setup-environment<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>get-global-environment<span class="synSpecial">)</span> the-global-environment<span class="synSpecial">)</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>no-more-exps? seq<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> seq<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>empty-arglist<span class="synSpecial">)</span> <span class="synSpecial">'())</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>adjoiin-arg arg arg-list<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">append</span> arglist <span class="synSpecial">(</span><span class="synIdentifier">list</span> arg<span class="synSpecial">)))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>last-operand? ops<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> ops<span class="synSpecial">)))</span>

<span class="synComment">;;; 積極制御評価器</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> eceval
  <span class="synSpecial">(</span>make-machine
   <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>self-evaluating? self-evaluating?<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>variable? variable?<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>quoted? quoted?<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>text-of-quotation text-of-quotation<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>assignment? assignment?<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>definition? definition?<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>if? if?<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>true? true?<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>cond? cond?<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>lambda? lambda?<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>let? let?<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>begin? begin?<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>application? application?<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>lookup-variable-value lookup-variable-value<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>lambda-parameters lambda-parameters<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>lambda-body lambda-body<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>make-procedure make-procedure<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>operands operands<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>operator operator<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>empty-arglist empty-arglist<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>no-operands? no-operands?<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>first-operand first-operand<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>last-operand? last-operand?<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>adjoin-arg adjoin-arg<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>rest-operands rest-operands<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>primitive-procedure? primitive-procedure?<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>compound-procedure? compound-procedure?<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>apply-primitive-procedure apply-primitive-procedure<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>procedure-parameters procedure-parameters<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>procedure-environment procedure-environment<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>extend-environment extend-environment<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>procedure-body procedure-body<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>begin-actions begin-actions<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>first-exp first-exp<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>last-exp? last-exp?<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>rest-exps rest-exps<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>if-predicate if-predicate<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>if-alternative if-alternative<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>if-consequent if-consequent<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>cond-&gt;if cond-&gt;if<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>let-&gt;combination let-&gt;combination<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>assignment-variable assignment-variable<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>assignment-value assignment-value<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>set-variable-value! set-variable-value!<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>definition-variable definition-variable<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>definition-value definition-value<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>define-variable! define-variable!<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>prompt-for-input prompt-for-input<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>read <span class="synIdentifier">read</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>get-global-environment get-global-environment<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>announce-output announce-output<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>user-print user-print<span class="synSpecial">))</span>
   <span class="synSpecial">'(</span>read-eval-print-loop
     <span class="synSpecial">(</span>perform <span class="synSpecial">(</span>op initialize-stack<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>perform
      <span class="synSpecial">(</span>op prompt-for-input<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">&quot;;;; EC-Eval input:&quot;</span><span class="synSpecial">))</span>
     <span class="synSpecial">(</span>assign exp <span class="synSpecial">(</span>op read<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>assign env <span class="synSpecial">(</span>op get-global-environment<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label print-result<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label eval-dispatch<span class="synSpecial">))</span>

     eval-dispatch
     <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op self-evaluating?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg exp<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label ev-self-eval<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op variable?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg exp<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label ev-variable<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op quoted?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg exp<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label ev-quoted<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op assignment?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg exp<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label ev-assignment<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op definition?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg exp<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label ev-definition<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op if?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg exp<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label ev-if<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op cond?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg exp<span class="synSpecial">))</span>        <span class="synComment">;cond?を追加</span>
     <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label ev-cond<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op lambda?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg exp<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label ev-lambda<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op let?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg exp<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label ev-let<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op begin?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg exp<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label ev-begin<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op application?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg exp<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label ev-application<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label unknown-expression-type<span class="synSpecial">))</span>

     ev-self-eval
     <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>reg exp<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>

     ev-variable
     <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op lookup-variable-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg exp<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>

     ev-quoted
     <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op text-of-quotation<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg exp<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>

     ev-lambda
     <span class="synSpecial">(</span>assign unev <span class="synSpecial">(</span>op lambda-parameters<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg exp<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>assign exp <span class="synSpecial">(</span>op lambda-body<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg exp<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op make-procedure<span class="synSpecial">)</span>
             <span class="synSpecial">(</span>reg unev<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg exp<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>

     ev-application
     <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>save env<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>assign unev <span class="synSpecial">(</span>op operands<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg exp<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>save unev<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>assign exp <span class="synSpecial">(</span>op operator<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg exp<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label ev-appl-did-operator<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label eval-dispatch<span class="synSpecial">))</span>

     ev-appl-did-operator
     <span class="synSpecial">(</span>restore unev<span class="synSpecial">)</span>                     <span class="synComment">;非演算子</span>
     <span class="synSpecial">(</span>restore env<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op empty-arglist<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>assign proc <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op no-operands?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg unev<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label apply-dispatch<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>save proc<span class="synSpecial">)</span>

     ev-appl-operand-loop
     <span class="synSpecial">(</span>save argl<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>assign exp <span class="synSpecial">(</span>op first-operand<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg unev<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op last-operand?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg unev<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label ev-appl-last-arg<span class="synSpecial">))</span>  <span class="synComment">;最後の引数の場合はここへ飛ぶ</span>
     <span class="synSpecial">(</span>save env<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>save unev<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label ev-appl-accumulate-arg<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label eval-dispatch<span class="synSpecial">))</span>

     ev-appl-accumulate-arg
     <span class="synSpecial">(</span>restore unev<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>restore env<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>restore argl<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op adjoin-arg<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>assign unev <span class="synSpecial">(</span>op rest-operands<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg unev<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label ev-appl-operand-loop<span class="synSpecial">))</span>

     ev-appl-last-arg
     <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label ev-appl-accum-last-arg<span class="synSpecial">))</span> <span class="synComment">;evalの後にここにいって引数を回復する．</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label eval-dispatch<span class="synSpecial">))</span>

     ev-appl-accum-last-arg
     <span class="synSpecial">(</span>restore argl<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op adjoin-arg<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>restore proc<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label apply-dispatch<span class="synSpecial">))</span>

     apply-dispatch
     <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op primitive-procedure?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label primitive-apply<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op compound-procedure?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label compound-apply<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label unknown-procedure-type<span class="synSpecial">))</span>

     primitive-apply
     <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op apply-primitive-procedure<span class="synSpecial">)</span>
             <span class="synSpecial">(</span>reg proc<span class="synSpecial">)</span>
             <span class="synSpecial">(</span>reg argl<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>

     compound-apply
     <span class="synSpecial">(</span>assign unev <span class="synSpecial">(</span>op procedure-parameters<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>assign env <span class="synSpecial">(</span>op procedure-environment<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>assign env <span class="synSpecial">(</span>op extend-environment<span class="synSpecial">)</span>
             <span class="synSpecial">(</span>reg unev<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>assign unev <span class="synSpecial">(</span>op procedure-body<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label ev-sequence<span class="synSpecial">))</span>

     ev-begin
     <span class="synSpecial">(</span>assign unev <span class="synSpecial">(</span>op begin-actions<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg exp<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label ev-sequence<span class="synSpecial">))</span>

     ev-sequence
     <span class="synSpecial">(</span>assign exp <span class="synSpecial">(</span>op first-exp<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg unev<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op last-exp?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg unev<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label ev-sequence-last-exp<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>save unev<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>save env<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label ev-sequence-continue<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label eval-dispatch<span class="synSpecial">))</span>

     ev-sequence-continue
     <span class="synSpecial">(</span>restore env<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>restore unev<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>assign unev <span class="synSpecial">(</span>op rest-exps<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg unev<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label ev-sequence<span class="synSpecial">))</span>

     ev-sequence-last-exp
     <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label eval-dispatch<span class="synSpecial">))</span>

     ev-if
     <span class="synSpecial">(</span>save exp<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>save env<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label ev-if-decide<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>assign exp <span class="synSpecial">(</span>op if-predicate<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg exp<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label eval-dispatch<span class="synSpecial">))</span>

     ev-if-decide
     <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>restore env<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>restore exp<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op true?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label ev-if-consequent<span class="synSpecial">))</span>

     ev-if-alternative
     <span class="synSpecial">(</span>assign exp <span class="synSpecial">(</span>op if-alternative<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg exp<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label eval-dispatch<span class="synSpecial">))</span>

     ev-if-consequent
     <span class="synSpecial">(</span>assign exp <span class="synSpecial">(</span>op if-consequent<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg exp<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label eval-dispatch<span class="synSpecial">))</span>

     ev-cond
     <span class="synSpecial">(</span>assign exp <span class="synSpecial">(</span>op cond-&gt;if<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg exp<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label eval-dispatch<span class="synSpecial">))</span>

     ev-let
     <span class="synSpecial">(</span>assign exp <span class="synSpecial">(</span>op let-&gt;combination<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg exp<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label eval-dispatch<span class="synSpecial">))</span>

     ev-assignment
     <span class="synSpecial">(</span>assign unev <span class="synSpecial">(</span>op assignment-variable<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg exp<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>save unev<span class="synSpecial">)</span>                        <span class="synComment">;後のために変数を退避</span>
     <span class="synSpecial">(</span>assign exp <span class="synSpecial">(</span>op assignment-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg exp<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>save env<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label ev-assignment-1<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label eval-dispatch<span class="synSpecial">))</span>       <span class="synComment">;代入する値を評価</span>

     ev-assignment-1
     <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>restore env<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>restore unev<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>perform
      <span class="synSpecial">(</span>op set-variable-value!<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg unev<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>const ok<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>

     ev-definition
     <span class="synSpecial">(</span>assign unev <span class="synSpecial">(</span>op definition-variable<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg exp<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>save unev<span class="synSpecial">)</span>                        <span class="synComment">;後のために変数を退避</span>
     <span class="synSpecial">(</span>assign exp <span class="synSpecial">(</span>op definition-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg exp<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>save env<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label ev-definition-1<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label eval-dispatch<span class="synSpecial">))</span>       <span class="synComment">;定義する値を評価</span>

     ev-definition-1
     <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>restore env<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>restore unev<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>perform
      <span class="synSpecial">(</span>op define-variable!<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg unev<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>const ok<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>

     print-result
     <span class="synSpecial">(</span>perform
      <span class="synSpecial">(</span>op announce-output<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">&quot;;;; EC-Eval value:&quot;</span><span class="synSpecial">))</span>
     <span class="synSpecial">(</span>perform <span class="synSpecial">(</span>op user-print<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label read-eval-print-loop<span class="synSpecial">))</span>

     unknown-expression-type
     <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>const unknown-expression-type-error<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label signal-error<span class="synSpecial">))</span>

     unknown-procedure-type
     <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>                 <span class="synComment">;スタックを掃除する</span>
     <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>const unknown-procedure-type-error<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label signal-error<span class="synSpecial">))</span>

     signal-error
     <span class="synSpecial">(</span>perform <span class="synSpecial">(</span>op user-print<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label read-eval-print-loop<span class="synSpecial">))</span>
     <span class="synSpecial">)))</span>
</pre>


