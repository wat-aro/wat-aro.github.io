---
title: "SICP 問題 5.20"
published: 2016/01/31
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> x <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synConstant">1</span> <span class="synConstant">2</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> y <span class="synSpecial">(</span><span class="synIdentifier">list</span> x y<span class="synSpecial">))</span>
</pre>


<p>で作られたリスト構造の箱とポインタ表記，メモリーべ宇久田表現をかけ．<br/>
freeポインタは最初p1にあるとする．</p>

<p><span itemscope itemtype="http://schema.org/Photograph"><a href="http://f.hatena.ne.jp/wat-aro/20160131170448" class="hatena-fotolife" itemprop="url"><img src="http://cdn-ak.f.st-hatena.com/images/fotolife/w/wat-aro/20160131/20160131170448.jpg" alt="f:id:wat-aro:20160131170448j:image" title="f:id:wat-aro:20160131170448j:image" class="hatena-fotolife" itemprop="image"></a></span>
最後freeポインタはp4を指している．<br/>
p1がxを，p2がyを表している．</p>

