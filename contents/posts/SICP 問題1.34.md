---
title: "SICP 問題1.34"
published: 2015/10/08
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>f g<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>g <span class="synConstant">2</span><span class="synSpecial">))</span>
</pre>


<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%A4%A5%F3%A5%BF%A5%D7%A5%EA%A5%BF">インタプリタ</a>に<code>(f f)</code>を評価させるとどうなるか．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span>f f<span class="synSpecial">)</span>
<span class="synSpecial">(</span>f <span class="synConstant">2</span><span class="synSpecial">)</span>
<span class="synSpecial">(</span><span class="synConstant">2</span> <span class="synConstant">2</span><span class="synSpecial">)</span>
</pre>


<p><code>(f f)</code>のfに引数を適用し，<code>(f 2)</code>となる．<br/>
このfに引数を適用すると<code>(2 2)</code>となる．
<code>(2 2)</code>を評価しようとするが2は手続きでないためエラーとなり終了する．</p>

