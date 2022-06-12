---
title: "OSX クリーンインストール前の準備"
published: 2016/03/14
tags:
  - mac
---

<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/yosemite">yosemite</a>からEl Capitanへアップデートする前の準備．</p>

<h2>dotfilesの準備</h2>

<p>.bashrcや<a class="keyword" href="http://d.hatena.ne.jp/keyword/.emacs">.emacs</a>.dなどインストール後に必要になりそうなものをここに入れてしまいます．<br/>
他にも次の環境に必要なものはここに入れてしまいます．<br/>
そして<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B7%A5%F3%A5%DC%A5%EA%A5%C3%A5%AF%A5%EA%A5%F3%A5%AF">シンボリックリンク</a>を貼る<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B9%A5%AF%A5%EA%A5%D7%A5%C8">スクリプト</a>をつけておきます．</p>

<p><a href="http://qiita.com/b4b4r07/items/b70178e021bef12cd4a2">&#x6700;&#x5F37;&#x306E; dotfiles &#x99C6;&#x52D5;&#x958B;&#x767A;&#x3068; GitHub &#x3067;&#x7BA1;&#x7406;&#x3059;&#x308B;&#x904B;&#x7528;&#x65B9;&#x6CD5; - Qiita</a></p>

<p>ここの<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B9%A5%AF%A5%EA%A5%D7%A5%C8">スクリプト</a>を少し変更して</p>

<pre class="code lang-sh" data-lang="sh" data-unlink><span class="synComment">#!/bin/bash</span>
<span class="synStatement">for </span>f <span class="synStatement">in</span> .??*
<span class="synStatement">do</span>
    <span class="synIdentifier">filepath</span>=<span class="synStatement">&quot;</span><span class="synPreProc">${PWD}</span><span class="synConstant">/</span><span class="synPreProc">${f}</span><span class="synStatement">&quot;</span>
    <span class="synIdentifier">homefile</span>=<span class="synStatement">&quot;</span><span class="synPreProc">${HOME}</span><span class="synConstant">/</span><span class="synPreProc">${f}</span><span class="synStatement">&quot;</span>
    
    <span class="synSpecial">[[</span> <span class="synStatement">&quot;</span><span class="synPreProc">$f</span><span class="synStatement">&quot;</span> <span class="synStatement">==</span> <span class="synConstant">&quot;.git&quot;</span> <span class="synSpecial">]]</span> <span class="synStatement">&amp;&amp;</span> <span class="synStatement">continue</span>
    <span class="synSpecial">[[</span> <span class="synStatement">&quot;</span><span class="synPreProc">$f</span><span class="synStatement">&quot;</span> <span class="synStatement">==</span> <span class="synConstant">&quot;.DS_Store&quot;</span> <span class="synSpecial">]]</span> <span class="synStatement">&amp;&amp;</span> <span class="synStatement">continue</span>
    
    ln <span class="synSpecial">-snf</span> <span class="synPreProc">$filepath</span> <span class="synPreProc">$homefile</span>
<span class="synStatement">done</span>
</pre>


<p>これを実行すればホームディレクトリに<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B7%A5%F3%A5%DC%A5%EA%A5%C3%A5%AF%A5%EA%A5%F3%A5%AF">シンボリックリンク</a>が張られます．</p>

<h2>Homebrewでインストールしたもののリスト，tap先を保存する  </h2>

<p>Homebrewで何を入れたかなんて覚えていられませんね．<br/>
tapで何を追加したのかも覚えていられません．<br/>
なのでファイルに書き出しておきます．<br/>
ここから抜き出して一気にインストールなんてことが出来るかは知りません．<br/>
<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%AF%A5%EA%A1%BC%A5%F3%A5%A4%A5%F3%A5%B9%A5%C8%A1%BC%A5%EB">クリーンインストール</a>後に調べます．</p>

<pre class="code lang-sh" data-lang="sh" data-unlink>$ brew tap <span class="synStatement">&gt;</span> ~/dotfiles/brewtaplist
$ brew list <span class="synStatement">&gt;</span> ~/dotfiles/brewlist
</pre>


<p>これで全て書きだされます．  <br/>
さっきの<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B9%A5%AF%A5%EA%A5%D7%A5%C8">スクリプト</a>は<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%C9%A5%C3%A5%C8%A5%D5%A5%A1%A5%A4%A5%EB">ドットファイル</a>以外の<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B7%A5%F3%A5%DC%A5%EA%A5%C3%A5%AF%A5%EA%A5%F3%A5%AF">シンボリックリンク</a>は作らないのでこれらのリンクは作られません．</p>

<h2>iTerm2の設定のエクスポート  </h2>

<p>iTerm2の設定も覚えていられませんね．  <br/>
未来を見てきたらこういうのです．(timemachineで戻ってきました)  <br/>
なので設定ファイルをエクスポートしておきます．</p>

<p><a href="http://qiita.com/reoring/items/a0f3d6186efd11c87f1b">iTerm2&#x306E;&#x8A2D;&#x5B9A;&#x3092;&#x30A4;&#x30F3;&#x30DD;&#x30FC;&#x30C8;&#x30FB;&#x30A8;&#x30AF;&#x30B9;&#x30DD;&#x30FC;&#x30C8;&#x3059;&#x308B;&#x65B9;&#x6CD5; - Qiita</a></p>

<p>ここを見てきてください．<br/>
Preferences > General > Prefeences のLoad preferences ... の<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%C1%A5%A7%A5%C3%A5%AF%A5%DC%A5%C3%A5%AF%A5%B9">チェックボックス</a>をクリックしてホームディレクトリのdotfilesにします．    <br/>
ディレクトリを確認して <code>com.googlecode.iterm2.plist</code> があればOK．  <br/>
なければもう一度保存先のディレクトリ名があってるか確認してください．</p>

<h2>Karabinerの設定のエクスポート  </h2>

<p>Karabinerの設定も覚えていられませんね．  <br/>
快適な環境を維持するためにこれもエクスポートして次の環境に持って行きましょう．</p>

<p><a href="http://qiita.com/icb54615/items/9c7a5366e23496bfacd5">Karabiner&#x306E;&#x8A2D;&#x5B9A;&#x79FB;&#x884C; - Qiita</a></p>

<pre class="code lang-sh" data-lang="sh" data-unlink>$ /Applications/Karabiner.app/Contents/Library/bin/karabiner <span class="synStatement">export</span><span class="synIdentifier"> </span><span class="synStatement">&gt;</span><span class="synIdentifier"> ~/dotfiles/karabiner.sh</span>
</pre>


<p>これで大丈夫です．</p>

<h2>最後に</h2>

<p>以上の作業で作ったdotfilesを<a class="keyword" href="http://d.hatena.ne.jp/keyword/github">github</a>に上げるなり，<a class="keyword" href="http://d.hatena.ne.jp/keyword/dropbox">dropbox</a>に上げるなり，外付けHDDに入れるなりして次の環境に送りましょう．  <br/>
準備完了です．</p>

