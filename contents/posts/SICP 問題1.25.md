---
title: "SICP 問題1.25"
published: 2015/10/07
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>expmod b e m<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">=</span> e <span class="synConstant">0</span><span class="synSpecial">)</span> <span class="synConstant">1</span><span class="synSpecial">)</span>
        <span class="synSpecial">((</span><span class="synIdentifier">even?</span> e<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">remainder</span> <span class="synSpecial">(</span>square <span class="synSpecial">(</span>expmod b <span class="synSpecial">(</span><span class="synIdentifier">/</span> e <span class="synConstant">2</span><span class="synSpecial">)</span> m<span class="synSpecial">))</span>
                    m<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">remainder</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> b <span class="synSpecial">(</span>expmod b <span class="synSpecial">(</span><span class="synIdentifier">-</span> e <span class="synConstant">1</span><span class="synSpecial">)</span> m<span class="synSpecial">))</span>
                         m<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>new-expmod base <span class="synIdentifier">exp</span> m<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">remainder</span> <span class="synSpecial">(</span>fast-expt base <span class="synIdentifier">exp</span><span class="synSpecial">)</span> m<span class="synSpecial">))</span>
</pre>


<p>time手続きを使って比較してみる．</p>

<pre class="code" data-lang="" data-unlink>gosh&gt; (time (new-expmod 5 1000000 7))
;(time (new-expmod 5 1000000 7))
; real   5.010
; user   5.000
; sys    0.010
2
gosh&gt; (time (expmod 5 1000000 7))
;(time (expmod 5 1000000 7))
; real   0.000
; user   0.000
; sys    0.000
2</pre>


<p>expmodが<a class="keyword" href="http://d.hatena.ne.jp/keyword/%C3%E0%BC%A1">逐次</a>平方によって，その都度remainder手続きを適用することによって常に剰余を計算対象にしている．<br/>
new-expmodは5<sup>1000000</sup>を計算するところまでのステップ数はべきに対して<a class="keyword" href="http://d.hatena.ne.jp/keyword/%C2%D0%BF%F4">対数</a>的に増加しているが，その後<code>(remainder 5^1000000 7)</code>の計算がO(n)となる．<br/>
途中計算の手間が大きいため高速<a class="keyword" href="http://d.hatena.ne.jp/keyword/%C1%C7%BF%F4">素数</a>テストと同じようには使えない．</p>

