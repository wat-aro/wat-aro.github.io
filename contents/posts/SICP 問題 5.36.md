---
title: "SICP 問題 5.36"
published: 2016/02/07
tags:
  - scheme
  - SICP
---

<p>本文の被<a class="keyword" href="http://d.hatena.ne.jp/keyword/%B1%E9%BB%BB%BB%D2">演算子</a>の適用順はoperandをreverseしてから連結していくので右から左になっている．<br/>
これを左から右に変更する．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;;; 最初のreverseをなくす</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>construct-arglist operand-codes<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> operand-codes<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>make-instruction-sequence
       <span class="synSpecial">'()</span> <span class="synSpecial">'(</span>argl<span class="synSpecial">)</span>
       <span class="synSpecial">`((</span>assign argl <span class="synSpecial">(</span>const <span class="synSpecial">()))))</span>
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>code-to-get-last-arg
             <span class="synSpecial">(</span>append-instruction-sequences
              <span class="synSpecial">(</span><span class="synIdentifier">car</span> operand-codes<span class="synSpecial">)</span>
              <span class="synSpecial">(</span>make-instruction-sequence
               <span class="synSpecial">'(</span>val<span class="synSpecial">)</span> <span class="synSpecial">'(</span>argl<span class="synSpecial">)</span>
               <span class="synSpecial">`((</span>assign argl <span class="synSpecial">(</span>op list<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)))))))</span>
        <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> operand-codes<span class="synSpecial">))</span>
            code-to-get-last-arg
            <span class="synSpecial">(</span>preserving
             <span class="synSpecial">'(</span>env<span class="synSpecial">)</span>
             code-to-get-last-arg
             <span class="synSpecial">(</span>code-to-get-rest-args
              <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> operand-codes<span class="synSpecial">)))))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>code-to-get-rest-args operand-codes<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>code-for-next-arg
         <span class="synSpecial">(</span>preserving
          <span class="synSpecial">'(</span>argl<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synIdentifier">car</span> operand-codes<span class="synSpecial">)</span>
          <span class="synSpecial">(</span>make-instruction-sequence
           <span class="synSpecial">'(</span>val argl<span class="synSpecial">)</span> <span class="synSpecial">'(</span>argl<span class="synSpecial">)</span>
           <span class="synSpecial">'((</span>assign val <span class="synSpecial">(</span>op list<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span> <span class="synComment">;valをリスト化する</span>
             <span class="synSpecial">(</span>assign argl
                     <span class="synSpecial">(</span>op append<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)))))))</span> <span class="synComment">;appendで順番通りにつなげる</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> operand-codes<span class="synSpecial">))</span>
        code-for-next-arg
        <span class="synSpecial">(</span>preserving
         <span class="synSpecial">'(</span>env<span class="synSpecial">)</span>
         code-for-next-arg
         <span class="synSpecial">(</span>code-to-get-rest-args <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> operand-cods<span class="synSpecial">))))))</span>
</pre>


<p>問題5.35で求めた式を<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%D1%A5%A4%A5%EB">コンパイル</a>してみる．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span>compile
 <span class="synSpecial">'(</span>define <span class="synSpecial">(</span>f x<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>+ x <span class="synSpecial">(</span>g <span class="synSpecial">(</span>+ x <span class="synConstant">2</span><span class="synSpecial">))))</span>
 <span class="synSpecial">'</span>val <span class="synSpecial">'</span>next<span class="synSpecial">)</span>


<span class="synSpecial">((</span>env<span class="synSpecial">)</span>
 <span class="synSpecial">(</span>val<span class="synSpecial">)</span>
 <span class="synSpecial">((</span>assign val <span class="synSpecial">(</span>op make-compiled-procedure<span class="synSpecial">)</span> <span class="synSpecial">(</span>label entry23<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label after-lambda24<span class="synSpecial">))</span>
  entry23
  <span class="synSpecial">(</span>assign env <span class="synSpecial">(</span>op compiled-procedure-env<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign env <span class="synSpecial">(</span>op extend-environment<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">(</span>x<span class="synSpecial">))</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign proc <span class="synSpecial">(</span>op lookup-variable-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synIdentifier">+</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>save proc<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op lookup-variable-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>const x<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span> <span class="synComment">;元はgからだった</span>
  <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op <span class="synIdentifier">list</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>save argl<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>assign proc <span class="synSpecial">(</span>op lookup-variable-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>const g<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span> <span class="synComment">;次の(g ...)にいく．</span>
  <span class="synSpecial">(</span>save proc<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>assign proc <span class="synSpecial">(</span>op lookup-variable-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synIdentifier">+</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op lookup-variable-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>const x<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span> <span class="synComment">;左の引数のxから</span>
  <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op <span class="synIdentifier">list</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">))</span>                <span class="synComment">;次に2</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op <span class="synIdentifier">list</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op <span class="synIdentifier">append</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op primitive-procedure?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label primitive-branch25<span class="synSpecial">))</span>
  compiled-branch26
  <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label after-call27<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op compiled-procedure-entry<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  primitive-branch25
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op apply-primitive-procedure<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">))</span>
  after-call27
  <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op <span class="synIdentifier">list</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>restore proc<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op primitive-procedure?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label primitive-branch28<span class="synSpecial">))</span>
  compiled-branch29
  <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label after-call30<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op compiled-procedure-entry<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  primitive-branch28
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op apply-primitive-procedure<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">))</span>
  after-call30
  <span class="synSpecial">(</span>restore argl<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op <span class="synIdentifier">list</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op <span class="synIdentifier">append</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>restore proc<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op primitive-procedure?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label primitive-branch31<span class="synSpecial">))</span>
  compiled-branch32
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op compiled-procedure-entry<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  primitive-branch31
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op apply-primitive-procedure<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
  after-call33
  after-lambda24
  <span class="synSpecial">(</span>perform <span class="synSpecial">(</span>op define-variable!<span class="synSpecial">)</span> <span class="synSpecial">(</span>const f<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>const ok<span class="synSpecial">))</span>
  <span class="synSpecial">))</span>
</pre>


<p>appendは一つ目のリストの末尾まで辿ってから後ろにリストをつなげていくので非効率になる．<br/>
よってこの場合効率を考えるなら右から左に評価するほうがよい．</p>

