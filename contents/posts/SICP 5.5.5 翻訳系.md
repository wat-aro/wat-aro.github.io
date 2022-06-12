---
title: "SICP 5.5.5 翻訳系"
published: 2016/02/08
tags:
  - scheme
  - SICP
---

<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/scheme">scheme</a>の式を<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%EC%A5%B8%A5%B9%A5%BF">レジスタ</a>マシンのシミュレータの命令列に翻訳するコード．<br/>
理解するためにコメントを出来るだけつけた</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synIdentifier">load</span> <span class="synConstant">&quot;./eval.scm&quot;</span><span class="synSpecial">)</span>

<span class="synComment">;;; make-branchのための手続き</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> label-counter <span class="synConstant">0</span><span class="synSpecial">)</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>new-label-number<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">set!</span> label-counter <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synConstant">1</span> label-counter<span class="synSpecial">))</span>
  label-counter<span class="synSpecial">)</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-label name<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">string-&gt;symbol</span>
   <span class="synSpecial">(</span><span class="synIdentifier">string-append</span> <span class="synSpecial">(</span><span class="synIdentifier">symbol-&gt;string</span> name<span class="synSpecial">)</span>
                  <span class="synSpecial">(</span><span class="synIdentifier">number-&gt;string</span> <span class="synSpecial">(</span>new-label-number<span class="synSpecial">)))))</span>

<span class="synComment">;;; make-compileに必要な機械演算</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-compiled-procedure entry env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>compiled-procedure entry env<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>compiled-procedure? proc<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>tagged-list? proc <span class="synSpecial">'</span>compiled-procedure<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>compiled-procedure-entry c-proc<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> c-proc<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>compiled-procedure-env c-proc<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">caddr</span> c-proc<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> all-regs <span class="synSpecial">'(</span>env proc val argl continue<span class="synSpecial">))</span>


<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>compile <span class="synIdentifier">exp</span> target linkage<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>self-evaluating? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span>compile-self-evaluating <span class="synIdentifier">exp</span> target linkage<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>quoted? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>compile-quoted <span class="synIdentifier">exp</span> target linkage<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>variable? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span>compile-variable <span class="synIdentifier">exp</span> target linkage<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>assignment? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span>compile-assignment <span class="synIdentifier">exp</span> target linkage<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>definition? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span>compile-definition <span class="synIdentifier">exp</span> target linkage<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>if? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>compile-if <span class="synIdentifier">exp</span> target linkage<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>lambda? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>compile-lambda <span class="synIdentifier">exp</span> target linkage<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>begin? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span>compile-sequence <span class="synSpecial">(</span>begin-actions <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                           target linkage<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>cond? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>compile <span class="synSpecial">(</span>cond-&gt;if <span class="synIdentifier">exp</span><span class="synSpecial">)</span> target linkage<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>application? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span>compile-application <span class="synIdentifier">exp</span> target linkage<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span>
         <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown expression type -- COMPILE&quot;</span> <span class="synIdentifier">exp</span><span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-instruction-sequence needs modifies statements<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">list</span> needs modifies statements<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>empty-instruction-sequence<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>make-instruction-sequence <span class="synSpecial">'()</span> <span class="synSpecial">'()</span> <span class="synSpecial">'()))</span>

<span class="synComment">;;; 接続コードの翻訳</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>compile-linkage linkage<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> linkage <span class="synSpecial">'</span>return<span class="synSpecial">)</span>
         <span class="synSpecial">(</span>make-instruction-sequence <span class="synSpecial">'(</span>continue<span class="synSpecial">)</span> <span class="synSpecial">'()</span>
                                    <span class="synSpecial">'((</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">)))))</span>
        <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> linkage <span class="synSpecial">'</span>next<span class="synSpecial">)</span>
         <span class="synSpecial">(</span>empty-instruction-sequence<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span>
         <span class="synSpecial">(</span>make-instruction-sequence <span class="synSpecial">'()</span> <span class="synSpecial">'()</span>
                                    <span class="synSpecial">`((</span>goto <span class="synSpecial">(</span>label <span class="synSpecial">,</span>linkage<span class="synSpecial">)))))))</span>

<span class="synComment">;;; 命令の最後に次の計算の行き先を入れる．</span>
<span class="synComment">;;; preservingがあるのでlinkageがreturnでinstruction-sequenceでcontinueを変更しても</span>
<span class="synComment">;;; save, restoreされるので問題ない</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>end-with-linkage linkage instruction-sequence<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>preserving <span class="synSpecial">'(</span>continue<span class="synSpecial">)</span>
              instruction-sequence
              <span class="synSpecial">(</span>compile-linkage linkage<span class="synSpecial">)))</span>

<span class="synComment">;;; 単純な式のコンパイル</span>
<span class="synComment">;;; targetにexpを代入して次の計算への命令を作る</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>compile-self-evaluating <span class="synIdentifier">exp</span> target linkage<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>end-with-linkage
   linkage
   <span class="synSpecial">(</span>make-instruction-sequence <span class="synSpecial">'()</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> target<span class="synSpecial">)</span>
                              <span class="synSpecial">`((</span>assign <span class="synSpecial">,</span>target <span class="synSpecial">(</span>const <span class="synSpecial">,</span>exp<span class="synSpecial">))))))</span>

<span class="synComment">;;; targetに(cadr exp)を代入して次の計算への命令を作る</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>compile-quoted <span class="synIdentifier">exp</span> target linkage<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>end-with-linkage
   linkage
   <span class="synSpecial">(</span>make-instruction-sequence <span class="synSpecial">'()</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> target<span class="synSpecial">)</span>
                              <span class="synSpecial">`((</span>assign <span class="synSpecial">,</span>target <span class="synSpecial">(</span>const <span class="synSpecial">,(</span>text-of-quotation <span class="synIdentifier">exp</span><span class="synSpecial">)))))))</span>

<span class="synComment">;;; variableを環境から探してきて，見つかった値をtargetに代入して，次の計算への命令を足して返す</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>compile-variable <span class="synIdentifier">exp</span> target linkage<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>end-with-linkage
   linkage
   <span class="synSpecial">(</span>make-instruction-sequence <span class="synSpecial">'(</span>env<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> target<span class="synSpecial">)</span>
                              <span class="synSpecial">`((</span>assign <span class="synSpecial">,</span>target
                                        <span class="synSpecial">(</span>op lookup-variable-value<span class="synSpecial">)</span>
                                        <span class="synSpecial">(</span>const <span class="synSpecial">,</span>exp<span class="synSpecial">)</span>
                                        <span class="synSpecial">(</span>reg env<span class="synSpecial">))))))</span>

<span class="synComment">;;; 代入</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>compile-assignment <span class="synIdentifier">exp</span> target linkage<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>var <span class="synSpecial">(</span>assignment-variable <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">(</span>get-value-code                 <span class="synComment">;valを求めるための命令．</span>
         <span class="synSpecial">(</span>compile <span class="synSpecial">(</span>assignment-value <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">'</span>val <span class="synSpecial">'</span>next<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span>end-with-linkage
     linkage
     <span class="synSpecial">(</span>preserving <span class="synSpecial">'(</span>env<span class="synSpecial">)</span>                 <span class="synComment">;valを求める間に環境が変わると困る</span>
                 get-value-code         <span class="synComment">;代入する値を求め，valに代入される．seq1</span>
                 <span class="synComment">;; valに代入された値をvarに代入する．seq2</span>
                 <span class="synSpecial">(</span>make-instruction-sequence
                  <span class="synComment">;;  ;代入するので元々の環境と代入する値を必要とする．</span>
                  <span class="synSpecial">'(</span>env val<span class="synSpecial">)</span>
                  <span class="synComment">;; targetに'okを入れて返すのでtargetは変更する</span>
                  <span class="synSpecial">(</span><span class="synIdentifier">list</span> target<span class="synSpecial">)</span>
                  <span class="synSpecial">`((</span>perform <span class="synSpecial">(</span>op set-variable-value!<span class="synSpecial">)</span>
                             <span class="synSpecial">(</span>const <span class="synSpecial">,</span>var<span class="synSpecial">)</span>
                             <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span>
                             <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
                    <span class="synSpecial">(</span>assign <span class="synSpecial">,</span>target <span class="synSpecial">(</span>const ok<span class="synSpecial">))))))))</span>

<span class="synComment">;;; 定義</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>compile-definition <span class="synIdentifier">exp</span> target linkage<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>var <span class="synSpecial">(</span>definition-variable <span class="synIdentifier">exp</span><span class="synSpecial">))</span> <span class="synComment">;糖衣構文(f x)の場合でもfがvarに束縛される</span>
        <span class="synSpecial">(</span>get-value-code                 <span class="synComment">;varに束縛する値を求める命令</span>
         <span class="synSpecial">(</span>compile <span class="synSpecial">(</span>definition-value <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">'</span>val <span class="synSpecial">'</span>next<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span>end-with-linkage
     linkage
     <span class="synSpecial">(</span>preserving <span class="synSpecial">'(</span>env<span class="synSpecial">)</span>                 <span class="synComment">;valを求める間に環境が変わると困る</span>
                 get-value-code
                 <span class="synSpecial">(</span>make-instruction-sequence
                  <span class="synComment">;;定義する元々の環境とget-value-codeで求めた値の入っているvalが必要</span>
                  <span class="synSpecial">'(</span>env val<span class="synSpecial">)</span>
                  <span class="synSpecial">(</span><span class="synIdentifier">list</span> target<span class="synSpecial">)</span>         <span class="synComment">;targetにokを入れて返す</span>
                  <span class="synSpecial">`((</span>perform <span class="synSpecial">(</span>op define-variable!<span class="synSpecial">)</span>
                             <span class="synSpecial">(</span>const <span class="synSpecial">,</span>var<span class="synSpecial">)</span>
                             <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span>
                             <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
                    <span class="synSpecial">(</span>assign <span class="synSpecial">,</span>target <span class="synSpecial">(</span>const ok<span class="synSpecial">))))))))</span>

<span class="synComment">;;; 条件式</span>
<span class="synComment">;;; ifはtestがtrueならfalseに飛ぶ．</span>
<span class="synComment">;;; そのためlinkageがnextの場合，そのままだとtrueの後にfalseにいってしまう</span>
<span class="synComment">;;; falseを飛ばすためにtrueの後はafter-ifに飛ぶように</span>
<span class="synComment">;;; nextの場合はconsequenct-linkageにafter-ifを入れる．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>compile-if <span class="synIdentifier">exp</span> target linkage<span class="synSpecial">)</span>
  <span class="synComment">;; make-branchで書くラベルにIDをつける</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>t-branch <span class="synSpecial">(</span>make-label <span class="synSpecial">'</span>true-branch<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>f-branch <span class="synSpecial">(</span>make-label <span class="synSpecial">'</span>false-branch<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>after-if <span class="synSpecial">(</span>make-label <span class="synSpecial">'</span>after-if<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>consequent-linkage           <span class="synComment">;nextならafter-ifが入る</span>
           <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> linkage <span class="synSpecial">'</span>next<span class="synSpecial">)</span> after-if linkage<span class="synSpecial">)))</span>
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>p-code <span class="synSpecial">(</span>compile <span class="synSpecial">(</span>if-predicate <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">'</span>val <span class="synSpecial">'</span>next<span class="synSpecial">))</span> <span class="synComment">;術後を生成する</span>
            <span class="synSpecial">(</span>c-code
             <span class="synSpecial">(</span>compile
              <span class="synSpecial">(</span>if-consequent <span class="synIdentifier">exp</span><span class="synSpecial">)</span> target consequent-linkage<span class="synSpecial">))</span> <span class="synComment">;consequenct節の命令の生成</span>
            <span class="synSpecial">(</span>a-code
             <span class="synSpecial">(</span>compile <span class="synSpecial">(</span>if-alternative <span class="synIdentifier">exp</span><span class="synSpecial">)</span> target linkage<span class="synSpecial">)))</span> <span class="synComment">;alterenative節の命令の生成</span>
        <span class="synSpecial">(</span>preserving <span class="synSpecial">'(</span>env continue<span class="synSpecial">)</span>     <span class="synComment">;環境とcontinueは保護</span>
                    p-code
                    <span class="synSpecial">(</span>append-instruction-sequences <span class="synComment">;任意の数の式をつながりのある式として連結する</span>
                     <span class="synSpecial">(</span>make-instruction-sequence <span class="synSpecial">'(</span>val<span class="synSpecial">)</span> <span class="synSpecial">'()</span>
                                                <span class="synSpecial">`((</span>test <span class="synSpecial">(</span>op false?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
                                                  <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label <span class="synSpecial">,</span>f-branch<span class="synSpecial">))))</span>
                     <span class="synComment">;; prallelで逐次実行でなくどちらかだけが実行される命令を作る</span>
                     <span class="synComment">;; これはどちらが選ばれるか実行時までわからないので</span>
                     <span class="synComment">;; neededとmodifiedの和集合をとる．</span>
                     <span class="synSpecial">(</span>parallel-instruction-sequences
                      <span class="synSpecial">(</span>append-instruction-sequences t-branch c-code<span class="synSpecial">)</span>
                      <span class="synSpecial">(</span>append-instruction-sequences f-branch a-code<span class="synSpecial">))</span>
                     after-if<span class="synSpecial">))))))</span>

<span class="synComment">;;; 並び</span>
<span class="synComment">;;; beginやlambdaのbodyで使う</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>compile-sequence seq target linkage<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>last-exp? seq<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>compile <span class="synSpecial">(</span>first-exp seq<span class="synSpecial">)</span> target linkage<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>preserving
       <span class="synSpecial">'(</span>env continue<span class="synSpecial">)</span>                  <span class="synComment">;環境と継続は保護</span>
       <span class="synSpecial">(</span>compile <span class="synSpecial">(</span>first-exp seq<span class="synSpecial">)</span> target <span class="synSpecial">'</span>next<span class="synSpecial">)</span> <span class="synComment">;そのまま次の命令を実行するのでnext</span>
       <span class="synSpecial">(</span>compile-sequence <span class="synSpecial">(</span>rest-exps seq<span class="synSpecial">)</span> target linkage<span class="synSpecial">))))</span> <span class="synComment">;再帰的に命令列を作る</span>

<span class="synComment">;;; lambda式</span>
<span class="synComment">;;; target(val)にコンパイルした式のラベルを束縛してlambda-linkageにジャンプ</span>
<span class="synComment">;;; 実際に式を呼び出すときにcompile-lambda-bodyで作るラベルにジャンプし，処理をする</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>compile-lambda <span class="synIdentifier">exp</span> target linkage<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>proc-entry <span class="synSpecial">(</span>make-label <span class="synSpecial">'</span>entry<span class="synSpecial">))</span> <span class="synComment">;コンパイルされた式はこのentry-idのラベルで処理される</span>
        <span class="synSpecial">(</span>after-lambda <span class="synSpecial">(</span>make-label <span class="synSpecial">'</span>after-lambda<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>lambda-linkage
           <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> linkage <span class="synSpecial">'</span>next<span class="synSpecial">)</span> after-lambda linkage<span class="synSpecial">)))</span>
      <span class="synSpecial">(</span>append-instruction-sequences
       <span class="synComment">;; tack-onでend-with-linkageにcompile-lambda-bodyを連結．</span>
       <span class="synComment">;; neededとmodifiedはend-with-linkageのほうを使う</span>
       <span class="synSpecial">(</span>tack-on-instruction-sequence
        <span class="synSpecial">(</span>end-with-linkage
         lambda-linkage
         <span class="synSpecial">(</span>make-instruction-sequence
          <span class="synSpecial">'(</span>env<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> target<span class="synSpecial">)</span>
          <span class="synSpecial">`((</span>assign <span class="synSpecial">,</span>target
                    <span class="synSpecial">(</span>op make-compiled-procedure<span class="synSpecial">)</span>
                    <span class="synSpecial">(</span>label <span class="synSpecial">,</span>proc-entry<span class="synSpecial">)</span>
                    <span class="synSpecial">(</span>reg env<span class="synSpecial">)))))</span>
        <span class="synSpecial">(</span>compile-lambda-body <span class="synIdentifier">exp</span> proc-entry<span class="synSpecial">))</span>
       after-lambda<span class="synSpecial">))))</span>

<span class="synComment">;;; コンパイルした手続きが実際に処理をするラベルの中身を作る</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>compile-lambda-body <span class="synIdentifier">exp</span> proc-entry<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>formals <span class="synSpecial">(</span>lambda-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)))</span> <span class="synComment">;lambdaの引数はformalsに束縛</span>
    <span class="synSpecial">(</span>append-instruction-sequences
     <span class="synSpecial">(</span>make-instruction-sequence
      <span class="synSpecial">'(</span>env proc argl<span class="synSpecial">)</span> <span class="synSpecial">'(</span>env<span class="synSpecial">)</span>
      <span class="synComment">;; 実際の処理をするラベル</span>
      <span class="synSpecial">`(,</span>proc-entry
        <span class="synSpecial">(</span>assign env <span class="synSpecial">(</span>op compiled-procedure-env<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>assign env                     <span class="synComment">;ここで仮引数と実引数で環境を拡張</span>
                <span class="synSpecial">(</span>op extend-environment<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>const <span class="synSpecial">,</span>formals<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>reg argl<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>reg env<span class="synSpecial">))))</span>
     <span class="synComment">;; lambdaのbodyは式が複数のことがあるのでcompile-sequence</span>
     <span class="synComment">;; 呼び出し元に値を返さないと行けないのでlinkageはreturn</span>
     <span class="synSpecial">(</span>compile-sequence <span class="synSpecial">(</span>lambda-body <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">'</span>val <span class="synSpecial">'</span>return<span class="synSpecial">))))</span>

<span class="synComment">;;; apply</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>compile-application <span class="synIdentifier">exp</span> target linkage<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">(</span>
        <span class="synComment">;; operatorをコンパイルしたら次はoperandの評価をしなければいけないのでnext</span>
        <span class="synSpecial">(</span>proc-code <span class="synSpecial">(</span>compile <span class="synSpecial">(</span>operator <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">'</span>proc <span class="synSpecial">'</span>next<span class="synSpecial">))</span>
        <span class="synComment">;; operandは複数なのでそれぞれcompileしてリストにして保持</span>
        <span class="synSpecial">(</span>operand-codes
         <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>operand<span class="synSpecial">)</span> <span class="synSpecial">(</span>compile operand <span class="synSpecial">'</span>val <span class="synSpecial">'</span>next<span class="synSpecial">))</span>
              <span class="synSpecial">(</span>operands <span class="synIdentifier">exp</span><span class="synSpecial">))))</span>
    <span class="synSpecial">(</span>preserving
     <span class="synSpecial">'(</span>env continue<span class="synSpecial">)</span>
     proc-code                          <span class="synComment">;最初にoperatorを確定させる</span>
     <span class="synSpecial">(</span>preserving
      <span class="synSpecial">'(</span>proc continue<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>construct-arglist operand-codes<span class="synSpecial">)</span> <span class="synComment">;operandを評価してarglに代入するための命令の生成</span>
      <span class="synSpecial">(</span>compile-procedure-call target linkage<span class="synSpecial">)))))</span> <span class="synComment">;</span>

<span class="synComment">;;; compile-applicationでoperand-codesはコンパイル済みなのでそれをarglに入れるための命令を生成</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>construct-arglist operand-codes<span class="synSpecial">)</span>
  <span class="synComment">;; reverseして連結していくので右から左に評価することになる</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>operand-codes <span class="synSpecial">(</span><span class="synIdentifier">reverse</span> operand-codes<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> operand-codes<span class="synSpecial">)</span>
        <span class="synComment">;; 引数がない場合はarglに'()を代入</span>
        <span class="synSpecial">(</span>make-instruction-sequence
         <span class="synSpecial">'()</span> <span class="synSpecial">'(</span>argl<span class="synSpecial">)</span>
         <span class="synSpecial">`((</span>assign argl <span class="synSpecial">(</span>const <span class="synSpecial">()))))</span>
        <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>code-to-get-last-arg     <span class="synComment">;最後のoperandが生成する命令</span>
               <span class="synSpecial">(</span>append-instruction-sequences
                <span class="synSpecial">(</span><span class="synIdentifier">car</span> operand-codes<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>make-instruction-sequence
                 <span class="synSpecial">'(</span>val<span class="synSpecial">)</span> <span class="synSpecial">'(</span>argl<span class="synSpecial">)</span>         <span class="synComment">;arglの初期化が必要なのでこれだけ特別に処理</span>
                 <span class="synSpecial">`((</span>assign argl <span class="synSpecial">(</span>op list<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)))))))</span>
          <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> operand-codes<span class="synSpecial">))</span>
              code-to-get-last-arg      <span class="synComment">;cdrがnullなら最後のoperand</span>
              <span class="synComment">;; まだoperandが残っていればこちら</span>
              <span class="synSpecial">(</span>preserving
               <span class="synSpecial">'(</span>env<span class="synSpecial">)</span>                   <span class="synComment">;環境は保持</span>
               code-to-get-last-arg     <span class="synComment">;引数の最後（reverseしているので先頭）からつなげる.</span>
               <span class="synSpecial">(</span>code-to-get-rest-args
                <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> operand-codes<span class="synSpecial">))))))))</span>

<span class="synComment">;;; last-arg以外はここで処理する</span>
<span class="synComment">;;; operand-codesはコンパイル済み</span>
<span class="synComment">;;; arglには既に最後の引数が代入されているのでそこに先頭(reverseしてるので後ろ)から代入していく</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>code-to-get-rest-args operand-codes<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>code-for-next-arg              <span class="synComment">;先頭</span>
         <span class="synSpecial">(</span>preserving
          <span class="synSpecial">'(</span>argl<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synIdentifier">car</span> operand-codes<span class="synSpecial">)</span>           <span class="synComment">;valに先頭の要素のコンパイル結果を代入する命令</span>
          <span class="synSpecial">(</span>make-instruction-sequence
           <span class="synSpecial">'(</span>val argl<span class="synSpecial">)</span> <span class="synSpecial">'(</span>argl<span class="synSpecial">)</span>
           <span class="synSpecial">'((</span>assign argl               <span class="synComment">;valに入った(car operand)の値をarglに代入</span>
                     <span class="synSpecial">(</span>op cons<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">)))))))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> operand-codes<span class="synSpecial">))</span>
        code-for-next-arg
        <span class="synSpecial">(</span>preserving
         <span class="synSpecial">'(</span>env<span class="synSpecial">)</span>
         code-for-next-arg
         <span class="synSpecial">(</span>code-to-get-rest-args <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> operand-cods<span class="synSpecial">))))))</span>

<span class="synComment">;;; operator, operandsを評価する命令を作った後に呼ばれる</span>
<span class="synComment">;;; この時点でprocにはoperatorのシンボル, arglにはoperandsが入っている</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>compile-procedure-call target linkage<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>primitive-branch <span class="synSpecial">(</span>make-label <span class="synSpecial">'</span>primitive-branch<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>compiled-branch <span class="synSpecial">(</span>make-label <span class="synSpecial">'</span>compiled-branch<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>after-call <span class="synSpecial">(</span>make-label <span class="synSpecial">'</span>after-call<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>compiled-linkage
           <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> linkage <span class="synSpecial">'</span>next<span class="synSpecial">)</span> after-call linkage<span class="synSpecial">)))</span>
      <span class="synSpecial">(</span>append-instruction-sequences
       <span class="synSpecial">(</span>make-instruction-sequence
        <span class="synSpecial">'(</span>proc<span class="synSpecial">)</span> <span class="synSpecial">'()</span>
        <span class="synSpecial">`((</span>test <span class="synSpecial">(</span>op primitive-procedure?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
          <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label <span class="synSpecial">,</span>primitive-branch<span class="synSpecial">))))</span>
       <span class="synComment">;; compiled-branchかprimitive-branchのどちらかだけが実行されるのでparallel</span>
       <span class="synSpecial">(</span>parallel-instruction-sequences
        <span class="synSpecial">(</span>append-instruction-sequences
         compiled-branch
         <span class="synComment">;; ここでtargetとlinkageに合わせた命令を生成</span>
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
                     <span class="synSpecial">(</span>reg argl<span class="synSpecial">)))))))</span>
       after-call<span class="synSpecial">))))</span>

<span class="synComment">;;; 手続きの採用</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>compile-proc-appl target linkage<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">(</span>
         <span class="synComment">;; linkageがreturnでなければlinkageにはいったlabelが値を返す場所</span>
         <span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> target <span class="synSpecial">'</span>val<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> linkage <span class="synSpecial">'</span>return<span class="synSpecial">)))</span>
         <span class="synSpecial">(</span>make-instruction-sequence
          <span class="synSpecial">'(</span>proc<span class="synSpecial">)</span> all-regs
          <span class="synSpecial">`((</span>assign continue <span class="synSpecial">(</span>label <span class="synSpecial">,</span>linkage<span class="synSpecial">))</span> <span class="synComment">;計算した値をvalに入れたらこのlinkageにジャンプ</span>
            <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op compiled-procedure-entry<span class="synSpecial">)</span>
                    <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
            <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg val<span class="synSpecial">)))))</span>
        <span class="synComment">;; targetがvalでないのでproc-returnでtargetにvalを代入しないといけない</span>
        <span class="synSpecial">((</span><span class="synStatement">and</span> <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> target <span class="synSpecial">'</span>val<span class="synSpecial">))</span>
              <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> linkage <span class="synSpecial">'</span>return<span class="synSpecial">)))</span>
         <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>proc-return <span class="synSpecial">(</span>make-label <span class="synSpecial">'</span>proc-return<span class="synSpecial">)))</span>
           <span class="synSpecial">(</span>make-instruction-sequence
            <span class="synSpecial">'(</span>proc<span class="synSpecial">)</span> all-regs
            <span class="synSpecial">`((</span>assign continue <span class="synSpecial">(</span>label <span class="synSpecial">,</span>proc-return<span class="synSpecial">))</span>
              <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op compiled-procedure-entry<span class="synSpecial">)</span>
                      <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
              <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
              <span class="synSpecial">,</span>proc-return
              <span class="synSpecial">(</span>assign <span class="synSpecial">,</span>target <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span> <span class="synComment">;targetがvalでないので，ここでtargetにvalを代入</span>
              <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label <span class="synSpecial">,</span>linkage<span class="synSpecial">))))))</span>
        <span class="synComment">;; targetがvalでreturnなら計算の後，continueに行けばいいので余計な処理はない</span>
        <span class="synSpecial">((</span><span class="synStatement">and</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> target <span class="synSpecial">'</span>val<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> linkage <span class="synSpecial">'</span>return<span class="synSpecial">))</span>
         <span class="synSpecial">(</span>make-instruction-sequence
          <span class="synSpecial">'(</span>proc continue<span class="synSpecial">)</span> all-regs
          <span class="synSpecial">`((</span>assign val <span class="synSpecial">(</span>op compiled-procedure-entry<span class="synSpecial">)</span>
                    <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
            <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg val<span class="synSpecial">)))))</span>
        <span class="synSpecial">((</span><span class="synStatement">and</span> <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> target <span class="synSpecial">'</span>val<span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> linkage <span class="synSpecial">'</span>return<span class="synSpecial">))</span>
         <span class="synSpecial">(</span>error <span class="synConstant">&quot;return linkage, target not val -- COMPILE&quot;</span> target<span class="synSpecial">))))</span>

<span class="synComment">;;; 命令列の組み合わせ</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>registers-needed s<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">symbol?</span> s<span class="synSpecial">)</span> <span class="synSpecial">'()</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> s<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>registers-modified s<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">symbol?</span> s<span class="synSpecial">)</span> <span class="synSpecial">'()</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> s<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>statements s<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">symbol?</span> s<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> s<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">caddr</span> s<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>needs-register? seq reg<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">memq</span> reg <span class="synSpecial">(</span>registers-needed seq<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>modifies-register? seq reg<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">memq</span> reg <span class="synSpecial">(</span>registers-modified seq<span class="synSpecial">)))</span>

<span class="synComment">;;; neededとmodifiedをうまく合成して新しい命令列を作る</span>
<span class="synComment">;;; これは人つながりの命令にする．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>append-instruction-sequences <span class="synSpecial">.</span> seqs<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>append-2-sequences seq1 seq2<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>make-instruction-sequence
     <span class="synComment">;; needed</span>
     <span class="synSpecial">(</span>list-union <span class="synSpecial">(</span>registers-needed seq1<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span>list-difference <span class="synSpecial">(</span>registers-needed seq2<span class="synSpecial">)</span> <span class="synComment">;seq1で変更してseq2がそれを必要とする</span>
                                  <span class="synSpecial">(</span>registers-modified seq1<span class="synSpecial">)))</span> <span class="synComment">;ならseq1の時点では必要ない</span>
     <span class="synSpecial">(</span>list-union <span class="synSpecial">(</span>registers-modified seq1<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span>registers-modified seq2<span class="synSpecial">))</span>
     <span class="synSpecial">(</span><span class="synIdentifier">append</span> <span class="synSpecial">(</span>statements seq1<span class="synSpecial">)</span> <span class="synSpecial">(</span>statements seq2<span class="synSpecial">))))</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>append-seq-list seqs<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> seqs<span class="synSpecial">)</span>
        <span class="synSpecial">(</span>empty-instruction-sequence<span class="synSpecial">)</span>
        <span class="synSpecial">(</span>append-2-sequences <span class="synSpecial">(</span><span class="synIdentifier">car</span> seqs<span class="synSpecial">)</span>  <span class="synComment">;nullじゃなければこっち．</span>
                            <span class="synSpecial">(</span>append-seq-list <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> seqs<span class="synSpecial">)))))</span>
  <span class="synSpecial">(</span>append-seq-list seqs<span class="synSpecial">))</span>

<span class="synComment">;;; 集合演算</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>list-union s1 s2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> s1<span class="synSpecial">)</span> s2<span class="synSpecial">)</span>
        <span class="synSpecial">((</span><span class="synIdentifier">memq</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> s1<span class="synSpecial">)</span> s2<span class="synSpecial">)</span> <span class="synSpecial">(</span>list-union <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> s1<span class="synSpecial">)</span> s2<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> s1<span class="synSpecial">)</span> <span class="synSpecial">(</span>list-union <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> s1<span class="synSpecial">)</span> s2<span class="synSpecial">)))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>list-difference s1 s2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> s1<span class="synSpecial">)</span> <span class="synSpecial">'())</span>
        <span class="synSpecial">((</span><span class="synIdentifier">memq</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> s1<span class="synSpecial">)</span> s2<span class="synSpecial">)</span> <span class="synSpecial">(</span>list-difference <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> s1<span class="synSpecial">)</span> s2<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> s1<span class="synSpecial">)</span>
                    <span class="synSpecial">(</span>list-difference <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> s1<span class="synSpecial">)</span> s2<span class="synSpecial">)))))</span>

<span class="synComment">;;; regsの中にseq1で変更してseq2でしようするレジスタがあれば</span>
<span class="synComment">;;; seq1の前後でsave, restoreする命令を作る．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>preserving regs seq1 seq2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> regs<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>append-instruction-sequences seq1 seq2<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>first-reg <span class="synSpecial">(</span><span class="synIdentifier">car</span> regs<span class="synSpecial">)))</span>     <span class="synComment">;first-regが</span>
        <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span>needs-register? seq2 first-reg<span class="synSpecial">)</span> <span class="synComment">;seq2に必要なレジスタで</span>
                 <span class="synSpecial">(</span>modifies-register? seq1 first-reg<span class="synSpecial">))</span> <span class="synComment">;seq1が変更するレジスタなら</span>
            <span class="synSpecial">(</span>preserving
             <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> regs<span class="synSpecial">)</span>
             <span class="synSpecial">(</span>make-instruction-sequence
              <span class="synComment">;; needs ここでsaveするのでfirst-regが必要になるのでlist-union</span>
              <span class="synSpecial">(</span>list-union <span class="synSpecial">(</span><span class="synIdentifier">list</span> first-reg<span class="synSpecial">)</span>
                          <span class="synSpecial">(</span>registers-needed seq1<span class="synSpecial">))</span>
              <span class="synComment">;; modify saveしてのseq2の前にrestoreするのでseq2から見ればfirst-reg変更無し</span>
              <span class="synSpecial">(</span>list-difference <span class="synSpecial">(</span>registers-modified seq1<span class="synSpecial">)</span>
                               <span class="synSpecial">(</span><span class="synIdentifier">list</span> first-reg<span class="synSpecial">))</span>
              <span class="synComment">;; statements 条件を満たすfirst-regの場合はseq1をsaveとrestoreで挟む</span>
              <span class="synSpecial">(</span><span class="synIdentifier">append</span> <span class="synSpecial">`((</span>save <span class="synSpecial">,</span>first-reg<span class="synSpecial">))</span>
                      <span class="synSpecial">(</span>statements seq1<span class="synSpecial">)</span>
                      <span class="synSpecial">`((</span>restore <span class="synSpecial">,</span>first-reg<span class="synSpecial">))))</span>
             seq2<span class="synSpecial">)</span>
            <span class="synSpecial">(</span>preserving <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> regs<span class="synSpecial">)</span> seq1 seq2<span class="synSpecial">)))))</span>

<span class="synComment">;;; seqとbodyとbody-seqをつなげる．neededとmodifiedはseqのまま</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>tack-on-instruction-sequence seq body-seq<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>make-instruction-sequence
   <span class="synSpecial">(</span>registers-needed seq<span class="synSpecial">)</span>
   <span class="synSpecial">(</span>registers-modified seq<span class="synSpecial">)</span>
   <span class="synSpecial">(</span><span class="synIdentifier">append</span> <span class="synSpecial">(</span>statements seq<span class="synSpecial">)</span> <span class="synSpecial">(</span>statements body-seq<span class="synSpecial">))))</span>

<span class="synComment">;;; neededとmodifiedは和集合を取る．</span>
<span class="synComment">;;; ifのconsequentとalternative, や</span>
<span class="synComment">;;; 手続きのcompiled, primitiveの違いのようにどちらかだけが実行されるようなラベルを作るときに使う</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>parallel-instruction-sequences seq1 seq2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>make-instruction-sequence
   <span class="synSpecial">(</span>list-union <span class="synSpecial">(</span>registers-needed seq1<span class="synSpecial">)</span>
               <span class="synSpecial">(</span>registers-needed seq2<span class="synSpecial">))</span>
   <span class="synSpecial">(</span>list-union <span class="synSpecial">(</span>registers-modified seq1<span class="synSpecial">)</span>
               <span class="synSpecial">(</span>registers-modified seq2<span class="synSpecial">))</span>
   <span class="synSpecial">(</span><span class="synIdentifier">append</span> <span class="synSpecial">(</span>statements seq1<span class="synSpecial">)</span> <span class="synSpecial">(</span>statements seq2<span class="synSpecial">))))</span>
</pre>


