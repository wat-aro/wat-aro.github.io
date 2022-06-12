---
title: "SICP 問題 5.27"
published: 2016/02/03
tags:
  - scheme
  - SICP
---

<p>5.26と同じことを<a class="keyword" href="http://d.hatena.ne.jp/keyword/%BA%C6%B5%A2">再帰</a>的階乗計算で．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>factorial-recur n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> n <span class="synConstant">1</span><span class="synSpecial">)</span>
      <span class="synConstant">1</span>
      <span class="synSpecial">(</span><span class="synIdentifier">*</span> <span class="synSpecial">(</span>factorial-recur <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">1</span><span class="synSpecial">))</span> n<span class="synSpecial">)))</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">3</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">3</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
ok

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial-recur <span class="synConstant">1</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">16</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">8</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">1</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial-recur <span class="synConstant">2</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">48</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">13</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">2</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial-recur <span class="synConstant">3</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">80</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">18</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">6</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial-recur <span class="synConstant">4</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">112</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">23</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">24</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial-recur <span class="synConstant">5</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">144</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">28</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">120</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial-recur <span class="synConstant">6</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">176</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">33</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">720</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial-recur <span class="synConstant">7</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">208</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">38</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">5040</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial-recur <span class="synConstant">8</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">240</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">43</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">40320</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial-recur <span class="synConstant">9</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">272</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">48</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">362880</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial-recur <span class="synConstant">10</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">304</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">53</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">3628800</span>
</pre>


<p>プッシュ回数は32n-16, 最大深さは5n+3.<br/>
反復的階乗計算はプッシュ回数が35n+34, 最大深さ10だったので，
プッシュ回数は<a class="keyword" href="http://d.hatena.ne.jp/keyword/%BA%C6%B5%A2">再帰</a>的階乗計算のほうが少なく，最大深さは反復的階乗計算のほうが少ない．<br/>
階乗計算は<a class="keyword" href="http://d.hatena.ne.jp/keyword/%BA%C6%B5%A2">再帰</a>的なほうが早く計算できるがその分メモリの消費量が大きくなり，<br/>
反復的計算のほうが時間は少しだけかかるがメモリの消費量は定数に抑えられる．</p>

