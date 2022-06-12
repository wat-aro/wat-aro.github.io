---
title: "SICP 問題 5.29"
published: 2016/02/03
tags:
  - scheme
  - SICP
---

<p>a: n≧2の時のfib(n)を計算するのに必要なスタックの最大深さのnを使った式を与えよ．<br/>
b: 同じ条件でfib(n)のプッシュの総数を求める</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>fib n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">&lt;</span> n <span class="synConstant">2</span><span class="synSpecial">)</span>
      n
      <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span>fib <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">1</span><span class="synSpecial">))</span> <span class="synSpecial">(</span>fib <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">2</span><span class="synSpecial">)))))</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">3</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">3</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
ok

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>fib <span class="synConstant">0</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">16</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">8</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">0</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>fib <span class="synConstant">1</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">16</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">8</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">1</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>fib <span class="synConstant">2</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">72</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">13</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">1</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>fib <span class="synConstant">3</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">128</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">18</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">2</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>fib <span class="synConstant">4</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">240</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">23</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">3</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>fib <span class="synConstant">5</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">408</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">28</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">5</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>fib <span class="synConstant">6</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">688</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">33</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">8</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>fib <span class="synConstant">7</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">1136</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">38</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">13</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>fib <span class="synConstant">8</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">1864</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">43</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">21</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>fib <span class="synConstant">9</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">3040</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">48</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">34</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>fib <span class="synConstant">10</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">4944</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">53</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">55</span>
</pre>


<p>a: 最大深さは5n+3<br/>
b: プッシュ総数S(n)=S(n-1)+S(n-2)+40<br/>
オーバーヘッド定数kは40.</p>

<p><span itemscope itemtype="http://schema.org/Photograph"><a href="http://f.hatena.ne.jp/wat-aro/20160203165046" class="hatena-fotolife" itemprop="url"><img src="http://cdn-ak.f.st-hatena.com/images/fotolife/w/wat-aro/20160203/20160203165046.jpg" alt="f:id:wat-aro:20160203165046j:image" title="f:id:wat-aro:20160203165046j:image" class="hatena-fotolife" itemprop="image"></a></span></p>

