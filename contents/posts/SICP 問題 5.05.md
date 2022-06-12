---
title: "SICP 問題 5.05"
published: 2016/01/23
tags:
  - scheme
  - SICP
---

<p>階乗とFibonacci計算機を机上シミュレート.</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; 再帰的な階乗計算を机上シミュレートする．</span>
<span class="synSpecial">(</span>controller
    <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label fact-done<span class="synSpecial">))</span>
  fact-loop
    <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op <span class="synIdentifier">=</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
    <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label base-case<span class="synSpecial">))</span>
    <span class="synComment">;; nと continue を退避し再帰呼び出しを設定する．</span>
    <span class="synComment">;; 再帰呼び出しから戻るとき after-fact から</span>
    <span class="synComment">;; 計算が続行するように continue を設定</span>
    <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>save n<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>op <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
    <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label after-fact<span class="synSpecial">))</span>
    <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label fact-loop<span class="synSpecial">))</span>
  after-fact
    <span class="synSpecial">(</span>restore n<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op <span class="synIdentifier">*</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
    <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
  base-case
    <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
    <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
  fact-done<span class="synSpecial">)</span>
</pre>




<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; (assign (reg n) (const 3))を既に実行済みであると仮定する．</span>

<span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label fact-done<span class="synSpecial">))</span>     <span class="synComment">;continue &lt;= fact-done</span>

<span class="synSpecial">(</span>test <span class="synSpecial">(</span>op <span class="synIdentifier">=</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>         <span class="synComment">;(= 3 1) =&gt; #f</span>

<span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>                         <span class="synComment">;fact-done =&gt; stack =&gt; fact-done</span>

<span class="synSpecial">(</span>save n<span class="synSpecial">)</span>                                <span class="synComment">;3 =&gt; stack =&gt; 3, fact-done</span>

<span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>op <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>     <span class="synComment">;n &lt;= 2</span>

<span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label after-fact<span class="synSpecial">))</span>    <span class="synComment">;continue &lt;= after-fact</span>

<span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label fact-loop<span class="synSpecial">))</span>

<span class="synSpecial">(</span>test <span class="synSpecial">(</span>op <span class="synIdentifier">=</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>         <span class="synComment">;(= 2 1) =&gt; #f</span>

<span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>                         <span class="synComment">;after-fact =&gt; stack =&gt; after-fact, 3, fact-done</span>

<span class="synSpecial">(</span>save n<span class="synSpecial">)</span>                                <span class="synComment">;2 =&gt; stack =&gt; 2, after-fact, 3, fact-done</span>

<span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>op <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>     <span class="synComment">;n &lt;= 1</span>

<span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label after-fact<span class="synSpecial">))</span>    <span class="synComment">;continue &lt;= after-fact</span>

<span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label fact-loop<span class="synSpecial">))</span>

<span class="synSpecial">(</span>test <span class="synSpecial">(</span>op <span class="synIdentifier">=</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>         <span class="synComment">;(= 1 1) =&gt; #t</span>

<span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label base-case<span class="synSpecial">))</span>

<span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>                  <span class="synComment">;val &lt;= 1</span>

<span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>                   <span class="synComment">;goto after-fact</span>

<span class="synSpecial">(</span>restore n<span class="synSpecial">)</span>                             <span class="synComment">;n &lt;= 2 | stack =&gt; after-fact, 3, fact-done</span>

<span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>                      <span class="synComment">;continue &lt;= after-fact | stack =&gt; 3, fact-done</span>

<span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op <span class="synIdentifier">*</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>   <span class="synComment">;val &lt;= 2 &lt;= (* 2 1)</span>

<span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>                   <span class="synComment">;goto after-fact</span>

<span class="synSpecial">(</span>restore n<span class="synSpecial">)</span>                             <span class="synComment">;n &lt;= 3 | stack fact-done</span>

<span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>                      <span class="synComment">;continue &lt;= fact-done | stack =&gt; null</span>

<span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op <span class="synIdentifier">*</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>   <span class="synComment">;n &lt;= 6 &lt;= (* 2 3)</span>

<span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>                   <span class="synComment">;goto fact-done</span>

fact-done
</pre>




<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; 次はfibonacci計算を机上シミュレートする．</span>
<span class="synComment">;; Fibonacci 数を計算する計算機の制御器</span>
<span class="synSpecial">(</span>controller
    <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label fib-done<span class="synSpecial">))</span>
  fib-loop
    <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op <span class="synIdentifier">&lt;</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">))</span>
    <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label immediate-answer<span class="synSpecial">))</span>
    <span class="synComment">;; Fib(n-1)を計算するよう設定</span>
    <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label afterfib-n-1<span class="synSpecial">))</span>
    <span class="synSpecial">(</span>save n<span class="synSpecial">)</span>                            <span class="synComment">;n の昔の値を退避</span>
    <span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>op <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span> <span class="synComment">;n を n-1 に変える</span>
    <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label fib-loop<span class="synSpecial">))</span>             <span class="synComment">;再帰呼び出しを実行</span>
  afterfib-n-1                          <span class="synComment">;戻った時 Fib(n-1) は val にある</span>
    <span class="synSpecial">(</span>restore n<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
    <span class="synComment">;; Fib(n-2)を計算するよう設定</span>
    <span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>op <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">))</span>
    <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label afterfib-n-2<span class="synSpecial">))</span>
    <span class="synSpecial">(</span>save val<span class="synSpecial">)</span>                          <span class="synComment">;Fib(n-1) を退避</span>
    <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label fib-loop<span class="synSpecial">))</span>
  afterfib-n-2                          <span class="synComment">;戻った時 Fib(n-2) の値は val にある</span>
    <span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>                <span class="synComment">;n には Fib(n-2) がある</span>
    <span class="synSpecial">(</span>restore val<span class="synSpecial">)</span>                       <span class="synComment">;val には Fib(n-1) がある</span>
    <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>assign val                         <span class="synComment">;Fib(n-1) + Fib(n-2)</span>
            <span class="synSpecial">(</span>op <span class="synIdentifier">+</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">))</span>
    <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>                 <span class="synComment">;呼び出し側に戻る．答えは val にある</span>
  immediate-answer
    <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>reg n<span class="synSpecial">))</span>                <span class="synComment">;基底の場合: Fib(n)=n</span>
    <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
    fib-done<span class="synSpecial">)</span>
</pre>




<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; 階乗と同じく(assign n (const 3))を実行済みと仮定する</span>
<span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label fib-done<span class="synSpecial">))</span>      <span class="synComment">;continue &lt;= fib-done</span>

<span class="synSpecial">(</span>test <span class="synSpecial">(</span>op <span class="synIdentifier">&lt;</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">))</span>         <span class="synComment">;(&lt; 3 2) =&gt; #f</span>

<span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>                         <span class="synComment">;fib-done =&gt; stack =&gt; fib-done</span>

<span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label afterfib-n-1<span class="synSpecial">))</span>  <span class="synComment">;continue &lt;= afterfib-n-1</span>

<span class="synSpecial">(</span>save n<span class="synSpecial">)</span>                                <span class="synComment">;3 =&gt; stack =&gt; 3, fib-done</span>

<span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>op <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>     <span class="synComment">;n &lt;= 2</span>

<span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label fib-loop<span class="synSpecial">))</span>

<span class="synSpecial">(</span>test <span class="synSpecial">(</span>op <span class="synIdentifier">&lt;</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">))</span>         <span class="synComment">;(&lt; 2 2) =&gt; #f</span>

<span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>                         <span class="synComment">;afterfib-n-1 =&gt; stack =&gt; afterfib-n-1, 3, fib-done</span>

<span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label afterfib-n-1<span class="synSpecial">))</span>  <span class="synComment">;continue &lt;= afterfib-n-1</span>

<span class="synSpecial">(</span>save n<span class="synSpecial">)</span>                                <span class="synComment">;2 =&gt; stack =&gt; 2, afterfib-n-1, 3, fib-done</span>

<span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>op <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>     <span class="synComment">;n &lt;= 1</span>

<span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label fib-loop<span class="synSpecial">))</span>

<span class="synSpecial">(</span>test <span class="synSpecial">(</span>op <span class="synIdentifier">&lt;</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">))</span>         <span class="synComment">;(&lt; 1 2) =&gt; #t</span>

<span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label immediate-answer<span class="synSpecial">))</span>

<span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>reg n<span class="synSpecial">))</span>                    <span class="synComment">;val &lt;= 1</span>

<span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>                   <span class="synComment">;(goto afterfib-n-1)</span>

<span class="synSpecial">(</span>restore n<span class="synSpecial">)</span>                             <span class="synComment">;n &lt;= 2 | stack =&gt; afterfib-n-1, 3, fib-done</span>

<span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>                      <span class="synComment">;continue &lt;= afterfib-n-1 | stack =&gt; 3, fib-done</span>

<span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>op <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">))</span>     <span class="synComment">;n &lt;= 0</span>

<span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>                         <span class="synComment">;afterfib-n-1 =&gt; stack =&gt;afterfib-n-1, 3, fib-done</span>

<span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label afterfib-n-2<span class="synSpecial">))</span>  <span class="synComment">;continue &lt;= afterfib-n-2</span>

<span class="synSpecial">(</span>save val<span class="synSpecial">)</span>                              <span class="synComment">;1 =&gt; stack =&gt; 1, afterfib-n-1, 3, fib-done</span>

<span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label fib-loop<span class="synSpecial">))</span>

<span class="synSpecial">(</span>test <span class="synSpecial">(</span>op <span class="synIdentifier">&lt;</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">))</span>         <span class="synComment">;(&lt; 0 2) =&gt; #t</span>

<span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label immediate-answer<span class="synSpecial">))</span>

<span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>reg n<span class="synSpecial">))</span>                    <span class="synComment">;val &lt;= 0</span>

<span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>                   <span class="synComment">;(goto afterfib-n-2)</span>

<span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>                    <span class="synComment">;n &lt;= 0</span>

<span class="synSpecial">(</span>restore val<span class="synSpecial">)</span>                           <span class="synComment">;val &lt;= 1 | stack =&gt; afterfib-n-1, 3, fib-done</span>

<span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>                      <span class="synComment">;continue &lt;= afterfib-n-1 | stack =&gt; 3, fib-done</span>

<span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op <span class="synIdentifier">+</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">))</span>   <span class="synComment">;val &lt;= 1 &lt;= (+ 1 0)</span>

<span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>                   <span class="synComment">;(goto afterfib-n-1)</span>

<span class="synSpecial">(</span>restore n<span class="synSpecial">)</span>                             <span class="synComment">;n &lt;= 3 | stack =&gt; fib-done</span>

<span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>                      <span class="synComment">;continue &lt;= fib-done | stack =&gt; null</span>

<span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>op <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">))</span>     <span class="synComment">;n &lt;= 1 &lt;= (- 3 2)</span>

<span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>                         <span class="synComment">;fib-done =&gt; stack =&gt; fib-done</span>

<span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label afterfib-n-2<span class="synSpecial">))</span>  <span class="synComment">;continue &lt;= afterfib-n-2</span>

<span class="synSpecial">(</span>save val<span class="synSpecial">)</span>                              <span class="synComment">;1 =&gt; stack =&gt; 1, fib-done</span>

<span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label fib-loop<span class="synSpecial">))</span>

<span class="synSpecial">(</span>test <span class="synSpecial">(</span>op <span class="synIdentifier">&lt;</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">))</span>         <span class="synComment">;(&lt; 1 2) =&gt; #t</span>

<span class="synSpecial">(</span>brach <span class="synSpecial">(</span>label immediate-answer<span class="synSpecial">))</span>

<span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>reg n<span class="synSpecial">))</span>                    <span class="synComment">;val &lt;= 1</span>

<span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>                   <span class="synComment">;(goto afterfib-n-2)</span>

<span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>                    <span class="synComment">;n &lt;= 1</span>

<span class="synSpecial">(</span>restore val<span class="synSpecial">)</span>                           <span class="synComment">;val &lt;= 1 | stack =&gt; fib-done</span>

<span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>                      <span class="synComment">;continue &lt;= fib-done</span>

<span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op <span class="synIdentifier">+</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">))</span>   <span class="synComment">;val &lt;= 2 &lt;= (+ 1 1)</span>

<span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>                   <span class="synComment">;(goto fib-done)</span>

fib-done
</pre>


