---
title: "SICP 問題 3.29"
published: 2015/11/24
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>or-gate a1 a2 output<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>b1 <span class="synSpecial">(</span>make-wire<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>b2 <span class="synSpecial">(</span>make-wire<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>c <span class="synSpecial">(</span>make-wire<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span>inverter a1 b1<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>inverter a2 b2<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>and-gate b1 b2 c<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>inverter c output<span class="synSpecial">)))</span>

<span class="synComment">;; 遅延時間は(+ and-gate-delay (* 2 inverter-delay))</span>
</pre>


