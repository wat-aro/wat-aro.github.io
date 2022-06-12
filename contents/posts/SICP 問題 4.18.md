---
title: "SICP 問題 4.18"
published: 2015/12/25
tags:
  - scheme
  - SICP
---

<p>本文中の変形であればうごく．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink>
<span class="synComment">;; ３章で定義した手続きとマクロ</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>integral integrand initial-value dt<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> int
    <span class="synSpecial">(</span>cons-stream initial-value
                 <span class="synSpecial">(</span>add-streams <span class="synSpecial">(</span>scale-stream integrand dt<span class="synSpecial">)</span>
                              int<span class="synSpecial">)))</span>
  int<span class="synSpecial">)</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>stream-map proc <span class="synSpecial">.</span> argstreams<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>stream-null? <span class="synSpecial">(</span><span class="synIdentifier">car</span> argstreams<span class="synSpecial">))</span>
      the-empty-stream
      <span class="synSpecial">(</span>cons-stream <span class="synSpecial">(</span><span class="synIdentifier">apply</span> proc <span class="synSpecial">(</span><span class="synIdentifier">map</span> stream-car argstreams<span class="synSpecial">))</span>
                   <span class="synSpecial">(</span><span class="synIdentifier">apply</span> stream-map
                          <span class="synSpecial">(</span><span class="synIdentifier">cons</span> proc <span class="synSpecial">(</span><span class="synIdentifier">map</span> stream-cdr argstreams<span class="synSpecial">))))))</span>

<span class="synSpecial">(</span><span class="synStatement">define-syntax</span> cons-stream
  <span class="synSpecial">(</span><span class="synStatement">syntax-rules</span> <span class="synSpecial">()</span>
    <span class="synSpecial">((</span>_ a b<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> a <span class="synSpecial">(</span><span class="synStatement">delay</span> b<span class="synSpecial">)))))</span>

<span class="synSpecial">(</span><span class="synStatement">define-syntax</span> <span class="synStatement">delay</span>
  <span class="synSpecial">(</span><span class="synStatement">syntax-rules</span> <span class="synSpecial">()</span>
    <span class="synSpecial">((</span>_ <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>memo-proc <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">()</span> <span class="synIdentifier">exp</span><span class="synSpecial">)))))</span>
</pre>




<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>solve f y0 dt<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> y <span class="synSpecial">(</span>integral <span class="synSpecial">(</span><span class="synStatement">delay</span> dy<span class="synSpecial">)</span> y0 dt<span class="synSpecial">))</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> dy <span class="synSpecial">(</span>stream-map f y<span class="synSpecial">))</span>
  y<span class="synSpecial">)</span>

<span class="synComment">;; 問題文の通りに変形すると，</span>
<span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>vars<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>y <span class="synSpecial">'</span><span class="synConstant">*unassigned*</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span>dy <span class="synSpecial">'</span><span class="synConstant">*unassigned*</span><span class="synSpecial">))</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>a <span class="synSpecial">(</span>integral <span class="synSpecial">(</span><span class="synStatement">delay</span> dy<span class="synSpecial">)</span> y0 dt<span class="synSpecial">))</span>
          <span class="synSpecial">(</span>b <span class="synSpecial">(</span>stream-map f y<span class="synSpecial">)))</span>
      <span class="synSpecial">(</span><span class="synStatement">set!</span> y a<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">set!</span> dy b<span class="synSpecial">))</span>
    y<span class="synSpecial">))</span>

<span class="synComment">;; まずはじめのletでyとvは``*unassigned*``に束縛される．</span>
<span class="synComment">;; 次にaを束縛する．(integral ..)が評価される．dyはまだ*unassigned*だが，initial-valueだけcosされ，のこりの評価は遅れる．(delay dy)となっているのでdyもまだ評価されない．</span>
<span class="synComment">;; 次にbを束縛する．(stream-map f y)を評価しようとするがこの時yはまだ'*unassigned*なのでエラー．</span>

<span class="synComment">;; 本文中の変換をすると，</span>
<span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>vars<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>y <span class="synSpecial">'</span><span class="synConstant">*unassigned*</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span>dy <span class="synSpecial">'</span><span class="synConstant">*unassigned*</span><span class="synSpecial">))</span>
    <span class="synSpecial">(</span><span class="synStatement">set!</span> y <span class="synSpecial">(</span>integral <span class="synSpecial">(</span><span class="synStatement">delay</span> dy<span class="synSpecial">)</span> y0 dt<span class="synSpecial">))</span>
    <span class="synSpecial">(</span><span class="synStatement">set!</span> dy <span class="synSpecial">(</span>stream-map f y<span class="synSpecial">))</span>
    y<span class="synSpecial">))</span>

<span class="synComment">;; まずはじめに最初の式と同じようにyとdyを束縛する．</span>
<span class="synComment">;; 次にyに(integral (delay dy) y0 dt)を代入する．</span>
<span class="synComment">;; (integral ..)が評価される．dyはまだ*unassigned*だが，initial-valueだけcosされ，のこりの評価は遅れる．</span>
<span class="synComment">;; (delay dy)となっているのでdyもまだ評価されない．</span>
<span class="synComment">;; 次にdyに(stream-map f y)を代入する．この時点でyの値は(integral (delay dy) y0 dt).</span>
<span class="synComment">;; stream-mapもはじめに必要なのはyの先頭の要素だけで，それはinitial-valueになっている．</span>
<span class="synComment">;; その相互に呼び出しあいながらストリームが作られる．</span>
</pre>


