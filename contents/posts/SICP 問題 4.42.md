---
title: "SICP 問題 4.42"
published: 2016/01/12
tags:
  - scheme
  - SICP
---

<p>どちらかが正しいってどうやればいいのか思いつけず，<br/>
ここを見たらヒントがあったのでその通り<a class="keyword" href="http://d.hatena.ne.jp/keyword/%C7%D3%C2%BE%C5%AA%CF%C0%CD%FD%CF%C2">排他的論理和</a>を作って解きました．</p>

<p><a href="http://kinokoru.jp/archives/711">SICP &#x7B2C;4&#x7AE0; Exercise &#x96E3;&#x6613;&#x5EA6;&#x30EA;&#x30B9;&#x30C8; ( 4.1 &#xFF5E; 4.79 ) | &#x304D;&#x306E;&#x3053;&#x308B;&#x5EAD;</a></p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>xor x y<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">or</span> <span class="synSpecial">(</span><span class="synStatement">and</span> x <span class="synSpecial">(</span><span class="synIdentifier">not</span> y<span class="synSpecial">))</span>
      <span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span><span class="synIdentifier">not</span> x<span class="synSpecial">)</span> y<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>phillips1934<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">filter</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span>
            <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>betty <span class="synSpecial">(</span>first x<span class="synSpecial">))</span>
                  <span class="synSpecial">(</span>ethel <span class="synSpecial">(</span>second x<span class="synSpecial">))</span>
                  <span class="synSpecial">(</span>joan <span class="synSpecial">(</span>third x<span class="synSpecial">))</span>
                  <span class="synSpecial">(</span>kitty <span class="synSpecial">(</span>fourth x<span class="synSpecial">))</span>
                  <span class="synSpecial">(</span>mary <span class="synSpecial">(</span>fifth x<span class="synSpecial">)))</span>
              <span class="synSpecial">(</span><span class="synStatement">and</span>
               <span class="synSpecial">(</span>xor <span class="synSpecial">(</span><span class="synIdentifier">=</span> kitty <span class="synConstant">2</span><span class="synSpecial">)</span>
                    <span class="synSpecial">(</span><span class="synIdentifier">=</span> betty <span class="synConstant">3</span><span class="synSpecial">))</span>
               <span class="synSpecial">(</span>xor <span class="synSpecial">(</span><span class="synIdentifier">=</span> ethel <span class="synConstant">1</span><span class="synSpecial">)</span>
                    <span class="synSpecial">(</span><span class="synIdentifier">=</span> joan <span class="synConstant">2</span><span class="synSpecial">))</span>
               <span class="synSpecial">(</span>xor <span class="synSpecial">(</span><span class="synIdentifier">=</span> joan <span class="synConstant">3</span><span class="synSpecial">)</span>
                    <span class="synSpecial">(</span><span class="synIdentifier">=</span> ethel <span class="synConstant">5</span><span class="synSpecial">))</span>
               <span class="synSpecial">(</span>xor <span class="synSpecial">(</span><span class="synIdentifier">=</span> kitty <span class="synConstant">2</span><span class="synSpecial">)</span>
                    <span class="synSpecial">(</span><span class="synIdentifier">=</span> mary <span class="synConstant">4</span><span class="synSpecial">))</span>
               <span class="synSpecial">(</span>xor <span class="synSpecial">(</span><span class="synIdentifier">=</span> mary <span class="synConstant">4</span><span class="synSpecial">)</span>
                    <span class="synSpecial">(</span><span class="synIdentifier">=</span> betty <span class="synConstant">1</span><span class="synSpecial">)))))</span>
          <span class="synSpecial">(</span>permutations <span class="synSpecial">'(</span><span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span> <span class="synConstant">4</span> <span class="synConstant">5</span><span class="synSpecial">))))</span>
</pre>


<p>実行</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span>phillips1934<span class="synSpecial">)</span>
<span class="synSpecial">((</span><span class="synConstant">3</span> <span class="synConstant">5</span> <span class="synConstant">2</span> <span class="synConstant">1</span> <span class="synConstant">4</span><span class="synSpecial">))</span>
</pre>


<p><div class="hatena-asin-detail"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/4798135984/wataro-22/"><img src="http://ecx.images-amazon.com/images/I/511qf4jdYjL._SL160_.jpg" class="hatena-asin-detail-image" alt="計算機プログラムの構造と解釈 第2版" title="計算機プログラムの構造と解釈 第2版"></a><div class="hatena-asin-detail-info"><p class="hatena-asin-detail-title"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/4798135984/wataro-22/">計算機プログラムの構造と解釈 第2版</a></p><ul><li><span class="hatena-asin-detail-label">作者:</span> ハロルド<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%A8%A5%A4%A5%D6%A5%EB">エイブル</a>ソン,ジュリーサスマン,<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B8%A5%A7%A5%E9%A5%EB%A5%C9%A1%A6%A5%B8%A5%A7%A5%A4%A5%B5%A5%B9%A5%DE%A5%F3">ジェラルド・ジェイサスマン</a>,Harold Abelson,Julie Sussman,Gerald Jay Sussman,和田英一</li><li><span class="hatena-asin-detail-label">出版社/メーカー:</span> <a class="keyword" href="http://d.hatena.ne.jp/keyword/%E6%C6%B1%CB%BC%D2">翔泳社</a></li><li><span class="hatena-asin-detail-label">発売日:</span> 2014/05/17</li><li><span class="hatena-asin-detail-label">メディア:</span> 大型本</li><li><a href="http://d.hatena.ne.jp/asin/4798135984/wataro-22" target="_blank">この商品を含むブログ (2件) を見る</a></li></ul></div><div class="hatena-asin-detail-foot"></div></div></p>

