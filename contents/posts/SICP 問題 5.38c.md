---
title: "SICP 問題 5.38c"
published: 2016/02/08
tags:
  - scheme
  - SICP
---

<p>元のcompileによる出力と5.38abでcompile-open-codeを追加した<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%D1%A5%A4%A5%E9">コンパイラ</a>の出力を比べる．<br/>
命令列が約半分になっている．</p>

<p>compile-open-codeを追加した<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%D1%A5%A4%A5%E9">コンパイラ</a>の出力</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">((</span>env<span class="synSpecial">)</span>
 <span class="synSpecial">(</span>val<span class="synSpecial">)</span>
 <span class="synSpecial">((</span>assign val <span class="synSpecial">(</span>op make-compiled-procedure<span class="synSpecial">)</span> <span class="synSpecial">(</span>label entry1<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label after-lambda2<span class="synSpecial">))</span>
  entry1
  <span class="synSpecial">(</span>assign env <span class="synSpecial">(</span>op compiled-procedure-env<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign env <span class="synSpecial">(</span>op extend-environment<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">(</span>n<span class="synSpecial">))</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign arg1 <span class="synSpecial">(</span>op lookup-variable-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>const n<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign arg2 <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op <span class="synIdentifier">=</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg1<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg2<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op false?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label false-branch4<span class="synSpecial">))</span>
  true-branch3
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
  false-branch4
  <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>assign proc <span class="synSpecial">(</span>op lookup-variable-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>const factorial<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign arg1 <span class="synSpecial">(</span>op lookup-variable-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>const n<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign arg2 <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg1<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg2<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op <span class="synIdentifier">list</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op primitive-procedure?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label primitive-branch6<span class="synSpecial">))</span>
  compiled-branch7
  <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label proc-return9<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op compiled-procedure-entry<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  proc-return9
  <span class="synSpecial">(</span>assign arg1 <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label after-call8<span class="synSpecial">))</span>
  primitive-branch6
  <span class="synSpecial">(</span>assign arg1 <span class="synSpecial">(</span>op apply-primitive-procedure<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">))</span>
  after-call8
  <span class="synSpecial">(</span>assign arg2 <span class="synSpecial">(</span>op lookup-variable-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>const n<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op <span class="synIdentifier">*</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg1<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg2<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
  after-if5
  after-lambda2
  <span class="synSpecial">(</span>perform <span class="synSpecial">(</span>op define-variable!<span class="synSpecial">)</span> <span class="synSpecial">(</span>const factorial<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>const ok<span class="synSpecial">))))</span>
</pre>


<p>元のcompileによる出力</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">((</span>env<span class="synSpecial">)</span>
 <span class="synSpecial">(</span>val<span class="synSpecial">)</span>
 <span class="synSpecial">((</span>assign val <span class="synSpecial">(</span>op make-compiled-procedure<span class="synSpecial">)</span> <span class="synSpecial">(</span>label entry1<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label after-lambda2<span class="synSpecial">))</span>
  entry1
  <span class="synSpecial">(</span>assign env <span class="synSpecial">(</span>op compiled-procedure-env<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign env <span class="synSpecial">(</span>op extend-environment<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">(</span>n<span class="synSpecial">))</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>save env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>assign proc <span class="synSpecial">(</span>op lookup-variable-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synIdentifier">=</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op <span class="synIdentifier">list</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op lookup-variable-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>const n<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op <span class="synIdentifier">cons</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op primitive-procedure?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label primitive-branch6<span class="synSpecial">))</span>
  compiled-branch7
  <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label after-call8<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op compiled-procedure-entry<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  primitive-branch6
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op apply-primitive-procedure<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">))</span>
  after-call8
  <span class="synSpecial">(</span>restore env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op false?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label false-branch4<span class="synSpecial">))</span>
  true-branch3
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
  false-branch4
  <span class="synSpecial">(</span>assign proc <span class="synSpecial">(</span>op lookup-variable-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synIdentifier">*</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>save proc<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op lookup-variable-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>const n<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op <span class="synIdentifier">list</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>save argl<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>assign proc <span class="synSpecial">(</span>op lookup-variable-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>const factorial<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>save proc<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>assign proc <span class="synSpecial">(</span>op lookup-variable-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op <span class="synIdentifier">list</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op lookup-variable-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>const n<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op <span class="synIdentifier">cons</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op primitive-procedure?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label primitive-branch9<span class="synSpecial">))</span>
  compiled-branch10
  <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label after-call11<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op compiled-procedure-entry<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  primitive-branch9
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op apply-primitive-procedure<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">))</span>
  after-call11
  <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op <span class="synIdentifier">list</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>restore proc<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op primitive-procedure?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label primitive-branch12<span class="synSpecial">))</span>
  compiled-branch13
  <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label after-call14<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op compiled-procedure-entry<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  primitive-branch12
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op apply-primitive-procedure<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">))</span>
  after-call14
  <span class="synSpecial">(</span>restore argl<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op <span class="synIdentifier">cons</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>restore proc<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op primitive-procedure?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label primitive-branch15<span class="synSpecial">))</span>
  compiled-branch16
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op compiled-procedure-entry<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  primitive-branch15
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op apply-primitive-procedure<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
  after-call17
  after-if5
  after-lambda2
  <span class="synSpecial">(</span>perform <span class="synSpecial">(</span>op define-variable!<span class="synSpecial">)</span> <span class="synSpecial">(</span>const factorial<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>const ok<span class="synSpecial">))</span>
  <span class="synSpecial">))</span>
</pre>


