---
title: "SICP 問題1.28"
published: 2015/10/07
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>miller-rabin-test n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>expmod base <span class="synIdentifier">exp</span> m<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">=</span> <span class="synIdentifier">exp</span> <span class="synConstant">0</span><span class="synSpecial">)</span> <span class="synConstant">1</span><span class="synSpecial">)</span>
          <span class="synSpecial">((</span><span class="synIdentifier">even?</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
           <span class="synSpecial">(</span><span class="synStatement">let*</span> <span class="synSpecial">((</span>tmp <span class="synSpecial">(</span>expmod base <span class="synSpecial">(</span><span class="synIdentifier">/</span> <span class="synIdentifier">exp</span> <span class="synConstant">2</span><span class="synSpecial">)</span> m<span class="synSpecial">))</span>
                  <span class="synSpecial">(</span>tmp2 <span class="synSpecial">(</span><span class="synIdentifier">remainder</span> <span class="synSpecial">(</span>square tmp<span class="synSpecial">)</span> m<span class="synSpecial">)))</span>
             <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span><span class="synIdentifier">&lt;</span> <span class="synConstant">1</span> tmp <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">1</span><span class="synSpecial">))</span> <span class="synComment">;; 1でも(n-1)でもなく，かつ</span>
                      <span class="synSpecial">(</span><span class="synIdentifier">=</span> <span class="synConstant">1</span> tmp2<span class="synSpecial">))</span> <span class="synComment">;; nを法として１の自明でない平方根の時は０を返す</span>
                 <span class="synConstant">0</span>
                 tmp2<span class="synSpecial">)))</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">remainder</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> base <span class="synSpecial">(</span>expmod base <span class="synSpecial">(</span><span class="synIdentifier">-</span> <span class="synIdentifier">exp</span> <span class="synConstant">1</span><span class="synSpecial">)</span> m<span class="synSpecial">))</span> m<span class="synSpecial">))))</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>try-it a<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synIdentifier">=</span> <span class="synConstant">1</span> <span class="synSpecial">(</span>expmod a <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">1</span><span class="synSpecial">)</span> n<span class="synSpecial">)))</span>
  <span class="synSpecial">(</span>try-it <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synConstant">1</span> <span class="synSpecial">(</span>random-integer <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">1</span><span class="synSpecial">)))))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (miller-rabin-test 561)
#f
gosh&gt; (miller-rabin-test 1105)
#t
gosh&gt; (miller-rabin-test 1105)
#f
gosh&gt; (miller-rabin-test 1729)
#f
gosh&gt; (miller-rabin-test 2465)
#f
gosh&gt; (miller-rabin-test 2821)
#f
gosh&gt; (miller-rabin-test 6601)
#f</pre>


