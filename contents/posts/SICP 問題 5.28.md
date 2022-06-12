---
title: "SICP 問題 5.28"
published: 2016/02/03
tags:
  - scheme
  - SICP
---

<p>ev-sequenceで行っていた末尾<a class="keyword" href="http://d.hatena.ne.jp/keyword/%BA%C6%B5%A2">再帰</a>の最適化をやめた場合のfactorialの比較．<br/>
最適化をやめると反復的factorialはプッシュ回数が37n+1, 最大深さが3n+11.<br/>
<a class="keyword" href="http://d.hatena.ne.jp/keyword/%BA%C6%B5%A2">再帰</a>的factorialはそれぞれ，34n-16, 8n+3となった．<br/>
末尾<a class="keyword" href="http://d.hatena.ne.jp/keyword/%BA%C6%B5%A2">再帰</a>の最適化がないと末尾<a class="keyword" href="http://d.hatena.ne.jp/keyword/%BA%C6%B5%A2">再帰</a>的に書いても最大深さが線形に成長する．<br/>
末尾<a class="keyword" href="http://d.hatena.ne.jp/keyword/%BA%C6%B5%A2">再帰</a>の最適化がある場合は
反復的factorial 35n+34, 10
<a class="keyword" href="http://d.hatena.ne.jp/keyword/%BA%C6%B5%A2">再帰</a>的factorial 32n-16, 5n+3.</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>factorial n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>iter product counter<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">&gt;</span> counter n<span class="synSpecial">)</span>
        product
        <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">*</span> counter product<span class="synSpecial">)</span>
              <span class="synSpecial">(</span><span class="synIdentifier">+</span> counter <span class="synConstant">1</span><span class="synSpecial">))))</span>
  <span class="synSpecial">(</span>iter <span class="synConstant">1</span> <span class="synConstant">1</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">3</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">3</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
ok

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial <span class="synConstant">0</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">38</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">14</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">1</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial <span class="synConstant">1</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">75</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">17</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">1</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial <span class="synConstant">2</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">112</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">20</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">2</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial <span class="synConstant">3</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">149</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">23</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">6</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial <span class="synConstant">4</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">186</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">26</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">24</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial <span class="synConstant">5</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">223</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">29</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">120</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial <span class="synConstant">6</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">260</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">32</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">720</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial <span class="synConstant">7</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">297</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">35</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">5040</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial <span class="synConstant">8</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">334</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">38</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">40320</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial <span class="synConstant">9</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">371</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">41</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">362880</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial <span class="synConstant">10</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">408</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">44</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">3628800</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>factorial-recur n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> n <span class="synConstant">1</span><span class="synSpecial">)</span>
      <span class="synConstant">1</span>
      <span class="synSpecial">(</span><span class="synIdentifier">*</span> <span class="synSpecial">(</span>factorial-recur <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">1</span><span class="synSpecial">))</span> n<span class="synSpecial">)))</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">3</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">3</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
ok

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial-recur <span class="synConstant">1</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">18</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">11</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">1</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial-recur <span class="synConstant">2</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">52</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">19</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">2</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial-recur <span class="synConstant">3</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">86</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">27</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">6</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial-recur <span class="synConstant">4</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">120</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">35</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">24</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial-recur <span class="synConstant">5</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">154</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">43</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">120</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial-recur <span class="synConstant">6</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">188</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">51</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">720</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial-recur <span class="synConstant">7</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">222</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">59</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">5040</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial-recur <span class="synConstant">8</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">256</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">67</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">40320</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial-recur <span class="synConstant">9</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">290</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">75</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">362880</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial-recur <span class="synConstant">10</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">324</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">83</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">3628800</span>
</pre>


