---
title: "Gaucheの組み込み手続きの戻し方"
published: 2015/11/29
tags:
  - gauche
---

<p>何回も忘れてその都度ググったりプログライング<a class="keyword" href="http://d.hatena.ne.jp/keyword/Gauche">Gauche</a>見るのでダメですね．
ここに書いておきます．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> func-name <span class="synSpecial">(</span>with-module gauche func-name<span class="synSpecial">))</span>
</pre>


