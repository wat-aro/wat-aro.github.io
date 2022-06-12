---
title: "SICP 問題 3.06"
published: 2015/11/06
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; オリジナルのrand</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> rand <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>x random-init<span class="synSpecial">))</span>
               <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">()</span>
                 <span class="synSpecial">(</span><span class="synStatement">set!</span> x <span class="synSpecial">(</span>rand-update x<span class="synSpecial">))</span>
                 x<span class="synSpecial">)))</span>

<span class="synComment">;; 'generateで乱数生成，'resetで引数の数字で初期化するrand</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> rand
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>x random-init<span class="synSpecial">))</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>reset new-rand<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">set!</span> x new-rand<span class="synSpecial">)</span>
      x<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>generate<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">set!</span> x <span class="synSpecial">(</span>rand-update x<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>dispatch m<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> m <span class="synSpecial">'</span>reset<span class="synSpecial">)</span>
             reset<span class="synSpecial">)</span>
            <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> m <span class="synSpecial">'</span>generate<span class="synSpecial">)</span>
             <span class="synSpecial">(</span>generate<span class="synSpecial">))</span>
            <span class="synSpecial">(</span><span class="synStatement">else</span>
             <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown argument -- RAND&quot;</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> m<span class="synSpecial">)))))</span>
    dispatch<span class="synSpecial">))</span>
</pre>


