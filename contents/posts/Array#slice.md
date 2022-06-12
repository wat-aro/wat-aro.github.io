---
title: "Array#slice"
published: 2015/03/25
tags:
  - ruby
---

<p>slice<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%E1%A5%BD%A5%C3%A5%C9">メソッド</a>には</p>
<pre class="code lang-ruby" data-lang="ruby" data-unlink>ary.slice(<span class="synConstant">0</span>,<span class="synConstant">3</span>)
ary.slice(<span class="synConstant">0</span>..<span class="synConstant">3</span>)
</pre><p>のように２つの書き方があります。</p><p>ひとつ目はary[0]から３つの要素を取り出して部分配列を作ります。<br />
この場合は</p>
<pre class="code lang-ruby" data-lang="ruby" data-unlink>[ary[<span class="synConstant">0</span>], ary[<span class="synConstant">1</span>], ary[<span class="synConstant">2</span>]]
</pre><p>となります。</p><p>ふたつ目はary[0]からary[3]までの要素を取り出して部分配列を作ります。</p>
<pre class="code lang-ruby" data-lang="ruby" data-unlink>[ary[<span class="synConstant">0</span>], ary[<span class="synConstant">1</span>], ary[<span class="synConstant">2</span>], ary[<span class="synConstant">3</span>]]
</pre>
