---
title: "SICP 問題 4.63"
published: 2016/01/17
tags:
  - scheme
  - SICP
---

<p>SはGの孫であるという規則の形式化</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span>rule <span class="synSpecial">(</span>?son son-of ?dad<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">or</span> <span class="synSpecial">(</span>son ?dad ?son<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span>wife ?dad ?mam<span class="synSpecial">)</span>
               <span class="synSpecial">(</span>son ?mam ?son<span class="synSpecial">))))</span>

<span class="synSpecial">(</span>rule <span class="synSpecial">(</span>?grandson grandson-of ?granddad<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span>?parent son-of ?grandson<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>?grandson son-of ?parent<span class="synSpecial">)))</span>
</pre>


