---
title: "プログラミングGauche ７.４練習問題"
published: 2015/09/20
tags:
  - scheme
  - gauche
---

<p>可変長の引数を受け取り，リストにして返す手続き<code>list</code>を書く．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synIdentifier">list</span>
  <span class="synSpecial">(</span><span class="synStatement">lambda</span> ls
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">(</span><span class="synStatement">else</span> ls<span class="synSpecial">))))</span>
</pre>


<p>または</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">.</span> ls<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">(</span><span class="synStatement">else</span> ls<span class="synSpecial">)))</span>
</pre>


<p>実行してみる．</p>

<pre class="code" data-lang="" data-unlink>(list)
()
(list 1 2 )
(1 2)
(list &#39;(1 2) &#39;(3 4))
((1 2) (3 4))</pre>


<p>引数をそのまま返すだけ.<br/>
これ以外の書き方ってあるのかな．</p>

