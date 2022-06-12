---
title: "SICP 問題 4.13"
published: 2015/12/22
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>scan var vars vals proc<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> vars<span class="synSpecial">)</span> <span class="synConstant">#f</span><span class="synSpecial">)</span>
        <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> var <span class="synSpecial">(</span><span class="synIdentifier">car</span> vars<span class="synSpecial">))</span> <span class="synSpecial">(</span>proc var vars vals<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>scan var <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> vars<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> vals<span class="synSpecial">)</span> proc<span class="synSpecial">))))</span>

<span class="synComment">;; 束縛された変数を解放するmake-unbound!</span>
<span class="synComment">;; first-frameだけでに限定しないと</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-unbound! var env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>frame <span class="synSpecial">(</span>first-frame env<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>target <span class="synSpecial">(</span>scan var <span class="synSpecial">(</span>frame-variables frame<span class="synSpecial">)</span> <span class="synSpecial">(</span>frame-values frame<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>var vars vals<span class="synSpecial">)</span>
                                                             <span class="synSpecial">(</span><span class="synStatement">set!</span> vars <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> vars<span class="synSpecial">))</span>
                                                             <span class="synSpecial">(</span><span class="synStatement">set!</span> vals <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> vals<span class="synSpecial">))</span>
                                                             <span class="synSpecial">'</span>ok<span class="synSpecial">))))</span>
      <span class="synSpecial">(</span><span class="synStatement">if</span> target
          target
          <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unbound variable&quot;</span> var<span class="synSpecial">)))))</span>
</pre>


