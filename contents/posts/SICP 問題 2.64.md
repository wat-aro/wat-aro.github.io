---
title: "SICP 問題 2.64"
published: 2015/10/27
tags:
  - scheme
  - SICP
---

<p>;a
先頭から(n-1)/2番目までをleft-treeとしてpartial-treeにかける．<br/>
残ったリストの先頭をthis-entryとしてこの木の分岐点におく．<br/>
そのcdrをright-treeとしてpartial-treeにかける．<br/>
これを繰り返して木を作る．</p>

<pre class="code" data-lang="" data-unlink>      5
   /     \
1         9
  \       /   \
   3    7    11</pre>


<p>;b
O(n)</p>

