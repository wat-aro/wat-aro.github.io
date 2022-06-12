---
title: "SICP 問題1.32"
published: 2015/10/08
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; 再帰的プロセスで</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>accumulate combiner null-value term a next b<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">&gt;</span> a b<span class="synSpecial">)</span>
      null-value
      <span class="synSpecial">(</span>combiner <span class="synSpecial">(</span>term a<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>accumulate combiner null-value term <span class="synSpecial">(</span>next a<span class="synSpecial">)</span> next b<span class="synSpecial">))))</span>

<span class="synComment">;; 反復的プロセスで</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>accumulate combiner null-value term a next b<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>iter a result<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">&gt;</span> a b<span class="synSpecial">)</span>
        result
        <span class="synSpecial">(</span>iter <span class="synSpecial">(</span>next a<span class="synSpecial">)</span> <span class="synSpecial">(</span>combiner <span class="synSpecial">(</span>term a<span class="synSpecial">)</span> result<span class="synSpecial">))))</span>
  <span class="synSpecial">(</span>iter a null-value<span class="synSpecial">))</span>
</pre>


