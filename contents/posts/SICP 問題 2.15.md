---
title: "SICP 問題 2.15"
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


<p>　<br/>
　<br/>
<code>par1</code>には不確かな数(r1,r2)が４回出てきている．　<br/>
<code>par2</code>には不確かな数が２回．　<br/>
そのため<code>par2</code>のほうが誤差が小さい．<br/>
　</p>

<pre class="code" data-lang="" data-unlink>gosh&gt; (define r1 (make-center-percent 5 5))
r1
gosh&gt; (define r2 (make-center-percent 20 5))
r2
gosh&gt; (define p1 (par1 r1 r2))
p1
gosh&gt; (define p2 (par2 r1 r2))
P2
gosh&gt; (center p1)
4.040100250626566
gosh&gt; (percent p1)
14.900744416873444
gosh&gt; (center p2)
4.0
gosh&gt; (percent p2)
4.999999999999999</pre>


