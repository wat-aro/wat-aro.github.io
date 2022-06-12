---
title: "SICP 4.4.4 extend-if-consistentのエラー"
published: 2016/01/19
tags:
  - scheme
  - SICP
  - gauche
---

<p>4.4.4の論理型プログラミングの実装を評価すると以下のエラーが出ます．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synConstant">***</span> ERROR: Compile Error: cannot <span class="synIdentifier">find</span> <span class="synConstant">&quot;var&quot;</span> in <span class="synSpecial">(</span><span class="synConstant">&quot;/usr/local/Cellar/gauche/0.9.4/share/gauche-0.9/site/lib&quot;</span> <span class="synConstant">&quot;/usr/local/Cellar/gauche/0.9.4/share/gauche-0.9/0.9.4/lib&quot;</span> <span class="synConstant">&quot;/usr/local/Cellar/gauche/0.9.4/share/gauche/site/lib&quot;</span> <span class="synConstant">&quot;/usr/local/Cellar/gauche/0.9.4/share/gauche/0.9/lib&quot;</span><span class="synSpecial">)</span>
<span class="synConstant">&quot;(standard input)&quot;</span>:1:<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>extend-if-consistent var da ...

Stack Trace:
_______________________________________
  <span class="synConstant">0</span>  <span class="synSpecial">(</span><span class="synIdentifier">eval</span> expr env<span class="synSpecial">)</span>
        At line <span class="synConstant">179</span> of <span class="synConstant">&quot;/usr/local/Cellar/gauche/0.9.4/share/gauche-0.9/0.9.4/lib/gauche/interactive.scm&quot;</span>
</pre>


<p>これがextend-if-consistentのコードです．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>extend-if-consistent var dat frame<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>binding <span class="synSpecial">(</span>binding-in-frame var frame<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> binding
        <span class="synSpecial">(</span>pattern-match <span class="synSpecial">(</span>binding-value binding<span class="synSpecial">)</span> dat frame<span class="synSpecial">)</span>
        <span class="synSpecial">(</span>extend var dat frame<span class="synSpecial">))))</span>
</pre>


<p>何も問題ないように思えます．
defineなのになぜvarを探しているのかわかりません．<br/>
散々迷って，このコードのvarを１つずつ変更していったところ，<br/>
最後の行のextendの次のvarを探しているようでした．<br/>
else節なのになぜこんなところが評価されているんだと思いながらも，<br/>
この評価機のextendの定義を先に評価したところ，extend-if-consistentの評価も通りました．<br/>
<a class="keyword" href="http://d.hatena.ne.jp/keyword/Gauche">Gauche</a>のextendを調べてみると以下で見つかりました．</p>

<p><a href="http://practical-scheme.net/gauche/man/gauche-refj_34.html">Gauche &#x30E6;&#x30FC;&#x30B6;&#x30EA;&#x30D5;&#x30A1;&#x30EC;&#x30F3;&#x30B9;: 4.13 &#x30E2;&#x30B8;&#x30E5;&#x30FC;&#x30EB;</a></p>

<p>モジュールの継承で使われるので優先的に評価されているのでしょう．<br/>
なのでこの部分は本文中のextendの定義を先に評価してから書くようにします．</p>

