---
title: "SICP 問題 5.50"
published: 2016/02/12
tags:
  - scheme
  - SICP
---

<p>4.1節の超循環評価器を5.5で作った翻訳系で<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%D1%A5%A4%A5%EB">コンパイル</a>する．<br/>
　</p>

<p><a href="http://www.serendip.ws/archives/4020">&#x554F;&#x984C;5.50 &ndash; SICP&#xFF08;&#x8A08;&#x7B97;&#x6A5F;&#x30D7;&#x30ED;&#x30B0;&#x30E9;&#x30E0;&#x306E;&#x69CB;&#x9020;&#x3068;&#x89E3;&#x91C8;&#xFF09;&#x305D;&#x306E;302 : Serendip - Web&#x30C7;&#x30B6;&#x30A4;&#x30F3;&#x30FB;&#x30D7;&#x30ED;&#x30B0;&#x30E9;&#x30DF;&#x30F3;&#x30B0;</a></p>

<p><a href="http://himoiku.cocolog-nifty.com/blog/2008/07/sicp550_f385.html">http://himoiku.cocolog-nifty.com/blog/2008/07/sicp550_f385.html</a></p>

<p>ここを参考にしました．<br/>
まずここに書いてるmapが<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%D0%A5%B0%A4%EB">バグる</a>っていうのがわからないところからスタート．<br/>
エラーメッセージを見ても原因がmapだとは気づかず，<br/>
この２つのブログを参考にしながら修正するも，翻訳系がダメなのか<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%A4%A5%F3%A5%BF%A5%D7%A5%EA%A5%BF">インタプリタ</a>がダメなのかもなかなかわからず．<br/>
　<br/>
三日間いろいろなバグに出会いながら最後まで残ったのが２つ．<br/>
一つ目はどこかで環境の保護がされていないために，<a class="keyword" href="http://d.hatena.ne.jp/keyword/%BA%C6%B5%A2">再帰</a>のベースケースから戻ってきても環境が回復されずその後の計算がおかしくなるバグ．<br/>
二つ目はレキシカルアドレッシングで翻訳時環境から得たアドレスが狂うバグ．<br/>
一つ目は最終的にソースをenvで検索してpreservingまたはmake-instruction-sequenceでenvが足らないところがないか探しました．<br/>
レキシカルアドレッシングの実装時に，作ったcompile-variablesとcompile-assignmentのmake-instruction-sequenceのneededにenvが入っていないためでした．
二つ目の原因は内部定義でした．<br/>
翻訳時環境が拡張されるのはcompile-lambda-bodyだけなので，内部定義でフレームが拡張されず，<br/>
find-variableが指すアドレスがこのシンボルがない時の環境でのアドレスなので実行時環境では違うものを指してしまいバグっていました．<br/>
これの解決策として，scan-out-definesでmake-letを使い内部定義を全てletに吐き出し，<br/>
それをlet->combinationでlambdaに変換することで解決しました．<br/>
根本的な解決ではないですが，とりあえず，<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%D1%A5%A4%A5%EB">コンパイル</a>については問題なく動きます．<br/>
　<br/>
以下はテスト．
翻訳系のREPLのEC-COMPからdriver-loopを呼び出し，<br/>
翻訳系で<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%D1%A5%A4%A5%EB">コンパイル</a>した<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%A4%A5%F3%A5%BF%A5%D7%A5%EA%A5%BF">インタプリタ</a>のREPL，MC-Evalに入っています．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;;;EC-COMP input:</span>
<span class="synSpecial">(</span>driver-loop<span class="synSpecial">)</span>


<span class="synComment">;;; MC-Eval input:</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">map</span> proc lst<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> lst<span class="synSpecial">)</span>
      <span class="synSpecial">'()</span>
      <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>proc <span class="synSpecial">(</span><span class="synIdentifier">car</span> lst<span class="synSpecial">))</span>
            <span class="synSpecial">(</span><span class="synIdentifier">map</span> proc <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lst<span class="synSpecial">)))))</span>

<span class="synComment">;;; MC-Eval value:</span>
ok

<span class="synComment">;;; MC-Eval input:</span>
<span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synIdentifier">car</span> <span class="synSpecial">'((</span><span class="synConstant">1</span> <span class="synConstant">2</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synConstant">3</span> <span class="synConstant">4</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synConstant">5</span> <span class="synConstant">6</span><span class="synSpecial">)))</span>

<span class="synComment">;;; MC-Eval value:</span>
<span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synConstant">3</span> <span class="synConstant">5</span><span class="synSpecial">)</span>

<span class="synComment">;;; MC-Eval input:</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>fact n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> iter <span class="synSpecial">((</span>count <span class="synConstant">1</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>product <span class="synConstant">1</span><span class="synSpecial">))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">&lt;</span> n count<span class="synSpecial">)</span>
        product
        <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synConstant">1</span> count<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> count product<span class="synSpecial">)))))</span>

<span class="synComment">;;; MC-Eval value:</span>
ok

<span class="synComment">;;; MC-Eval input:</span>
<span class="synSpecial">(</span>fact <span class="synConstant">5</span><span class="synSpecial">)</span>

<span class="synComment">;;; MC-Eval value:</span>
<span class="synConstant">120</span>

<span class="synComment">;;; MC-Eval input:</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>factorial n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">&lt;</span> n <span class="synConstant">2</span><span class="synSpecial">)</span>
      n
      <span class="synSpecial">(</span><span class="synIdentifier">*</span> <span class="synSpecial">(</span>factorial <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">1</span><span class="synSpecial">))</span>
         n<span class="synSpecial">)))</span>

<span class="synComment">;;; MC-Eval value:</span>
ok

<span class="synComment">;;; MC-Eval input:</span>
<span class="synSpecial">(</span>factorial <span class="synConstant">5</span><span class="synSpecial">)</span>

<span class="synComment">;;; MC-Eval value:</span>
<span class="synConstant">120</span>

<span class="synComment">;;; MC-Eval input:</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>fact n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>iter count product<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">&lt;</span> n count<span class="synSpecial">)</span>
        product
        <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synConstant">1</span> count<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> count product<span class="synSpecial">))))</span>
  <span class="synSpecial">(</span>iter <span class="synConstant">1</span> <span class="synConstant">1</span><span class="synSpecial">))</span>

<span class="synComment">;;; MC-Eval value:</span>
ok

<span class="synComment">;;; MC-Eval input:</span>
<span class="synSpecial">(</span>fact <span class="synConstant">5</span><span class="synSpecial">)</span>

<span class="synComment">;;; MC-Eval value:</span>
<span class="synConstant">120</span>
</pre>


