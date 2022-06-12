---
title: "SICP 問題1.5"
published: 2015/10/03
tags:
  - scheme
  - SICP
---

<p>問題１．５</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>p<span class="synSpecial">)</span> <span class="synSpecial">(</span>p<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>test x y<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> x <span class="synConstant">0</span><span class="synSpecial">)</span>
      <span class="synConstant">0</span>
      y<span class="synSpecial">))</span>

<span class="synSpecial">(</span>test <span class="synConstant">0</span> <span class="synSpecial">(</span>p<span class="synSpecial">))</span>
</pre>


<p>を実行した時，作用的順序の評価を使う解釈系と正規順序の評価を使う解釈系それぞれでどういう仏舞を見るか説明せよ．</p>

<p>作用的順序を使う解釈系ではまず(test 0 (p))を
(if (= 0 0)
    0
    (p))
と評価し，(= 0 0)が#tなのでthenが評価され0が返る．
正規順序の評価を使う解釈系では
(if (= 0 0)
    0
    (p))
と評価するところまでは同じだが，この後基本的<a class="keyword" href="http://d.hatena.ne.jp/keyword/%B1%E9%BB%BB%BB%D2">演算子</a>だけになるまで評価を繰り返す．
そのため(p)を評価し，その結果(p)が返り，それをまた評価しようとするので
演算が終わらない．</p>

