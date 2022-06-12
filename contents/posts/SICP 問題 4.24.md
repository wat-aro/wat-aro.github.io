---
title: "SICP 問題 4.24"
published: 2016/01/01
tags:
  - scheme
  - SICP
---

<p>driver-loopにtimeマクロをしかけて計測する．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>driver-loop<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>prompt-for-input input-prompt<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>input <span class="synSpecial">(</span><span class="synIdentifier">read</span><span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>output <span class="synSpecial">(</span>time <span class="synSpecial">(</span><span class="synIdentifier">eval</span> input the-global-environment<span class="synSpecial">))))</span>
      <span class="synSpecial">(</span>announce-output output-prompt<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>user-print output<span class="synSpecial">)))</span>
  <span class="synSpecial">(</span>driver-loop<span class="synSpecial">))</span>
</pre>




<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>fib n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>iter a b count<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> n count<span class="synSpecial">)</span>
        a
        <span class="synSpecial">(</span>iter b <span class="synSpecial">(</span><span class="synIdentifier">+</span> a b<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> count <span class="synConstant">1</span><span class="synSpecial">))))</span>
  <span class="synSpecial">(</span>iter <span class="synConstant">1</span> <span class="synConstant">1</span> <span class="synConstant">1</span><span class="synSpecial">))</span>
</pre>


<p>これを使って計算する．<br/>
最初のeval</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span>fib <span class="synConstant">100000</span><span class="synSpecial">)</span>
<span class="synComment">;(time (eval input the-global-environment))</span>
<span class="synComment">; real   1.846</span>
<span class="synComment">; user   2.010</span>
<span class="synComment">; sys    0.010</span>
</pre>


<p>解析と評価を分けたeval</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span>fib <span class="synConstant">100000</span><span class="synSpecial">)</span>
<span class="synComment">;(time (eval input the-global-environment))</span>
<span class="synComment">; real   1.095</span>
<span class="synComment">; user   1.140</span>
<span class="synComment">; sys    0.010</span>
</pre>


<p>最初のevalのほうが評価のたびに<a class="keyword" href="http://d.hatena.ne.jp/keyword/%B9%BD%CA%B8%B2%F2%C0%CF">構文解析</a>をする分遅くなっている．</p>

