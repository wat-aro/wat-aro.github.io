---
title: "SICP 問題 4.53"
published: 2016/01/15
tags:
  - scheme
  - SICP
---

<p>permanent-set!でpairsに成功する組み合わせを束縛するが，<br/>
(amb)で必ず失敗するので全ての成功する組み合わせをpairsに束縛する．<br/>
失敗継続が呼ばれ，if-failの第二引数のpairsが評価される．<br/>
この時permanent-set!で束縛されているのでバックトラックで戻らず，今まで代入した成功パターンすべてが表示される．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;;; Amb-Eval input:</span>
<span class="synSpecial">(</span><span class="synStatement">let</span>  <span class="synSpecial">((</span>pairs <span class="synSpecial">'()))</span>
  <span class="synSpecial">(</span>if-fail <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>p <span class="synSpecial">(</span>prime-sum-pair <span class="synSpecial">'(</span><span class="synConstant">1</span> <span class="synConstant">3</span> <span class="synConstant">5</span> <span class="synConstant">8</span><span class="synSpecial">)</span> <span class="synSpecial">'(</span><span class="synConstant">20</span> <span class="synConstant">35</span> <span class="synConstant">110</span><span class="synSpecial">))))</span>
             <span class="synSpecial">(</span>permanent-set! pairs <span class="synSpecial">(</span><span class="synIdentifier">cons</span> p pairs<span class="synSpecial">))</span>
             <span class="synSpecial">(</span>amb<span class="synSpecial">))</span>
           pairs<span class="synSpecial">))</span>

<span class="synComment">;;; Starting a new problem</span>
<span class="synComment">;;; Amb-Eval value:</span>

<span class="synComment">;;; Amb-Eval value:</span>
<span class="synSpecial">((</span><span class="synConstant">8</span> <span class="synConstant">35</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synConstant">3</span> <span class="synConstant">110</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synConstant">3</span> <span class="synConstant">20</span><span class="synSpecial">))</span>
</pre>


