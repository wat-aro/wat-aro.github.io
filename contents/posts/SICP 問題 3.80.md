---
title: "SICP 問題 3.80"
published: 2015/12/17
tags:
  - scheme
  - SICP
---

<p>なかなかテスト通らなくて困りました．<br/>
結局iLを書く位置をvCの次にしたら動きました．<br/>
元々そこにはdvCがあって，<br/>
<code>(scale-stream iL (/ -1 C)))</code>がiLの初期化前に行われたのが原因でした．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>RLC R L C dt<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>vC0 iL0<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> vC <span class="synSpecial">(</span>integral <span class="synSpecial">(</span><span class="synStatement">delay</span> dvC<span class="synSpecial">)</span> vC0 dt<span class="synSpecial">))</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> iL <span class="synSpecial">(</span>integral <span class="synSpecial">(</span><span class="synStatement">delay</span> diL<span class="synSpecial">)</span> iL0 dt<span class="synSpecial">))</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> dvC <span class="synSpecial">(</span>scale-stream iL <span class="synSpecial">(</span><span class="synIdentifier">/</span> <span class="synConstant">-1</span> C<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> diL <span class="synSpecial">(</span>add-streams <span class="synSpecial">(</span>scale-stream iL <span class="synSpecial">(</span><span class="synIdentifier">-</span> <span class="synSpecial">(</span><span class="synIdentifier">/</span> R L<span class="synSpecial">)))</span>
                             <span class="synSpecial">(</span>scale-stream vC <span class="synSpecial">(</span><span class="synIdentifier">/</span> <span class="synConstant">1</span> L<span class="synSpecial">))))</span>
    <span class="synSpecial">(</span>stream-map <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x y<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> x y<span class="synSpecial">))</span> vC iL<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> RLC1 <span class="synSpecial">(</span>RLC <span class="synConstant">1</span> <span class="synConstant">1</span> <span class="synConstant">0.2</span> <span class="synConstant">0.1</span><span class="synSpecial">))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (stream-head (RLC1 10 0) 10)
(10 . 0)
(10.0 . 1.0)
(9.5 . 1.9)
(8.55 . 2.66)
(7.220000000000001 . 3.249)
(5.5955 . 3.6461)
(3.77245 . 3.84104)
(1.8519299999999999 . 3.834181)
(-0.0651605000000004 . 3.6359559)
(-1.8831384500000004 . 3.2658442599999997)
done</pre>


