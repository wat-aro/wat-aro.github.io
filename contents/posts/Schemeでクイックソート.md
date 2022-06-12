---
title: "Schemeでクイックソート"
published: 2016/05/14
tags:
  - scheme
---

<p>先日の納会でソートの話が少し出たので<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%AF%A5%A4%A5%C3%A5%AF%A5%BD%A1%BC%A5%C8">クイックソート</a>を書いてみました．<br/>
書きやすいので<a class="keyword" href="http://d.hatena.ne.jp/keyword/Gauche">Gauche</a>で．</p>

<p>まず普通に書いてみます．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>quick lst<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> lst<span class="synSpecial">)</span>
      <span class="synSpecial">'()</span>
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>first <span class="synSpecial">(</span><span class="synIdentifier">car</span> lst<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span><span class="synIdentifier">append</span> <span class="synSpecial">(</span>quick <span class="synSpecial">(</span><span class="synIdentifier">filter</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">&lt;</span> x first<span class="synSpecial">))</span> lst<span class="synSpecial">))</span>
                <span class="synSpecial">(</span><span class="synIdentifier">filter</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> x first<span class="synSpecial">))</span> lst<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>quick <span class="synSpecial">(</span><span class="synIdentifier">filter</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">&lt;</span> first x<span class="synSpecial">))</span> lst<span class="synSpecial">))))))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (quick &#39;( 4 7 8 3 9 2 7 3 92 7 1))
(1 2 3 3 4 7 7 7 8 9 92)</pre>


<p>普通ですね．<br/>
ただfilterで何度もリストの中身を舐めているのが嫌です．
ここでstreamを使ってみます．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span>use util.stream<span class="synSpecial">)</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>quick lst<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>stream-&gt;list
   <span class="synSpecial">(</span><span class="synStatement">let</span> recur <span class="synSpecial">((</span>s <span class="synSpecial">(</span>list-&gt;stream lst<span class="synSpecial">)))</span>
     <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>stream-null? s<span class="synSpecial">)</span>
         stream-null
         <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>first <span class="synSpecial">(</span>stream-car s<span class="synSpecial">)))</span>
           <span class="synSpecial">(</span>stream-append <span class="synSpecial">(</span>recur <span class="synSpecial">(</span>stream-filter <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">&lt;</span> x first<span class="synSpecial">))</span> s<span class="synSpecial">))</span>
                          <span class="synSpecial">(</span>stream-filter <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> x first<span class="synSpecial">))</span> s<span class="synSpecial">)</span>
                          <span class="synSpecial">(</span>recur <span class="synSpecial">(</span>stream-filter <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">&lt;</span> first x<span class="synSpecial">))</span> s<span class="synSpecial">))))))))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (quick &#39;( 4 7 8 3 9 2 7 3 92 7 1))
(1 2 3 3 4 7 7 7 8 9 92)</pre>


<p>リストからストリームへの変換とストリームからリストへの変換が入っているので<br/>
効率的になったのかどうか怪しいですが一応期待通りに動いていますね．<br/>
どうするのが正解なんでしょう？</p>

