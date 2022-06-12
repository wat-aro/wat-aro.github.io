---
title: "SICP 問題 5.03"
published: 2016/01/22
tags:
  - scheme
  - SICP
---

<p>１章でやったNewton法で求めるsqrt手続き．<br/>
これをデータパス図で描き，<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%EC%A5%B8%A5%B9%A5%BF">レジスタ</a>計算機言語で定義する．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">sqrt</span> n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>sqrt-iter <span class="synConstant">1.0</span> x<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>sqrt-iter guess x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>good-enough? guess x<span class="synSpecial">)</span>
      guess
      <span class="synSpecial">(</span>sqrt-iter <span class="synSpecial">(</span>improve guess x<span class="synSpecial">)</span>
                 x<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>improve guess x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>average guess <span class="synSpecial">(</span><span class="synIdentifier">/</span> x guess<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>average x y<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">/</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> x y<span class="synSpecial">)</span> <span class="synConstant">2</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>good-enough? guess x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">&lt;</span> <span class="synSpecial">(</span><span class="synIdentifier">abs</span> <span class="synSpecial">(</span><span class="synIdentifier">-</span> <span class="synSpecial">(</span>square guess<span class="synSpecial">)</span> x<span class="synSpecial">))</span> <span class="synConstant">0.001</span><span class="synSpecial">))</span>
</pre>


<p>　<br/>
good-enough?, improveを使った場合
<span itemscope itemtype="http://schema.org/Photograph"><a href="http://f.hatena.ne.jp/wat-aro/20160122185657" class="hatena-fotolife" itemprop="url"><img src="http://cdn-ak.f.st-hatena.com/images/fotolife/w/wat-aro/20160122/20160122185657.jpg" alt="f:id:wat-aro:20160122185657j:image" title="f:id:wat-aro:20160122185657j:image" class="hatena-fotolife" itemprop="image"></a></span></p>

<p>定義</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; good-enough?, improveを使った場合</span>
<span class="synSpecial">(</span>controller
 <span class="synIdentifier">sqrt</span>
   <span class="synSpecial">(</span>assign x <span class="synSpecial">(</span>op <span class="synIdentifier">read</span><span class="synSpecial">))</span>
   <span class="synSpecial">(</span>assign guess <span class="synSpecial">(</span>const <span class="synConstant">1.0</span><span class="synSpecial">))</span>
 test-b
   <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op good-enough?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg guess<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg x<span class="synSpecial">))</span>
   <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label sqrt-done<span class="synSpecial">))</span>
   <span class="synSpecial">(</span>assign t <span class="synSpecial">(</span>op improve<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg guess<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg x<span class="synSpecial">))</span>
   <span class="synSpecial">(</span>assign guess <span class="synSpecial">(</span>reg t<span class="synSpecial">))</span>
   <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label test-b<span class="synSpecial">))</span>
 sqrt-done
   <span class="synSpecial">(</span>perform <span class="synSpecial">(</span>op peinr<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg guess<span class="synSpecial">)))</span>
</pre>


<p>　<br/>
good-enough?, improveを使わなかった場合
<span itemscope itemtype="http://schema.org/Photograph"><a href="http://f.hatena.ne.jp/wat-aro/20160122185726" class="hatena-fotolife" itemprop="url"><img src="http://cdn-ak.f.st-hatena.com/images/fotolife/w/wat-aro/20160122/20160122185726.jpg" alt="f:id:wat-aro:20160122185726j:image" title="f:id:wat-aro:20160122185726j:image" class="hatena-fotolife" itemprop="image"></a></span>
　<br/>
定義</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; good-enough?, improveを使わずに</span>
<span class="synSpecial">(</span>controller
  <span class="synIdentifier">sqrt</span>
    <span class="synSpecial">(</span>assign x <span class="synSpecial">(</span>op <span class="synIdentifier">read</span><span class="synSpecial">))</span>
    <span class="synSpecial">(</span>assign guess <span class="synSpecial">(</span>const <span class="synConstant">1.0</span><span class="synSpecial">))</span>
  good-enough?
    <span class="synSpecial">(</span>assign p <span class="synSpecial">(</span>op square<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg guess<span class="synSpecial">))</span>
    <span class="synSpecial">(</span>assign diff <span class="synSpecial">(</span>op <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg p<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg x<span class="synSpecial">))</span>
    <span class="synSpecial">(</span>assign g <span class="synSpecial">(</span>op <span class="synIdentifier">abs</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg diff<span class="synSpecial">))</span>
    <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op <span class="synIdentifier">&lt;</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg g<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">0.001</span><span class="synSpecial">))</span>
    <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label sqrt-done<span class="synSpecial">))</span>
  improve
    <span class="synSpecial">(</span>assign d <span class="synSpecial">(</span>op <span class="synIdentifier">/</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg x<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg guess<span class="synSpecial">))</span>
    <span class="synSpecial">(</span>assign t <span class="synSpecial">(</span>op average<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg d<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg guess<span class="synSpecial">))</span>
    <span class="synSpecial">(</span>assign guess <span class="synSpecial">(</span>reg t<span class="synSpecial">))</span>
  sqrt-done
    <span class="synSpecial">(</span>perform <span class="synSpecial">(</span>op print<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg guess<span class="synSpecial">)))</span>
</pre>


