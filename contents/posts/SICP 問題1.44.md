---
title: "SICP 問題1.44"
published: 2015/10/09
tags:
  - scheme
  - SICP
---

<p>平滑化関数とn重平滑化関数</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>smooth f<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>dx <span class="synConstant">0.0001</span><span class="synSpecial">))</span>
    <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synIdentifier">/</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span>f <span class="synSpecial">(</span><span class="synIdentifier">-</span> x dx<span class="synSpecial">))</span>
            <span class="synSpecial">(</span>f x<span class="synSpecial">)</span>
            <span class="synSpecial">(</span>f <span class="synSpecial">(</span><span class="synIdentifier">+</span> x dx<span class="synSpecial">)))</span>
         <span class="synConstant">3</span><span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>n-fold-smooth f n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span>
    <span class="synSpecial">((</span>repeated smooth n<span class="synSpecial">)</span> x<span class="synSpecial">)))</span>
</pre>


