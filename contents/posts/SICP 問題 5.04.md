---
title: "SICP 問題 5.04"
published: 2016/01/23
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; a 再帰的べき乗</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">expt</span> b n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> n <span class="synConstant">0</span><span class="synSpecial">)</span>
      <span class="synConstant">1</span>
      <span class="synSpecial">(</span><span class="synIdentifier">*</span> b <span class="synSpecial">(</span><span class="synIdentifier">expt</span> b <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">1</span><span class="synSpecial">)))))</span>
</pre>




<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span>controller
   <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label expt-done<span class="synSpecial">))</span>
 expt-loop
   <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op <span class="synIdentifier">=</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">0</span><span class="synSpecial">))</span>
   <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label base-case<span class="synSpecial">))</span>
   <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
   <span class="synSpecial">(</span>save n<span class="synSpecial">)</span>
   <span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>op <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
   <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label after-expt<span class="synSpecial">))</span>
   <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label expt-loop<span class="synSpecial">))</span>
after-expt
   <span class="synSpecial">(</span>restore n<span class="synSpecial">)</span>
   <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
   <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op <span class="synIdentifier">*</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg b<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
   <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
base-case
   <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
   <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
expt-done<span class="synSpecial">)</span>
</pre>


<p><span itemscope itemtype="http://schema.org/Photograph"><a href="http://f.hatena.ne.jp/wat-aro/20160123002736" class="hatena-fotolife" itemprop="url"><img src="http://cdn-ak.f.st-hatena.com/images/fotolife/w/wat-aro/20160123/20160123002736.jpg" alt="f:id:wat-aro:20160123002736j:image" title="f:id:wat-aro:20160123002736j:image" class="hatena-fotolife" itemprop="image"></a></span></p>

<p>　<br/>
　</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; b 反復的べき乗</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">expt</span> b n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>expt-iter counter product<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> counter <span class="synConstant">0</span><span class="synSpecial">)</span>
        product
        <span class="synSpecial">(</span>expt-iter <span class="synSpecial">(</span><span class="synIdentifier">-</span> counter <span class="synConstant">1</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> product<span class="synSpecial">))))</span>
  <span class="synSpecial">(</span>expt-iter n <span class="synConstant">1</span><span class="synSpecial">))</span>
</pre>




<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span>contoroller
   <span class="synSpecial">(</span>assign product <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
 expt-loop
   <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op <span class="synIdentifier">=</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">0</span><span class="synSpecial">))</span>
   <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label fib-done<span class="synSpecial">))</span>
   <span class="synSpecial">(</span>assign n1 <span class="synSpecial">(</span>op <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
   <span class="synSpecial">(</span>assign p1 <span class="synSpecial">(</span>op <span class="synIdentifier">*</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg product<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg b<span class="synSpecial">))</span>
   <span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>reg n1<span class="synSpecial">))</span>
   <span class="synSpecial">(</span>assigin product <span class="synSpecial">(</span>reg p1<span class="synSpecial">))</span>
   <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label expt-loop<span class="synSpecial">))</span>
 expt-done<span class="synSpecial">)</span>
</pre>


<p><span itemscope itemtype="http://schema.org/Photograph"><a href="http://f.hatena.ne.jp/wat-aro/20160123002740" class="hatena-fotolife" itemprop="url"><img src="http://cdn-ak.f.st-hatena.com/images/fotolife/w/wat-aro/20160123/20160123002740.jpg" alt="f:id:wat-aro:20160123002740j:image" title="f:id:wat-aro:20160123002740j:image" class="hatena-fotolife" itemprop="image"></a></span></p>

