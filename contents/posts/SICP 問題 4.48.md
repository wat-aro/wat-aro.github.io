---
title: "SICP 問題 4.48"
published: 2016/01/13
tags:
  - scheme
  - SICP
---

<p>adjectiveのみ追加する．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; 冠詞の解析をparse-article-phraseにしてそこでmaybe-extendに進めばadjectiveも解析されるようにする．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>parse-simple-noun-phrase<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>simple-noun-phrase
        <span class="synSpecial">(</span>parse-article-phrase<span class="synSpecial">)</span>
        <span class="synSpecial">(</span>parse-word nouns<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>parse-article-phrase<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>maybe-extend article-phrase<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>amb article-phrase
         <span class="synSpecial">(</span>maybe-extend <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>article-phrase
                             article-phrase
                             <span class="synSpecial">(</span>parse-adjective-phrase<span class="synSpecial">)))))</span>
  <span class="synSpecial">(</span>maybe-extend <span class="synSpecial">(</span>parse articles<span class="synSpecial">)))</span>
</pre>


<p><div class="hatena-asin-detail"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/4798135984/wataro-22/"><img src="http://ecx.images-amazon.com/images/I/511qf4jdYjL._SL160_.jpg" class="hatena-asin-detail-image" alt="計算機プログラムの構造と解釈 第2版" title="計算機プログラムの構造と解釈 第2版"></a><div class="hatena-asin-detail-info"><p class="hatena-asin-detail-title"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/4798135984/wataro-22/">計算機プログラムの構造と解釈 第2版</a></p><ul><li><span class="hatena-asin-detail-label">作者:</span> ハロルド<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%A8%A5%A4%A5%D6%A5%EB">エイブル</a>ソン,ジュリーサスマン,<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B8%A5%A7%A5%E9%A5%EB%A5%C9%A1%A6%A5%B8%A5%A7%A5%A4%A5%B5%A5%B9%A5%DE%A5%F3">ジェラルド・ジェイサスマン</a>,Harold Abelson,Julie Sussman,Gerald Jay Sussman,和田英一</li><li><span class="hatena-asin-detail-label">出版社/メーカー:</span> <a class="keyword" href="http://d.hatena.ne.jp/keyword/%E6%C6%B1%CB%BC%D2">翔泳社</a></li><li><span class="hatena-asin-detail-label">発売日:</span> 2014/05/17</li><li><span class="hatena-asin-detail-label">メディア:</span> 大型本</li><li><a href="http://d.hatena.ne.jp/asin/4798135984/wataro-22" target="_blank">この商品を含むブログ (2件) を見る</a></li></ul></div><div class="hatena-asin-detail-foot"></div></div></p>

