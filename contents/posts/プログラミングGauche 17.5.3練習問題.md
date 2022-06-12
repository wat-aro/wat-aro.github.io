---
title: "プログラミングGauche 17.5.3練習問題"
published: 2015/09/24
tags:
  - scheme
  - gauche
---

<ul>
<li><code>&lt;logger-generic&gt;</code>のログ出力のon/offを切り替えられるようにする.<br/>
<code>&lt;logger-generic&gt;</code>クラスに<code>printing</code>スロットを追加してその真偽で処理を分ければよい．
<code>printing</code>スロットの値を後で変えられるように<code>printing!</code><a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%E1%A5%BD%A5%C3%A5%C9">メソッド</a>と<code>not-printing!</code><a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%E1%A5%BD%A5%C3%A5%C9">メソッド</a>も追加した．</li>
</ul>


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span>define-class <span class="synConstant">&lt;logger-generic&gt;</span> <span class="synSpecial">(</span><span class="synConstant">&lt;generic&gt;</span><span class="synSpecial">)</span>
  <span class="synSpecial">((</span>printing :init-value <span class="synConstant">#t</span><span class="synSpecial">)))</span>

<span class="synSpecial">(</span>define-method apply-generic <span class="synSpecial">((</span>gf <span class="synConstant">&lt;logger-generic&gt;</span><span class="synSpecial">)</span> args<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>ref gf <span class="synSpecial">'</span>printing<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">begin</span> <span class="synSpecial">(</span>format <span class="synConstant">#t</span> <span class="synConstant">&quot;args: ~s\n&quot;</span> args<span class="synSpecial">)</span>
             <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>return-value <span class="synSpecial">(</span>next-method<span class="synSpecial">)))</span>
               <span class="synSpecial">(</span>format <span class="synConstant">#t</span> <span class="synConstant">&quot;result: ~s\n&quot;</span> return-value<span class="synSpecial">)</span>
               return-value<span class="synSpecial">))</span>
      <span class="synSpecial">(</span>next-method<span class="synSpecial">)))</span>

<span class="synSpecial">(</span>define-method not-printing! <span class="synSpecial">((</span>gf <span class="synConstant">&lt;logger-generic&gt;</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span><span class="synStatement">set!</span> <span class="synSpecial">(</span>ref gf <span class="synSpecial">'</span>printing<span class="synSpecial">)</span> <span class="synConstant">#f</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span>define-method printing! <span class="synSpecial">((</span>gf <span class="synConstant">&lt;logger-generic&gt;</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span><span class="synStatement">set!</span> <span class="synSpecial">(</span>ref gf <span class="synSpecial">'</span>printing<span class="synSpecial">)</span> <span class="synConstant">#t</span><span class="synSpecial">))</span>
</pre>


