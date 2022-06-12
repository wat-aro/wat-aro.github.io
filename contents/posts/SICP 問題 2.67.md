---
title: "SICP 問題 2.67"
published: 2015/10/27
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; Huffman木</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-leaf symbol weight<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>leaf symbol weight<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>leaf? object<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> object<span class="synSpecial">)</span> <span class="synSpecial">'</span>leaf<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>symbol-leaf x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> x<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>weight-leaf x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">caddr</span> x<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-code-tree left right<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">list</span> left
        right
        <span class="synSpecial">(</span><span class="synIdentifier">append</span> <span class="synSpecial">(</span>symbols left<span class="synSpecial">)</span> <span class="synSpecial">(</span>symbols right<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span>weight left<span class="synSpecial">)</span> <span class="synSpecial">(</span>weight right<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>left-branch tree<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> tree<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>right-branch tree<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> tree<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>symbols tree<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>leaf? tree<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span>symbol-leaf tree<span class="synSpecial">))</span>
      <span class="synSpecial">(</span><span class="synIdentifier">caddr</span> tree<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>weight tree<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>leaf? tree<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>weight-leaf tree<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synIdentifier">cadddr</span> tree<span class="synSpecial">)))</span>

<span class="synComment">;; bitが0なら左，1なら右の枝をたどっていき，leafにたどり着くと，そのシンボルをconsして次にいく．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>decode bits tree<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>decode-1 bits current-branch<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> bits<span class="synSpecial">)</span>
        <span class="synSpecial">'()</span>
        <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>next-branch
               <span class="synSpecial">(</span>choose-branch <span class="synSpecial">(</span><span class="synIdentifier">car</span> bits<span class="synSpecial">)</span> current-branch<span class="synSpecial">)))</span>
          <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>leaf? next-branch<span class="synSpecial">)</span>
              <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>symbol-leaf next-branch<span class="synSpecial">)</span>
                    <span class="synSpecial">(</span>decode-1 <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> bits<span class="synSpecial">)</span> tree<span class="synSpecial">))</span>
              <span class="synSpecial">(</span>decode-1 <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> bits<span class="synSpecial">)</span> next-branch<span class="synSpecial">)))))</span>
  <span class="synSpecial">(</span>decode-1 bits tree<span class="synSpecial">))</span>

<span class="synComment">;; bitが左ならleft-branch,bitが右ならright-branchを選択</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>choose-branch bit branch<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">=</span> bit <span class="synConstant">0</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>left-branch branch<span class="synSpecial">))</span>
        <span class="synSpecial">((</span><span class="synIdentifier">=</span> bit <span class="synConstant">1</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>right-branch branch<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>error <span class="synConstant">&quot;bad bit -- CHOOSE-BRANCH&quot;</span> bit<span class="synSpecial">))))</span>

<span class="synComment">;; weightで昇順に順序づけられた集合に要素を追加する</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>adjoin-set x set<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> set<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> x<span class="synSpecial">))</span>
        <span class="synSpecial">((</span><span class="synIdentifier">&lt;</span> <span class="synSpecial">(</span>weight x<span class="synSpecial">)</span> <span class="synSpecial">(</span>weight <span class="synSpecial">(</span><span class="synIdentifier">car</span> set<span class="synSpecial">)))</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> x set<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> set<span class="synSpecial">)</span>
                    <span class="synSpecial">(</span>adjoin-set x <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> set<span class="synSpecial">))))))</span>

<span class="synComment">;; pairsからweightの昇順にleafの集合を作る．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-leaf-set pairs<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> pairs<span class="synSpecial">)</span>
      <span class="synSpecial">'()</span>
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>pair <span class="synSpecial">(</span><span class="synIdentifier">car</span> pairs<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span>adjoin-set <span class="synSpecial">(</span>make-leaf <span class="synSpecial">(</span><span class="synIdentifier">car</span> pair<span class="synSpecial">)</span>
                               <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> pair<span class="synSpecial">))</span>
                    <span class="synSpecial">(</span>make-leaf-set <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> pairs<span class="synSpecial">))))))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (define sample-tree
        (make-code-tree (make-leaf &#39;A 4)
                        (make-code-tree
                         (make-leaf &#39;B 2)
                         (make-code-tree (make-leaf &#39;D 1)
                                         (make-leaf &#39;C 1)))))
sample-tree
gosh&gt; (define sample-message
        &#39;(0 1 1 0 0 1 0 1 0 1 1 1 0))
sample-message
gosh&gt; (decode sample-message sample-tree)
(A D A B B C A)</pre>


