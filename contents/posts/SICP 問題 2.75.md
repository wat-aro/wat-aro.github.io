---
title: "SICP 問題 2.75"
published: 2015/10/30
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-from-mag-ang r a<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>dispatch op<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> op <span class="synSpecial">'</span>magnitude<span class="synSpecial">)</span> r<span class="synSpecial">)</span>
          <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> op <span class="synSpecial">'</span>angle<span class="synSpecial">)</span> a<span class="synSpecial">)</span>
          <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> op <span class="synSpecial">'</span>real-part<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> r <span class="synSpecial">(</span><span class="synIdentifier">cos</span> a<span class="synSpecial">)))</span>
          <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> op <span class="synSpecial">'</span>imag-part<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> r <span class="synSpecial">(</span><span class="synIdentifier">sin</span> a<span class="synSpecial">)))</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span>
           <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown op -- MAKE-FROM-MAG-ANG&quot;</span> op<span class="synSpecial">))))</span>
  dispatch<span class="synSpecial">)</span>
</pre>


