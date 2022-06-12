---
title: "smartparrensとweb-modeを使う時の設定"
published: 2015/01/29
tags:
  - emacs
  - elisp
---

<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/Emacs">Emacs</a>でerbファイルを扱う時にsmartparrensとweb-modeがどちらも補完してしまいます。</p>
<pre class="code" data-lang="" data-unlink>&lt;% %&gt;</pre><p>としたいのに</p>
<pre class="code" data-lang="" data-unlink>&lt;% %&gt;&gt;</pre><p>と<がひとつ多くなってしまいます。</p><p>まずsmartparensが</p>
<pre class="code" data-lang="" data-unlink>&lt;</pre><p>と入力された時点で</p>
<pre class="code" data-lang="" data-unlink>&lt; &gt;</pre><p>と補完します。<br />
その後に</p>
<pre class="code" data-lang="" data-unlink>&lt;% &gt;</pre><p>と%を入力し、スペースや=を入力すると</p>
<pre class="code" data-lang="" data-unlink>&lt;% %&gt;&gt;</pre><p>と%>を補完してしまい、>がひとつ多くなるのです。</p><p>一応web-mode.elの844行目から847行目の</p>
<pre class="code lang-lisp" data-lang="lisp" data-unlink>    <span class="synSpecial">(</span><span class="synConstant">&quot;erb&quot;</span>        <span class="synStatement"> . </span><span class="synSpecial">((</span><span class="synConstant">&quot;&lt;% &quot;</span><span class="synStatement"> . </span><span class="synConstant">&quot; %&gt;&quot;</span><span class="synSpecial">)</span>
                      <span class="synSpecial">(</span><span class="synConstant">&quot;&lt;%=&quot;</span><span class="synStatement"> . </span><span class="synConstant">&quot;%&gt;&quot;</span><span class="synSpecial">)</span>
                      <span class="synSpecial">(</span><span class="synConstant">&quot;&lt;%#&quot;</span><span class="synStatement"> . </span><span class="synConstant">&quot;%&gt;&quot;</span><span class="synSpecial">)</span>
                      <span class="synSpecial">(</span><span class="synConstant">&quot;&lt;%-&quot;</span><span class="synStatement"> . </span><span class="synConstant">&quot;%&gt;&quot;</span><span class="synSpecial">)))</span>
</pre><p>を</p>
<pre class="code lang-lisp" data-lang="lisp" data-unlink>    <span class="synSpecial">(</span><span class="synConstant">&quot;erb&quot;</span>        <span class="synStatement"> . </span><span class="synSpecial">((</span><span class="synConstant">&quot;&lt;% &quot;</span><span class="synStatement"> . </span><span class="synConstant">&quot; %&quot;</span><span class="synSpecial">)</span>
                      <span class="synSpecial">(</span><span class="synConstant">&quot;&lt;%=&quot;</span><span class="synStatement"> . </span><span class="synConstant">&quot;%&quot;</span><span class="synSpecial">)</span>
                      <span class="synSpecial">(</span><span class="synConstant">&quot;&lt;%#&quot;</span><span class="synStatement"> . </span><span class="synConstant">&quot;%&quot;</span><span class="synSpecial">)</span>
                      <span class="synSpecial">(</span><span class="synConstant">&quot;&lt;%-&quot;</span><span class="synStatement"> . </span><span class="synConstant">&quot;%&quot;</span><span class="synSpecial">)))</span>
</pre><p>と置き換えることで正常な補完となるのですが、init.elへの設定などでこれを解決できませんかね。</p><p>スタックオーバーフローでも質問してみました。<br />
tab=answers<a href="http://ja.stackoverflow.com/questions/5573/smartparens%E3%81%A8web-mode%E3%82%92%E5%90%8C%E6%99%82%E3%81%AB%E4%BD%BF%E3%81%86%E9%9A%9B%E3%81%AE%E8%A8%AD%E5%AE%9A">emacs - smartparens&#x3068;web-mode&#x3092;&#x540C;&#x6642;&#x306B;&#x4F7F;&#x3046;&#x969B;&#x306E;&#x8A2D;&#x5B9A; - &#x30B9;&#x30BF;&#x30C3;&#x30AF;&#x30FB;&#x30AA;&#x30FC;&#x30D0;&#x30FC;&#x30D5;&#x30ED;&#x30FC;</a></p>

