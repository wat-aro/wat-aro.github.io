---
title: "SICP 問題 3.38"
published: 2015/12/03
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> balance <span class="synConstant">100</span><span class="synSpecial">)</span>

<span class="synComment">;; Peter</span>
<span class="synSpecial">(</span><span class="synStatement">set!</span> balance <span class="synSpecial">(</span><span class="synIdentifier">+</span> balance <span class="synConstant">10</span><span class="synSpecial">))</span>

<span class="synComment">;; Paul</span>
<span class="synSpecial">(</span><span class="synStatement">set!</span> balance <span class="synSpecial">(</span><span class="synIdentifier">-</span> balance <span class="synConstant">20</span><span class="synSpecial">))</span>

<span class="synComment">;; Mary</span>
<span class="synSpecial">(</span><span class="synStatement">set!</span> balance <span class="synSpecial">(</span><span class="synIdentifier">-</span> balance <span class="synSpecial">(</span><span class="synIdentifier">/</span> balance <span class="synConstant">2</span><span class="synSpecial">)))</span>

<span class="synComment">;;a ３つのプロセスがある順序で逐次的に実行された場合のbalanceの取り得る値</span>
<span class="synComment">;;35,40,45,50</span>

<span class="synComment">;;b プロセスが混ざり合った場合</span>
<span class="synComment">;; 参照した後に上書きする前に他のプロセスによって値を上書きされる事がある．</span>
<span class="synComment">;; そのために実質的に一つのプロセスしか走ってない時や二つのプロセスしか走ってない場合が起き得る</span>
<span class="synComment">;; 新たに55,80,90,110といった値を取る事がある．</span>
<span class="synComment">;; 90を取る例</span>
</pre>


<p><span itemscope itemtype="http://schema.org/Photograph"><a href="http://f.hatena.ne.jp/wat-aro/20151203214533" class="hatena-fotolife" itemprop="url"><img src="http://cdn-ak.f.st-hatena.com/images/fotolife/w/wat-aro/20151203/20151203214533.jpg" alt="f:id:wat-aro:20151203214533j:image" title="f:id:wat-aro:20151203214533j:image" class="hatena-fotolife" itemprop="image"></a></span></p>

