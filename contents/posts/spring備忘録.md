---
title: "spring備忘録"
published: 2015/05/17
tags:
  - Ruby on Rails
---

<p>Rails4.1から標準で付属するようになったspringの備忘録。</p>

<p>springを使える状態にする。</p>

<pre class="code" data-lang="" data-unlink>bundle exec bin/spring binstub --all</pre>


<p>springが起動しているか確認。</p>

<pre class="code" data-lang="" data-unlink>bin/spring status</pre>


<p>springを停止する。</p>

<pre class="code" data-lang="" data-unlink>bin/spring stop</pre>


<p>springはrakeや<a class="keyword" href="http://d.hatena.ne.jp/keyword/rails">rails</a>コマンドで再起動する。
ここがわからなくていつの間にか起動しているけど、どうやって起動するのか調べてた。</p>

<p>私の環境ではこれくらい時間が短縮できた。</p>

<pre class="code" data-lang="" data-unlink>$ bin/spring stop
Spring stopped.

$ time bundle exec rails runner &#39;puts &#34;hello&#34;&#39;
hello

real    0m2.450s
user    0m0.548s
sys 0m0.086s</pre>




<pre class="code" data-lang="" data-unlink>$ bin/spring status
Spring is running:

79921 spring server | study_app | started 39 secs ago
79922 spring app    | study_app | started 39 secs ago | development mode

$ time bundle exec rails runner &#39;&#34;puts hello&#34;&#39;

real    0m0.766s
user    0m0.546s
sys 0m0.082s</pre>


<p>これくらい短縮されると嬉しいですね。</p>

<p>[参考]</p>

<p><a href="http://qiita.com/bibio/items/58806063bd2365a9832a">Rails - spring &#x3092;&#x4F7F;&#x3063;&#x3066;&#x30C6;&#x30B9;&#x30C8;&#x9AD8;&#x901F;&#x5316; - Qiita</a></p>

