---
title: "SICP 問題 4.29"
published: 2016/01/08
tags:
  - scheme
  - SICP
---

<p>メモ化しないとはるかに遅くなるプログラムの例として<br/>
<a class="keyword" href="http://d.hatena.ne.jp/keyword/%BA%C6%B5%A2">再帰</a>で<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%D5%A5%A3%A5%DC%A5%CA%A5%C3%A5%C1%BF%F4%CE%F3">フィボナッチ数列</a>の第n項を求める手続きを定義する．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>fib n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> iter <span class="synSpecial">((</span>a <span class="synConstant">0</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>b <span class="synConstant">1</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>count n<span class="synSpecial">))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> count <span class="synConstant">0</span><span class="synSpecial">)</span>
        a
        <span class="synSpecial">(</span>iter b <span class="synSpecial">(</span><span class="synIdentifier">+</span> a b<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">-</span> count <span class="synConstant">1</span><span class="synSpecial">)))))</span>

<span class="synComment">;; メモ化するforce-it</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>force-it obj<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>thunk? obj<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>result <span class="synSpecial">(</span>actual-value <span class="synSpecial">(</span>thunk-exp obj<span class="synSpecial">)</span>
                                     <span class="synSpecial">(</span>thunk-env obj<span class="synSpecial">))))</span>
           <span class="synSpecial">(</span><span class="synIdentifier">set-car!</span> obj <span class="synSpecial">'</span>evaluated-thunk<span class="synSpecial">)</span>
           <span class="synSpecial">(</span><span class="synIdentifier">set-car!</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> obj<span class="synSpecial">)</span> result<span class="synSpecial">)</span> <span class="synComment">;;expをその値で置き換える</span>
           <span class="synSpecial">(</span><span class="synIdentifier">set-cdr!</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> obj<span class="synSpecial">)</span> <span class="synSpecial">'())</span>    <span class="synComment">;;必要のなくなったenvを忘れる</span>
           result<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>evaluated-thunk? obj<span class="synSpecial">)</span> <span class="synSpecial">(</span>thunk-value obj<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> obj<span class="synSpecial">)))</span>

<span class="synComment">;; メモ化しないforce-it</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>force-it obj<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>thunk? obj<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>actual-value <span class="synSpecial">(</span>thunk-exp obj<span class="synSpecial">)</span> <span class="synSpecial">(</span>thunk-env obj<span class="synSpecial">))</span>
      obj<span class="synSpecial">))</span>

<span class="synComment">;; driver-loopにtimeマクロを仕込む</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>driver-loop<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>prompt-for-input input-prompt<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>input <span class="synSpecial">(</span><span class="synIdentifier">read</span><span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>output <span class="synSpecial">(</span>time <span class="synSpecial">(</span>actual-value input the-global-environment<span class="synSpecial">))))</span> <span class="synComment">;;ここにtimeマクロ</span>
      <span class="synSpecial">(</span>announce-output output-prompt<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>user-print output<span class="synSpecial">)))</span>
  <span class="synSpecial">(</span>driver-loop<span class="synSpecial">))</span>
</pre>


<p>メモ化する場合</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span>fib <span class="synConstant">30</span><span class="synSpecial">)</span>
<span class="synComment">;(time (actual-value input the-global-environment))</span>
<span class="synComment">; real   0.001</span>
<span class="synComment">; user   0.000</span>
<span class="synComment">; sys    0.000</span>

<span class="synComment">;;; M-Eval value:</span>
<span class="synConstant">832040</span>
</pre>


<p>メモ化しない場合</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span>fib <span class="synConstant">30</span><span class="synSpecial">)</span>
<span class="synComment">;(time (actual-value input the-global-environment))</span>
<span class="synComment">; real   6.559</span>
<span class="synComment">; user   6.540</span>
<span class="synComment">; sys    0.000</span>

<span class="synComment">;;; M-Eval value:</span>
<span class="synConstant">832040</span>
</pre>


<p>　</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>square x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">*</span> x x<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>id x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">set!</span> count <span class="synSpecial">(</span><span class="synIdentifier">+</span> count <span class="synConstant">1</span><span class="synSpecial">))</span>
  x<span class="synSpecial">)</span>
</pre>


<p>メモ化する場合</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span>square <span class="synSpecial">(</span>id <span class="synConstant">10</span><span class="synSpecial">))</span>

<span class="synComment">;;; M-Eval value:</span>
<span class="synConstant">100</span>

<span class="synComment">;;; M-Eval input:</span>
count

<span class="synComment">;;; M-Eval value:</span>
<span class="synConstant">1</span>
</pre>


<p>メモ化しない場合</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span>square <span class="synSpecial">(</span>id <span class="synConstant">10</span><span class="synSpecial">))</span>

<span class="synComment">;;; M-Eval value:</span>
<span class="synConstant">100</span>

<span class="synComment">;;; M-Eval input:</span>
count

<span class="synComment">;;; M-Eval value:</span>
<span class="synConstant">2</span>
</pre>


<p>メモ化すると(* x x)を評価する時に初めのxは(thunk (id 10))となっているのでこれをforce-itしてcountを+1して10を返し，<br/>
xの束縛を(evaluated-thunk 10)に変える．<br/>
次のxをforce-itするとそのまま10が返る．</p>

