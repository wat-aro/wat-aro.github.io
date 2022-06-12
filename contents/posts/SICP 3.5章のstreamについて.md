---
title: "SICP 3.5章のstreamについて"
published: 2015/12/09
tags:
  - scheme
  - SICP
---

<p>整理しなおす．<br/>
環境は<a class="keyword" href="http://d.hatena.ne.jp/keyword/Gauche">Gauche</a> 0.9.4.<br/>
streamを本文通りに実装するとうまくいかない．<br/>
遅延リストになっていない．<br/>
stream-mapの挙動からそれがわかる．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>stream-map proc <span class="synSpecial">.</span> argstreams<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>stream-null? <span class="synSpecial">(</span><span class="synIdentifier">car</span> argstreams<span class="synSpecial">))</span>
      the-empty-stream
      <span class="synSpecial">(</span>cons-stream <span class="synSpecial">(</span><span class="synIdentifier">apply</span> proc <span class="synSpecial">(</span><span class="synIdentifier">map</span> stream-car argstreams<span class="synSpecial">))</span>
                   <span class="synSpecial">(</span><span class="synIdentifier">apply</span> stream-map
                          <span class="synSpecial">(</span><span class="synIdentifier">cons</span> proc <span class="synSpecial">(</span><span class="synIdentifier">map</span> stream-cdr argstreams<span class="synSpecial">))))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>stream-enumerate-interval low high<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">&gt;</span> low high<span class="synSpecial">)</span>
      the-empty-stream
      <span class="synSpecial">(</span>cons-stream
       low
       <span class="synSpecial">(</span>stream-enumerate-interval <span class="synSpecial">(</span><span class="synIdentifier">+</span> low <span class="synConstant">1</span><span class="synSpecial">)</span> high<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>display-line x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">newline</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">display</span> x<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>show x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>display-line x<span class="synSpecial">)</span>
  x<span class="synSpecial">)</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> x <span class="synSpecial">(</span>stream-map show <span class="synSpecial">(</span>stream-enumerate-interval <span class="synConstant">0</span> <span class="synConstant">10</span><span class="synSpecial">)))</span>
</pre>


<p>ここでREPLには</p>

<pre class="code" data-lang="" data-unlink>gosh&gt; (define x (stream-map show (stream-enumerate-interval 0 10)))

0x</pre>


<p>と表示されてほしい．<br/>
stream-mapのifのelse節の一行目．  <br/>
<code>(apply proc (map stream-car angstreams))</code>となっているので(show 0)となり改行してから0を印字して<br/>
次に(define x ...)なのでxと印字することを期待したい．</p>

<p>ここで以下のようにstreamを実装したとする．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synStatement">delay</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span>           
  <span class="synSpecial">(</span>memo-proc <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">()</span> <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>cons-stream a b<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">cons</span> a <span class="synSpecial">(</span><span class="synStatement">delay</span> b<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">force</span> delayed-object<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>delayed-object<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>memo-proc proc<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>already-run? false<span class="synSpecial">)</span> <span class="synSpecial">(</span>result false<span class="synSpecial">))</span>
    <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">()</span>
      <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">not</span> already-run?<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synStatement">begin</span> <span class="synSpecial">(</span><span class="synStatement">set!</span> result <span class="synSpecial">(</span>proc<span class="synSpecial">))</span>
                 <span class="synSpecial">(</span><span class="synStatement">set!</span> already-run? true<span class="synSpecial">)</span>
                 result<span class="synSpecial">)</span>
          result<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>stream-car stream<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> stream<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>stream-cdr stream<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">force</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> stream<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>stream-null? stream<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">null?</span> stream<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> the-empty-stream <span class="synSpecial">'())</span>
</pre>


<p>ここで先ほどの</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> x <span class="synSpecial">(</span>stream-map show <span class="synSpecial">(</span>stream-enumerate-interval <span class="synConstant">0</span> <span class="synConstant">10</span><span class="synSpecial">)))</span>
</pre>


<p>を実行すると</p>

<pre class="code" data-lang="" data-unlink>gosh&gt; (define x (stream-map show (stream-enumerate-interval 0 10)))

0
1
2
3
4
5
6
7
8
9
10x</pre>


<p>となる．<br/>
リストの先頭の要素以降の評価は遅延してほしいのにすべて評価してしまっている．<br/>
ここでマクロが必要となる．<br/>
delayとstream-cdrをマクロで実装する.</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define-syntax</span> <span class="synStatement">delay</span>
  <span class="synSpecial">(</span><span class="synStatement">syntax-rules</span> <span class="synSpecial">()</span>
    <span class="synSpecial">((</span>_ <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>memo-proc <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">()</span> <span class="synIdentifier">exp</span><span class="synSpecial">)))))</span>

<span class="synSpecial">(</span><span class="synStatement">define-syntax</span> cons-stream
  <span class="synSpecial">(</span><span class="synStatement">syntax-rules</span> <span class="synSpecial">()</span>
    <span class="synSpecial">((</span>_ a b<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> a <span class="synSpecial">(</span><span class="synStatement">delay</span> b<span class="synSpecial">)))))</span>
</pre>


<p><a href="http://d.hatena.ne.jp/nrvct/20091223/1261518527">&#x30B9;&#x30C8;&#x30EA;&#x30FC;&#x30E0;&#x306E;&#x5B9F;&#x88C5;&#x3068;&#x554F;&#x984C;3.50-3.51 - nrvct&#x306E;&#x65E5;&#x8A18;</a></p>

<p>ここでふたたび</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> x <span class="synSpecial">(</span>stream-map show <span class="synSpecial">(</span>stream-enumerate-interval <span class="synConstant">0</span> <span class="synConstant">10</span><span class="synSpecial">)))</span>
</pre>


<p>を実行する．</p>

<pre class="code" data-lang="" data-unlink>gosh&gt; (define x (stream-map show (stream-enumerate-interval 0 10)))

0x</pre>


<p>期待通りに動いている．<br/>
ではなぜdefineでdelayとcons-streamを実装した場合に期待通りに動かなかったのかを考える．<br/>
<a class="keyword" href="http://d.hatena.ne.jp/keyword/scheme">scheme</a>でまはず引数を評価する．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> s <span class="synSpecial">(</span>stream-enumerate-interval <span class="synConstant">0</span> <span class="synConstant">10</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> x <span class="synSpecial">(</span>stream-map show s<span class="synSpecial">))</span>
</pre>


<p>として考えやすくする．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; ①</span>
<span class="synSpecial">(</span>stream-map show s<span class="synSpecial">)</span>

<span class="synComment">;; stream-mapの定義</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>stream-map proc <span class="synSpecial">.</span> argstreams<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>stream-null? <span class="synSpecial">(</span><span class="synIdentifier">car</span> argstreams<span class="synSpecial">))</span>
      the-empty-stream
      <span class="synSpecial">(</span>cons-stream <span class="synSpecial">(</span><span class="synIdentifier">apply</span> proc <span class="synSpecial">(</span><span class="synIdentifier">map</span> stream-car argstreams<span class="synSpecial">))</span>
                   <span class="synSpecial">(</span><span class="synIdentifier">apply</span> stream-map
                          <span class="synSpecial">(</span><span class="synIdentifier">cons</span> proc <span class="synSpecial">(</span><span class="synIdentifier">map</span> stream-cdr argstreams<span class="synSpecial">))))))</span>

<span class="synSpecial">(</span>cons-stream <span class="synSpecial">(</span><span class="synIdentifier">apply</span> show <span class="synSpecial">(</span><span class="synIdentifier">map</span> stream-car s<span class="synSpecial">))</span>
                   <span class="synSpecial">(</span><span class="synIdentifier">apply</span> stream-map
                          <span class="synSpecial">(</span><span class="synIdentifier">cons</span> show <span class="synSpecial">(</span><span class="synIdentifier">map</span> stream-cdr s<span class="synSpecial">))))</span>

<span class="synComment">;; cons-streamの定義</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>cons-stream a b<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">cons</span> a <span class="synSpecial">(</span><span class="synStatement">delay</span> b<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">apply</span> show <span class="synSpecial">(</span><span class="synIdentifier">map</span> stream-car s<span class="synSpecial">))</span>
      <span class="synSpecial">(</span><span class="synStatement">delay</span> <span class="synSpecial">(</span><span class="synIdentifier">apply</span> stream-map
                    <span class="synSpecial">(</span><span class="synIdentifier">cons</span> show <span class="synSpecial">(</span><span class="synIdentifier">map</span> stream-cdr s<span class="synSpecial">)))))</span>

<span class="synComment">;; ここでは前の引数から順に評価すると考える．</span>
<span class="synSpecial">(</span><span class="synIdentifier">apply</span> show <span class="synSpecial">(</span><span class="synIdentifier">map</span> stream-car s<span class="synSpecial">))</span>
<span class="synComment">;; -&gt; 0</span>

<span class="synSpecial">(</span><span class="synStatement">delay</span> <span class="synSpecial">(</span><span class="synIdentifier">apply</span> stream-map
              <span class="synSpecial">(</span><span class="synIdentifier">cons</span> show <span class="synSpecial">(</span><span class="synIdentifier">map</span> stream-cdr s<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synIdentifier">apply</span> stream-map
       <span class="synSpecial">(</span><span class="synIdentifier">cons</span> show <span class="synSpecial">(</span><span class="synIdentifier">map</span> stream-cdr s<span class="synSpecial">)))</span>

<span class="synSpecial">(</span>stream-map show <span class="synSpecial">(</span>stream-cdr s<span class="synSpecial">))</span>
</pre>


<p>①の式のsが(stream-cdr s)に変わっただけの式となった．<br/>
つまりここからsが<a class="keyword" href="http://d.hatena.ne.jp/keyword/nil">nil</a>になるまですべての要素が<a class="keyword" href="http://d.hatena.ne.jp/keyword/%BA%C6%B5%A2">再帰</a>的に評価されてしまう．<br/>
ほしいのは遅延リストなのでこれは困る.<br/>
手続きをsquareに変えると一見遅延リストのように見える．</p>

<pre class="code" data-lang="" data-unlink>gosh&gt; (define x (stream-map square (stream-enumerate-interval 0 10)))
x
gosh&gt; x
(0 . #&lt;closure (memo-proc memo-proc)&gt;)</pre>


<p>ただしshowで見たように内部ではリストの末尾までmapで評価され，その評価された値がdelayで包まれている．
defineだとdelayの引数とcons-streamの第二引数が先に評価されてしまうので意味がない．
評価順序を変えるためにここではマクロが必要になる．</p>

<p>今の理解はこんなところです．<br/>
突っ込みどころがあればお願いします．</p>

