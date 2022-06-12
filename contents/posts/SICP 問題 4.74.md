---
title: "SICP 問題 4.74"
published: 2016/01/21
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; negate, lisp-value, singleton-streamはflatten-streamを変更して直列にしても問題ないのではという問題</span>
<span class="synComment">;; 元のflatten-stream</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>flatten-stream stream<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>stream-null? stream<span class="synSpecial">)</span>
      the-empty-stream
      <span class="synSpecial">(</span>interleave-delayed
       <span class="synSpecial">(</span>stream-car stream<span class="synSpecial">)</span>
       <span class="synSpecial">(</span><span class="synStatement">delay</span> <span class="synSpecial">(</span>flatten-stream <span class="synSpecial">(</span>stream-cdr stream<span class="synSpecial">))))))</span>

<span class="synComment">;; a 差し込みを使わないsimple-flattenの実装</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>simbple-stream-flatmap proc s<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>simple-flatten <span class="synSpecial">(</span>stream-map proc s<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>simple-flatten stream<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>stream-map stream-car
              <span class="synSpecial">(</span>stream-filter <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>s<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> s<span class="synSpecial">)))</span>
                             stream<span class="synSpecial">)))</span>

<span class="synComment">;; b</span>
<span class="synComment">;; negate, lisp-valueはsinbleton-streamを取るので交互にしても直列にしても結果は変わらない．</span>
<span class="synComment">;; find-assertionsの場合はfetch-assertionsで対応する表明を集めてきているので同じく変わらない．</span>
</pre>


