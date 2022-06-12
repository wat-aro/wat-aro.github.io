---
title: "once-onlyマクロの解読"
published: 2016/04/09
tags:
  - Common Lisp
---

<p>実践<a class="keyword" href="http://d.hatena.ne.jp/keyword/Common%20Lisp">Common Lisp</a> p100にあるonce-onlyマクロの解読に挑戦．
<div class="hatena-asin-detail"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/4274067211/wataro-22/"><img src="http://ecx.images-amazon.com/images/I/51LYivxTpSL._SL160_.jpg" class="hatena-asin-detail-image" alt="実践Common Lisp" title="実践Common Lisp"></a><div class="hatena-asin-detail-info"><p class="hatena-asin-detail-title"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/4274067211/wataro-22/">実践Common Lisp</a></p><ul><li><span class="hatena-asin-detail-label">作者:</span> Peter Seibel,佐野匡俊,水丸淳,園城雅之,金子祐介</li><li><span class="hatena-asin-detail-label">出版社/メーカー:</span> <a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%AA%A1%BC%A5%E0%BC%D2">オーム社</a></li><li><span class="hatena-asin-detail-label">発売日:</span> 2008/07/26</li><li><span class="hatena-asin-detail-label">メディア:</span> 単行本（ソフトカバー）</li><li><span class="hatena-asin-detail-label">購入</span>: 8人 <span class="hatena-asin-detail-label">クリック</span>: 192回</li><li><a href="http://d.hatena.ne.jp/asin/4274067211/wataro-22" target="_blank">この商品を含むブログ (69件) を見る</a></li></ul></div><div class="hatena-asin-detail-foot"></div></div>
　<br/>
　<br/>
　</p>

<h3>マクロのコードは以下のとおり．</h3>

<pre class="code lang-lisp" data-lang="lisp" data-unlink><span class="synSpecial">(</span><span class="synStatement">defmacro</span> onece-only <span class="synSpecial">((</span><span class="synType">&amp;rest</span> names<span class="synSpecial">)</span> <span class="synType">&amp;body</span> body<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>gensyms <span class="synSpecial">(</span><span class="synStatement">loop</span> for n in names collect <span class="synSpecial">(</span><span class="synStatement">gensym</span><span class="synSpecial">))))</span>
    <span class="synPreProc">`(</span><span class="synStatement">let</span> <span class="synSpecial">(</span>,@ <span class="synSpecial">(</span><span class="synStatement">loop</span> for g in gensyms collect <span class="synPreProc">`(</span>,g <span class="synSpecial">(</span><span class="synStatement">gensym</span><span class="synSpecial">)</span><span class="synPreProc">)</span><span class="synSpecial">))</span>
       <span class="synPreProc">`(</span><span class="synStatement">let</span> <span class="synSpecial">(</span>,,@ <span class="synSpecial">(</span><span class="synStatement">loop</span> for g in gensyms for n in names collect `<span class="synPreProc">`(</span>,,g ,,n<span class="synPreProc">)</span><span class="synSpecial">))</span>
          ,<span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">(</span>,@ <span class="synSpecial">(</span><span class="synStatement">loop</span> for n in names for g in gensyms collect <span class="synPreProc">`(</span>,n ,g<span class="synPreProc">)</span><span class="synSpecial">))</span>
                ,@body<span class="synSpecial">)</span><span class="synPreProc">))</span><span class="synSpecial">))</span>
</pre>


<h3>一行ずつ解読していく</h3>

<p>まずは</p>

<pre class="code lang-lisp" data-lang="lisp" data-unlink><span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>gensyms <span class="synSpecial">(</span><span class="synStatement">loop</span> for n in names collect <span class="synSpecial">(</span><span class="synStatement">gensym</span><span class="synSpecial">))))</span>
</pre>


<p>の部分から．<br/>
バッククォートがないので何がgensymsに束縛されるかをREPLで確かめる．</p>

<pre class="code lang-lisp" data-lang="lisp" data-unlink>CL-USER&gt; <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>gensyms <span class="synSpecial">(</span><span class="synStatement">loop</span> for n in <span class="synSpecial">'(</span>a b c<span class="synSpecial">)</span> collect <span class="synSpecial">(</span><span class="synStatement">gensym</span><span class="synSpecial">))))</span>
           gensyms<span class="synSpecial">)</span>
<span class="synSpecial">(</span><span class="synType">#:G884</span> <span class="synType">#:G885</span> <span class="synType">#:G886</span><span class="synSpecial">)</span>
</pre>


<p>namesの数と同じだけのユニークなシンボルを作成している．
　<br/>
　<br/>
次の行は</p>

<pre class="code lang-lisp" data-lang="lisp" data-unlink><span class="synPreProc">`(</span><span class="synStatement">let</span> <span class="synSpecial">(</span>,@ <span class="synSpecial">(</span><span class="synStatement">loop</span> for g in gensyms collect <span class="synPreProc">`(</span>,g <span class="synSpecial">(</span><span class="synStatement">gensym</span><span class="synSpecial">)</span><span class="synPreProc">)</span><span class="synSpecial">))</span>
</pre>


<p>gensymsは一行目の処理でユニークなシンボルのリストになっている．<br/>
gensymsのそれぞれの要素と(gensym)をペアにしていく．<br/>
ここまでを実行してみる．</p>

<pre class="code lang-lisp" data-lang="lisp" data-unlink>CL-USER&gt; <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>gensyms <span class="synSpecial">(</span><span class="synStatement">loop</span> for n in <span class="synSpecial">'(</span>a b c<span class="synSpecial">)</span> collect <span class="synSpecial">(</span><span class="synStatement">gensym</span><span class="synSpecial">))))</span>
           <span class="synPreProc">`(</span><span class="synStatement">let</span> <span class="synSpecial">(</span>,@ <span class="synSpecial">(</span><span class="synStatement">loop</span> for g in gensyms collect <span class="synPreProc">`(</span>,g <span class="synSpecial">(</span><span class="synStatement">gensym</span><span class="synSpecial">)</span><span class="synPreProc">)</span><span class="synSpecial">))</span><span class="synPreProc">)</span><span class="synSpecial">)</span>
<span class="synSpecial">(</span><span class="synStatement">LET</span> <span class="synSpecial">((</span><span class="synType">#:G887</span> <span class="synSpecial">(</span><span class="synStatement">GENSYM</span><span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synType">#:G888</span> <span class="synSpecial">(</span><span class="synStatement">GENSYM</span><span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synType">#:G889</span> <span class="synSpecial">(</span><span class="synStatement">GENSYM</span><span class="synSpecial">)))</span>
  <span class="synSpecial">)</span>
</pre>


<p>　<br/>
三行目．</p>

<pre class="code lang-lisp" data-lang="lisp" data-unlink><span class="synPreProc">`(</span><span class="synStatement">let</span> <span class="synSpecial">(</span>,,@ <span class="synSpecial">(</span><span class="synStatement">loop</span> for g in gensyms for n in names collect `<span class="synPreProc">`(</span>,,g ,,n<span class="synPreProc">)</span><span class="synSpecial">))</span>
</pre>


<p>とうとう`,が二重に．<br/>
１つずつ見ていく．
二行目の`(let　の式の中で `(letとなっているのでここは出力後の形が`(letとなってほしいはず．<br/>
,,@となっているのは二行目のバッククォート，三行目頭のバッククォートと二回バッククォートされているので
二度展開しなといloopが展開されない．
これでloop内は展開されるようになった．
次は``(,,g ,,n)．二重にバッククォートするのは先ほどと同じように`(foo bar) という形のリストにしたいから．<br/>
(,,g ,,n)になっているのはloopでgensymsの要素をgに，namesの要素をnに対応付けているから．<br/>
`(,gensymsの要素 ,nameの要素)という形に変換しようとしている．<br/>
　　<br/>
ここまでを展開するとこうなる</p>

<pre class="code lang-lisp" data-lang="lisp" data-unlink>CL-USER&gt; <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>names <span class="synSpecial">'(</span>a b c<span class="synSpecial">)))</span>
           <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>gensyms <span class="synSpecial">(</span><span class="synStatement">loop</span> for n in names collect <span class="synSpecial">(</span><span class="synStatement">gensym</span><span class="synSpecial">))))</span>
             <span class="synPreProc">`(</span><span class="synStatement">let</span> <span class="synSpecial">(</span>,@<span class="synSpecial">(</span><span class="synStatement">loop</span> for g in gensyms collect <span class="synPreProc">`(</span>,g <span class="synSpecial">(</span><span class="synStatement">gensym</span><span class="synSpecial">)</span><span class="synPreProc">)</span><span class="synSpecial">))</span>
                <span class="synPreProc">`(</span><span class="synStatement">let</span> <span class="synSpecial">(</span>,,@ <span class="synSpecial">(</span><span class="synStatement">loop</span> for g in gensyms for n in names collect `<span class="synPreProc">`(</span>,,g ,,n<span class="synPreProc">)</span><span class="synSpecial">))</span>
                   <span class="synPreProc">))</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">LET</span> <span class="synSpecial">((</span><span class="synType">#:G937</span> <span class="synSpecial">(</span><span class="synStatement">GENSYM</span><span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synType">#:G938</span> <span class="synSpecial">(</span><span class="synStatement">GENSYM</span><span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synType">#:G939</span> <span class="synSpecial">(</span><span class="synStatement">GENSYM</span><span class="synSpecial">)))</span>
  <span class="synPreProc">`(</span><span class="synStatement">LET</span> <span class="synSpecial">(</span>,<span class="synPreProc">`(</span>,<span class="synType">#:G937</span> ,A<span class="synPreProc">)</span> ,<span class="synPreProc">`(</span>,<span class="synType">#:G938</span> ,B<span class="synPreProc">)</span> ,<span class="synPreProc">`(</span>,<span class="synType">#:G939</span> ,C<span class="synPreProc">)</span><span class="synSpecial">)</span>
     <span class="synPreProc">)</span><span class="synSpecial">)</span>
</pre>


<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%D1%A5%A4%A5%EB">コンパイル</a>時には新たに(gensym)で作られたユニークなシンボルにnamesの値が束縛されるようになる．<br/>
　<br/>
　<br/>
最後に４行目．</p>

<pre class="code lang-lisp" data-lang="lisp" data-unlink>,<span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">(</span>,@ <span class="synSpecial">(</span><span class="synStatement">loop</span> for n in names for g in gensyms collect <span class="synPreProc">`(</span>,n ,g<span class="synPreProc">)</span><span class="synSpecial">))</span>
</pre>


<p>二行目と三行目でバッククォートされてるので,先頭のカンマは展開されず(let ...という形になる．  <br/>
,@の部分は既に先頭で一度カンマがあった後なのでそのまま展開出来る．<br/>
`(,n ,g)の部分で実際にAにAの値を束縛するという部分を作る．  <br/>
なのでここではバッククォートが一つ．<br/>
ここのgには３行目で値に束縛したユニークなシンボルが入る．<br/>
実際に展開する．<br/>
最後なのですべて展開するとこうなる.</p>

<pre class="code lang-lisp" data-lang="lisp" data-unlink>CL-USER&gt; <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>names <span class="synSpecial">'(</span>a b c<span class="synSpecial">))</span>
               <span class="synSpecial">(</span>body <span class="synSpecial">'(</span>body<span class="synSpecial">)))</span>
           <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>gensyms <span class="synSpecial">(</span><span class="synStatement">loop</span> for n in names collect <span class="synSpecial">(</span><span class="synStatement">gensym</span><span class="synSpecial">))))</span>
             <span class="synPreProc">`(</span><span class="synStatement">let</span> <span class="synSpecial">(</span>,@<span class="synSpecial">(</span><span class="synStatement">loop</span> for g in gensyms collect <span class="synPreProc">`(</span>,g <span class="synSpecial">(</span><span class="synStatement">gensym</span><span class="synSpecial">)</span><span class="synPreProc">)</span><span class="synSpecial">))</span>
                <span class="synPreProc">`(</span><span class="synStatement">let</span> <span class="synSpecial">(</span>,,@ <span class="synSpecial">(</span><span class="synStatement">loop</span> for g in gensyms for n in names collect `<span class="synPreProc">`(</span>,,g ,,n<span class="synPreProc">)</span><span class="synSpecial">))</span>
                   ,<span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">(</span>,@ <span class="synSpecial">(</span><span class="synStatement">loop</span> for n in names for g in gensyms collect <span class="synPreProc">`(</span>,n ,g<span class="synPreProc">)</span><span class="synSpecial">))</span>
                         ,@body<span class="synSpecial">)</span><span class="synPreProc">))</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">LET</span> <span class="synSpecial">((</span><span class="synType">#:G934</span> <span class="synSpecial">(</span><span class="synStatement">GENSYM</span><span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synType">#:G935</span> <span class="synSpecial">(</span><span class="synStatement">GENSYM</span><span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synType">#:G936</span> <span class="synSpecial">(</span><span class="synStatement">GENSYM</span><span class="synSpecial">)))</span>
  <span class="synPreProc">`(</span><span class="synStatement">LET</span> <span class="synSpecial">(</span>,<span class="synPreProc">`(</span>,<span class="synType">#:G934</span> ,A<span class="synPreProc">)</span> ,<span class="synPreProc">`(</span>,<span class="synType">#:G935</span> ,B<span class="synPreProc">)</span> ,<span class="synPreProc">`(</span>,<span class="synType">#:G936</span> ,C<span class="synPreProc">)</span><span class="synSpecial">)</span>
     ,<span class="synSpecial">(</span><span class="synStatement">LET</span> <span class="synSpecial">((</span>A <span class="synType">#:G934</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>B <span class="synType">#:G935</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>C <span class="synType">#:G936</span><span class="synSpecial">))</span>
        BODY<span class="synSpecial">)</span><span class="synPreProc">)</span><span class="synSpecial">)</span>
</pre>


<h3>まとめ</h3>

<p>まずnamesと同じ数だけ(gensym)でユニークなシンボルを作り，それをgensymsというリストにする．<br/>
gensymsの各要素を新たに(gensym)に束縛するlet式を作る．<br/>
この(gensym)はonce-onlyを使うマクロの展開時に新しくユニークなシンボルを作る．<br/>
gensymsの各要素を評価すると新しく作られるユニークなシンボルを返すようになる．
このユニークなシンボルにnamesの各値を束縛するようにする．<br/>
それが本体の三行目に当たる．
四行目ではnamesのシンボルにgensymsの各要素を対応付ける．<br/>
gensymsの各要素は新たに作られたユニークなシンボルに束縛され，そのユニークなシンボルはnameの値に束縛される．<br/>
以上で終わり．
　<br/>
　<br/>
高階マクロで名前の衝突を回避して，評価順序を保つのはこんなに大変なんですね．</p>

