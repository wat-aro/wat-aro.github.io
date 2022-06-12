---
title: "SICP 問題 3.63"
published: 2015/12/11
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>sqrt-stream x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> guesses
    <span class="synSpecial">(</span>cons-stream <span class="synConstant">1.0</span>
                 <span class="synSpecial">(</span>stream-map <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>guess<span class="synSpecial">)</span>
                               <span class="synSpecial">(</span>sqrt-improve guess x<span class="synSpecial">))</span>
                             guesses<span class="synSpecial">)))</span>
  guesses<span class="synSpecial">)</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>sqrt-stream x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>cons-stream <span class="synConstant">1.0</span>
               <span class="synSpecial">(</span>stream-map <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>guess<span class="synSpecial">)</span>
                             <span class="synSpecial">(</span>sqrt-improve guess x<span class="synSpecial">))</span>
                           <span class="synSpecial">(</span>sqrt-stream x<span class="synSpecial">))))</span>
</pre>


<p>後者は毎回ストリームを作る．
前者はメモ化されているので一度作られたストリームを使い回す．</p>

<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%E1%A5%E2%A5%E9%A5%A4%A5%BA">メモライズ</a>をやめると両者の効率は同じになる．</p>

