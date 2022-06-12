---
title: "SICP 問題 3.57"
published: 2015/12/09
tags:
  - scheme
  - SICP
---

<p>メモ化しているので(add-streams (stream-cdr fibs) fibs)の部分で加算が一回行われるだけで済んでいる．<br/>
これがメモ化していない場合はfibsの値も(stream-cdr fibs)の値も0番目と1番目の値から加算して求めなくてはならない．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> fibs
  <span class="synSpecial">(</span>cons-stream <span class="synConstant">0</span>
               <span class="synSpecial">(</span>cons-stream <span class="synConstant">1</span>
                            <span class="synSpecial">(</span>add-streams <span class="synSpecial">(</span>stream-cdr fibs<span class="synSpecial">)</span>
                                         fibs<span class="synSpecial">))))</span>
</pre>


