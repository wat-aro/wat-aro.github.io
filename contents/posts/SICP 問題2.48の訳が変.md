---
title: "SICP 問題2.48の訳が変"
published: 2015/10/24
tags:
  - scheme
  - SICP
---

<p>線分を<a class="keyword" href="http://d.hatena.ne.jp/keyword/vector">vector</a>で定義して構成子と選択子を定義するって問題やっていた．<br/>
問題文には</p>

<blockquote><p>平面上の有向線分は<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%D9%A5%AF%A5%BF">ベクタ</a>の対ーー原点から線分の始点へ向かう<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%D9%A5%AF%A5%BF">ベクタ</a>と，始点から線分の終点へ向かう<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%D9%A5%AF%A5%BF%A1%BC">ベクター</a>ーで表現される．
[中略]
この線分の表現をmake-segmentと選択子start-segmentおよびend-segmentとして定義せよ．</p></blockquote>

<p>となっていた．<br/>
始点から終点への<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%D9%A5%AF%A5%BF">ベクタ</a>をend-segmentってするのはおかしくかと思い原書にあたってみた．</p>

<blockquote><p>A directed line segment in the plane can be represented as a pair of vectors -- the <a class="keyword" href="http://d.hatena.ne.jp/keyword/vector">vector</a> running from the origin to the start-point of the segment, and the <a class="keyword" href="http://d.hatena.ne.jp/keyword/vector">vector</a> running from the origin to the end-point of the segment.
...</p></blockquote>

<p>ってなっている．<br/>
両方原点から(from the origin)じゃないですかー<br/>
選択子end-segmentが始点から終点への<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%D9%A5%AF%A5%BF">ベクタ</a>なのはおかしいって思ってたらそういうことですか．</p>

<p><div class="hatena-asin-detail"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/4798135984/wataro-22/"><img src="http://ecx.images-amazon.com/images/I/511qf4jdYjL._SL160_.jpg" class="hatena-asin-detail-image" alt="計算機プログラムの構造と解釈[第2版]" title="計算機プログラムの構造と解釈[第2版]"></a><div class="hatena-asin-detail-info"><p class="hatena-asin-detail-title"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/4798135984/wataro-22/">計算機プログラムの構造と解釈[第2版]</a></p><ul><li><span class="hatena-asin-detail-label">作者:</span> ハロルド<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%A8%A5%A4%A5%D6%A5%EB">エイブル</a>ソン,ジュリーサスマン,<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B8%A5%A7%A5%E9%A5%EB%A5%C9%A1%A6%A5%B8%A5%A7%A5%A4%A5%B5%A5%B9%A5%DE%A5%F3">ジェラルド・ジェイサスマン</a>,Harold Abelson,Julie Sussman,Gerald Jay Sussman,和田英一</li><li><span class="hatena-asin-detail-label">出版社/メーカー:</span> <a class="keyword" href="http://d.hatena.ne.jp/keyword/%E6%C6%B1%CB%BC%D2">翔泳社</a></li><li><span class="hatena-asin-detail-label">発売日:</span> 2014/05/17</li><li><span class="hatena-asin-detail-label">メディア:</span> 大型本</li><li><a href="http://d.hatena.ne.jp/asin/4798135984/wataro-22" target="_blank">この商品を含むブログ (2件) を見る</a></li></ul></div><div class="hatena-asin-detail-foot"></div></div></p>

