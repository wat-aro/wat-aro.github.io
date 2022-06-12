---
title: "SICP 問題 5.07"
published: 2016/01/23
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; シミュレータを使い問題5.04で設計した計算機をテストせよ</span>

<span class="synComment">;; 再帰的べき乗</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> factorial-recur-machine
  <span class="synSpecial">(</span>make-machine
   <span class="synSpecial">'(</span>b n val continue<span class="synSpecial">)</span>
   <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>* <span class="synIdentifier">*</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>- <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>= <span class="synIdentifier">=</span><span class="synSpecial">))</span>
   <span class="synSpecial">'((</span>assign continue <span class="synSpecial">(</span>label expt-done<span class="synSpecial">))</span>
     expt-loop
       <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op =<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">0</span><span class="synSpecial">))</span>
       <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label base-case<span class="synSpecial">))</span>
       <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
       <span class="synSpecial">(</span>save n<span class="synSpecial">)</span>
       <span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>op -<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
       <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label after-expt<span class="synSpecial">))</span>
       <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label expt-loop<span class="synSpecial">))</span>
     after-expt
       <span class="synSpecial">(</span>restore n<span class="synSpecial">)</span>
       <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
       <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op *<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg b<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
       <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
     base-case
       <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
       <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
     expt-done<span class="synSpecial">)))</span>

<span class="synSpecial">(</span>set-register-contents! factorial-recur-machine <span class="synSpecial">'</span>b <span class="synConstant">2</span><span class="synSpecial">)</span>
<span class="synSpecial">(</span>set-register-contents! factorial-recur-machine <span class="synSpecial">'</span>n <span class="synConstant">10</span><span class="synSpecial">)</span>
<span class="synSpecial">(</span>start factorial-recur-machine<span class="synSpecial">)</span>
<span class="synSpecial">(</span>get-register-contents factorial-recur-machine <span class="synSpecial">'</span>val<span class="synSpecial">)</span> <span class="synComment">;=&gt; 1024が返ってくるはず</span>


<span class="synComment">;; 反復的べき乗</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> factorial-iter-machine
  <span class="synSpecial">(</span>make-machine
   <span class="synSpecial">'(</span>b n product<span class="synSpecial">)</span>
   <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>* <span class="synIdentifier">*</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>- <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>= <span class="synIdentifier">=</span><span class="synSpecial">))</span>
   <span class="synSpecial">'((</span>assign product <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
     expt-loop
       <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op =<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">0</span><span class="synSpecial">))</span>
       <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label fib-done<span class="synSpecial">))</span>
       <span class="synSpecial">(</span>assign n1 <span class="synSpecial">(</span>op -<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
       <span class="synSpecial">(</span>assign p1 <span class="synSpecial">(</span>op *<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg product<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg b<span class="synSpecial">))</span>
       <span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>reg n1<span class="synSpecial">))</span>
       <span class="synSpecial">(</span>assigin product <span class="synSpecial">(</span>reg p1<span class="synSpecial">))</span>
       <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label expt-loop<span class="synSpecial">))</span>
     expt-done<span class="synSpecial">)))</span>

<span class="synSpecial">(</span>set-register-contents! factorial-iter-machine <span class="synSpecial">'</span>b <span class="synConstant">2</span><span class="synSpecial">)</span>
<span class="synSpecial">(</span>set-register-contents! factorial-iter-machine <span class="synSpecial">'</span>n <span class="synConstant">10</span><span class="synSpecial">)</span>
<span class="synSpecial">(</span>start factorial-iter-machine<span class="synSpecial">)</span>
<span class="synSpecial">(</span>get-register-contents factorial-iter-machine <span class="synSpecial">'</span>product<span class="synSpecial">)</span>
</pre>


