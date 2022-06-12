---
title: "schemeでmapを書いてみた"
published: 2015/10/21
tags:
  - scheme
---

<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/SICP">SICP</a>の問題 2.37をやろうとしたところ，この本で定義した一つのリストのみに対応したmapではなく<br/>
<a class="keyword" href="http://d.hatena.ne.jp/keyword/%CA%A3%BF%F4">複数</a>のリストに対応したmapが必要だったので自分で書いてみました．<br/>
　</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>foldr op init lst<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> lst<span class="synSpecial">)</span>
      init
      <span class="synSpecial">(</span>op <span class="synSpecial">(</span><span class="synIdentifier">car</span> lst<span class="synSpecial">)</span>
          <span class="synSpecial">(</span>foldr op init <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lst<span class="synSpecial">)))))</span>


<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">map</span> op <span class="synSpecial">.</span> lst<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>map1 op lst<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>foldr <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x y<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>op x<span class="synSpecial">)</span> y<span class="synSpecial">))</span> <span class="synSpecial">'()</span> lst<span class="synSpecial">))</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> lst<span class="synSpecial">)</span> <span class="synSpecial">'())</span>
        <span class="synSpecial">((</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lst<span class="synSpecial">))</span> <span class="synSpecial">(</span>map1 op <span class="synSpecial">(</span><span class="synIdentifier">car</span> lst<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synStatement">let</span> loop <span class="synSpecial">((</span>rest lst<span class="synSpecial">))</span>
                <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> rest<span class="synSpecial">)</span> <span class="synSpecial">'())</span>
                      <span class="synSpecial">((</span>foldr <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x y<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synStatement">or</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> x<span class="synSpecial">)</span> y<span class="synSpecial">))</span> <span class="synConstant">#f</span> rest<span class="synSpecial">)</span>
                       <span class="synSpecial">(</span>loop <span class="synSpecial">(</span><span class="synIdentifier">filter</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> x<span class="synSpecial">)))</span> rest<span class="synSpecial">)))</span>
                      <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">apply</span> op <span class="synSpecial">(</span>map1 <span class="synIdentifier">car</span> rest<span class="synSpecial">))</span>
                                  <span class="synSpecial">(</span>loop <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synIdentifier">cdr</span> rest<span class="synSpecial">)))))))))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (map + &#39;(1 2 3) &#39;(4 5 6))
(5 7 9)</pre>


<p>うまく動いてくれてるようです．<br/>
可変長引数を省略した時にはrestに空リストが入るので(null? rest)で分岐することにしました．</p>

