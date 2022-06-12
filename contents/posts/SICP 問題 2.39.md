---
title: "SICP 問題 2.39"
published: 2015/10/21
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">fold-left</span> op initial sequence<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>iter result rest<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> rest<span class="synSpecial">)</span>
        result
        <span class="synSpecial">(</span>iter <span class="synSpecial">(</span>op result <span class="synSpecial">(</span><span class="synIdentifier">car</span> rest<span class="synSpecial">))</span>
              <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> rest<span class="synSpecial">))))</span>
  <span class="synSpecial">(</span>iter initial sequence<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">fold-right</span> op initial sequence<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> sequence<span class="synSpecial">)</span>
      initial
      <span class="synSpecial">(</span>op <span class="synSpecial">(</span><span class="synIdentifier">car</span> sequence<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synIdentifier">fold-right</span> op initial <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> sequence<span class="synSpecial">)))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">reverse</span> sequence<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">fold-right</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x y<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">append</span> y <span class="synSpecial">(</span><span class="synIdentifier">list</span> x<span class="synSpecial">)))</span> nil sequence<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">reverse</span> sequence<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">fold-left</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x y<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> y x<span class="synSpecial">))</span> nil sequence<span class="synSpecial">))</span>
</pre>


