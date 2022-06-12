---
title: "OCamlの無名関数は再帰を定義できない？"
published: 2016/02/15
tags:
  - プログラミングの基礎
  - OCaml
---

<p>わたろーです．<br/>
今<a href="http://d.hatena.ne.jp/asin/4781911609/wataro-22">プログラミングの基礎 (Computer Science Library)</a>を読んでいます．<br/>
これは<a class="keyword" href="http://d.hatena.ne.jp/keyword/OCaml">OCaml</a>とデザインレシピでプログラミングの基礎を学ぶという内容なのですが，<br/>
名前のない関数という節で気になる文章がありました．<br/>
14.4 名前のない関数 p145</p>

<blockquote><p>名前のない関数で定義できるのは<a class="keyword" href="http://d.hatena.ne.jp/keyword/%BA%C6%B5%A2">再帰</a>をしていない関数だけです．</p></blockquote>

<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/OCaml">OCaml</a>は<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%E9%A5%E0%A5%C0%B7%D7%BB%BB">ラムダ計算</a>を元にしていると思っていたので驚きました．<br/>
Y<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%D3%A5%CD%A1%BC%A5%BF">コンビネータ</a>使って<a class="keyword" href="http://d.hatena.ne.jp/keyword/%BA%C6%B5%A2">再帰</a>出来ないのって思ったので試してみました．<br/>
Y<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%D3%A5%CD%A1%BC%A5%BF">コンビネータ</a>は<a href="http://d.hatena.ne.jp/asin/4798135984/wataro-22">計算機プログラムの構造と解釈 第2版</a>p233 問題4.21に載っていたものを使います．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;;; SICP</span>
<span class="synComment">;;; 階乗計算</span>
<span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>n<span class="synSpecial">)</span>
  <span class="synSpecial">((</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>fact<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>fact fact n<span class="synSpecial">))</span>
   <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>ft k<span class="synSpecial">)</span>
     <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> k <span class="synConstant">1</span><span class="synSpecial">)</span>
         <span class="synConstant">1</span>
         <span class="synSpecial">(</span><span class="synIdentifier">*</span> k <span class="synSpecial">(</span>ft ft <span class="synSpecial">(</span><span class="synIdentifier">-</span> k <span class="synConstant">1</span><span class="synSpecial">)))))))</span>
</pre>


<p>実行すると</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">((</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>n<span class="synSpecial">)</span>
         <span class="synSpecial">((</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>fact<span class="synSpecial">)</span>
            <span class="synSpecial">(</span>fact fact n<span class="synSpecial">))</span>
          <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>ft k<span class="synSpecial">)</span>
            <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> k <span class="synConstant">1</span><span class="synSpecial">)</span>
                <span class="synConstant">1</span>
                <span class="synSpecial">(</span><span class="synIdentifier">*</span> k <span class="synSpecial">(</span>ft ft <span class="synSpecial">(</span><span class="synIdentifier">-</span> k <span class="synConstant">1</span><span class="synSpecial">)))))))</span>
       <span class="synConstant">5</span><span class="synSpecial">)</span>
<span class="synConstant">120</span>
</pre>


<p>　<br/>
これを<a class="keyword" href="http://d.hatena.ne.jp/keyword/OCaml">OCaml</a>で書いてみます．</p>

<pre class="code lang-ocaml" data-lang="ocaml" data-unlink><span class="synPreProc">#</span> <span class="synStatement">(fun</span> n<span class="synStatement">-&gt;</span>
  <span class="synStatement">(fun</span> fact <span class="synStatement">-&gt;</span>
    fact fact n<span class="synStatement">)</span>
    <span class="synStatement">(fun</span> ft k <span class="synStatement">-&gt;</span>
      <span class="synStatement">if</span> k <span class="synStatement">=</span> <span class="synConstant">1</span>
      <span class="synStatement">then</span> <span class="synConstant">1</span>
      <span class="synStatement">else</span> k <span class="synStatement">*</span> <span class="synStatement">(</span>ft ft <span class="synStatement">(</span>k - <span class="synConstant">1</span><span class="synStatement">))))</span> <span class="synConstant">5</span><span class="synStatement">;;</span>
            <span class="synConstant">Characters</span> <span class="synConstant">33</span>-<span class="synConstant">37</span>:
      fact fact n<span class="synError">)</span>
           <span class="synStatement">^^^^</span>
<span class="synConstant">Error</span>: <span class="synConstant">This</span> expression has <span class="synStatement">type</span> 'a <span class="synStatement">-&gt;</span> 'b <span class="synStatement">-&gt;</span> 'c
       but an expression was expected <span class="synStatement">of</span> <span class="synStatement">type</span> 'a
       <span class="synConstant">The</span> <span class="synStatement">type</span> variable 'a occurs inside 'a <span class="synStatement">-&gt;</span> 'b <span class="synStatement">-&gt;</span> 'c
</pre>


<p>エラーですね．<br/>
型が解決されていないのでしょうか．<br/>
ググッてみると -rectypesを使って<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%A4%A5%F3%A5%BF%A5%D7%A5%EA%A5%BF">インタプリタ</a>を起動すれば出来るようです．</p>

<p><a href="http://d.hatena.ne.jp/sumii/20051203/1133575324">&#x4E0D;&#x52D5;&#x70B9;&#x6F14;&#x7B97;&#x5B50;&#x3075;&#x305F;&#x305F;&#x3073; - sumii&#x306E;&#x65E5;&#x8A18;</a></p>

<pre class="code lang-ocaml" data-lang="ocaml" data-unlink><span class="synPreProc">#</span> <span class="synStatement">(fun</span> n<span class="synStatement">-&gt;</span>
    <span class="synStatement">(fun</span> fact <span class="synStatement">-&gt;</span>
      fact fact n<span class="synStatement">)</span>
      <span class="synStatement">(fun</span> ft k <span class="synStatement">-&gt;</span>
        <span class="synStatement">if</span> k <span class="synStatement">=</span> <span class="synConstant">1</span>
        <span class="synStatement">then</span> <span class="synConstant">1</span>
        <span class="synStatement">else</span> k <span class="synStatement">*</span> <span class="synStatement">(</span>ft ft <span class="synStatement">(</span>k - <span class="synConstant">1</span><span class="synStatement">))))</span> <span class="synConstant">5</span><span class="synStatement">;;</span>

            - : <span class="synType">int</span> <span class="synStatement">=</span> <span class="synConstant">120</span>
</pre>


<p>おお，動いた．<br/>
<a class="keyword" href="http://d.hatena.ne.jp/keyword/%BA%C6%B5%A2">再帰</a>型っていうのが必要になるわけなんですね．<br/>
まだまだわからないことだらけですが，型もおもしろそうです．<br/>
この辺探すのに行き着いたこのページのTaPLのまとめがすごくおもしろそうです．</p>

<p><iframe src="http://mint.hateblo.jp/embed/2014/12/24/211543" title="おいお前ら、TAPL読むぞ！ - ミントフレーバー緑茶" class="embed-card embed-blogcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 190px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="http://mint.hateblo.jp/entry/2014/12/24/211543">mint.hateblo.jp</a></cite></p>

<p>おもしろそう．読みたい．すごく読みたい．
でもまだ自分には厳しそう．</p>

<p>その前に<a href="http://d.hatena.ne.jp/asin/4781912850/wataro-22">プログラミング言語の基礎概念 (ライブラリ情報学コア・テキスト)</a>を読みたい．<br/>
しかしその時間を作れるか．<br/>
そろそろお仕事探しのために動かないといけないかもって思ってきています．<br/>
勉強だけしていたい．</p>

