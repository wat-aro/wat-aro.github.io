---
title: "SICP 問題 3.30"
published: 2015/11/25
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; 最後のfull-adderのc-inは0．</span>
<span class="synComment">;; (make-wire)の初期値は0と仮定してます．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>ripple-carry-adder Ak Bk Sk C<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>c-in <span class="synSpecial">(</span>make-wire<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> Ak<span class="synSpecial">))</span>
           <span class="synSpecial">(</span>full-adder <span class="synSpecial">(</span><span class="synIdentifier">car</span> Ak<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> Bk<span class="synSpecial">)</span> <span class="synConstant">0</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> Sk<span class="synSpecial">)</span> C<span class="synSpecial">)</span>
           <span class="synSpecial">'</span>ok<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span>
           <span class="synSpecial">(</span>full-adder <span class="synSpecial">(</span><span class="synIdentifier">car</span> Ak<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> Bk<span class="synSpecial">)</span> c-in <span class="synSpecial">(</span><span class="synIdentifier">car</span> Sk<span class="synSpecial">)</span> C<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>ripple-carry-adder <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> Ak<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> Bk<span class="synSpecial">)</span> <span class="synSpecial">(</span>make-wire<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> Sk<span class="synSpecial">)</span> c-in<span class="synSpecial">)))))</span>
</pre>


