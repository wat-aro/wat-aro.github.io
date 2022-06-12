---
title: "SICP 問題 4.60"
published: 2016/01/16
tags:
  - scheme
  - SICP
---

<p>最初の質問をすると近くに住む人の対になるので２つずつ表示される．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span>lives-near ?person-1 ?person2<span class="synSpecial">)</span>

<span class="synComment">;; 例</span>
<span class="synSpecial">(</span>lives-near <span class="synSpecial">(</span>Hacker Alyssa P<span class="synSpecial">)</span> <span class="synSpecial">(</span>Fect Cy D<span class="synSpecial">))</span>
<span class="synSpecial">(</span>lives-near <span class="synSpecial">(</span>Fect Cy D<span class="synSpecial">)</span> <span class="synSpecial">(</span>Hacker Alyssa P<span class="synSpecial">))</span>
</pre>


<p>これを防ぐために各人にIDを割り振る．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; 例</span>
<span class="synSpecial">(</span>id <span class="synSpecial">(</span>Bitdiddle Ben<span class="synSpecial">)</span> <span class="synConstant">0</span><span class="synSpecial">)</span>

<span class="synComment">;; そしてlives-nearをidの若いほうから表示するように書き換える</span>
<span class="synSpecial">(</span>rule <span class="synSpecial">(</span>lives-near? ?person-1 ?person-2<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span>address ?person-1 <span class="synSpecial">(</span>?town <span class="synSpecial">.</span> ?rest-1<span class="synSpecial">))</span>
           <span class="synSpecial">(</span>address ?person-2 <span class="synSpecial">(</span>?town <span class="synSpecial">.</span> ?rest-2<span class="synSpecial">))</span>
           <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span>same ?person-1 ?person-2<span class="synSpecial">))</span>
           <span class="synSpecial">(</span>id ?person1 ?id1<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>id ?person2 ?id2<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>lisp-value <span class="synIdentifier">&lt;</span> ?id1 ?id2<span class="synSpecial">)))</span>
</pre>


