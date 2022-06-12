---
title: "SICP 問題 3.51"
published: 2015/12/07
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>show x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>display-line x<span class="synSpecial">)</span>
  x<span class="synSpecial">)</span>


<span class="synSpecial">(</span><span class="synStatement">define</span> x <span class="synSpecial">(</span>stream-map show <span class="synSpecial">(</span>stream-enumerate-interval <span class="synConstant">0</span> <span class="synConstant">10</span><span class="synSpecial">)))</span>
</pre>




<pre class="code" data-lang="" data-unlink>
0x</pre>




<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span>stream-ref x <span class="synConstant">5</span><span class="synSpecial">)</span>
</pre>




<pre class="code" data-lang="" data-unlink>
1
2
3
4
55</pre>




<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span>stream-ref x <span class="synConstant">7</span><span class="synSpecial">)</span>
</pre>




<pre class="code" data-lang="" data-unlink>
6
77</pre>


<p>memo-procのおかげで<code>(stream-ref x 7)</code>では<code>(stream-ref x 5)</code>の計算は行っていない．
そのため6と77しか表示されない．</p>

