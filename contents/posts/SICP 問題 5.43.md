---
title: "SICP 問題 5.43"
published: 2016/02/09
tags:
  - scheme
  - SICP
---

<p>内部定義を吐き出して<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%D1%A5%A4%A5%EB">コンパイル</a>する．<br/>
まず4.16で作ったscan-out-definesがこれ．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>scan-out-defines body<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>split-defines proc-body defines non-defines<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> proc-body<span class="synSpecial">)</span>
           <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">reverse</span> defines<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">reverse</span> non-defines<span class="synSpecial">)))</span>
          <span class="synSpecial">((</span>definition? <span class="synSpecial">(</span><span class="synIdentifier">car</span> proc-body<span class="synSpecial">))</span>
           <span class="synSpecial">(</span>split-defines <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> proc-body<span class="synSpecial">)</span>
                          <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> proc-body<span class="synSpecial">)</span> defines<span class="synSpecial">)</span> non-defines<span class="synSpecial">))</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>split-defines <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> proc-body<span class="synSpecial">)</span> defines <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> proc-body<span class="synSpecial">)</span> non-defines<span class="synSpecial">)))))</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>splits <span class="synSpecial">(</span>split-defines body <span class="synSpecial">'()</span> <span class="synSpecial">'())))</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>defines <span class="synSpecial">(</span><span class="synIdentifier">car</span> splits<span class="synSpecial">))</span>
          <span class="synSpecial">(</span>non-defines <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> splits<span class="synSpecial">)))</span>
      <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> defines<span class="synSpecial">)</span>
          non-defines
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span>make-let <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span>definition-variable x<span class="synSpecial">)</span> <span class="synSpecial">''</span><span class="synConstant">*unassigned*</span><span class="synSpecial">))</span>
                              defines<span class="synSpecial">)</span>
                         <span class="synSpecial">(</span><span class="synIdentifier">append</span> <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>set! <span class="synSpecial">(</span>definition-variable x<span class="synSpecial">)</span>
                                                        <span class="synSpecial">(</span>definition-value x<span class="synSpecial">)))</span>
                                      defines<span class="synSpecial">)</span>
                                 non-defines<span class="synSpecial">)))))))</span>
</pre>


<p>　<br/>
これをcompile-lambda-bodyで使う</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>compile-lambda-body <span class="synIdentifier">exp</span> proc-entry ct-env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>formals <span class="synSpecial">(</span>lambda-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
    <span class="synSpecial">(</span>append-instruction-sequences
     <span class="synSpecial">(</span>make-instruction-sequence
      <span class="synSpecial">'(</span>env proc argl<span class="synSpecial">)</span> <span class="synSpecial">'(</span>env<span class="synSpecial">)</span>

      <span class="synSpecial">`(,</span>proc-entry
        <span class="synSpecial">(</span>assign env <span class="synSpecial">(</span>op compiled-procedure-env<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>assign env
                <span class="synSpecial">(</span>op extend-environment<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>const <span class="synSpecial">,</span>formals<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>reg argl<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>reg env<span class="synSpecial">))))</span>
     <span class="synComment">;; ここでscan-out-definesでlambda-bodyを変換してからcompile-sequenceに渡す</span>
     <span class="synSpecial">(</span>compile-sequence <span class="synSpecial">(</span>scan-out-defines <span class="synSpecial">(</span>lambda-body <span class="synIdentifier">exp</span><span class="synSpecial">))</span> <span class="synSpecial">'</span>val <span class="synSpecial">'</span>return <span class="synSpecial">(</span><span class="synIdentifier">cons</span> formals ct-env<span class="synSpecial">)))))</span>
</pre>


<p>　　<br/>
これはletに変換するのでcompileにletを追加する．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>compile <span class="synIdentifier">exp</span> target linkage ct-env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>self-evaluating? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span>compile-self-evaluating <span class="synIdentifier">exp</span> target linkage<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>quoted? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>compile-quoted <span class="synIdentifier">exp</span> target linkage<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>variable? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span>compile-variable <span class="synIdentifier">exp</span> target linkage ct-env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>assignment? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span>compile-assignment <span class="synIdentifier">exp</span> target linkage ct-env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>definition? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span>compile-definition <span class="synIdentifier">exp</span> target linkage ct-env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>if? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>compile-if <span class="synIdentifier">exp</span> target linkage ct-env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>lambda? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span>compile-lambda <span class="synIdentifier">exp</span> target linkage ct-env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>let? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>                           <span class="synComment">; letの追加</span>
         <span class="synSpecial">(</span>compile <span class="synSpecial">(</span>let-&gt;combination <span class="synIdentifier">exp</span><span class="synSpecial">)</span> target linkage ct-env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>begin? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span>compile-sequence <span class="synSpecial">(</span>begin-actions <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                           target linkage ct-env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>cond? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>compile <span class="synSpecial">(</span>cond-&gt;if <span class="synIdentifier">exp</span><span class="synSpecial">)</span> target linkage ct-env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>open-code? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>               <span class="synComment">;open-code?でdispatch</span>
         <span class="synSpecial">(</span>compile-open-code <span class="synIdentifier">exp</span> target linkage ct-env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>application? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span>compile-application <span class="synIdentifier">exp</span> target linkage ct-env<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span>
         <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown expression type -- COMPILE&quot;</span> <span class="synIdentifier">exp</span><span class="synSpecial">))))</span>
</pre>


<p>test
まずはscan-out-definesから．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span>scan-out-defines <span class="synSpecial">(</span>lambda-body <span class="synSpecial">'(</span>lambda <span class="synSpecial">(</span>a b<span class="synSpecial">)</span>
                                        <span class="synSpecial">(</span>define x <span class="synConstant">1</span><span class="synSpecial">)</span>
                                        <span class="synSpecial">(</span>define <span class="synSpecial">(</span>y c<span class="synSpecial">)</span> <span class="synSpecial">(</span>+ x c<span class="synSpecial">))</span>
                                        <span class="synSpecial">(</span>+ a b y<span class="synSpecial">))))</span>
<span class="synSpecial">((</span><span class="synStatement">let</span>
     <span class="synSpecial">((</span>x <span class="synSpecial">'</span><span class="synConstant">*unassigned*</span><span class="synSpecial">)</span>
      <span class="synSpecial">(</span>y <span class="synSpecial">'</span><span class="synConstant">*unassigned*</span><span class="synSpecial">))</span>
   <span class="synSpecial">(</span><span class="synStatement">set!</span> x <span class="synConstant">1</span><span class="synSpecial">)</span>
   <span class="synSpecial">(</span><span class="synStatement">set!</span> y <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>c<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> x c<span class="synSpecial">)))</span>
   <span class="synSpecial">(</span><span class="synIdentifier">+</span> a b y<span class="synSpecial">)))</span>
</pre>


<p>　<br/>
期待通りに動いている．<br/>
次にcompile．<br/>
<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%D1%A5%A4%A5%EB">コンパイル</a>後の命令列を追ったのでコメントをつけた．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span>compile <span class="synSpecial">'((</span>lambda <span class="synSpecial">(</span>a b<span class="synSpecial">)</span>
                   <span class="synSpecial">(</span>define x <span class="synConstant">1</span><span class="synSpecial">)</span>
                   <span class="synSpecial">(</span>define <span class="synSpecial">(</span>y c<span class="synSpecial">)</span> <span class="synSpecial">(</span>+ x c<span class="synSpecial">))</span>
                   <span class="synSpecial">(</span>+ a b <span class="synSpecial">(</span>y <span class="synConstant">2</span><span class="synSpecial">)))</span> <span class="synConstant">5</span> <span class="synConstant">6</span><span class="synSpecial">)</span> <span class="synSpecial">'</span>val <span class="synSpecial">'</span>next <span class="synSpecial">'())</span>
      <span class="synSpecial">((</span>env<span class="synSpecial">)</span>
       <span class="synSpecial">(</span>env proc argl continue val<span class="synSpecial">)</span>
       <span class="synComment">;; procにentry56の手続き</span>
       <span class="synSpecial">((</span>assign proc <span class="synSpecial">(</span>op make-compiled-procedure<span class="synSpecial">)</span> <span class="synSpecial">(</span>label entry56<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label after-lambda57<span class="synSpecial">))</span>
        entry56
        <span class="synSpecial">(</span>assign env <span class="synSpecial">(</span>op compiled-procedure-env<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
        <span class="synComment">;; (a b)を(5 6)に対応して拡張</span>
        <span class="synSpecial">(</span>assign env <span class="synSpecial">(</span>op extend-environment<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">(</span>a b<span class="synSpecial">))</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
        <span class="synComment">;; proc: entry58</span>
        <span class="synSpecial">(</span>assign proc <span class="synSpecial">(</span>op make-compiled-procedure<span class="synSpecial">)</span> <span class="synSpecial">(</span>label entry58<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label after-lambda59<span class="synSpecial">))</span>
        entry58
        <span class="synSpecial">(</span>assign env <span class="synSpecial">(</span>op compiled-procedure-env<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
        <span class="synComment">;; (x y)に(*unassigned* *unassigned*)を対応付け</span>
        <span class="synSpecial">(</span>assign env <span class="synSpecial">(</span>op extend-environment<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">(</span>x y<span class="synSpecial">))</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
        <span class="synComment">;; x のオブジェクトを1にする</span>
        <span class="synSpecial">(</span>perform <span class="synSpecial">(</span>op lexical-address-set!<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">(</span><span class="synConstant">0</span> <span class="synConstant">0</span><span class="synSpecial">))</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">((</span>x y<span class="synSpecial">)</span> <span class="synSpecial">(</span>a b<span class="synSpecial">))))</span>
        <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>const ok<span class="synSpecial">))</span>
        <span class="synComment">;; val: entry60</span>
        <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op make-compiled-procedure<span class="synSpecial">)</span> <span class="synSpecial">(</span>label entry60<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label after-lambda61<span class="synSpecial">))</span>
        entry60
        <span class="synSpecial">(</span>assign env <span class="synSpecial">(</span>op compiled-procedure-env<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
        <span class="synComment">;; ((c) (6))</span>
        <span class="synSpecial">(</span>assign env <span class="synSpecial">(</span>op extend-environment<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">(</span>c<span class="synSpecial">))</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
        <span class="synComment">;; arg1: 1</span>
        <span class="synSpecial">(</span>assign arg1 <span class="synSpecial">(</span>op lexical-address-lookup<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synConstant">0</span><span class="synSpecial">))</span> <span class="synSpecial">(</span>const <span class="synSpecial">((</span>c<span class="synSpecial">)</span> <span class="synSpecial">(</span>x y<span class="synSpecial">)</span> <span class="synSpecial">(</span>a b<span class="synSpecial">))))</span>
        <span class="synComment">;; arg2: 2</span>
        <span class="synSpecial">(</span>assign arg2 <span class="synSpecial">(</span>op lexical-address-lookup<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">(</span><span class="synConstant">0</span> <span class="synConstant">0</span><span class="synSpecial">))</span> <span class="synSpecial">(</span>const <span class="synSpecial">((</span>c<span class="synSpecial">)</span> <span class="synSpecial">(</span>x y<span class="synSpecial">)</span> <span class="synSpecial">(</span>a b<span class="synSpecial">))))</span>
        <span class="synComment">;; val: (+ 1 2) = 3</span>
        <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op <span class="synIdentifier">+</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg1<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg2<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
        after-lambda61
        <span class="synComment">;; y &lt;= entry60</span>
        <span class="synSpecial">(</span>perform <span class="synSpecial">(</span>op lexical-address-set!<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">(</span><span class="synConstant">0</span> <span class="synConstant">1</span><span class="synSpecial">))</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">((</span>x y<span class="synSpecial">)</span> <span class="synSpecial">(</span>a b<span class="synSpecial">))))</span>
        <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>const ok<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>                 <span class="synComment">;aftercall71</span>
        <span class="synSpecial">(</span>assign arg1 <span class="synSpecial">(</span>op lexical-address-lookup<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synConstant">0</span><span class="synSpecial">))</span> <span class="synSpecial">(</span>const <span class="synSpecial">((</span>x y<span class="synSpecial">)</span> <span class="synSpecial">(</span>a b<span class="synSpecial">))))</span>
        <span class="synSpecial">(</span>assign arg2 <span class="synSpecial">(</span>op lexical-address-lookup<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synConstant">1</span><span class="synSpecial">))</span> <span class="synSpecial">(</span>const <span class="synSpecial">((</span>x y<span class="synSpecial">)</span> <span class="synSpecial">(</span>a b<span class="synSpecial">))))</span>
        <span class="synSpecial">(</span>assign arg1 <span class="synSpecial">(</span>op <span class="synIdentifier">+</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg1<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg2<span class="synSpecial">))</span> <span class="synComment">;(+ a b) =&gt;(+ 5 6) =&gt; 11</span>
        <span class="synSpecial">(</span>assign proc <span class="synSpecial">(</span>op lexical-address-lookup<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">(</span><span class="synConstant">0</span> <span class="synConstant">1</span><span class="synSpecial">))</span> <span class="synSpecial">(</span>const <span class="synSpecial">((</span>x y<span class="synSpecial">)</span> <span class="synSpecial">(</span>a b<span class="synSpecial">))))</span>
        <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">))</span>
        <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op <span class="synIdentifier">list</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span> <span class="synComment">;argl: (2)</span>
        <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op primitive-procedure?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label primitive-branch62<span class="synSpecial">))</span>
        compiled-branch63
        <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label proc-return65<span class="synSpecial">))</span> <span class="synComment">;continue: proc-return65</span>
        <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op compiled-procedure-entry<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
        proc-return65
        <span class="synComment">;; arg2: 7</span>
        <span class="synSpecial">(</span>assign arg2 <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label after-call64<span class="synSpecial">))</span>
        primitive-branch62
        <span class="synSpecial">(</span>assign arg2 <span class="synSpecial">(</span>op apply-primitive-procedure<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">))</span>
        after-call64
        <span class="synComment">;; val: (+ 11 3) = 14</span>
        <span class="synSpecial">(</span>assin val <span class="synSpecial">(</span>op <span class="synIdentifier">+</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg1<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg2<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>              <span class="synComment">;aftercall71</span>
        <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
        after-lambda59
        <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>const <span class="synConstant">*unassigned*</span><span class="synSpecial">))</span>
        <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op <span class="synIdentifier">list</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>const <span class="synConstant">*unassigned*</span><span class="synSpecial">))</span>
        <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op <span class="synIdentifier">cons</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">))</span> <span class="synComment">;argl: (*unassigned* *unassigned*)</span>
        <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op primitive-procedure?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label primitive-branch66<span class="synSpecial">))</span>
        compiled-branch67
        <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op compiled-procedure-entry<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span> <span class="synComment">;val: entry58</span>
        <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
        primitive-branch66
        <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op apply-primitive-procedure<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
        after-call68
        after-lambda57
        <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>const <span class="synConstant">6</span><span class="synSpecial">))</span>          <span class="synComment">;val: 6</span>
        <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op <span class="synIdentifier">list</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span> <span class="synComment">;argl: (6)</span>
        <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>const <span class="synConstant">5</span><span class="synSpecial">))</span>          <span class="synComment">;val: 5</span>
        <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op <span class="synIdentifier">cons</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">))</span> <span class="synComment">;argl: (5 6)</span>
        <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op primitive-procedure?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span> <span class="synComment">;no</span>
        <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label primitive-branch69<span class="synSpecial">))</span>
        compiled-branch70
        <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label after-call71<span class="synSpecial">))</span> <span class="synComment">;continue: aftercall71</span>
        <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op compiled-procedure-entry<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span> <span class="synComment">;val: entry56</span>
        <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
        primitive-branch69
        <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op apply-primitive-procedure<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">))</span>
        after-call71                    <span class="synComment">;val 14</span>
        <span class="synSpecial">))</span>
</pre>


<p>期待通りに内部定義を吐き出してlambdaで<em>unassigned</em>として受け取り，<br/>
bodyで実際の値（手続き）にset!している．</p>

