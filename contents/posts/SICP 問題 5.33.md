---
title: "SICP 問題 5.33"
published: 2016/02/06
tags:
  - scheme
  - SICP
---

<p>以下の２つの翻訳結果を比較してその相違を説明する．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span>compile
       <span class="synSpecial">'(</span>define <span class="synSpecial">(</span>factorial n<span class="synSpecial">)</span>
          <span class="synSpecial">(</span>if <span class="synSpecial">(</span>= n <span class="synConstant">1</span><span class="synSpecial">)</span>
              <span class="synConstant">1</span>
              <span class="synSpecial">(</span>* <span class="synSpecial">(</span>factorial <span class="synSpecial">(</span>- n <span class="synConstant">1</span><span class="synSpecial">))</span> n<span class="synSpecial">)))</span>
       <span class="synSpecial">'</span>val <span class="synSpecial">'</span>next<span class="synSpecial">)</span>

<span class="synSpecial">(</span>compile
       <span class="synSpecial">'(</span>define <span class="synSpecial">(</span>factorial n<span class="synSpecial">)</span>
          <span class="synSpecial">(</span>if <span class="synSpecial">(</span>= n <span class="synConstant">1</span><span class="synSpecial">)</span>
              <span class="synConstant">1</span>
              <span class="synSpecial">(</span>* n <span class="synSpecial">(</span>factorial <span class="synSpecial">(</span>- n <span class="synConstant">1</span><span class="synSpecial">)))))</span>
       <span class="synSpecial">'</span>val <span class="synSpecial">'</span>next<span class="synSpecial">)</span>
</pre>


<p>一つ目を出力して整形したのが以下になる．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">((</span>env<span class="synSpecial">)</span>
 <span class="synSpecial">(</span>val<span class="synSpecial">)</span>
 <span class="synSpecial">((</span>assign val <span class="synSpecial">(</span>op make-compiled-procedure<span class="synSpecial">)</span> <span class="synSpecial">(</span>label entry1<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label after-lambda2<span class="synSpecial">))</span>
  entry1
  <span class="synSpecial">(</span>assign env <span class="synSpecial">(</span>op compiled-procedure-env<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign env <span class="synSpecial">(</span>op extend-environment<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">(</span>n<span class="synSpecial">))</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>save env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>assign proc <span class="synSpecial">(</span>op lookup-ariable-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synIdentifier">=</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op <span class="synIdentifier">list</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op lookup-ariable-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>const n<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
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
  <span class="synSpecial">(</span>assign proc <span class="synSpecial">(</span>op lookup-ariable-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synIdentifier">*</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>save proc<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op lookup-ariable-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>const n<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op <span class="synIdentifier">list</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>save argl<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>assign proc <span class="synSpecial">(</span>op lookup-ariable-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>const factorial<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>save proc<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>assign proc <span class="synSpecial">(</span>op lookup-ariable-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op <span class="synIdentifier">list</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op lookup-ariable-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>const n<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
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


<p>これを5.33a.scmとして保存し，二つ目を5.33b.scmとして保存し，diffを取った．</p>

<pre class="code" data-lang="" data-unlink>--- 5.33a.scm    2016-02-06 19:25:30.000000000 +0900
+++ 5.33b.scm   2016-02-06 19:26:35.000000000 +0900
@@ -32,9 +32,7 @@
   (assign proc (op lookup-ariable-value) (const *) (reg env))
   (save continue)
   (save proc)
-  (assign val (op lookup-ariable-value) (const n) (reg env))
-  (assign argl (op list) (reg val))
-  (save argl)
+  (save env)
   (assign proc (op lookup-ariable-value) (const factorial) (reg env))
   (save proc)
   (assign proc (op lookup-ariable-value) (const -) (reg env))
@@ -62,7 +60,9 @@
   primitive-branch12
   (assign val (op apply-primitive-procedure) (reg proc) (reg argl))
   after-call14
-  (restore argl)
+  (assign argl (op list) (reg val))
+  (restore env)
+  (assign val (op lookup-ariable-value) (const n) (reg env))
   (assign argl (op cons) (reg val) (reg argl))
   (restore proc)
   (restore continue)</pre>


<p>construct-arglistでoperandをまずreverseしているので，<br/>
書かれた引数とは逆順に処理していくことになる．</p>

<p>一箇所目のdiffはfalse-branch4の中，二箇所目はprimitive-brach12にある．<br/>
5.33aはfalse-branchでまずnの値を求める．<br/>
そして値をリスト化し，arglに代入してsaveする．<br/>
primitive-branchでvalの値は(factorial (- n 1))を翻訳したものになっている．<br/>
そこでarglをrestoreして，valとconsしてarglを完成させている．<br/>
　<br/>
一方5.33bはまずenvを保存するところから始まる．<br/>
(factorial (- n 1))を評価するときに環境が変更されたら困るからだ．<br/>
そしてprimitive-branchに来たところで5.33aと同じく，valの値は(factorial (- n 1))になっている．<br/>
5.33bはvalをリスト化してarglに保存する．<br/>
そして環境を(factorial (- n 1))を評価する前の状態に戻し，nを評価する．<br/>
評価した値とarglをconsしてarglは完成する．<br/>
　</p>

<p>一箇所目は5.33aも5.33bも一回saveし，二箇所目で一回restoreする．<br/>
5.33bは一箇所目で二回assignし，5.33aは二箇所目で二回assignする．<br/>
save箇所が同じでassignする場所が違うだけなので，効率はかわらない．</p>

