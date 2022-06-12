---
title: "SICP 問題 3.82"
published: 2015/12/17
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>random-in-range x1 x2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">+</span> x1 <span class="synSpecial">(</span>random-integer <span class="synSpecial">(</span><span class="synIdentifier">-</span> x2 x1<span class="synSpecial">))))</span>


<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>estimate-integral p x1 x2 y1 y2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>stream-map <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>n<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> n <span class="synSpecial">(</span><span class="synIdentifier">-</span> x2 x1<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">-</span> y2 y1<span class="synSpecial">)))</span>
              <span class="synSpecial">(</span>monte-carlo
               <span class="synSpecial">(</span>stream-map p
                           <span class="synSpecial">(</span>stream-map <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span>random-in-range x1 x2<span class="synSpecial">))</span> integers<span class="synSpecial">)</span>
                           <span class="synSpecial">(</span>stream-map <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span>random-in-range y1 y2<span class="synSpecial">))</span> integers<span class="synSpecial">))</span>
               <span class="synConstant">0.0</span> <span class="synConstant">0.0</span><span class="synSpecial">)))</span>
</pre>


