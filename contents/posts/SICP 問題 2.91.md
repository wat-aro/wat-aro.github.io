---
title: "SICP 問題 2.91"
published: 2015/11/05
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>div-terms L1 L2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>empty-termlist? L1<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span>the-empty-termlist<span class="synSpecial">)</span> <span class="synSpecial">(</span>the-empty-termlist<span class="synSpecial">))</span>
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>t1 <span class="synSpecial">(</span>first-term L1<span class="synSpecial">))</span>
            <span class="synSpecial">(</span>t2 <span class="synSpecial">(</span>first-term L2<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">&gt;</span> <span class="synSpecial">(</span>order t2<span class="synSpecial">)</span> <span class="synSpecial">(</span>order t1<span class="synSpecial">))</span>
            <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span>the-empty-termlist<span class="synSpecial">)</span> L1<span class="synSpecial">)</span>
            <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>new-c <span class="synSpecial">(</span>div <span class="synSpecial">(</span>coeff t1<span class="synSpecial">)</span> <span class="synSpecial">(</span>coeff t2<span class="synSpecial">)))</span>
                  <span class="synSpecial">(</span>new-o <span class="synSpecial">(</span><span class="synIdentifier">-</span> <span class="synSpecial">(</span>order t1<span class="synSpecial">)</span> <span class="synSpecial">(</span>order t2<span class="synSpecial">))))</span>
              <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>rest-of-result
                     <span class="synSpecial">(</span>div-terms <span class="synSpecial">(</span>sub-terms L1
                                           <span class="synSpecial">(</span>mul-terms L2
                                                      <span class="synSpecial">(</span>make-term new-o
                                                                 new-c<span class="synSpecial">)))</span>
                                L2<span class="synSpecial">)))</span>
                <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span>add-terms <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span>make-term new-o new-c<span class="synSpecial">))</span>
                                 <span class="synSpecial">(</span><span class="synIdentifier">car</span> rest-of-result<span class="synSpecial">))</span>
                      <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> rest-of-result<span class="synSpecial">))))))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>div-poly p1 p2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>same-variable? <span class="synSpecial">(</span>variable p1<span class="synSpecial">)</span> <span class="synSpecial">(</span>variable p2<span class="synSpecial">))</span>
      <span class="synSpecial">(</span>make-poly <span class="synSpecial">(</span>variable p1<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span>div <span class="synSpecial">(</span>term-list p1<span class="synSpecial">)</span>
                      <span class="synSpecial">(</span>term-list p2<span class="synSpecial">)))</span>
      <span class="synSpecial">(</span>error <span class="synConstant">&quot;Polys not in same var -- DIV POLY&quot;</span>
             <span class="synSpecial">(</span><span class="synIdentifier">list</span> p1 p2<span class="synSpecial">))))</span>
</pre>


