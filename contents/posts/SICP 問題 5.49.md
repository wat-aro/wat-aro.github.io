---
title: "SICP 問題 5.49"
published: 2016/02/10
tags:
  - scheme
  - SICP
---

<p>compileとassembleを機械計算として持ち，REPLを行う<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%EC%A5%B8%A5%B9%A5%BF">レジスタ</a>計算機を設計する．<br/>
　<br/>
はじめ，assembleを命令列の上でやる方法がわからずに，compile-and-assembleという手続きを作り，<br/>
それを機械演算として登録してRCEPLを実装したが，</p>

<p><a href="http://www.serendip.ws/archives/4005">&#x554F;&#x984C;5.49 &ndash; SICP&#xFF08;&#x8A08;&#x7B97;&#x6A5F;&#x30D7;&#x30ED;&#x30B0;&#x30E9;&#x30E0;&#x306E;&#x69CB;&#x9020;&#x3068;&#x89E3;&#x91C8;&#xFF09;&#x305D;&#x306E;301 : Serendip - Web&#x30C7;&#x30B6;&#x30A4;&#x30F3;&#x30FB;&#x30D7;&#x30ED;&#x30B0;&#x30E9;&#x30DF;&#x30F3;&#x30B0;</a></p>

<p>ここでそれをうまく回避していたので真似た．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synIdentifier">load</span> <span class="synConstant">&quot;./eval.scm&quot;</span><span class="synSpecial">)</span>
<span class="synSpecial">(</span><span class="synIdentifier">load</span> <span class="synConstant">&quot;./compiler.scm&quot;</span><span class="synSpecial">)</span>
<span class="synSpecial">(</span><span class="synIdentifier">load</span> <span class="synConstant">&quot;./register-machine-simulator.scm&quot;</span><span class="synSpecial">)</span>
<span class="synSpecial">(</span><span class="synIdentifier">load</span> <span class="synConstant">&quot;./eceval.scm&quot;</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>rcepl<span class="synSpecial">)</span> RCEPL<span class="synSpecial">)</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> rcepl-proc
  <span class="synSpecial">(</span><span class="synIdentifier">append</span> eceval-procedure
          <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>compile compile<span class="synSpecial">))</span>
          <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>assemble assemble<span class="synSpecial">))</span>
          <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>rcepl rcepl<span class="synSpecial">))</span>
          <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>statements statements<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> RCEPL
  <span class="synSpecial">(</span>make-machine
   rcepl-proc
   <span class="synSpecial">'((</span>assign machine <span class="synSpecial">(</span>op rcepl<span class="synSpecial">))</span> <span class="synComment">;直接RCEPLを指せないので</span>
     read-compile-execute-print-loop
     <span class="synSpecial">(</span>perform <span class="synSpecial">(</span>op initialize-stack<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>perform <span class="synSpecial">(</span>op prompt-for-input<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">&quot;;;;EC-COMP input:&quot;</span><span class="synSpecial">))</span>
     <span class="synSpecial">(</span>assign exp <span class="synSpecial">(</span>op read<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>assign env <span class="synSpecial">(</span>op get-global-environment<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label print-result<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label read-compile-execute<span class="synSpecial">))</span>

     print-result
     <span class="synSpecial">(</span>perform <span class="synSpecial">(</span>op print-stack-statistics<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>perform <span class="synSpecial">(</span>op announce-output<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">&quot;;;;EC-COMP value&quot;</span>:<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>perform <span class="synSpecial">(</span>op user-print<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label read-compile-execute-print-loop<span class="synSpecial">))</span>

     read-compile-execute
     <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op compile<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg exp<span class="synSpecial">)</span> <span class="synSpecial">(</span>const val<span class="synSpecial">)</span> <span class="synSpecial">(</span>const return<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">()))</span>
     <span class="synSpecial">(</span>assign exp <span class="synSpecial">(</span>op statements<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op assemble<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg exp<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg machine<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg val<span class="synSpecial">)))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>start-rcepl<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">set!</span> the-global-environment <span class="synSpecial">(</span>setup-environment<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>start RCEPL<span class="synSpecial">))</span>
</pre>


<p>　<br/>
test</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span>start-rcepl<span class="synSpecial">)</span>


<span class="synComment">;;;EC-COMP input:</span>
      <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>factorial n<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">&lt;</span> n <span class="synConstant">2</span><span class="synSpecial">)</span>
            n
            <span class="synSpecial">(</span><span class="synIdentifier">*</span> <span class="synSpecial">(</span>factorial <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">1</span><span class="synSpecial">))</span> n<span class="synSpecial">)))</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">0</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">0</span><span class="synSpecial">)</span>
<span class="synComment">;;;EC-COMP value</span>
ok

<span class="synComment">;;;EC-COMP input:</span>
<span class="synSpecial">(</span>factorial <span class="synConstant">20</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">78</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">40</span><span class="synSpecial">)</span>
<span class="synComment">;;;EC-COMP value</span>
<span class="synConstant">2432902008176640000</span>
</pre>


