---
title: "SICP 問題 3.19"
published: 2015/11/19
tags:
  - scheme
  - SICP
---

<p>答え見た．<br/>
<a href="https://github.com/nomnel/SICP/blob/master/3/19.scm">https://github.com/nomnel/SICP/blob/master/3/19.scm</a><br/>
一歩ずつ進むポインタと二歩ずつ進むポインタが同じになれば循環している．<br/>
うまいこと考えてるな.</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>look-check x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>check x0 x1<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> x0 x1<span class="synSpecial">)</span> <span class="synConstant">#t</span><span class="synSpecial">)</span>
          <span class="synSpecial">((</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> x1<span class="synSpecial">))</span> <span class="synConstant">#f</span><span class="synSpecial">)</span>
          <span class="synSpecial">((</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span><span class="synIdentifier">cddr</span> x1<span class="synSpecial">))</span> <span class="synConstant">#f</span><span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span>
           <span class="synSpecial">(</span>check <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> x1<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cddr</span> x1<span class="synSpecial">)))))</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span><span class="synIdentifier">pair?</span> x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">pair?</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> x<span class="synSpecial">)))</span>
      <span class="synSpecial">(</span>check <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cddr</span> x<span class="synSpecial">))</span>
      <span class="synConstant">#f</span><span class="synSpecial">))</span>
</pre>


