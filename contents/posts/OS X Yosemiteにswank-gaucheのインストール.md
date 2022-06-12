---
title: "OS X Yosemiteにswank-gaucheのインストール"
published: 2016/01/13
tags:
  - emacs
  - gauche
  - scheme
---

<p>きっかけは<a class="keyword" href="http://d.hatena.ne.jp/keyword/Twitter">Twitter</a>．
<blockquote class="twitter-tweet" lang="ja"><p lang="ja" dir="ltr"><a href="https://twitter.com/wat_aro">@wat_aro</a> どの処理系使ってるかわからないですが<a class="keyword" href="http://d.hatena.ne.jp/keyword/gauche">gauche</a>のswank-<a class="keyword" href="http://d.hatena.ne.jp/keyword/gauche">gauche</a>みたいに対応されてたりしませんか？</p>&mdash; <a class="keyword" href="http://d.hatena.ne.jp/keyword/lisp">lisp</a>ドラッグ常習者 (@rayfill) <a href="https://twitter.com/rayfill/status/686955833373032449">2016, 1月 12</a></blockquote><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script></p>

<p>早速インストール．
READMEに</p>

<blockquote><ul>
<li>設定方法</li>
</ul>


<p>`dot<a class="keyword" href="http://d.hatena.ne.jp/keyword/.emacs">.emacs</a>'の内容を<a class="keyword" href="http://d.hatena.ne.jp/keyword/.emacs">.emacs</a>にコピーしてswank-<a class="keyword" href="http://d.hatena.ne.jp/keyword/gauche">gauche</a>へのパスの情報を設定します。
以下の二つの変数を設定してください。</p>

<p> swank-<a class="keyword" href="http://d.hatena.ne.jp/keyword/gauche">gauche</a>-path:
 swank-<a class="keyword" href="http://d.hatena.ne.jp/keyword/gauche">gauche</a>.scmが格納されているディレクトリへのパス</p>

<p> swank-<a class="keyword" href="http://d.hatena.ne.jp/keyword/gauche">gauche</a>-<a class="keyword" href="http://d.hatena.ne.jp/keyword/gauche">gauche</a>-source-path:
 <a class="keyword" href="http://d.hatena.ne.jp/keyword/Gauche">Gauche</a>のソースを持っていて、かつ、<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%D1%A5%A4%A5%EB">コンパイル</a>済の場合、ソースのトップディレク
 トリへのパスを設定して下さい。マニュアルに定義されているオペレータの
 引数の名前がルックアップ出来るようになります。</p></blockquote>

<p>とあるので</p>

<pre class="code lang-lisp" data-lang="lisp" data-unlink><span class="synComment">;; swank-gaucheを使うためのSLIME設定</span>
<span class="synComment">;;</span>
<span class="synComment">;;(push &quot;&lt;path-to-slime-dir&gt;&quot; load-path)</span>
<span class="synSpecial">(</span><span class="synStatement">require</span> <span class="synSpecial">'</span><span class="synIdentifier">slime</span><span class="synSpecial">)</span>
<span class="synSpecial">(</span>slime-setup
 <span class="synSpecial">'(</span>slime-fancy
   slime-scheme<span class="synSpecial">))</span>

<span class="synComment">;; swank-gauche.scmが格納されているディレクトリへのパスを設定して下さい。</span>
<span class="synSpecial">(</span><span class="synStatement">setq</span> swank-gauche-path <span class="synConstant">&quot;/usr/local/Cellar/swank-gauche-master&quot;</span><span class="synSpecial">)</span>

<span class="synComment">;; Gaucheのソースを持っていて、かつ、コンパイル済の場合、ソースのトップ</span>
<span class="synComment">;; ディレクトリへのパスを設定して下さい。Gaucheのマニュアルに記載されている</span>
<span class="synComment">;; オペレータの引数名がルックアップ出来るようになります。</span>
<span class="synSpecial">(</span><span class="synStatement">setq</span> swank-gauche-gauche-source-path <span class="synConstant">&quot;/usr/local/Cellar/gauche/Gauche&quot;</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span><span class="synStatement">push</span> swank-gauche-path load-path<span class="synSpecial">)</span>
<span class="synSpecial">(</span><span class="synStatement">require</span> <span class="synSpecial">'</span><span class="synIdentifier">swank-gauche</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span><span class="synStatement">setq</span> slime-lisp-implementations
      <span class="synSpecial">'((</span>gauche <span class="synSpecial">(</span><span class="synConstant">&quot;gosh&quot;</span><span class="synSpecial">)</span> :init gauche-init :coding-system utf-8-unix<span class="synSpecial">)))</span>

<span class="synComment">;; バッファのモジュールを決定するための設定</span>
<span class="synSpecial">(</span><span class="synStatement">setq</span> slime-find-buffer-package-function <span class="synSpecial">'</span><span class="synIdentifier">find-gauche-package</span><span class="synSpecial">)</span>
<span class="synComment">;; c-p-c補完に設定</span>
<span class="synSpecial">(</span><span class="synStatement">setq</span> slime-complete-symbol-function <span class="synSpecial">'</span><span class="synIdentifier">slime-complete-symbol*</span><span class="synSpecial">)</span>
<span class="synComment">;; web上のGaucheリファレンスマニュアルを引く設定</span>
<span class="synSpecial">(</span>define-key slime-mode-map <span class="synSpecial">(</span>kbd <span class="synConstant">&quot;C-c C-d H&quot;</span><span class="synSpecial">)</span> <span class="synSpecial">'</span><span class="synIdentifier">gauche-ref-lookup</span><span class="synSpecial">)</span>
</pre>


<p>って感じにコピペ&amp;二箇所変数設定．<br/>
slimeは既に導入しているので&lt;path-to slime-directory>は省略．  　<br/>
<a class="keyword" href="http://d.hatena.ne.jp/keyword/gauche">gauche</a>のソースはどこにおけばいいのかわからなかったので<code>/usr/local/Cellar/gauche/</code>にgit clone．<br/>
　<br/>
いざ，<code>M-x gauche</code></p>

<pre class="code" data-lang="" data-unlink>(begin (add-load-path &#34;/usr/local/Cellar/swank-gauche-master&#34;)
(require &#34;swank-gauche&#34;) (with-module swank-gauche 
(load-gauche-operator-args &#34;/usr/local/Cellar/gauche/Gauche&#34;) (start-swank &#34;/var/folders/lf/bt7rfh5s1wxgfnmwhx755vtw0000gn/T/slime.2035&#34;)))

*** SYSTEM-ERROR: couldn&#39;t open input file: 
&#34;/usr/local/Cellar/gauche/Gauche/doc/gauche-refe.texi&#34;: No such file or directory
Stack Trace:
_______________________________________
  0  (grep &#34;^@defun|^@defmac|^@defspec|^@deffn&#34; gauche-refe-path (lambd
        At line 558 of &#34;/usr/local/Cellar/swank-gauche-master/swank-gauche.scm&#34;
  1  (load-gauche-operator-args &#34;/usr/local/Cellar/gauche/Gauche&#34;)
        At line 1 of &#34;(standard input)&#34;

Process inferior-lisp exited abnormally with code 70</pre>


<p>エラーですね．<br/>
<a class="keyword" href="http://d.hatena.ne.jp/keyword/gauche">gauche</a>のソースのファイル名を見てみると，<code>Gauche/doc/gauche-ref.texi</code>となっていました．<br/>
swank-<a class="keyword" href="http://d.hatena.ne.jp/keyword/gauche">gauche</a>.scmの該当箇所を修正．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>load-gauche-operator-args gauche-source-path<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>when <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span>elisp-false? gauche-source-path<span class="synSpecial">))</span>
    <span class="synSpecial">(</span>load-operator-args <span class="synError">#`</span><span class="synConstant">&quot;,|gauche-source-path|/doc/gauche-ref.texi&quot;</span><span class="synSpecial">)))</span>
<span class="synComment">;; (load-operator-args #`&quot;,|gauche-source-path|/doc/gauche-refe.texi&quot;) &lt;=変更前</span>
</pre>


<p>これで無事に動いた．</p>

