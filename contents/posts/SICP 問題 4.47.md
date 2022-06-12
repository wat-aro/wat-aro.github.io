---
title: "SICP 問題 4.47"
published: 2016/01/13
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>parse-verb-phrase<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>amb <span class="synSpecial">(</span>parse-word verbs<span class="synSpecial">)</span>
       <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>verb-phrase
             <span class="synSpecial">(</span>parse-verb-phrase<span class="synSpecial">)</span>
             <span class="synSpecial">(</span>parse-prepositional-phrase<span class="synSpecial">))))</span>
</pre>


<p><code>(parse '(the student with the cat sleeps in the class))</code>これを例に考える．<br/>
verbが問題なのでsleeps in the classだけに絞る．
これは</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span>verb-phrase
 <span class="synSpecial">(</span>verb sleeps<span class="synSpecial">)</span>
 <span class="synSpecial">(</span>prep-phrase <span class="synSpecial">(</span>prep in<span class="synSpecial">)</span>
              <span class="synSpecial">(</span>simple-noun-phrase
               <span class="synSpecial">(</span>article the<span class="synSpecial">)</span> <span class="synSpecial">(</span>noun class<span class="synSpecial">))))</span>
</pre>


<p>となってほしい．<br/>
まず(parse-word verbs)が評価され<em>unparsed</em>はcdrがset!されて(list verb sleeps)が返る．<br/>
<em>unparsed</em>はまだ残っているので(parse input)の(require (null? <em>unparsed</em>))で失敗して次にいく．<br/>
次はparse-verb-phraseなのでまた(parse-word verbs)を評価する．  <br/>
しかし，<em>unparsed</em>に入っているのはinなので失敗する．<br/>
そうするとambの次の要素にいくのでまたparse-verb-phraseを評価する．<br/>
同じく失敗する．このまま無限ループに入って終了しない．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; (parse input)</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>parse input<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">set!</span> <span class="synConstant">*unparsed*</span> input<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>sent <span class="synSpecial">(</span>parse-sentence<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span>require <span class="synSpecial">(</span><span class="synIdentifier">null?</span> <span class="synConstant">*unparsed*</span><span class="synSpecial">))</span>
    sent<span class="synSpecial">))</span>
</pre>


<p><div class="hatena-asin-detail"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/4798135984/wataro-22/"><img src="http://ecx.images-amazon.com/images/I/511qf4jdYjL._SL160_.jpg" class="hatena-asin-detail-image" alt="計算機プログラムの構造と解釈 第2版" title="計算機プログラムの構造と解釈 第2版"></a><div class="hatena-asin-detail-info"><p class="hatena-asin-detail-title"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/4798135984/wataro-22/">計算機プログラムの構造と解釈 第2版</a></p><ul><li><span class="hatena-asin-detail-label">作者:</span> ハロルド<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%A8%A5%A4%A5%D6%A5%EB">エイブル</a>ソン,ジュリーサスマン,<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B8%A5%A7%A5%E9%A5%EB%A5%C9%A1%A6%A5%B8%A5%A7%A5%A4%A5%B5%A5%B9%A5%DE%A5%F3">ジェラルド・ジェイサスマン</a>,Harold Abelson,Julie Sussman,Gerald Jay Sussman,和田英一</li><li><span class="hatena-asin-detail-label">出版社/メーカー:</span> <a class="keyword" href="http://d.hatena.ne.jp/keyword/%E6%C6%B1%CB%BC%D2">翔泳社</a></li><li><span class="hatena-asin-detail-label">発売日:</span> 2014/05/17</li><li><span class="hatena-asin-detail-label">メディア:</span> 大型本</li><li><a href="http://d.hatena.ne.jp/asin/4798135984/wataro-22" target="_blank">この商品を含むブログ (2件) を見る</a></li></ul></div><div class="hatena-asin-detail-foot"></div></div></p>

