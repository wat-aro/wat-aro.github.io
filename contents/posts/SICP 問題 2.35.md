---
title: "SICP 問題 2.35"
published: 2015/10/21
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;;accumulate</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>accumulate op initial sequence<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> sequence<span class="synSpecial">)</span>
      initial
      <span class="synSpecial">(</span>op <span class="synSpecial">(</span><span class="synIdentifier">car</span> sequence<span class="synSpecial">)</span>
          <span class="synSpecial">(</span>accumulate op initial <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> sequence<span class="synSpecial">)))))</span>

<span class="synComment">;;enumerate-tree</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>enumerate-tree tree<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> tree<span class="synSpecial">)</span> nil<span class="synSpecial">)</span>
        <span class="synSpecial">((</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">pair?</span> tree<span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> tree<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">append</span> <span class="synSpecial">(</span>enumerate-tree <span class="synSpecial">(</span><span class="synIdentifier">car</span> tree<span class="synSpecial">))</span>
                      <span class="synSpecial">(</span>enumerate-tree <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> tree<span class="synSpecial">))))))</span>

<span class="synComment">;;count-leaves</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>count-leaves tree<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>accumulate <span class="synIdentifier">+</span> <span class="synConstant">0</span> <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synConstant">1</span><span class="synSpecial">)</span>
                       <span class="synSpecial">(</span>enumerate-tree tree<span class="synSpecial">))))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (count-leaves (list 1 2 (list 3) (list 4 5 (list 6)) 7))
7</pre>


