---
title: "SICP 問題 4.61"
published: 2016/01/16
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; 先頭の２つの隣接関係</span>
<span class="synSpecial">(</span>rule <span class="synSpecial">(</span>?x next-to ?y in <span class="synSpecial">(</span>?x ?y <span class="synSpecial">.</span> ?u<span class="synSpecial">)))</span>

<span class="synComment">;; リストのcdrの隣接関係</span>
<span class="synComment">;; (1 2 3 4 5)だとvが1,zが(2 3 4 5).２行目で，zに対してもnext-toをやると読める．</span>
<span class="synSpecial">(</span>rule <span class="synSpecial">(</span>?x next-to ?y in <span class="synSpecial">(</span>?v <span class="synSpecial">.</span> ?z<span class="synSpecial">))</span>
      <span class="synSpecial">(</span>?x next-to ?y in ?z<span class="synSpecial">))</span>

<span class="synComment">;; 質問</span>
<span class="synSpecial">(</span>?x next-to ?y in <span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synSpecial">(</span><span class="synConstant">2</span> <span class="synConstant">3</span><span class="synSpecial">)</span> <span class="synConstant">4</span><span class="synSpecial">))</span>
<span class="synComment">;; =&gt;</span>
<span class="synSpecial">(</span><span class="synConstant">1</span> next-to <span class="synSpecial">(</span><span class="synConstant">2</span> <span class="synConstant">3</span><span class="synSpecial">)</span> in <span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synSpecial">(</span><span class="synConstant">2</span> <span class="synConstant">3</span><span class="synSpecial">)</span> <span class="synConstant">4</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synConstant">2</span> <span class="synConstant">3</span><span class="synSpecial">)</span> next-to <span class="synConstant">4</span> in <span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synSpecial">(</span><span class="synConstant">2</span> <span class="synConstant">3</span><span class="synSpecial">)</span> <span class="synConstant">4</span><span class="synSpecial">)</span>

<span class="synComment">;; 質問</span>
<span class="synSpecial">(</span>?x next-to <span class="synConstant">1</span> in <span class="synSpecial">(</span><span class="synConstant">2</span> <span class="synConstant">1</span> <span class="synConstant">3</span> <span class="synConstant">1</span><span class="synSpecial">))</span>
<span class="synComment">;; =&gt;</span>
<span class="synSpecial">(</span><span class="synConstant">2</span> next-to <span class="synConstant">1</span> in <span class="synSpecial">(</span><span class="synConstant">2</span> <span class="synConstant">1</span> <span class="synConstant">3</span> <span class="synConstant">1</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synConstant">3</span> next-to <span class="synConstant">1</span> in <span class="synSpecial">(</span><span class="synConstant">2</span> <span class="synConstant">1</span> <span class="synConstant">3</span> <span class="synConstant">1</span><span class="synSpecial">))</span>
</pre>


