---
title: "SICP 問題 5.38d"
published: 2016/02/08
tags:
  - scheme
  - SICP
---

<p>+と*について任意個の被<a class="keyword" href="http://d.hatena.ne.jp/keyword/%B1%E9%BB%BB%BB%D2">演算子</a>の式が使えるように拡張する．<br/>
　<br/>
ここに書いた手続きを変更もしくは追加する．<br/>
３つ以上の引数の時はarg1に畳み込んで計算していく．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>compile-open-code <span class="synIdentifier">exp</span> target linkage ct-env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">=</span> <span class="synSpecial">(</span><span class="synIdentifier">length</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synConstant">3</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span>compile-open-code-operand <span class="synIdentifier">exp</span> target linkage ct-env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span><span class="synStatement">or</span> <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>+<span class="synSpecial">)</span>
             <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>*<span class="synSpecial">))</span>
         <span class="synSpecial">(</span>compile-open-code-operand-2
          <span class="synSpecial">(</span>operator <span class="synIdentifier">exp</span> env<span class="synSpecial">)</span> <span class="synSpecial">(</span>operands <span class="synIdentifier">exp</span><span class="synSpecial">)</span> target linkage ct-env<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>error <span class="synConstant">&quot;invalid application: &quot;</span> <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>compile-open-code-operand <span class="synIdentifier">exp</span> target linkage ct-env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>proc <span class="synSpecial">(</span>operator <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">(</span>args <span class="synSpecial">(</span>spread-arguments <span class="synSpecial">(</span>operands <span class="synIdentifier">exp</span><span class="synSpecial">)</span> ct-env<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span>end-with-linkage linkage
                      <span class="synSpecial">(</span>preserving
                       <span class="synSpecial">'(</span>env<span class="synSpecial">)</span>
                       <span class="synSpecial">(</span><span class="synIdentifier">car</span> args<span class="synSpecial">)</span>
                       <span class="synComment">;; co-arg2がopen-code式だった場合にarg1が上書きされるので退避させる．</span>
                       <span class="synSpecial">(</span>preserving
                        <span class="synSpecial">'(</span>arg1 env<span class="synSpecial">)</span>
                        <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> args<span class="synSpecial">)</span>
                        <span class="synSpecial">(</span>make-instruction-sequence
                         <span class="synSpecial">'(</span>arg1 arg2 env<span class="synSpecial">)</span>
                         <span class="synSpecial">(</span><span class="synIdentifier">list</span> target<span class="synSpecial">)</span>
                         <span class="synSpecial">`((</span>assign <span class="synSpecial">,</span>target <span class="synSpecial">(</span>op <span class="synSpecial">,</span>proc<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg1<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg2<span class="synSpecial">)))))))))</span>

<span class="synComment">;;; operandが無くてprocが+なら1を，*なら0をtargetに代入．</span>
<span class="synComment">;;; operandが一つだけならそのままの値をtargetに入れる．</span>
<span class="synComment">;;; operandが３つ以上なら</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>compile-open-code-operand-2 proc operands target linkage ct-env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> operands<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> proc <span class="synSpecial">'</span>+<span class="synSpecial">)</span>
             <span class="synSpecial">(</span>compile-self-evaluating <span class="synConstant">0</span> target linkage<span class="synSpecial">)</span> <span class="synComment">;+なら0</span>
             <span class="synSpecial">(</span>compile-self-evaluating <span class="synConstant">1</span> target linkage<span class="synSpecial">)))</span>   <span class="synComment">;*なら1</span>
        <span class="synSpecial">((</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> operands<span class="synSpecial">))</span>
         <span class="synSpecial">(</span>end-with-linkage linkage
                           <span class="synSpecial">(</span>compile <span class="synSpecial">(</span><span class="synIdentifier">car</span> operand<span class="synSpecial">)</span> target <span class="synSpecial">'</span>next ct-env<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span>                           <span class="synComment">;引数が３つ以上ならこちらで処理</span>
         <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>operand <span class="synSpecial">(</span>spread-arguments operands ct-env<span class="synSpecial">)))</span>
           <span class="synSpecial">(</span>end-with-linkage
            linkage
            <span class="synSpecial">(</span>append-instruction-sequences
             <span class="synSpecial">(</span><span class="synIdentifier">car</span> operand<span class="synSpecial">)</span>
             <span class="synSpecial">(</span>compile-open-code-operand-3 proc <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> operand<span class="synSpecial">)</span> target<span class="synSpecial">)))))))</span>

<span class="synComment">;;; ここに渡されるseqはコンパイルされた引数のリスト．</span>
<span class="synComment">;;; last-seqだとarg1を保護しながら最後の引数をarg2に代入して</span>
<span class="synComment">;;; 最後にarg1, arg2をprocした結果をvalに代入する．</span>
<span class="synComment">;;; まだ残っているときはarg1を保護しながら引数をarg2に代入して</span>
<span class="synComment">;;; arg1とarg2をprocした結果をarg1に代入する</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>compile-open-code-operand-3 proc seq target<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>last-seq? seq<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>preserving
       <span class="synSpecial">'(</span>arg1 env<span class="synSpecial">)</span>
       <span class="synSpecial">(</span><span class="synIdentifier">car</span> seq<span class="synSpecial">)</span>
       <span class="synSpecial">(</span>make-instruction-sequence
        <span class="synSpecial">'(</span>arg1 arg2 env<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> target<span class="synSpecial">)</span>
        <span class="synSpecial">`((</span>assin <span class="synSpecial">,</span>target <span class="synSpecial">(</span>op <span class="synSpecial">,</span>proc<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg1<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg2<span class="synSpecial">)))))</span>
      <span class="synSpecial">(</span>append-instruction-sequences
       <span class="synSpecial">(</span>preserving
        <span class="synSpecial">'(</span>arg1 env<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">car</span> seq<span class="synSpecial">)</span>
        <span class="synSpecial">(</span>make-instruction-sequence <span class="synSpecial">'(</span>arg1 arg2 env<span class="synSpecial">)</span> <span class="synSpecial">'(</span>arg1<span class="synSpecial">)</span>
                                   <span class="synSpecial">`((</span>assign arg1 <span class="synSpecial">(</span>op <span class="synSpecial">,</span>proc<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg1<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg2<span class="synSpecial">)))))</span>
       <span class="synSpecial">(</span>compile-open-code-operand-3 proc <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> seq<span class="synSpecial">)</span> target<span class="synSpecial">))))</span>

<span class="synComment">;;; operandが0または1以外の時はここでcompileする．</span>
<span class="synComment">;;; 一つ目だけarg1に代入し，残りはarg2に代入する．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>spread-arguments operand ct-env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> iter <span class="synSpecial">((</span>operand <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> operand<span class="synSpecial">))</span>
             <span class="synSpecial">(</span>result <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span>compile <span class="synSpecial">(</span><span class="synIdentifier">car</span> operand<span class="synSpecial">)</span> <span class="synSpecial">'</span>arg1 <span class="synSpecial">'</span>next ct-env<span class="synSpecial">))))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> operand<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">reverse</span> result<span class="synSpecial">)</span>
        <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> operand<span class="synSpecial">)</span>
              <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>compile <span class="synSpecial">(</span><span class="synIdentifier">car</span> operand<span class="synSpecial">)</span> <span class="synSpecial">'</span>arg2 <span class="synSpecial">'</span>next ct-env<span class="synSpecial">)</span> result<span class="synSpecial">)))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>last-seq? seq<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> seq<span class="synSpecial">)))</span>
</pre>


<p>test</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span>compile <span class="synSpecial">'(</span>+<span class="synSpecial">)</span> <span class="synSpecial">'</span>val <span class="synSpecial">'</span>next<span class="synSpecial">)</span>
<span class="synSpecial">(()</span> <span class="synSpecial">(</span>val<span class="synSpecial">)</span> <span class="synSpecial">((</span>assign val <span class="synSpecial">(</span>const <span class="synConstant">0</span><span class="synSpecial">))))</span>
gosh&gt; <span class="synSpecial">(</span>compile <span class="synSpecial">'(</span>*<span class="synSpecial">)</span> <span class="synSpecial">'</span>val <span class="synSpecial">'</span>next<span class="synSpecial">)</span>
<span class="synSpecial">(()</span> <span class="synSpecial">(</span>val<span class="synSpecial">)</span> <span class="synSpecial">((</span>assign val <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))))</span>
gosh&gt; <span class="synSpecial">(</span>compile <span class="synSpecial">'(</span>+ <span class="synConstant">1</span><span class="synSpecial">)</span> <span class="synSpecial">'</span>val <span class="synSpecial">'</span>next<span class="synSpecial">)</span>
<span class="synSpecial">((</span>arg1<span class="synSpecial">)</span> <span class="synSpecial">(</span>val<span class="synSpecial">)</span> <span class="synSpecial">((</span>assign val <span class="synSpecial">(</span>cont <span class="synConstant">1</span><span class="synSpecial">))))</span>
gosh&gt; <span class="synSpecial">(</span>compile <span class="synSpecial">'(</span>* <span class="synConstant">1</span><span class="synSpecial">)</span> <span class="synSpecial">'</span>val <span class="synSpecial">'</span>next<span class="synSpecial">)</span>
<span class="synSpecial">((</span>arg1<span class="synSpecial">)</span> <span class="synSpecial">(</span>val<span class="synSpecial">)</span> <span class="synSpecial">((</span>assign val <span class="synSpecial">(</span>cont <span class="synConstant">1</span><span class="synSpecial">))))</span>
gosh&gt; <span class="synSpecial">(</span>compile <span class="synSpecial">'(</span>+ <span class="synConstant">1</span> <span class="synConstant">2</span><span class="synSpecial">)</span> <span class="synSpecial">'</span>val <span class="synSpecial">'</span>next<span class="synSpecial">)</span>
<span class="synSpecial">(()</span>
 <span class="synSpecial">(</span>arg1 arg2 val<span class="synSpecial">)</span>
 <span class="synSpecial">((</span>assign arg1 <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign arg2 <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op <span class="synIdentifier">+</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg1<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg2<span class="synSpecial">)))</span>
 <span class="synSpecial">)</span>
gosh&gt; <span class="synSpecial">(</span>compile <span class="synSpecial">'(</span>* <span class="synConstant">1</span> <span class="synConstant">2</span><span class="synSpecial">)</span> <span class="synSpecial">'</span>val <span class="synSpecial">'</span>next<span class="synSpecial">)</span>
<span class="synSpecial">(()</span>
 <span class="synSpecial">(</span>arg1 arg2 val<span class="synSpecial">)</span>
 <span class="synSpecial">((</span>assign arg1 <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign arg2 <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op <span class="synIdentifier">*</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg1<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg2<span class="synSpecial">))</span>
  <span class="synSpecial">))</span>
gosh&gt; <span class="synSpecial">(</span>compile <span class="synSpecial">'(</span>+ <span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span><span class="synSpecial">)</span> <span class="synSpecial">'</span>val <span class="synSpecial">'</span>next<span class="synSpecial">)</span>
<span class="synSpecial">(()</span>
 <span class="synSpecial">(</span>arg1 arg2 val<span class="synSpecial">)</span>
 <span class="synSpecial">((</span>assign arg1 <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign arg2 <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign arg1 <span class="synSpecial">(</span>op <span class="synIdentifier">+</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg1<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg2<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign arg2 <span class="synSpecial">(</span>const <span class="synConstant">3</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assin target <span class="synSpecial">(</span>op <span class="synIdentifier">+</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg1<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg2<span class="synSpecial">))</span>
  <span class="synSpecial">))</span>
gosh&gt; <span class="synSpecial">(</span>compile <span class="synSpecial">'(</span>+ <span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span><span class="synSpecial">)</span> <span class="synSpecial">'</span>val <span class="synSpecial">'</span>next<span class="synSpecial">)</span>
<span class="synSpecial">(()</span>
 <span class="synSpecial">(</span>arg1 arg2 val<span class="synSpecial">)</span>
 <span class="synSpecial">((</span>assign arg1 <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign arg2 <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign arg1 <span class="synSpecial">(</span>op <span class="synIdentifier">+</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg1<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg2<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign arg2 <span class="synSpecial">(</span>const <span class="synConstant">3</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assin target <span class="synSpecial">(</span>op <span class="synIdentifier">+</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg1<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg2<span class="synSpecial">))</span>
  <span class="synSpecial">))</span>
gosh&gt; <span class="synSpecial">(</span>compile <span class="synSpecial">'(</span>+ <span class="synConstant">1</span> <span class="synSpecial">(</span>+ <span class="synConstant">2</span> <span class="synConstant">3</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>* <span class="synConstant">4</span> <span class="synConstant">5</span><span class="synSpecial">))</span> <span class="synSpecial">'</span>val <span class="synSpecial">'</span>next<span class="synSpecial">)</span>
<span class="synSpecial">(()</span>
 <span class="synSpecial">(</span>arg1 arg2 val<span class="synSpecial">)</span>
 <span class="synSpecial">((</span>assign arg1 <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span>save arg1<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>assign arg1 <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign arg2 <span class="synSpecial">(</span>const <span class="synConstant">3</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign arg2 <span class="synSpecial">(</span>op <span class="synIdentifier">+</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg1<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg2<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>restore arg1<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>assign arg1 <span class="synSpecial">(</span>op <span class="synIdentifier">+</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg1<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg2<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>save arg1<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>assign arg1 <span class="synSpecial">(</span>const <span class="synConstant">4</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign arg2 <span class="synSpecial">(</span>const <span class="synConstant">5</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign arg2 <span class="synSpecial">(</span>op <span class="synIdentifier">*</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg1<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg2<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>restore arg1<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>assin target <span class="synSpecial">(</span>op <span class="synIdentifier">+</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg1<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg2<span class="synSpecial">))</span>
  <span class="synSpecial">))</span>
gosh&gt; <span class="synSpecial">(</span>compile <span class="synSpecial">'(</span>* <span class="synSpecial">(</span>* <span class="synConstant">2</span> <span class="synConstant">3</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>+ <span class="synConstant">1</span> <span class="synConstant">4</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>* <span class="synConstant">3</span> <span class="synConstant">4</span><span class="synSpecial">))</span> <span class="synSpecial">'</span>val <span class="synSpecial">'</span>next<span class="synSpecial">)</span>
<span class="synSpecial">(()</span>
 <span class="synSpecial">(</span>arg1 arg2 val<span class="synSpecial">)</span>
 <span class="synSpecial">((</span>assign arg1 <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign arg2 <span class="synSpecial">(</span>const <span class="synConstant">3</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign arg1 <span class="synSpecial">(</span>op <span class="synIdentifier">*</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg1<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg2<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>save arg1<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>assign arg1 <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign arg2 <span class="synSpecial">(</span>const <span class="synConstant">4</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign arg2 <span class="synSpecial">(</span>op <span class="synIdentifier">+</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg1<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg2<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>restore arg1<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>assign arg1 <span class="synSpecial">(</span>op <span class="synIdentifier">*</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg1<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg2<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>save arg1<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>assign arg1 <span class="synSpecial">(</span>const <span class="synConstant">3</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign arg2 <span class="synSpecial">(</span>const <span class="synConstant">4</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign arg2 <span class="synSpecial">(</span>op <span class="synIdentifier">*</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg1<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg2<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>restore arg1<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>assin target <span class="synSpecial">(</span>op <span class="synIdentifier">*</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg1<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg2<span class="synSpecial">))</span>
  <span class="synSpecial">))</span>
</pre>


<p>おかしいところはなく動いている．</p>

