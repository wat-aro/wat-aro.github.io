---
title: "SICP 問題 3.60"
published: 2015/12/10
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>stream-head s n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> iter <span class="synSpecial">((</span>s s<span class="synSpecial">)</span>
             <span class="synSpecial">(</span>n n<span class="synSpecial">))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">zero?</span> n<span class="synSpecial">)</span>
        <span class="synSpecial">'</span>done
        <span class="synSpecial">(</span><span class="synStatement">begin</span>
          <span class="synSpecial">(</span><span class="synIdentifier">display</span> <span class="synSpecial">(</span>stream-car s<span class="synSpecial">))</span>
          <span class="synSpecial">(</span><span class="synIdentifier">display</span> <span class="synConstant">&quot; &quot;</span><span class="synSpecial">)</span>
          <span class="synSpecial">(</span>iter <span class="synSpecial">(</span>stream-cdr s<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">1</span><span class="synSpecial">))))))</span>


<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>mul-series s1 s2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>cons-stream <span class="synSpecial">(</span><span class="synIdentifier">*</span> <span class="synSpecial">(</span>stream-car s1<span class="synSpecial">)</span>
                  <span class="synSpecial">(</span>stream-car s2<span class="synSpecial">))</span>
               <span class="synSpecial">(</span>add-streams
                <span class="synSpecial">(</span>scale-stream <span class="synSpecial">(</span>stream-cdr s2<span class="synSpecial">)</span> <span class="synSpecial">(</span>stream-car s1<span class="synSpecial">))</span>
                <span class="synSpecial">(</span>mul-series <span class="synSpecial">(</span>stream-cdr s1<span class="synSpecial">)</span> s2<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> circles <span class="synSpecial">(</span>add-streams <span class="synSpecial">(</span>mul-series sine-series sine-series<span class="synSpecial">)</span>
                             <span class="synSpecial">(</span>mul-series cosine-series cosine-series<span class="synSpecial">)))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (stream-head circles 10)
1 0 0 0 0 0 0 0 0 0 done</pre>


