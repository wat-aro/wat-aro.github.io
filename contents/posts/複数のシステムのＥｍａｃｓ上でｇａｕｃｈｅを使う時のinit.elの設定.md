---
title: "複数のシステムのＥｍａｃｓ上でｇａｕｃｈｅを使う時のinit.elの設定"
published: 2015/01/19
tags:
  - emacs
  - gauche
  - ubuntu
  - mac
---

<p>現在Ｍａｃｂｏｏｋ　ＰｒｏとＵｂｕｎｔｕを使っています。<br />
<a class="keyword" href="http://d.hatena.ne.jp/keyword/emacs">emacs</a>上で<a class="keyword" href="http://d.hatena.ne.jp/keyword/gauche">gauche</a>を使おうとする時にｍａｃとｕｂｕｎｔｕで設定を統一したかったので調べました。</p>
<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span>when <span class="synSpecial">(</span>eq system-type <span class="synSpecial">'</span>system-type<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>setq ...<span class="synSpecial">))</span>
</pre><p>とすれば良いようです。<br />
system-typeですが、<a class="keyword" href="http://d.hatena.ne.jp/keyword/linux">linux</a>では<a class="keyword" href="http://d.hatena.ne.jp/keyword/gnu/linux">gnu/linux</a>,、<a class="keyword" href="http://d.hatena.ne.jp/keyword/mac">mac</a>では<a class="keyword" href="http://d.hatena.ne.jp/keyword/darwin">darwin</a>となっています。<br />
私の場合は以下のように記述しました。</p>
<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">cond</span>
 <span class="synSpecial">((</span>eq system-type <span class="synSpecial">'</span>gnu/linux<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>setq scheme-program-name <span class="synConstant">&quot;gosh -i&quot;</span><span class="synSpecial">))</span>
 <span class="synSpecial">((</span>eq system-type <span class="synSpecial">'</span>darwin<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>setq scheme-program-name <span class="synConstant">&quot;/usr/local/bin/gosh -i&quot;</span><span class="synSpecial">)))</span>
</pre><p>条件を<a class="keyword" href="http://d.hatena.ne.jp/keyword/%CA%A3%BF%F4">複数</a>指定するのでwhenではなくcondを使用しました。<br />
これでｕｂｕｎｔｕでもｍａｃでも<a class="keyword" href="http://d.hatena.ne.jp/keyword/gauche">gauche</a>が走ります。</p><br />
<br />
<p>そもそも<a class="keyword" href="http://d.hatena.ne.jp/keyword/mac">mac</a>にもパスを通してあるはずなのになぜ"gosh -i"で<a class="keyword" href="http://d.hatena.ne.jp/keyword/gauche">gauche</a>が走らないんだろう</p><p>[参考]<br />
<a href="http://d.hatena.ne.jp/kenbeese/20120212/title">emacs&#x306E;&#x8A2D;&#x5B9A;&#x30D5;&#x30A1;&#x30A4;&#x30EB;.emacs&#x3092;&#x8907;&#x6570;&#x306E;&#x74B0;&#x5883;(&#x7570;&#x306A;&#x308B;PC&#x3001;OS)&#x3067;&#x7D71;&#x4E00;&#x3059;&#x308B;&#x65B9;&#x6CD5; - Linux, Mac, Emacs&#x306B;&#x3064;&#x3044;&#x3066;&#x306E;&#x8A2D;&#x5B9A;&#x3001;&#x899A;&#x3048;&#x66F8;&#x304D;</a></p>

