---
title: "プログラミングGauche ７.２練習問題"
published: 2015/09/20
tags:
  - scheme
  - gauche
---

<ul>
<li>for-each-numbersを書く</li>
</ul>


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> for-each-numbers
  <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>proc lis<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synIdentifier">for-each</span> proc <span class="synSpecial">(</span><span class="synIdentifier">filter</span> <span class="synIdentifier">number?</span> lis<span class="synSpecial">))))</span>
</pre>


<ul>
<li>map-numbersを書く</li>
</ul>


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> map-number
  <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>proc lis<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synIdentifier">map</span> proc <span class="synSpecial">(</span><span class="synIdentifier">filter</span> <span class="synIdentifier">number?</span> lis<span class="synSpecial">))))</span>
</pre>


<ul>
<li>numbers-onlyを書く</li>
</ul>


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>numbers-only walker<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>proc lis<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>walker proc <span class="synSpecial">(</span><span class="synIdentifier">filter</span> <span class="synIdentifier">number?</span> lis<span class="synSpecial">))))</span>
</pre>


<ul>
<li>「数値とそれ以外が混じっている入れ子のリスト」の数値だけについて<code>(numbers-only for-each)</code>や<code>(numbers-only map)</code>を<code>tree-walk</code>に渡して処理ができるか．できないならなぜできないか．</li>
</ul>


<p><code>tree-walk</code>のコードは以下の通り</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>tree-walk walker proc tree<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>walker <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>elt<span class="synSpecial">)</span>
            <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">list?</span> elt<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>tree-walk walker proc elt<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>proc elt<span class="synSpecial">)))</span>
          tree<span class="synSpecial">))</span>
</pre>


<p>以下を例に考えてみた．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span>tree-walk <span class="synSpecial">(</span>numbers-only <span class="synIdentifier">map</span><span class="synSpecial">)</span> print  <span class="synSpecial">'(</span><span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synSpecial">(</span><span class="synConstant">3</span> <span class="synSpecial">(</span><span class="synConstant">#f</span> <span class="synConstant">4</span><span class="synSpecial">))</span>  <span class="synSpecial">(</span><span class="synConstant">#t</span> <span class="synConstant">5</span><span class="synSpecial">)))</span>
</pre>


<p>実行結果は</p>

<pre class="code" data-lang="" data-unlink>1
2
(#&lt;undef&gt; #&lt;undef&gt;)</pre>


<p>入れ子になった部分の処理が出来ていない．
<code>numbers-only</code>と<code>tree-walk</code>にリストがどう渡されているのか調べてみる．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>tree-walk walker proc tree<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>walker <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>elt<span class="synSpecial">)</span>
            <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">list?</span> <span class="synError">#?=elt</span><span class="synSpecial">)</span>
                <span class="synSpecial">(</span>tree-walk walker proc elt<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>proc elt<span class="synSpecial">)))</span>
          tree<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>numbers-only walker<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>proc lis<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>walker proc <span class="synError">#?=</span><span class="synSpecial">(</span><span class="synIdentifier">filter</span> <span class="synIdentifier">number?</span> lis<span class="synSpecial">))))</span>

<span class="synSpecial">(</span>tree-walk <span class="synSpecial">(</span>numbers-only <span class="synIdentifier">map</span><span class="synSpecial">)</span> print  <span class="synSpecial">'(</span><span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synSpecial">(</span><span class="synConstant">3</span> <span class="synSpecial">(</span><span class="synConstant">#f</span> <span class="synConstant">4</span><span class="synSpecial">))</span>  <span class="synSpecial">(</span><span class="synConstant">#t</span> <span class="synConstant">5</span><span class="synSpecial">)))</span>
</pre>


<p>結果は</p>

<pre class="code" data-lang="" data-unlink>#?=&#34;(standard input)&#34;:262:(filter number? lis)
#?-    (1 2)
#?=elt
#?-    1
1
#?=elt
#?-    2
2
(#&lt;undef&gt; #&lt;undef&gt;)</pre>


<p>これを見ると<code>tree-walk</code>にリストが渡される前に<code>numbers-only</code>の<code>filter</code>が先に評価されている．<br/>
ここを改善して入れ子に対応した<code>filter</code>を書いて，<code>numbers-only-for-tree</code>を書く．<br/>
<code>(car lis)</code>がリストならそこに<a class="keyword" href="http://d.hatena.ne.jp/keyword/%BA%C6%B5%A2">再帰</a>して<code>filter</code>をかける．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> filter-for-tree
        <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>pred lis<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synStatement">cond</span>
           <span class="synSpecial">((</span><span class="synIdentifier">null?</span> lis<span class="synSpecial">)</span> <span class="synSpecial">'())</span>
           <span class="synSpecial">((</span><span class="synIdentifier">list?</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> lis<span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>filter-for-tree pred <span class="synSpecial">(</span><span class="synIdentifier">car</span> lis<span class="synSpecial">))</span>
                                    <span class="synSpecial">(</span>filter-for-tree pred <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lis<span class="synSpecial">))))</span>
           <span class="synSpecial">((</span>pred <span class="synSpecial">(</span><span class="synIdentifier">car</span> lis<span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> lis<span class="synSpecial">)</span>
                                   <span class="synSpecial">(</span>filter-for-tree pred <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lis<span class="synSpecial">))))</span>
           <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">filter</span> pred <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lis<span class="synSpecial">))))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>numbers-only-for-tree walker<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>proc lis<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>walker proc <span class="synSpecial">(</span>filter-for-tree <span class="synIdentifier">number?</span> lis<span class="synSpecial">))))</span>
</pre>


<p><code>numbers-only</code>と同じように実行してみます．</p>

<pre class="code" data-lang="" data-unlink>gosh&gt; (tree-walk (numbers-only-for-tree map) print  &#39;(1 2 (3 (#f 4))  (#t 5)))
1
2
3
4
5
(#&lt;undef&gt; #&lt;undef&gt; (#&lt;undef&gt; (#&lt;undef&gt;)) (#&lt;undef&gt;))</pre>


<p>入れ子なったリストに対応した<code>numbers-only-for-map</code>が書けました．</p>

