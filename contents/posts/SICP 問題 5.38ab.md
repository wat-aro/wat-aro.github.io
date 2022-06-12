---
title: "SICP 問題 5.38ab"
published: 2016/02/08
tags:
  - scheme
  - SICP
---

<p>+ - * = はopen-codeとして
(reg val (op +)  (reg arg1) (reg arg2))
の形で処理できるようにする．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>open-code? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">memq</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">'(</span>= * - +<span class="synSpecial">)))</span>

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
        <span class="synSpecial">((</span>open-code? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>               <span class="synComment">;open-code?でdispatch</span>
         <span class="synSpecial">(</span>compile-open-code <span class="synIdentifier">exp</span> target linkage<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>application? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span>compile-application <span class="synIdentifier">exp</span> target linkage<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span>
         <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown expression type -- COMPILE&quot;</span> <span class="synIdentifier">exp</span><span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>spread-arguments operand<span class="synSpecial">)</span>      <span class="synComment">;それぞれコンパイルしてリストにして返す</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>co-arg1 <span class="synSpecial">(</span>compile <span class="synSpecial">(</span><span class="synIdentifier">car</span> operand<span class="synSpecial">)</span> <span class="synSpecial">'</span>arg1 <span class="synSpecial">'</span>next<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>co-arg2 <span class="synSpecial">(</span>compile <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> operand<span class="synSpecial">)</span> <span class="synSpecial">'</span>arg2 <span class="synSpecial">'</span>next<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synIdentifier">list</span> co-arg1 co-arg2<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>compile-open-code <span class="synIdentifier">exp</span> target linkage<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> <span class="synSpecial">(</span><span class="synIdentifier">length</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synConstant">3</span><span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>proc <span class="synSpecial">(</span>operator <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
            <span class="synSpecial">(</span>args <span class="synSpecial">(</span>spread-arguments <span class="synSpecial">(</span>operands <span class="synIdentifier">exp</span><span class="synSpecial">))))</span>
        <span class="synSpecial">(</span>end-with-linkage linkage
                          <span class="synSpecial">(</span>append-instruction-sequences
                           <span class="synSpecial">(</span><span class="synIdentifier">car</span> args<span class="synSpecial">)</span>
                           <span class="synComment">;; co-arg2がopen-code式だった場合にarg1が上書きされるので退避させる．</span>
                           <span class="synSpecial">(</span>preserving
                            <span class="synSpecial">'(</span>arg1<span class="synSpecial">)</span>
                            <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> args<span class="synSpecial">)</span>
                            <span class="synSpecial">(</span>make-instruction-sequence
                             <span class="synSpecial">'(</span>arg1 arg2<span class="synSpecial">)</span>
                             <span class="synSpecial">(</span><span class="synIdentifier">list</span> target<span class="synSpecial">)</span>
                             <span class="synSpecial">`((</span>assign <span class="synSpecial">,</span>target <span class="synSpecial">(</span>op <span class="synSpecial">,</span>proc<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg1<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg2<span class="synSpecial">))))))))</span>
      <span class="synSpecial">(</span>error <span class="synConstant">&quot;require 2 operand&quot;</span> <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
</pre>


<p>test</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span>compile <span class="synSpecial">'(</span>+ <span class="synConstant">1</span> <span class="synConstant">2</span><span class="synSpecial">)</span> <span class="synSpecial">'</span>val <span class="synSpecial">'</span>next<span class="synSpecial">)</span>
<span class="synSpecial">(()</span>
 <span class="synSpecial">(</span>arg1 arg2 val<span class="synSpecial">)</span>
 <span class="synSpecial">((</span>assign arg1 <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign arg2 <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op <span class="synIdentifier">+</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg1<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg2<span class="synSpecial">))</span>
  <span class="synSpecial">))</span>
<span class="synSpecial">(()</span>
 <span class="synSpecial">(</span>arg1 arg2 val<span class="synSpecial">)</span>
 <span class="synSpecial">((</span>assign arg1 <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span>save arg1<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>assign arg1 <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign arg2 <span class="synSpecial">(</span>const <span class="synConstant">3</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign arg2 <span class="synSpecial">(</span>op <span class="synIdentifier">+</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg1<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg2<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>restore arg1<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op <span class="synIdentifier">+</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg1<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg2<span class="synSpecial">))</span>
  <span class="synSpecial">))</span>
</pre>


