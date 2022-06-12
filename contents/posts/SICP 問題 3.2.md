---
title: "SICP 問題 3.2"
published: 2015/11/05
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-monitored f<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>mf <span class="synConstant">0</span><span class="synSpecial">))</span>
    <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>in<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> in <span class="synSpecial">'</span>how-many-calls?<span class="synSpecial">)</span> mf<span class="synSpecial">)</span>
            <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> in <span class="synSpecial">'</span>reset-count<span class="synSpecial">)</span>
             <span class="synSpecial">(</span><span class="synStatement">set!</span> mf <span class="synConstant">0</span><span class="synSpecial">))</span>
            <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synStatement">set!</span> mf <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synConstant">1</span> mf<span class="synSpecial">))</span>
                  <span class="synSpecial">(</span>f in<span class="synSpecial">))))))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (define s (make-monitored sqrt))
s
gosh&gt; (s 100)
10
gosh&gt; (s &#39;how-many-calls?)
1
gosh&gt; (s &#39;reset-count)
0
gosh&gt; (s &#39;how-many-calls?)
0</pre>


