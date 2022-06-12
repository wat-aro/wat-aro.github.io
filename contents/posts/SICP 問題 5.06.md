---
title: "SICP 問題 5.06"
published: 2016/01/23
tags:
  - scheme
  - SICP
---

<p>Fibonacci計算機の余分なsaveとrestoreを取り除く</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink>  afterfib-n-1
    <span class="synSpecial">(</span>restore n<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>                  <span class="synComment">;ここでcontinueをrestoreしているのに</span>
    <span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>op <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">))</span>
    <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>                     <span class="synComment">;ここでそのままcontinueをsaveして</span>
    <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label afterfib-n-2<span class="synSpecial">))</span> <span class="synComment">;ここでcontinueを上書きしている．</span>
    <span class="synSpecial">(</span>save val<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label fib-loop<span class="synSpecial">))</span>
</pre>


<p>余分なところを削除すると</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink>  afterfib-n-1
    <span class="synSpecial">(</span>restore n<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>op <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">))</span>
    <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label afterfib-n-2<span class="synSpecial">))</span>
    <span class="synSpecial">(</span>save val<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label fib-loop<span class="synSpecial">))</span>
</pre>


<p>こうなる．
全文は以下の通り．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span>controller
    <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label fib-done<span class="synSpecial">))</span>
  fib-loop
    <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op <span class="synIdentifier">&lt;</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">))</span>
    <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label immediate-answer<span class="synSpecial">))</span>
    <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label afterfib-n-1<span class="synSpecial">))</span>
    <span class="synSpecial">(</span>save n<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>op <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
    <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label fib-loop<span class="synSpecial">))</span>
  afterfib-n-1
    <span class="synSpecial">(</span>restore n<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>op <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">))</span>
    <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label afterfib-n-2<span class="synSpecial">))</span>
    <span class="synSpecial">(</span>save val<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label fib-loop<span class="synSpecial">))</span>
  afterfib-n-2
    <span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
    <span class="synSpecial">(</span>restore val<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>assign val
            <span class="synSpecial">(</span>op <span class="synIdentifier">+</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">))</span>
    <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
  immediate-answer
    <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>reg n<span class="synSpecial">))</span>
    <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
    fib-done<span class="synSpecial">)</span>
</pre>


