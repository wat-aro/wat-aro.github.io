---
title: "SICP 問題 4.56"
published: 2016/01/15
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; 合成質問を形成する</span>
<span class="synComment">;; a Ben Bitdiddleが監督している人すべての名前とその住所</span>
<span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span>supervisor ?x <span class="synSpecial">(</span>Bitdiddle Ben<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>address ?x ?y<span class="synSpecial">))</span>

<span class="synComment">;; b Ben Bitdiddleより給料が少ない人と，Ben Bitdiddleの給料</span>
<span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span>salary <span class="synSpecial">(</span>Bitdiddle Ben<span class="synSpecial">)</span> ?Ben-amount<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>salary ?person ?amount<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>lisp-value <span class="synIdentifier">&gt;</span> ?Ben-amount ?amount<span class="synSpecial">))</span>

<span class="synComment">;; c 計算機部門にいない人が監督している人すべてと，その監督者の名前と担当．</span>
<span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span>job ?person ?type<span class="synSpecial">)</span>
     <span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span>job ?person <span class="synSpecial">(</span>computer <span class="synSpecial">.</span> ?rest<span class="synSpecial">)))</span>
          <span class="synSpecial">(</span>supervisor ?person ?supervisor<span class="synSpecial">)))</span>
</pre>


