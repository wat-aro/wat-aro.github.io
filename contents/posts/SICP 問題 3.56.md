---
title: "SICP 問題 3.56"
published: 2015/12/09
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>merge s1 s2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>stream-null? s1<span class="synSpecial">)</span> s2<span class="synSpecial">)</span>
        <span class="synSpecial">((</span>stream-null? s2<span class="synSpecial">)</span> s1<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>s1car <span class="synSpecial">(</span>stream-car s1<span class="synSpecial">))</span>
                    <span class="synSpecial">(</span>s2car <span class="synSpecial">(</span>stream-car s2<span class="synSpecial">)))</span>
                <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">&lt;</span> s1car s2car<span class="synSpecial">)</span>
                       <span class="synSpecial">(</span>cons-stream s1car
                                    <span class="synSpecial">(</span>merge <span class="synSpecial">(</span>stream-cdr s1<span class="synSpecial">)</span> s2<span class="synSpecial">)))</span>
                      <span class="synSpecial">((</span><span class="synIdentifier">&gt;</span> s1car s2car<span class="synSpecial">)</span>
                       <span class="synSpecial">(</span>cons-stream s2car
                                    <span class="synSpecial">(</span>merge s1 <span class="synSpecial">(</span>stream-cdr s2<span class="synSpecial">))))</span>
                      <span class="synSpecial">(</span><span class="synStatement">else</span>
                       <span class="synSpecial">(</span>cons-stream s1car
                                    <span class="synSpecial">(</span>merge <span class="synSpecial">(</span>stream-cdr s1<span class="synSpecial">)</span>
                                           <span class="synSpecial">(</span>stream-cdr s2<span class="synSpecial">)))))))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> S <span class="synSpecial">(</span>cons-stream <span class="synConstant">1</span> <span class="synSpecial">(</span>merge <span class="synSpecial">(</span>scale-stream S <span class="synConstant">2</span><span class="synSpecial">)</span>
                                <span class="synSpecial">(</span>merge <span class="synSpecial">(</span>scale-stream S <span class="synConstant">3</span><span class="synSpecial">)</span>
                                       <span class="synSpecial">(</span>scale-stream S <span class="synConstant">5</span><span class="synSpecial">)))))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (stream-ref S 0)
1
gosh&gt; (stream-ref S 1)
2
gosh&gt; (stream-ref S 2)
3
gosh&gt; (stream-ref S 3)
4
gosh&gt; (stream-ref S 4)
5
gosh&gt; (stream-ref S 5)
6
gosh&gt; (stream-ref S 6)
8
gosh&gt; (stream-ref S 7)
9
gosh&gt; (stream-ref S 8)
10</pre>


