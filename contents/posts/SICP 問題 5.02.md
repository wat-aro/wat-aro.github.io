---
title: "SICP 問題 5.02"
published: 2016/01/22
tags:
  - scheme
  - SICP
---

<p>5.01の反復的な階乗計算機をレジスト計算機言語使って記述する．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span>controller
 factorial
   <span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>op <span class="synIdentifier">read</span><span class="synSpecial">))</span>
   <span class="synSpecial">(</span>assign product <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
   <span class="synSpecial">(</span>assign counter <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
 test-b
   <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op <span class="synIdentifier">&gt;</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg counter<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">))</span>
   <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label factorial-done<span class="synSpecial">))</span>
   <span class="synSpecial">(</span>assign t <span class="synSpecial">(</span>op mul<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg product<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg counter<span class="synSpecial">))</span>
   <span class="synSpecial">(</span>assign u <span class="synSpecial">(</span>op sum<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg counter<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
   <span class="synSpecial">(</span>assign product <span class="synSpecial">(</span>reg t<span class="synSpecial">))</span>
   <span class="synSpecial">(</span>assign counter <span class="synSpecial">(</span>reg u<span class="synSpecial">))</span>
   <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label test<span class="synSpecial">))</span>
 factorial-done<span class="synSpecial">)</span>
</pre>


<p>基本的に制御器の流れ通り．<br/>
readする方法がわからないので多分こんな感じでしょうってやっつけ</p>

