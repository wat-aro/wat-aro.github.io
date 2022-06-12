---
title: "プログラミング初心者がSICP(計算機プログラムの構造と解釈)を読んでみた"
published: 2016/02/13
tags:
  - scheme
  - SICP
---

<h1>読む前の状態と動機</h1>

<ul>
<li>読み始めた時点でプログラミング歴約１年</li>
<li><a href="http://www.shido.info/lisp/idx_scm.html">もうひとつのscheme入門</a>でプログラミングに入門するも，<a class="keyword" href="http://d.hatena.ne.jp/keyword/%B9%E2%B3%AC%B4%D8%BF%F4">高階関数</a>で挫折．</li>
<li><a class="keyword" href="http://d.hatena.ne.jp/keyword/Ruby">Ruby</a>本二冊，<a class="keyword" href="http://d.hatena.ne.jp/keyword/Rails">Rails</a> Tutorialを二周．</li>
<li>他読み始めたけど途中で飽きた本が何冊か．</li>
<li>仕事（非IT)が忙しく，プログラミング始めて一年でこれくらいしか出来なかった．</li>
<li>基本的なところがしっくりこない．</li>
<li>でもコード書くのは楽しいし，出来ればそれを仕事にしたいので基礎を身に着けたい．</li>
<li>無職になって時間もあるから基礎を身につけるために<a class="keyword" href="http://d.hatena.ne.jp/keyword/SICP">SICP</a>を読もう．<br/>
　</li>
</ul>





<p>
　</p>

<h1>読むための準備</h1>

<ul>
<li><a class="keyword" href="http://d.hatena.ne.jp/keyword/Scheme">Scheme</a>手習いとプログラミング<a class="keyword" href="http://d.hatena.ne.jp/keyword/Gauche">Gauche</a>を読んでから<a class="keyword" href="http://d.hatena.ne.jp/keyword/SICP">SICP</a>にとりかかった．</li>
<li>メインで読んだのは2版の和田訳．読んでわからない時は原著や1版の元吉訳に当たる．</li>
<li>後半になると<a href="https://github.com/hiroshi-manabe/sicp-pdf">真鍋訳</a>が登場したためこちらにも助けられた．<br/>
　<br/>
　

<h1><a class="keyword" href="http://d.hatena.ne.jp/keyword/SICP">SICP</a>を読む過程で得たもの</h1></li>
<li>括弧が気にならなくなった</li>
<li>S式のほうが読みやすいのになんで<a class="keyword" href="http://d.hatena.ne.jp/keyword/%C3%E6%C3%D6%B5%AD%CB%A1">中置記法</a>のほうがメジャーなの？</li>
<li><a class="keyword" href="http://d.hatena.ne.jp/keyword/%BA%C6%B5%A2">再帰</a>的プロセスと反復的プロセス</li>
<li>第一級手続き</li>
<li>抽象の壁</li>
<li>メッセージパッシング</li>
<li>型によるディスパッチと強制型変換</li>
<li>イベントドリヴン</li>
<li>制約の拡散</li>
<li>破壊的代入が怖くなった</li>
<li>ストリーム</li>
<li>遅延評価</li>
<li>超循環評価器の実装を通して評価戦略を理解した．</li>
<li><a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%EC%A5%B8%A5%B9%A5%BF">レジスタ</a>マシンのシミュレータによって低レベルで何が行われているのか理解した．</li>
<li><a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%D1%A5%A4%A5%E9">コンパイラ</a>と<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%A4%A5%F3%A5%BF%A5%D7%A5%EA%A5%BF">インタプリタ</a>の効率の違い<br/>
　

<h1>感想</h1>

<p>４ヶ月半近くかかった．<br/>
<a class="keyword" href="http://d.hatena.ne.jp/keyword/SICP">SICP</a>は基礎と聞いていたけど，やっぱり基礎でした．<br/>
今の段階で読んでおいてよかった．<br/>
問題全部解くつもりはなかったけど，だんだんと自力で解きたくなってきたため結局ほとんど自力で解いていた．<br/>
解けないと悔しい．<br/>
問題やってみて思うのは，時間がめちゃくちゃかかるけど解かないと理解できなかった．<br/>
特に４章からは本文のコードを動かすにも<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%C7%A5%D0%A5%C3%A5%B0">デバッグ</a>が大変で，問題解くにも<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%C7%A5%D0%A5%C3%A5%B0">デバッグ</a>が大変．<br/>
でもその<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%C7%A5%D0%A5%C3%A5%B0">デバッグ</a>を通して何度もコードや本文を読むことでそこで何をしているのか理解していけた．<br/>
最後はソースがコメントだらけになった．<br/>
<a class="keyword" href="http://d.hatena.ne.jp/keyword/C%B8%C0%B8%EC">C言語</a>でやる問題が２問残っているのでCを勉強してから解きたい．<br/>
プログラミング楽しい！に<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%D7%A5%ED%A5%B0%A5%E9%A5%DF%A5%F3%A5%B0%B8%C0%B8%EC">プログラミング言語</a>おもしろい！も追加された．<br/>
プログラミング初心者からプログラミング初級者へレベルアップできた・・・はず．<br/>
　<br/>
これから読む人には<a class="keyword" href="http://d.hatena.ne.jp/keyword/Scheme">Scheme</a>手習いを読んでおくことを勧めたい．<br/>
読みにくいし後半急激に難しくなるけど，そこで継続を渡すことを覚えておくと楽になる．<br/>
<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%C7%A5%D0%A5%C3%A5%B0">デバッグ</a>方法も覚えておかないと４章から辛いので<br/>
<a class="keyword" href="http://d.hatena.ne.jp/keyword/Gauche">Gauche</a>使うならプログラミング<a class="keyword" href="http://d.hatena.ne.jp/keyword/Gauche">Gauche</a>にも一通り目を通しておいたほうがいい．<br/>
　<br/>
かなり苦しんだけど，それでも楽しい・おもしろいのほうが勝ってる．<br/>
まだ半年は生きていけそうなのでまだまだ勉強してコード書く仕事につけるように頑張ります．<br/>
とりあえず<a href="http://d.hatena.ne.jp/asin/4781911609/wataro-22">プログラミングの基礎 (Computer Science Library)</a>でMLとデザインレシピに触れてからK&amp;Rを読もうと思ってます．</p></li>
</ul>


<p><div class="hatena-asin-detail"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/4798135984/wataro-22/"><img src="http://ecx.images-amazon.com/images/I/511qf4jdYjL._SL160_.jpg" class="hatena-asin-detail-image" alt="計算機プログラムの構造と解釈 第2版" title="計算機プログラムの構造と解釈 第2版"></a><div class="hatena-asin-detail-info"><p class="hatena-asin-detail-title"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/4798135984/wataro-22/">計算機プログラムの構造と解釈 第2版</a></p><ul><li><span class="hatena-asin-detail-label">作者:</span> ハロルド<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%A8%A5%A4%A5%D6%A5%EB">エイブル</a>ソン,ジュリーサスマン,<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B8%A5%A7%A5%E9%A5%EB%A5%C9%A1%A6%A5%B8%A5%A7%A5%A4%A5%B5%A5%B9%A5%DE%A5%F3">ジェラルド・ジェイサスマン</a>,Harold Abelson,Julie Sussman,Gerald Jay Sussman,和田英一</li><li><span class="hatena-asin-detail-label">出版社/メーカー:</span> <a class="keyword" href="http://d.hatena.ne.jp/keyword/%E6%C6%B1%CB%BC%D2">翔泳社</a></li><li><span class="hatena-asin-detail-label">発売日:</span> 2014/05/17</li><li><span class="hatena-asin-detail-label">メディア:</span> 大型本</li><li><a href="http://d.hatena.ne.jp/asin/4798135984/wataro-22" target="_blank">この商品を含むブログ (2件) を見る</a></li></ul></div><div class="hatena-asin-detail-foot"></div></div></p>

<p><div class="hatena-asin-detail"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/4274068269/wataro-22/"><img src="http://ecx.images-amazon.com/images/I/41OG665OkZL._SL160_.jpg" class="hatena-asin-detail-image" alt="Scheme手習い" title="Scheme手習い"></a><div class="hatena-asin-detail-info"><p class="hatena-asin-detail-title"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/4274068269/wataro-22/">Scheme手習い</a></p><ul><li><span class="hatena-asin-detail-label">作者:</span> Daniel P. Friedman,Matthias Felleisen,元吉文男,横山晶一</li><li><span class="hatena-asin-detail-label">出版社/メーカー:</span> <a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%AA%A1%BC%A5%E0%BC%D2">オーム社</a></li><li><span class="hatena-asin-detail-label">発売日:</span> 2010/10/22</li><li><span class="hatena-asin-detail-label">メディア:</span> 単行本（ソフトカバー）</li><li><span class="hatena-asin-detail-label">購入</span>: 5人 <span class="hatena-asin-detail-label">クリック</span>: 129回</li><li><a href="http://d.hatena.ne.jp/asin/4274068269/wataro-22" target="_blank">この商品を含むブログ (33件) を見る</a></li></ul></div><div class="hatena-asin-detail-foot"></div></div></p>

<p><div class="hatena-asin-detail"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/4873113482/wataro-22/"><img src="http://ecx.images-amazon.com/images/I/51Exg14b4uL._SL160_.jpg" class="hatena-asin-detail-image" alt="プログラミングGauche" title="プログラミングGauche"></a><div class="hatena-asin-detail-info"><p class="hatena-asin-detail-title"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/4873113482/wataro-22/">プログラミングGauche</a></p><ul><li><span class="hatena-asin-detail-label">作者:</span> <a class="keyword" href="http://d.hatena.ne.jp/keyword/Kahua">Kahua</a>プロジェクト,<a class="keyword" href="http://d.hatena.ne.jp/keyword/%C0%EE%B9%E7%BB%CB%CF%AF">川合史朗</a></li><li><span class="hatena-asin-detail-label">出版社/メーカー:</span> <a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%AA%A5%E9%A5%A4%A5%EA%A1%BC%A5%B8%A5%E3%A5%D1%A5%F3">オライリージャパン</a></li><li><span class="hatena-asin-detail-label">発売日:</span> 2008/03/14</li><li><span class="hatena-asin-detail-label">メディア:</span> 大型本</li><li><span class="hatena-asin-detail-label">購入</span>: 22人 <span class="hatena-asin-detail-label">クリック</span>: 713回</li><li><a href="http://d.hatena.ne.jp/asin/4873113482/wataro-22" target="_blank">この商品を含むブログ (272件) を見る</a></li></ul></div><div class="hatena-asin-detail-foot"></div></div></p>

