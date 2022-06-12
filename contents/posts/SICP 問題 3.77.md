---
title: "SICP 問題 3.77"
published: 2015/12/17
tags:
  - scheme
  - SICP
---

<p>ループのあるシステムで使えるようにintegrandをdelayed-integrandにする．<br/>
integralを呼び出す時の第一引数にはdelayをつける</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>integral integrand initial-value dt<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>cons-stream initial-value
               <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>stream-null? integrand<span class="synSpecial">)</span>
                   the-empty-stream
                   <span class="synSpecial">(</span>integral <span class="synSpecial">(</span>stream-cdr integrand<span class="synSpecial">)</span>
                             <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> dt <span class="synSpecial">(</span>stream-car integrand<span class="synSpecial">))</span>
                                initial-value<span class="synSpecial">)</span>
                             dt<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>integral delayed-integrand initial-value dt<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>cons-stream initial-value
               <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>integrand <span class="synSpecial">(</span><span class="synIdentifier">force</span> delayed-integrand<span class="synSpecial">)))</span>
                 <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>stream-null? integrand<span class="synSpecial">)</span>
                     the-empty-stream
                     <span class="synSpecial">(</span>integral <span class="synSpecial">(</span><span class="synStatement">delay</span> <span class="synSpecial">(</span>stream-cdr integrand<span class="synSpecial">))</span>
                               <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> dt <span class="synSpecial">(</span>stream-car integrand<span class="synSpecial">))</span>
                                  initial-value<span class="synSpecial">)</span>
                               dt<span class="synSpecial">)))))</span>
</pre>


