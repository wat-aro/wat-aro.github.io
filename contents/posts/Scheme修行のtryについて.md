---
title: "Scheme修行のtryについて"
published: 2016/06/04
tags:
  - gauche
  - scheme
---

<p><div class="hatena-asin-detail"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/4274068536/wataro-22/"><img src="http://ecx.images-amazon.com/images/I/41t9gbUu52L._SL160_.jpg" class="hatena-asin-detail-image" alt="Scheme修行" title="Scheme修行"></a><div class="hatena-asin-detail-info"><p class="hatena-asin-detail-title"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/4274068536/wataro-22/">Scheme修行</a></p><ul><li><span class="hatena-asin-detail-label">作者:</span> Daniel P. Friedman and Matthias Felleisen,元吉文男,横山晶一</li><li><span class="hatena-asin-detail-label">出版社/メーカー:</span> <a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%AA%A1%BC%A5%E0%BC%D2">オーム社</a></li><li><span class="hatena-asin-detail-label">発売日:</span> 2011/06/15</li><li><span class="hatena-asin-detail-label">メディア:</span> 単行本（ソフトカバー）</li><li><span class="hatena-asin-detail-label">購入</span>: 3人 <span class="hatena-asin-detail-label">クリック</span>: 46回</li><li><a href="http://d.hatena.ne.jp/asin/4274068536/wataro-22" target="_blank">この商品を含むブログ (10件) を見る</a></li></ul></div><div class="hatena-asin-detail-foot"></div></div></p>

<p>p89の欄外で補足されているtryについて．<br/>
これが出てきたのは <code>rember1*</code> の実装の中です．<br/>
<code>rember1*</code> は<a class="keyword" href="http://d.hatena.ne.jp/keyword/atom">atom</a> aとリストlを引数に取ります． <br/>
lの中で最初に出てきたaと同じアトムを削除して新しいリストを返す手続きです．</p>

<p>tryを使う前の実装は以下になります．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> rember1*
  <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>a l<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>atom? <span class="synSpecial">(</span>let/cc oh <span class="synSpecial">(</span>rm a l oh<span class="synSpecial">)))</span>
        l
        <span class="synSpecial">(</span>rm a l <span class="synSpecial">(</span><span class="synStatement">quote</span> <span class="synSpecial">())))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> rm
  <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>a l oh<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span>
     <span class="synSpecial">((</span><span class="synIdentifier">null?</span> l<span class="synSpecial">)</span> <span class="synSpecial">(</span>oh <span class="synSpecial">(</span><span class="synStatement">quote</span> no<span class="synSpecial">)))</span>
     <span class="synSpecial">((</span>atom? <span class="synSpecial">(</span><span class="synIdentifier">car</span> l<span class="synSpecial">))</span>
      <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> l<span class="synSpecial">)</span> a<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> l<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> l<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>rm a <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> l<span class="synSpecial">)</span> oh<span class="synSpecial">))))</span>
     <span class="synSpecial">(</span><span class="synStatement">else</span>
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>new-car
             <span class="synSpecial">(</span>let/cc oh
               <span class="synSpecial">(</span>rm a <span class="synSpecial">(</span><span class="synIdentifier">car</span> l<span class="synSpecial">)</span> oh<span class="synSpecial">))))</span>
        <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>atom? new-car<span class="synSpecial">)</span>
            <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> l<span class="synSpecial">)</span>
                  <span class="synSpecial">(</span>rm a <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> l<span class="synSpecial">)</span> oh<span class="synSpecial">))</span>
            <span class="synSpecial">(</span><span class="synIdentifier">cons</span> new-car <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> l<span class="synSpecial">))))))))</span>
</pre>


<p>リストの中で最後まで探し終わってlがnullになれば継続に<code>(quote no)</code>を渡します．<br/>
<a class="keyword" href="http://d.hatena.ne.jp/keyword/atom">atom</a>であればcarにリストはないのでcdrを探します．
<a class="keyword" href="http://d.hatena.ne.jp/keyword/%BA%C6%B5%A2">再帰</a>的に探して，aと同じものがあれば，それを取り除いた残りのリストを返します．<br/>
取り除くのは最初に見つかったものだけです．<br/>
このコードをtryを使うとこうなります．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> rember1*
  <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>a l<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>try oh <span class="synSpecial">(</span>rm a l oh<span class="synSpecial">)</span> l<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> rm
  <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>a l oh<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span>
     <span class="synSpecial">((</span><span class="synIdentifier">null?</span> l<span class="synSpecial">)</span> <span class="synSpecial">(</span>oh <span class="synSpecial">(</span><span class="synStatement">quote</span> no<span class="synSpecial">)))</span>
     <span class="synSpecial">((</span>atom? <span class="synSpecial">(</span><span class="synIdentifier">car</span> l<span class="synSpecial">))</span>
      <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> l<span class="synSpecial">)</span> a<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> l<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> l<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>rm a <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> l<span class="synSpecial">)</span> oh<span class="synSpecial">))))</span>
     <span class="synSpecial">(</span><span class="synStatement">else</span>
      <span class="synSpecial">(</span>try oh2
           <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>rm a <span class="synSpecial">(</span><span class="synIdentifier">car</span> l<span class="synSpecial">)</span> oh2<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> l<span class="synSpecial">))</span>
           <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> l<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span>rm a <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> l<span class="synSpecial">)</span> oh<span class="synSpecial">)))))))</span>
</pre>


<p>tryについてはここでページ欄外に</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span>try x <span class="synError">α</span> <span class="synError">β</span><span class="synSpecial">)</span>
<span class="synIdentifier">=</span>
<span class="synSpecial">(</span>let/cc success
  <span class="synSpecial">(</span>let/cc x
    <span class="synSpecial">(</span>success a<span class="synSpecial">))</span>
  b<span class="synSpecial">)</span>
</pre>


<p>と書かれています．<br/>
ここがなかなかわかりませんでした．</p>

<p>まず中のlet/ccから考えます．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span>let/cc x
  <span class="synSpecial">(</span>success <span class="synError">α</span><span class="synSpecial">))</span>
</pre>


<p>α内で継続xが使われているはずです．<br/>
継続xに値γが渡されると，<code>(let/cc x γ)</code>となり，次の計算βに進みます．</p>

<p>継続xに値が渡されない場合はαの値が継続successに渡され，そこで計算が終了しこの式の値はαとなります．<br/>
つまり，tryはα内で継続xに値が渡されればβの値が返り，<br/>
渡されなければαの値が返るわけです．<br/>
元の式で継続に値が渡されたのを判別するために<code>(quote no)</code>を継続に渡して<a class="keyword" href="http://d.hatena.ne.jp/keyword/atom">atom</a>?で判別していたものを<br/>
継続が返ってくるかこないかで判別できるようになっています．</p>

<p>継続難しいです．<br/>
でも<a class="keyword" href="http://d.hatena.ne.jp/keyword/Scheme">Scheme</a>修行で少しずつわかってきた気がします．</p>

