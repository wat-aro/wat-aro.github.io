---
title: "SICP 問題 5.26"
published: 2016/02/03
tags:
  - scheme
  - SICP
---

<p>監視つきスタックを使い，評価器の末尾<a class="keyword" href="http://d.hatena.ne.jp/keyword/%BA%C6%B5%A2">再帰</a>的特性を検討する．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>factorial n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>iter product counter<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">&gt;</span> counter n<span class="synSpecial">)</span>
        product
        <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">*</span> counter product<span class="synSpecial">)</span>
              <span class="synSpecial">(</span><span class="synIdentifier">+</span> counter <span class="synConstant">1</span><span class="synSpecial">))))</span>
  <span class="synSpecial">(</span>iter <span class="synConstant">1</span> <span class="synConstant">1</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">3</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">3</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial <span class="synConstant">0</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">34</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">8</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">1</span>

<span class="synComment">;;; EC-Eval value:</span>
ok

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial <span class="synConstant">1</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">69</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">10</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">1</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial <span class="synConstant">2</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">104</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">10</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">2</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial <span class="synConstant">3</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">139</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">10</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">6</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial <span class="synConstant">4</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">174</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">10</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">24</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial <span class="synConstant">5</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">209</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">10</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">120</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial <span class="synConstant">6</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">244</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">10</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">720</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial <span class="synConstant">7</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">279</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">10</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">5040</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial <span class="synConstant">8</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">314</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">10</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">40320</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial <span class="synConstant">9</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">349</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">10</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">362880</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial <span class="synConstant">10</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">384</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">10</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">3628800</span>
</pre>


<p>この末尾<a class="keyword" href="http://d.hatena.ne.jp/keyword/%BA%C6%B5%A2">再帰</a>階乗計算のプッシュ回数は35n+34，最大深さは10と推定できる．</p>

