---
title: "ＵｂｕｎｔｕにK750 for macを導入しました。"
published: 2015/01/11
tags:
  - Ubuntu
  - キーボード
---

<p>Ｕｎｉｆｙｉｎｇとの接続はＭＢＰで。<br />
タッチ感は<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B9%A5%C8%A5%ED%A1%BC%A5%AF">ストローク</a>が浅めでＭＢＰに近い感じ。<br />
なかなか使いやすくていいです。<br />
<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%BD%A1%BC%A5%E9%A1%BC%A5%D1%A5%CD%A5%EB">ソーラーパネル</a>なので充電の心配がいらないってのが素晴らしい。<br />
以下に私がやった初期設定を書きます。</p><p>私の環境でははじめ日本語キーボードと認識されていたので<a class="keyword" href="http://d.hatena.ne.jp/keyword/%B1%D1%B8%EC%A5%AD%A1%BC%A5%DC%A1%BC%A5%C9">英語キーボード</a>と認識させるところから。</p>

<div class="section">
    <h3>ＵＳ配列キーボードと認識させる</h3>
    <pre class="code lang-sh" data-lang="sh" data-unlink>sudo dpkg-reconfigure keyboard-configuration
</pre><p>ここで使用しているキーボードのモデルを選択。<br />
次にＥｎｇｌｉｓｈ（ＵＳ）を選択。<br />
その次もEnglish(US)を選択。<br />
その後は好みでＡｌｔＧｒやコンポーズキーを選択し、Ｘサーバの強制終了にＣｔｒ + Alt + Backspaceを割り当てる。</p>

</div>
<div class="section">
    <h3>標準でファンクションキーを使う</h3>
    <p>Ｓｏｌａａｒをインストールする。</p>
<pre class="code lang-sh" data-lang="sh" data-unlink>sudo apt-add-repository <span class="synStatement">'</span><span class="synConstant">deb http://ppa.launchpad.net/daniel.pavel/solaar/ubuntu trusty main</span><span class="synStatement">'</span>
sudo apt-get update
sudo apt-get <span class="synStatement">install</span> solaar-gnome3
</pre><p>solaarを起動しK750のswap Fx functionをオフにする。</p>

</div>
<div class="section">
    <h3>キーの割当を変更</h3>
    <p>tweak toolを使う</p>

<div class="section">
    <h4>Caps lockをＣｏｎｔｒｏｌ</h4>
    <p>タイピング欄からＣｔｒｌの位置をクリックし、Caps Lock を Ctrl として使うを選択</p>

</div>
<div class="section">
    <h4>option と ｃｍｄ を交換</h4>
    <p>タイピング欄からAlt/Win キーの動作をクリックし、Alt と Win を入れ替えるを選択<br />
<br />
</p>

</div>
</div>
<div class="section">
    <h3>fcitx の変換を Cmd + Space にする</h3>
    <p>fcitx の設定を起動<br />
全体の設定から入力<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%E1%A5%BD%A5%C3%A5%C9">メソッド</a>のオンオフで Cmd + Space を押す。<br />
入力<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%E1%A5%BD%A5%C3%A5%C9">メソッド</a>でMozcを一番上にする。</p><p>システム設定からキーボード、ショートカットと選択し、ＬａｕｎｃｈｅｒのＨＵＤを表示するキーでＤｅｌｅｔｅを押し無効にする。</p><br />
<br />
<br />
<br />
<p><div class="hatena-asin-detail"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/B005L38VRU/wataro-22/"><img src="http://ecx.images-amazon.com/images/I/414UrIJf2-L._SL160_.jpg" class="hatena-asin-detail-image" alt="Logitech ワイヤレス ソーラー 英語 キーボード K750 for Mac - Silver　【並行輸入品】" title="Logitech ワイヤレス ソーラー 英語 キーボード K750 for Mac - Silver　【並行輸入品】"></a><div class="hatena-asin-detail-info"><p class="hatena-asin-detail-title"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/B005L38VRU/wataro-22/">Logitech ワイヤレス ソーラー 英語 キーボード K750 for Mac - Silver　【並行輸入品】</a></p><ul><li><span class="hatena-asin-detail-label">メディア:</span> Personal Computers</li><li><a href="http://d.hatena.ne.jp/asin/B005L38VRU/wataro-22" target="_blank">この商品を含むブログを見る</a></li></ul></div><div class="hatena-asin-detail-foot"></div></div></p>

</div>
