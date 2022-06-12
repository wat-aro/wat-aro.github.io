---
title: "SICP 問題 3.17"
published: 2015/11/19
tags:
  - scheme
  - SICP
---

<p>任意の構造の異なる対の個数を返すcount-pairsを完成させる．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>count-pairs x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> pair-list <span class="synSpecial">'())</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>recur s<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">pair?</span> x<span class="synSpecial">))</span> <span class="synConstant">0</span><span class="synSpecial">)</span>
          <span class="synSpecial">((</span><span class="synIdentifier">memq</span> s pair-list<span class="synSpecial">)</span> <span class="synConstant">0</span><span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span>
           <span class="synSpecial">(</span><span class="synStatement">set!</span> pair-list <span class="synSpecial">(</span><span class="synIdentifier">cons</span> s pair-list<span class="synSpecial">))</span>
           <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span>recur <span class="synSpecial">(</span><span class="synIdentifier">car</span> x<span class="synSpecial">))</span>
              <span class="synSpecial">(</span>recur <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> x<span class="synSpecial">))</span>
              <span class="synConstant">1</span><span class="synSpecial">))))</span>
  <span class="synSpecial">(</span>recur s<span class="synSpecial">))</span>
</pre>


