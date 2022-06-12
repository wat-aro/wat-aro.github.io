---
title: "SICP 問題 4.69"
published: 2016/01/18
tags:
  - scheme
  - SICP
---

<p>((great great grandson) adam Irad)のような質問ができるようにする．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span>rule <span class="synSpecial">(</span>greatson-end ?x<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>append-to-form ?u <span class="synSpecial">(</span>grandson<span class="synSpecial">)</span> ?x<span class="synSpecial">))</span>

<span class="synSpecial">(</span>rule <span class="synSpecial">((</span>grandson<span class="synSpecial">)</span> ?x<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>grandson ?x<span class="synSpecial">))</span>
<span class="synSpecial">(</span>rule <span class="synSpecial">((</span>great <span class="synSpecial">.</span> ?rel<span class="synSpecial">)</span> ?x ?y<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span>greatson-end ?rel<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>son-of ?x ?z<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>?rel ?z ?y<span class="synSpecial">)))</span>
</pre>


