---
title: "SICP 問題 3.44"
published: 2015/12/05
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>transfer from-account to-account amount<span class="synSpecial">)</span>
  <span class="synSpecial">((</span>from-account <span class="synSpecial">'</span>withdraw<span class="synSpecial">)</span> amount<span class="synSpecial">)</span>
  <span class="synSpecial">((</span>to-account <span class="synSpecial">'</span>deposit<span class="synSpecial">)</span> amount<span class="synSpecial">))</span>
</pre>


<p>交換と違い，残高の差を計算する必要がないので問題はおきない</p>

