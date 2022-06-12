---
title: "SICP 問題 2.14"
published: 2015/10/18
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>par1 r1 r2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>div-interval <span class="synSpecial">(</span>mul-interval r1 r2<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>add-interval r1 r2<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>par2 r1 r2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>one <span class="synSpecial">(</span>make-interval <span class="synConstant">1</span> <span class="synConstant">1</span><span class="synSpecial">)))</span>
    <span class="synSpecial">(</span>div-interval one
                  <span class="synSpecial">(</span>add-interval <span class="synSpecial">(</span>div-interval one r1<span class="synSpecial">)</span>
                                <span class="synSpecial">(</span>div-interval one r2<span class="synSpecial">)))))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (define small (make-center-percent 10 1.0))
small
gosh&gt; small
(9.9 . 10.1)
gosh&gt; (define lerge (make-center-percent 20.0 20))
lerge
gosh&gt; lerge
(16.0 . 24.0)
gosh&gt; (par1 small lerge)
(4.645161290322581 . 9.359073359073358)
gosh&gt; (par2 small lerge)
(6.115830115830116 . 7.108504398826979)</pre>


