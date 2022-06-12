---
title: "NoMethodError: undefined method `visit&#39;"
published: 2015/05/17
tags:
  - Ruby on Rails
  - Rspec
  - Capybara
---

<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/Ruby%20on%20Rails">Ruby on Rails</a> 4.2.1で<a class="keyword" href="http://d.hatena.ne.jp/keyword/Rspec">Rspec</a> + Capybaraでタイトルのエラーが出た時の対策。
<a class="keyword" href="http://d.hatena.ne.jp/keyword/Ruby%20on%20Rails">Ruby on Rails</a> Tutorialではspec_helper.rbに</p>

<pre class="code" data-lang="" data-unlink>config.include Capybara::DSL</pre>


<p>と記述しろと書かれているが、そうすると</p>

<pre class="code" data-lang="" data-unlink>/vendor/bundle/gems/capybara-2.4.4/lib/capybara/rails.rb:6:in `block (2 levels) in &lt;top (required)&gt;&#39;: uninitialized constant Rails (NameError)</pre>


<p>とエラーが起こる。
<a href="http://railstutorial.jp/chapters/static-pages?version=4.0#top">&#x7B2C;3&#x7AE0; &#x307B;&#x307C;&#x9759;&#x7684;&#x306A;&#x30DA;&#x30FC;&#x30B8;&#x306E;&#x4F5C;&#x6210; | Rails &#x30C1;&#x30E5;&#x30FC;&#x30C8;&#x30EA;&#x30A2;&#x30EB;</a></p>

<p>capybaraが動いていないのだからcapybaraの<a class="keyword" href="http://d.hatena.ne.jp/keyword/github">github</a>を見てみると</p>

<hr />

<p>Using Capybara with <a class="keyword" href="http://d.hatena.ne.jp/keyword/RSpec">RSpec</a></p>

<p>Load <a class="keyword" href="http://d.hatena.ne.jp/keyword/RSpec">RSpec</a> 2.x support by adding the following line (typically to your spec_helper.rb file):</p>

<p>require 'capybara/<a class="keyword" href="http://d.hatena.ne.jp/keyword/rspec">rspec</a>'</p>

<hr />

<p>と書かれていたのでこれを冒頭に記述。
先の</p>

<pre class="code" data-lang="" data-unlink>config.include Capybara::DSL</pre>


<p>と合わせればうまくテストが動いた。</p>

