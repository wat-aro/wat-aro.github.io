---
title: "SICP 問題1.40"
published: 2015/10/09
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>cubic a b c<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span>cube x<span class="synSpecial">)</span>
       <span class="synSpecial">(</span><span class="synIdentifier">*</span> a <span class="synSpecial">(</span>square x<span class="synSpecial">))</span>
       <span class="synSpecial">(</span><span class="synIdentifier">*</span> b x<span class="synSpecial">)</span> c<span class="synSpecial">)))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (newtons-method (cubic 3 3 1) 1)
-0.9999755158323895</pre>


