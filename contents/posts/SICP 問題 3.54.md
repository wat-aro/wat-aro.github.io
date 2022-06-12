---
title: "SICP 問題 3.54"
published: 2015/12/09
tags:
  - scheme
  - SICP
---

<p>mul-streamsを定義して，0から始まるn番目の階乗，factorialsを定義する．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>mul-streams s1 s2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>stream-map <span class="synIdentifier">*</span> s1 s2<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> factorials <span class="synSpecial">(</span>cons-stream <span class="synConstant">1</span> <span class="synSpecial">(</span>mul-streams factorials
                                               <span class="synSpecial">(</span>integers-starting-from <span class="synConstant">1</span><span class="synSpecial">))))</span>
</pre>


