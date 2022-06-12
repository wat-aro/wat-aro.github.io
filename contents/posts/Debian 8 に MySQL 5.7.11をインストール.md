---
title: "Debian 8 に MySQL 5.7.11をインストール"
published: 2016/03/09
---

<p><a href="http://dev.mysql.com/downloads/repo/apt/">MySQL :: Download MySQL APT Repository</a></p>

<p><span itemscope itemtype="http://schema.org/Photograph"><img src="http://cdn-ak.f.st-hatena.com/images/fotolife/w/wat-aro/20160309/20160309021040.png" alt="f:id:wat-aro:20160309021040p:plain" title="f:id:wat-aro:20160309021040p:plain" class="hatena-fotolife" itemprop="image"></span>
ここの数字を確認する．
数字が変わっていれば以下の<a class="keyword" href="http://d.hatena.ne.jp/keyword/mysql">mysql</a>-apt-config_NUMBER_all.<a class="keyword" href="http://d.hatena.ne.jp/keyword/deb">deb</a>のNUMBER部分を変更する．</p>

<pre class="code" data-lang="" data-unlink>$ mkdir ~/src
$ cd ~/src
$ wget http://dev.mysql.com/get/mysql-apt-config_0.6.0-1_all.deb</pre>


<p>　<br/>
次にこのダウンロードした<a class="keyword" href="http://d.hatena.ne.jp/keyword/deb">deb</a>パッケージをdpkgでインストールする.</p>

<pre class="code" data-lang="" data-unlink>$ sudo dpkg -i mysql-apt-config_0.6.0-1_all.deb</pre>


<p>　<br/>
<a class="keyword" href="http://d.hatena.ne.jp/keyword/mysql">mysql</a>-5.7を選択
<span itemscope itemtype="http://schema.org/Photograph"><img src="http://cdn-ak.f.st-hatena.com/images/fotolife/w/wat-aro/20160309/20160309022815.png" alt="f:id:wat-aro:20160309022815p:plain" title="f:id:wat-aro:20160309022815p:plain" class="hatena-fotolife" itemprop="image"></span>
　<br/>
<a class="keyword" href="http://d.hatena.ne.jp/keyword/mysql">mysql</a>-5.7を選択
<span itemscope itemtype="http://schema.org/Photograph"><img src="http://cdn-ak.f.st-hatena.com/images/fotolife/w/wat-aro/20160309/20160309022822.png" alt="f:id:wat-aro:20160309022822p:plain" title="f:id:wat-aro:20160309022822p:plain" class="hatena-fotolife" itemprop="image"></span>
　<br/>
applyを選択
<span itemscope itemtype="http://schema.org/Photograph"><img src="http://cdn-ak.f.st-hatena.com/images/fotolife/w/wat-aro/20160309/20160309022829.png" alt="f:id:wat-aro:20160309022829p:plain" title="f:id:wat-aro:20160309022829p:plain" class="hatena-fotolife" itemprop="image"></span>
　</p>

<pre class="code" data-lang="" data-unlink># リポジトリのアップデート
$ sudo apt-get update
# mysqlのインストール
$ sudo apt-get install mysql-server</pre>


<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/mysql">mysql</a>サーバのrootのpasswordを聞かれるので入力する．
　</p>

<h2>インストールの確認</h2>

<pre class="code" data-lang="" data-unlink>$ sudo service mysql status
$ sudo service mysql stop
$ sudo service mysql start</pre>


<p>　<br/>
問題がなければ完了．
/etc/init.d/mysqld がないけど，5.7ではないの？<br/>
よくわからず5時間くらい探しまわった．</p>

<p>ここに書いた内容は公式サイトから．</p>

<p><a href="http://dev.mysql.com/doc/mysql-apt-repo-quick-guide/en/">MySQL :: A Quick Guide to Using the MySQL APT Repository</a></p>

