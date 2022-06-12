---
title: "[SICP]SICP 問題 2.1"
published: 2015/10/10
tags:
  - scheme
---

<p>負の引数に対応したmake-rat</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-rat n d<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let*</span> <span class="synSpecial">((</span>g <span class="synSpecial">(</span><span class="synIdentifier">gcd</span> n d<span class="synSpecial">))</span>
         <span class="synSpecial">(</span>n1 <span class="synSpecial">(</span><span class="synIdentifier">/</span> n g<span class="synSpecial">))</span>
         <span class="synSpecial">(</span>d1 <span class="synSpecial">(</span><span class="synIdentifier">/</span> d g<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">&lt;</span> d1 <span class="synConstant">0</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> <span class="synConstant">-1</span> n1<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> <span class="synConstant">-1</span> d1<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synIdentifier">cons</span> n1 d1<span class="synSpecial">))))</span>
</pre>


