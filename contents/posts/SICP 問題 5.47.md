---
title: "SICP 問題 5.47"
published: 2016/02/10
tags:
  - scheme
  - SICP
---

<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%D1%A5%A4%A5%EB">コンパイル</a>した手続きから積極制御評価器で定義した手続きを使えるようにする．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>compile-procedure-call target linkage<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>primitive-branch <span class="synSpecial">(</span>make-label <span class="synSpecial">'</span>primitive-branch<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>compiled-branch <span class="synSpecial">(</span>make-label <span class="synSpecial">'</span>compiled-branch<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>compound-branch <span class="synSpecial">(</span>make-label <span class="synSpecial">'</span>compound-branch<span class="synSpecial">))</span> <span class="synComment">;; compound-branchの作成</span>
        <span class="synSpecial">(</span>after-call <span class="synSpecial">(</span>make-label <span class="synSpecial">'</span>after-call<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>compiled-linkage
           <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> linkage <span class="synSpecial">'</span>next<span class="synSpecial">)</span> after-call linkage<span class="synSpecial">)))</span>
      <span class="synSpecial">(</span>append-instruction-sequences
       <span class="synSpecial">(</span>make-instruction-sequence
        <span class="synSpecial">'(</span>proc<span class="synSpecial">)</span> <span class="synSpecial">'()</span>
        <span class="synSpecial">`((</span>test <span class="synSpecial">(</span>op primitive-procedure?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
          <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label <span class="synSpecial">,</span>primitive-branch<span class="synSpecial">))))</span>
       <span class="synComment">;; compiled-branchへの分岐を追加</span>
       <span class="synSpecial">(</span>make-instruction-sequence
        <span class="synSpecial">'(</span>proc<span class="synSpecial">)</span> <span class="synSpecial">'()</span>
        <span class="synSpecial">`((</span>test <span class="synSpecial">(</span>op compiled-procedure?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
          <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label <span class="synSpecial">,</span>compiled-branch<span class="synSpecial">))))</span>
       <span class="synComment">;; primitiveでもcompiledでもなかったらcompoundとして処理．</span>
       <span class="synSpecial">(</span>parallel-instruction-sequences
        <span class="synSpecial">(</span>append-instruction-sequences
         compound-branch
         <span class="synComment">;; compiledと同じようにcompound-proc-applで命令を作る</span>
         <span class="synSpecial">(</span>compound-proc-appl target compiled-linkage<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>parallel-instruction-sequences
            <span class="synSpecial">(</span>append-instruction-sequences
             compiled-branch
             <span class="synSpecial">(</span>compile-proc-appl target compiled-linkage<span class="synSpecial">))</span>
            <span class="synSpecial">(</span>append-instruction-sequences
             primitive-branch
             <span class="synSpecial">(</span>end-with-linkage
              linkage
              <span class="synSpecial">(</span>make-instruction-sequence
               <span class="synSpecial">'(</span>proc argl<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> target<span class="synSpecial">)</span>
               <span class="synSpecial">`((</span>assign <span class="synSpecial">,</span>target
                         <span class="synSpecial">(</span>op apply-primitive-procedure<span class="synSpecial">)</span>
                         <span class="synSpecial">(</span>reg proc<span class="synSpecial">)</span>
                         <span class="synSpecial">(</span>reg argl<span class="synSpecial">))))))))</span>
       after-call<span class="synSpecial">))))</span>

<span class="synComment">;; ほとんどcompile-proc-applと同じで，continueをセーブしてからcompappにジャンプする．</span>
<span class="synComment">;; compappには(label procedure-apply)が入っている．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>compound-proc-appl target linkage<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synStatement">and</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> target <span class="synSpecial">'</span>val<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> linkage <span class="synSpecial">'</span>return<span class="synSpecial">)))</span>
         <span class="synSpecial">(</span>make-instruction-sequence
          <span class="synSpecial">'()</span> all-regs
          <span class="synSpecial">`((</span>assign continue <span class="synSpecial">(</span>label <span class="synSpecial">,</span>linkage<span class="synSpecial">))</span>
            <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
            <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg compapp<span class="synSpecial">)))))</span>
        <span class="synSpecial">((</span><span class="synStatement">and</span> <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> target <span class="synSpecial">'</span>val<span class="synSpecial">))</span>
              <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> linkage <span class="synSpecial">'</span>return<span class="synSpecial">)))</span>
         <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>proc-return <span class="synSpecial">(</span>make-label <span class="synSpecial">'</span>proc-return<span class="synSpecial">)))</span>
           <span class="synSpecial">(</span>make-instruction-sequence
            <span class="synSpecial">'(</span>proc<span class="synSpecial">)</span> all-regs
            <span class="synSpecial">`((</span>assign continue <span class="synSpecial">(</span>label <span class="synSpecial">,</span>proc-return<span class="synSpecial">))</span>
              <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
              <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg compapp<span class="synSpecial">))</span>
              <span class="synSpecial">,</span>proc-return
              <span class="synSpecial">(</span>assign <span class="synSpecial">,</span>target <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
              <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label <span class="synSpecial">,</span>linkage<span class="synSpecial">))))))</span>
        <span class="synSpecial">((</span><span class="synStatement">and</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> target <span class="synSpecial">'</span>val<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> linkage <span class="synSpecial">'</span>return<span class="synSpecial">))</span>
         <span class="synSpecial">(</span>make-instruction-sequence
          <span class="synSpecial">'(</span>proc continue<span class="synSpecial">)</span> all-regs
          <span class="synSpecial">`((</span>save continue<span class="synSpecial">)</span>
            <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg compapp<span class="synSpecial">)))))</span>
        <span class="synSpecial">((</span><span class="synStatement">and</span> <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> target <span class="synSpecial">'</span>val<span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> linkage <span class="synSpecial">'</span>return<span class="synSpecial">))</span>
         <span class="synSpecial">(</span>error <span class="synConstant">&quot;return linkage, target not val -- COMPILE&quot;</span> target<span class="synSpecial">))))</span>

<span class="synComment">;; ec-evalの命令の先頭でcompappを初期化する．</span>
   <span class="synSpecial">'((</span>assign compapp <span class="synSpecial">(</span>label compound-apply<span class="synSpecial">))</span> <span class="synComment">;追加</span>
     <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label external-entry<span class="synSpecial">))</span>
     read-eval-print-loop
     <span class="synSpecial">(</span>perform <span class="synSpecial">(</span>op initialize-stack<span class="synSpecial">))</span>
</pre>


<p>　<br/>
test</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span>compile-and-go
       <span class="synSpecial">'(</span>begin
          <span class="synSpecial">(</span>define <span class="synSpecial">(</span>f x<span class="synSpecial">)</span> <span class="synSpecial">(</span>+ <span class="synSpecial">(</span>g x<span class="synSpecial">)</span> <span class="synConstant">1</span><span class="synSpecial">))</span>
          <span class="synSpecial">(</span>define <span class="synSpecial">(</span>g x<span class="synSpecial">)</span> <span class="synSpecial">(</span>+ x <span class="synConstant">10</span><span class="synSpecial">))))</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">0</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">0</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
ok

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>f <span class="synConstant">1</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">7</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">3</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">12</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>g x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> x <span class="synConstant">20</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">3</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">3</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
ok

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>f <span class="synConstant">1</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">16</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">7</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">22</span>

gosh&gt; <span class="synSpecial">(</span>compile-and-go
       <span class="synSpecial">'(</span>define <span class="synSpecial">(</span>f x<span class="synSpecial">)</span> <span class="synSpecial">(</span>* <span class="synSpecial">(</span>g x<span class="synSpecial">)</span> <span class="synConstant">2</span><span class="synSpecial">)))</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">0</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">0</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
ok

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>g x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> x <span class="synConstant">1</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">3</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">3</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
ok

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>g <span class="synConstant">1</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">13</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">5</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">2</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>f <span class="synConstant">1</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">16</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">7</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">4</span>
</pre>


<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%D1%A5%A4%A5%EB">コンパイル</a>した定義の上書き，<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%D1%A5%A4%A5%EB">コンパイル</a>していない定義へのアクセスの両方がうまくいっている．</p>

