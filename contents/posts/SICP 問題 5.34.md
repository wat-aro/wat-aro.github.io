---
title: "SICP 問題 5.34"
published: 2016/02/06
tags:
  - scheme
  - SICP
---

<p>反復的階乗手続きを<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%D1%A5%A4%A5%EB">コンパイル</a>し，<a class="keyword" href="http://d.hatena.ne.jp/keyword/%BA%C6%B5%A2">再帰</a>版との本質的な違いを示せ．<br/>
　<br/>
反復的階乗手続きの内容を説明する．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span>compile
 <span class="synSpecial">'(</span>define <span class="synSpecial">(</span>factorial n<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>define <span class="synSpecial">(</span>iter product counter<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>if <span class="synSpecial">(</span>&gt; counter n<span class="synSpecial">)</span>
          product
          <span class="synSpecial">(</span>iter <span class="synSpecial">(</span>* counter product<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>+ counter <span class="synConstant">1</span><span class="synSpecial">))))</span>
    <span class="synSpecial">(</span>iter <span class="synConstant">1</span> <span class="synConstant">1</span><span class="synSpecial">))</span>
 <span class="synSpecial">'</span>val <span class="synSpecial">'</span>next<span class="synSpecial">)</span>
</pre>


<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%D1%A5%A4%A5%EB">コンパイル</a>して，説明をつけた．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">((</span>env<span class="synSpecial">)</span>
 <span class="synSpecial">(</span>val<span class="synSpecial">)</span>
 <span class="synSpecial">(</span>
  <span class="synComment">;; 手続きを構成し，本体のコードを飛び越す</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op make-compiled-procedure<span class="synSpecial">)</span> <span class="synSpecial">(</span>label entry18<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label after-lambda19<span class="synSpecial">))</span>
  <span class="synComment">;; factorialの呼び出しの開始．</span>
  entry18
  <span class="synComment">;; procの環境をenvに代入</span>
  <span class="synSpecial">(</span>assign env <span class="synSpecial">(</span>op compiled-procedure-env<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synComment">;; factorialの実引数をfactorialの引数nと対応づけて環境を拡張</span>
  <span class="synSpecial">(</span>assign env <span class="synSpecial">(</span>op extend-environment<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">(</span>n<span class="synSpecial">))</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synComment">;; 内部定義に進む．valを(compiled-procedure entry20 env)の形にする．</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op make-compiled-procedure<span class="synSpecial">)</span> <span class="synSpecial">(</span>label entry20<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label after-lambda21<span class="synSpecial">))</span>

  entry20
  <span class="synSpecial">(</span>assign env <span class="synSpecial">(</span>op compiled-procedure-env<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synComment">;; product counterをそれぞれ1に束縛した環境を作る</span>
  <span class="synSpecial">(</span>assign env <span class="synSpecial">(</span>op extend-environment<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">(</span>product counter<span class="synSpecial">))</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synComment">;; 手続き本体の開始</span>
  <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>save env<span class="synSpecial">)</span>

  <span class="synComment">;; (&gt; counter n)の計算</span>
  <span class="synSpecial">(</span>assign proc <span class="synSpecial">(</span>op lookup-variable-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synIdentifier">&gt;</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op lookup-variable-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>const n<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op <span class="synIdentifier">list</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op lookup-variable-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>const counter<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op <span class="synIdentifier">cons</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op primitive-procedure?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label primitive-branch25<span class="synSpecial">))</span>   <span class="synComment">;ここに飛ぶ．</span>
  compiled-branch26
  <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label after-call27<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op compiled-procedure-entry<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  primitive-branch25
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op apply-primitive-procedure<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">))</span>

  <span class="synComment">;; (&gt; counter n)の次</span>
  after-call27                          <span class="synComment">;valには(&gt; couner n)の値が入っている</span>
  <span class="synSpecial">(</span>restore env<span class="synSpecial">)</span>                         <span class="synComment">;手続き本体のenvとcontinueを復帰</span>
  <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op false?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label false-branch23<span class="synSpecial">))</span>

  <span class="synComment">;; (&gt; counter n)がtrueの時，productの値をvalに入れて，大本のcontinueへ．</span>
  true-branch22
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op lookup-variable-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>const product<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>

  <span class="synComment">;; (&gt; counter n)がfalseの時</span>
  false-branch23
  <span class="synSpecial">(</span>assign proc <span class="synSpecial">(</span>op lookup-variable-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>const iter<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synComment">;; (+ counter 1)を計算するためにcontinue, proc, envを退避</span>
  <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>save proc<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>save env<span class="synSpecial">)</span>
  <span class="synComment">;; (+ counter 1)の計算開始</span>
  <span class="synSpecial">(</span>assign proc <span class="synSpecial">(</span>op lookup-variable-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synIdentifier">+</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op <span class="synIdentifier">list</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op lookup-variable-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>const counter<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op <span class="synIdentifier">cons</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op primitive-procedure?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label primitive-branch31<span class="synSpecial">))</span>   <span class="synComment">;ここへジャンプ</span>
  compiled-branch32
  <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label after-call33<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op compiled-procedure-entry<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>

  <span class="synComment">;; (+ counter 1)を実際に計算</span>
  primitive-branch31
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op apply-primitive-procedure<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">))</span>
  after-call33
  <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op <span class="synIdentifier">list</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>     <span class="synComment">;arglに今計算した値をリストにして代入</span>
  <span class="synSpecial">(</span>restore env<span class="synSpecial">)</span>                         <span class="synComment">;大本の環境の復帰</span>
  <span class="synSpecial">(</span>save argl<span class="synSpecial">)</span>                           <span class="synComment">;(+ counter 1)の結果のリストを退避</span>
  <span class="synComment">;; (* counter product)の計算開始</span>
  <span class="synSpecial">(</span>assign proc <span class="synSpecial">(</span>op lookup-variable-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synIdentifier">*</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op lookup-variable-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>const product<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op <span class="synIdentifier">list</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op lookup-variable-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>const counter<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op <span class="synIdentifier">cons</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op primitive-procedure?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label primitive-branch28<span class="synSpecial">))</span>   <span class="synComment">;ここへジャンプ</span>
  compiled-branch29
  <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label after-call30<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op compiled-procedure-entry<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>

  <span class="synComment">;; (* counter product)を実際に計算</span>
  primitive-branch28
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op apply-primitive-procedure<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">))</span>
  after-call30
  <span class="synSpecial">(</span>restore argl<span class="synSpecial">)</span>                        <span class="synComment">;(+ counter 1)の復帰</span>
  <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op <span class="synIdentifier">cons</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">))</span> <span class="synComment">;arglに((* counter product) (+ counter 1))を代入</span>
  <span class="synSpecial">(</span>restore proc<span class="synSpecial">)</span>                        <span class="synComment">;iterを復帰</span>
  <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>                    <span class="synComment">;呼び出し元に返るcontinueを復元</span>
  <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op primitive-procedure?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label primitive-branch34<span class="synSpecial">))</span>   <span class="synComment">;ジャンプしない</span>
  compiled-branch35
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op compiled-procedure-entry<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span> <span class="synComment">;entry20へのラベルをvalに代入</span>
  <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  primitive-branch34
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op apply-primitive-procedure<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
  after-call36
  after-if24

  <span class="synComment">;; entry18からジャンプ</span>
  after-lambda21
  <span class="synComment">;; iterを(compiled-procedure entry20 env)と定義．</span>
  <span class="synSpecial">(</span>perform <span class="synSpecial">(</span>op define-variable!<span class="synSpecial">)</span> <span class="synSpecial">(</span>const iter<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>const ok<span class="synSpecial">))</span>

  <span class="synComment">;; ここから(iter 1 1)の処理．</span>
  <span class="synSpecial">(</span>assign proc <span class="synSpecial">(</span>op lookup-variable-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>const iter<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
  <span class="synComment">;; arglは(1)になる</span>
  <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op <span class="synIdentifier">list</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op <span class="synIdentifier">cons</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">))</span> <span class="synComment">;argl =&gt; (1 1)</span>
  <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op primitive-procedure?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span> <span class="synComment">;=&gt;false</span>
  <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label primitive-branch37<span class="synSpecial">))</span>

  compiled-branch38
  <span class="synComment">;; valにiterに対応付けられてるラベルを代入する</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op compiled-procedure-entry<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synComment">;; entry20へgoto</span>
  <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>

  primitive-branch37
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op apply-primitive-procedure<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
  after-call39
  after-lambda19
  <span class="synSpecial">(</span>perform <span class="synSpecial">(</span>op define-variable!<span class="synSpecial">)</span> <span class="synSpecial">(</span>const factorial<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>const ok<span class="synSpecial">))</span>
  <span class="synSpecial">))</span>
</pre>


<p>反復的階乗計算では次の繰り返しに行く前に引数の計算が行われ，環境や継続はすべて大本の状態に復元してから次の繰り返しに向かう．<br/>
前の問題で見たように<a class="keyword" href="http://d.hatena.ne.jp/keyword/%BA%C6%B5%A2">再帰</a>的階乗計算ではprocとenvを退避させ，さらに戻ってくる場所をcontinueによって保持し続けないといけない．<br/>
そのために繰り返しが増えるほどにスタックが深くなっていく．</p>

