---
title: "SICP 問題1.27"
published: 2015/10/07
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>carmichael-test n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>try-loop a<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">=</span> a n<span class="synSpecial">)</span> true<span class="synSpecial">)</span>
          <span class="synSpecial">((</span><span class="synIdentifier">=</span> <span class="synSpecial">(</span>expmod a n n<span class="synSpecial">)</span> a<span class="synSpecial">)</span> <span class="synSpecial">(</span>try-loop <span class="synSpecial">(</span><span class="synIdentifier">+</span> a <span class="synConstant">1</span><span class="synSpecial">)))</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span> false<span class="synSpecial">)))</span>
  <span class="synSpecial">(</span>try-loop <span class="synConstant">1</span><span class="synSpecial">))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (carmichael-test 561)
#t
gosh&gt; (prime? 561)
#f
gosh&gt; (carmichael-test 1105)
#t
gosh&gt; (prime? 1105)
#f
gosh&gt; (carmichael-test 1729)
#t
gosh&gt; (prime? 1729)
#f
gosh&gt; (carmichael-test 2465)
#t
gosh&gt; (prime? 2465)
#f
gosh&gt; (carmichael-test 2821)
#t
gosh&gt; (prime? 2821)
#f
gosh&gt; (carmichael-test 6601)
#t
gosh&gt; (prime? 6601)
#f</pre>


