---
title: "SICP 問題 3.14"
published: 2015/11/19
tags:
  - scheme
  - SICP
---

<p>mysteryはreverseと同じ結果を返し，xを先頭の要素だけを取り出したリストに置き換える．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>mystery x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>loop x y<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> x<span class="synSpecial">)</span>
        y
        <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>temp <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> x<span class="synSpecial">)))</span>
          <span class="synSpecial">(</span><span class="synIdentifier">set-cdr!</span> x y<span class="synSpecial">)</span>
          <span class="synSpecial">(</span>loop temp x<span class="synSpecial">))))</span>
  <span class="synSpecial">(</span>loop x <span class="synSpecial">'()))</span>
</pre>


<p><span itemscope itemtype="http://schema.org/Photograph"><a href="http://f.hatena.ne.jp/wat-aro/20151119230908" class="hatena-fotolife" itemprop="url"><img src="http://cdn-ak.f.st-hatena.com/images/fotolife/w/wat-aro/20151119/20151119230908.jpg" alt="f:id:wat-aro:20151119230908j:image" title="f:id:wat-aro:20151119230908j:image" class="hatena-fotolife" itemprop="image"></a></span></p>

