---
title: "OSXにGaucheのHEADをインストール"
published: 2016/08/07
tags:
  - gauche
  - scheme
---

<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/Gauche">Gauche</a>のHEADをインストールするにはリリースされた最新の<a class="keyword" href="http://d.hatena.ne.jp/keyword/Gauche">Gauche</a>が必要です． <br/>
ここにはまりました． <br/>
なぜか最新版の0.9.4でもビルドできなかったので<a class="keyword" href="http://d.hatena.ne.jp/keyword/brew">brew</a>でインストールしてから後で消しています．<br/>
<code>make install</code> の後に<code>brew uninstall gauche</code>をすると必要なusr/local/share以下のファイルなどが消されてしまうので
必ず<code>make install</code> の前に<code>brew uninstall gauche</code>しましょう．</p>

<pre class="code" data-lang="" data-unlink>$ brew install gauche
$ git clone git@github.com:shirok/Gauche.git
$ cd Gauche
$ ./DIST gen
$ ./configure --enable-threads=pthreads
$ make</pre>


<p>ここで</p>

<pre class="code" data-lang="" data-unlink>warning: unrecognized encoding name `utf-8’</pre>


<p>と表示されますが無視．</p>

<pre class="code" data-lang="" data-unlink>$ make check
$ brew uninstall gauche
$ make install</pre>


<p>これでインストールできました．</p>

<pre class="code" data-lang="" data-unlink>$ gosh -V
Gauche scheme shell, version 0.9.5_pre2 [utf-8,pthreads], x86_64-apple-darwin15.6.0
$ gosh
gosh&gt; (+ 1 1)
2</pre>


<p>無事動いていますね．これで完了です．</p>

<p>今後HEADをビルドするにはダウンロードした<a class="keyword" href="http://d.hatena.ne.jp/keyword/Gauche">Gauche</a><a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%C7%A5%A3%A5%EC%A5%AF%A5%C8">ディレクト</a>リで</p>

<pre class="code" data-lang="" data-unlink>$ git pull
$ gauche-config --reconfigure | sh &amp;&amp; make &amp;&amp; make check &amp;&amp; make install</pre>


<p>するだけで済みます．</p>

