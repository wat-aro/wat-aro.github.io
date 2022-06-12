---
title: "SICP 問題 2.33"
published: 2015/10/20
tags:
  - scheme
  - SICP
---

<p>accumulateを使ってmap,append,lengthを実装する．<br/>
　</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>accumulate op initial sequence<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> sequence<span class="synSpecial">)</span>
      initial
      <span class="synSpecial">(</span>op <span class="synSpecial">(</span><span class="synIdentifier">car</span> sequence<span class="synSpecial">)</span>
          <span class="synSpecial">(</span>accumulate op initial <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> sequence<span class="synSpecial">)))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">map</span> p sequence<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>accumulate <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x y<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>p x<span class="synSpecial">)</span> y<span class="synSpecial">))</span> nil sequence<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">append</span> seq1 seq2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>accumulate <span class="synIdentifier">cons</span> seq2 seq1<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">length</span> sequence<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>accumulate <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x y<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synConstant">1</span> y<span class="synSpecial">))</span> <span class="synConstant">0</span> sequence<span class="synSpecial">))</span>
</pre>


