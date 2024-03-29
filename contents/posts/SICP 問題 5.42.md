---
title: "SICP 問題 5.42"
published: 2016/02/09
tags:
  - scheme
  - SICP
---

<p>compile-variableとcompile-assignmentを文面アドレスを使った検索に対応</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>compile-variable <span class="synIdentifier">exp</span> target linkage ct-env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>address <span class="synSpecial">(</span>find-variable <span class="synIdentifier">exp</span> ct-env<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span>end-with-linkage
     linkage
     <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> address <span class="synSpecial">'</span>not-found<span class="synSpecial">)</span>
         <span class="synSpecial">(</span>make-instruction-sequence
          <span class="synSpecial">'(</span>env<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> target<span class="synSpecial">)</span>
          <span class="synComment">;; targetなら変更しても問題ないので一時的に帯域環境を入れる</span>
          <span class="synSpecial">`((</span>assign <span class="synSpecial">,</span>target <span class="synSpecial">(</span>op get-global-environment<span class="synSpecial">))</span>
            <span class="synSpecial">(</span>assign <span class="synSpecial">,</span>target
                    <span class="synSpecial">(</span>op lookup-variable-value<span class="synSpecial">)</span>
                    <span class="synSpecial">(</span>const <span class="synSpecial">,</span>exp<span class="synSpecial">)</span>
                    <span class="synSpecial">(</span>reg <span class="synSpecial">,</span>target<span class="synSpecial">))))</span>
         <span class="synSpecial">(</span>make-instruction-sequence
          <span class="synSpecial">'()</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> target<span class="synSpecial">)</span>
          <span class="synSpecial">`((</span>assign <span class="synSpecial">,</span>target
                    <span class="synSpecial">(</span>op lexical-address-lookup<span class="synSpecial">)</span>
                    <span class="synSpecial">(</span>const <span class="synSpecial">,</span>address<span class="synSpecial">)</span>
                    <span class="synSpecial">(</span>reg env<span class="synSpecial">))))))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>compile-assignment <span class="synIdentifier">exp</span> target linkage ct-env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>var <span class="synSpecial">(</span>assignment-variable <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">(</span>get-value-code                 <span class="synComment">;valを求めるための命令．</span>
         <span class="synSpecial">(</span>compile <span class="synSpecial">(</span>assignment-value <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">'</span>val <span class="synSpecial">'</span>next ct-env<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>address <span class="synSpecial">(</span>find-variable var ct-env<span class="synSpecial">)))</span>
     <span class="synSpecial">(</span>end-with-linkage
      linkage
      <span class="synSpecial">(</span>append-instruction-sequences
                  get-value-code <span class="synComment">;代入する値を求め，valに代入される．seq1</span>
                  <span class="synComment">;; valに代入された値をvarに代入する．seq2</span>
                  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> address <span class="synSpecial">'</span>not-found<span class="synSpecial">)</span>
                      <span class="synSpecial">(</span>make-instruction-sequence
                       <span class="synSpecial">'(</span>env val<span class="synSpecial">)</span>
                       <span class="synSpecial">(</span><span class="synIdentifier">list</span> target<span class="synSpecial">)</span>
                       <span class="synComment">;; 一度targetにglobal-environmentを代入してからsetする</span>
                       <span class="synSpecial">`((</span>assign target <span class="synSpecial">(</span>op get-global-environment<span class="synSpecial">))</span>
                         <span class="synSpecial">(</span>perform <span class="synSpecial">(</span>op set-variable-value!<span class="synSpecial">)</span>
                                  <span class="synSpecial">(</span>const <span class="synSpecial">,</span>var<span class="synSpecial">)</span>
                                  <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span>
                                  <span class="synSpecial">(</span>reg <span class="synSpecial">,</span>target<span class="synSpecial">))</span>
                         <span class="synSpecial">(</span>assign <span class="synSpecial">,</span>target <span class="synSpecial">(</span>const ok<span class="synSpecial">))))</span>
                      <span class="synSpecial">(</span>make-instruction-sequence
                       <span class="synSpecial">'(</span>env val<span class="synSpecial">)</span>
                       <span class="synSpecial">(</span><span class="synIdentifier">list</span> target<span class="synSpecial">)</span>
                       <span class="synSpecial">`((</span>perform <span class="synSpecial">(</span>op lexical-address-set!<span class="synSpecial">)</span>
                                  <span class="synSpecial">(</span>const <span class="synSpecial">,</span>address<span class="synSpecial">)</span>
                                  <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span>
                                  <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
                         <span class="synSpecial">(</span>assign <span class="synSpecial">,</span>target <span class="synSpecial">(</span>const ok<span class="synSpecial">))))))))))</span>
</pre>


<p>test<br/>
この<a class="keyword" href="http://d.hatena.ne.jp/keyword/scheme">scheme</a>の式自体はバグってる．<br/>
ただし，test自体は出来るのでそのまま</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span>compile
       <span class="synSpecial">'(</span>lambda <span class="synSpecial">(</span>x y<span class="synSpecial">)</span>
          <span class="synSpecial">(</span>lambda <span class="synSpecial">(</span>a b<span class="synSpecial">)</span>
            <span class="synSpecial">(</span>+
             <span class="synSpecial">(</span>+ x a<span class="synSpecial">)</span>
             <span class="synSpecial">(</span>* y b<span class="synSpecial">)</span>
             <span class="synSpecial">(</span>set! x a<span class="synSpecial">)</span> <span class="synComment">;; +の中でset!してるので 'okが返ってバグる</span>
             <span class="synSpecial">(</span>set! z b<span class="synSpecial">))))</span>
       <span class="synSpecial">'</span>val
       <span class="synSpecial">'</span>next
       <span class="synSpecial">'())</span>
<span class="synSpecial">((</span>env<span class="synSpecial">)</span>
 <span class="synSpecial">(</span>val<span class="synSpecial">)</span>
 <span class="synSpecial">((</span>assign val <span class="synSpecial">(</span>op make-compiled-procedure<span class="synSpecial">)</span> <span class="synSpecial">(</span>label entry24<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label after-lambda25<span class="synSpecial">))</span>
  entry24
  <span class="synSpecial">(</span>assign env <span class="synSpecial">(</span>op compiled-procedure-env<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign env <span class="synSpecial">(</span>op extend-environment<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">(</span>x y<span class="synSpecial">))</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op make-compiled-procedure<span class="synSpecial">)</span> <span class="synSpecial">(</span>label entry26<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
  entry26
  <span class="synSpecial">(</span>assign env <span class="synSpecial">(</span>op compiled-procedure-env<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign env <span class="synSpecial">(</span>op extend-environment<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">(</span>a b<span class="synSpecial">))</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign arg1 <span class="synSpecial">(</span>op lexical-address-lookup<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synConstant">0</span><span class="synSpecial">))</span> <span class="synSpecial">(</span>const <span class="synSpecial">((</span>a b<span class="synSpecial">)</span> <span class="synSpecial">(</span>x y<span class="synSpecial">))))</span>
  <span class="synSpecial">(</span>assign arg2 <span class="synSpecial">(</span>op lexical-address-lookup<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">(</span><span class="synConstant">0</span> <span class="synConstant">0</span><span class="synSpecial">))</span> <span class="synSpecial">(</span>const <span class="synSpecial">((</span>a b<span class="synSpecial">)</span> <span class="synSpecial">(</span>x y<span class="synSpecial">))))</span>
  <span class="synSpecial">(</span>assign arg1 <span class="synSpecial">(</span>op <span class="synIdentifier">+</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg1<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg2<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>save arg1<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>assign arg1 <span class="synSpecial">(</span>op lexical-address-lookup<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synConstant">1</span><span class="synSpecial">))</span> <span class="synSpecial">(</span>const <span class="synSpecial">((</span>a b<span class="synSpecial">)</span> <span class="synSpecial">(</span>x y<span class="synSpecial">))))</span>
  <span class="synSpecial">(</span>assign arg2 <span class="synSpecial">(</span>op lexical-address-lookup<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">(</span><span class="synConstant">0</span> <span class="synConstant">1</span><span class="synSpecial">))</span> <span class="synSpecial">(</span>const <span class="synSpecial">((</span>a b<span class="synSpecial">)</span> <span class="synSpecial">(</span>x y<span class="synSpecial">))))</span>
  <span class="synSpecial">(</span>assign arg2 <span class="synSpecial">(</span>op <span class="synIdentifier">*</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg1<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg2<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>restore arg1<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>assign arg1 <span class="synSpecial">(</span>op <span class="synIdentifier">+</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg1<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg2<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op lexical-address-lookup<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">(</span><span class="synConstant">0</span> <span class="synConstant">0</span><span class="synSpecial">))</span> <span class="synSpecial">(</span>const <span class="synSpecial">((</span>a b<span class="synSpecial">)</span> <span class="synSpecial">(</span>x y<span class="synSpecial">))))</span>
  <span class="synSpecial">(</span>perform <span class="synSpecial">(</span>op lexical-address-set!<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synConstant">0</span><span class="synSpecial">))</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">((</span>a b<span class="synSpecial">)</span> <span class="synSpecial">(</span>x y<span class="synSpecial">))))</span>
  <span class="synSpecial">(</span>assign arg2 <span class="synSpecial">(</span>const ok<span class="synSpecial">))</span> <span class="synComment">;; arg2 = ok</span>
  <span class="synSpecial">(</span>assign arg1 <span class="synSpecial">(</span>op <span class="synIdentifier">+</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg1<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg2<span class="synSpecial">))</span> <span class="synComment">;; (+ arg1 ok)なのでバグる</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op lexical-address-lookup<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">(</span><span class="synConstant">0</span> <span class="synConstant">1</span><span class="synSpecial">))</span> <span class="synSpecial">(</span>const <span class="synSpecial">((</span>a b<span class="synSpecial">)</span> <span class="synSpecial">(</span>x y<span class="synSpecial">))))</span>
  <span class="synSpecial">(</span>assign env <span class="synSpecial">(</span>op get-global-environment<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>perform <span class="synSpecial">(</span>op set-variable-value!<span class="synSpecial">)</span> <span class="synSpecial">(</span>const z<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign arg2 <span class="synSpecial">(</span>const ok<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assin val <span class="synSpecial">(</span>op <span class="synIdentifier">+</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg1<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg2<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
  after-lambda27
  after-lambda25<span class="synSpecial">))</span>
</pre>


