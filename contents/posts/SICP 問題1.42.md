---
title: "SICP 問題1.42"
published: 2015/10/09
tags:
  - scheme
  - SICP
---

<p>合成関数を実装する手続きcompose</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>compose f g<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>f <span class="synSpecial">(</span>g x<span class="synSpecial">))))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; ((compose square inc) 6)
49</pre>


