---
title: "SICP 問題 3.74"
published: 2015/12/17
tags:
  - scheme
  - SICP
---

<p>last-valueを取る代わりにmapのargstreamsの二つ目に一回分遅らせたsense-dataをとればいい．<br/>
そうすれば今の値と前回の値を比べて零交差だったかをsign-change-detectorで判定できる．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-zero-crossings input-stream last-value<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>cons-stream
   <span class="synSpecial">(</span>sign-change-detector <span class="synSpecial">(</span>stream-car input-stream<span class="synSpecial">)</span> last-value<span class="synSpecial">)</span>
   <span class="synSpecial">(</span>make-zero-crossings <span class="synSpecial">(</span>stream-cdr input-stream<span class="synSpecial">)</span>
                        <span class="synSpecial">(</span>stream-car input-stream<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> zero-crossings <span class="synSpecial">(</span>make-zero-crossings sense-data <span class="synConstant">0</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>stream-map proc <span class="synSpecial">.</span> argstreams<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>stream-null? <span class="synSpecial">(</span><span class="synIdentifier">car</span> argstreams<span class="synSpecial">))</span>
      the-empty-stream
      <span class="synSpecial">(</span>cons-stream <span class="synSpecial">(</span><span class="synIdentifier">apply</span> proc <span class="synSpecial">(</span><span class="synIdentifier">map</span> stream-car argstreams<span class="synSpecial">))</span>
                   <span class="synSpecial">(</span><span class="synIdentifier">apply</span> stream-map
                          <span class="synSpecial">(</span><span class="synIdentifier">cons</span> proc <span class="synSpecial">(</span><span class="synIdentifier">map</span> stream-cdr argstreams<span class="synSpecial">))))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> zero-crossings
  <span class="synSpecial">(</span>stream-map sign-change-detector sense-data
              <span class="synSpecial">(</span>cons-stream <span class="synConstant">0</span>
                           sense-data<span class="synSpecial">)))</span>
</pre>


