---
title: "SICP 問題1.35"
published: 2015/10/08
tags:
  - scheme
  - SICP
---

<p><span itemscope itemtype="http://schema.org/Photograph"><img src="http://cdn-ak.f.st-hatena.com/images/fotolife/w/wat-aro/20151008/20151008050935.jpg" alt="f:id:wat-aro:20151008050935j:plain" title="f:id:wat-aro:20151008050935j:plain" class="hatena-fotolife" itemprop="image"></span></p>

<p>x → 1 + 1/xを使い，fixed-point手続きにより<a class="keyword" href="http://d.hatena.ne.jp/keyword/%B2%AB%B6%E2%C8%E6">黄金比</a>を計算する</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>fixed-point f first-guess<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>close-enough? v1 v2<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synIdentifier">&lt;</span> <span class="synSpecial">(</span><span class="synIdentifier">abs</span> <span class="synSpecial">(</span><span class="synIdentifier">-</span> v1 v2<span class="synSpecial">))</span> tolerance<span class="synSpecial">))</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>try guess<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>next <span class="synSpecial">(</span>f guess<span class="synSpecial">)))</span>
      <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>close-enough? guess next<span class="synSpecial">)</span>
          next
          <span class="synSpecial">(</span>try next<span class="synSpecial">))))</span>
  <span class="synSpecial">(</span>try first-guess<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> golden-ratio
  <span class="synSpecial">(</span>fixed-point <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synConstant">1</span> <span class="synSpecial">(</span><span class="synIdentifier">/</span> x<span class="synSpecial">)))</span>
               <span class="synConstant">1.0</span><span class="synSpecial">))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt;golden-ratio
1.6180327868852458</pre>


<p><div class="hatena-asin-detail"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/4798135984/wataro-22/"><img src="http://ecx.images-amazon.com/images/I/511qf4jdYjL._SL160_.jpg" class="hatena-asin-detail-image" alt="計算機プログラムの構造と解釈[第2版]" title="計算機プログラムの構造と解釈[第2版]"></a><div class="hatena-asin-detail-info"><p class="hatena-asin-detail-title"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/4798135984/wataro-22/">計算機プログラムの構造と解釈[第2版]</a></p><ul><li><span class="hatena-asin-detail-label">作者:</span> ハロルド<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%A8%A5%A4%A5%D6%A5%EB">エイブル</a>ソン,ジュリーサスマン,<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B8%A5%A7%A5%E9%A5%EB%A5%C9%A1%A6%A5%B8%A5%A7%A5%A4%A5%B5%A5%B9%A5%DE%A5%F3">ジェラルド・ジェイサスマン</a>,Harold Abelson,Julie Sussman,Gerald Jay Sussman,和田英一</li><li><span class="hatena-asin-detail-label">出版社/メーカー:</span> <a class="keyword" href="http://d.hatena.ne.jp/keyword/%E6%C6%B1%CB%BC%D2">翔泳社</a></li><li><span class="hatena-asin-detail-label">発売日:</span> 2014/05/17</li><li><span class="hatena-asin-detail-label">メディア:</span> 大型本</li><li><a href="http://d.hatena.ne.jp/asin/4798135984/wataro-22" target="_blank">この商品を含むブログ (2件) を見る</a></li></ul></div><div class="hatena-asin-detail-foot"></div></div></p>

