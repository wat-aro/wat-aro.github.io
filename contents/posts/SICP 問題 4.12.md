---
title: "SICP 問題 4.12"
published: 2015/12/21
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; scanとenv-loopを抜き出す．</span>
<span class="synComment">;; 見つかった時の手続きをprocで渡す．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>scan var vars vals proc<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> vars<span class="synSpecial">)</span> <span class="synConstant">#f</span><span class="synSpecial">)</span>
        <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> var <span class="synSpecial">(</span><span class="synIdentifier">car</span> vars<span class="synSpecial">))</span> <span class="synSpecial">(</span>proc var vars vals<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>scan var <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> vars<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> vals<span class="synSpecial">)</span> proc<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>env-loop var env proc<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> env the-empty-environment<span class="synSpecial">)</span>
      <span class="synConstant">#f</span>
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>frame <span class="synSpecial">(</span>first-frame env<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>val <span class="synSpecial">(</span>scan var
                         <span class="synSpecial">(</span>frame-variables frame<span class="synSpecial">)</span>
                         <span class="synSpecial">(</span>frame-values frame<span class="synSpecial">)</span>
                         proc<span class="synSpecial">)))</span>
          <span class="synSpecial">(</span><span class="synStatement">or</span> val <span class="synSpecial">(</span>env-loop var <span class="synSpecial">(</span>enclosing-environment env<span class="synSpecial">)</span> proc<span class="synSpecial">))))))</span>


<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>lookup-variable-value var env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>target <span class="synSpecial">(</span>env-loop var env <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>var vars vals<span class="synSpecial">)</span> vals<span class="synSpecial">))))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> target
        <span class="synSpecial">(</span><span class="synIdentifier">car</span> target<span class="synSpecial">)</span>
        <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unbound variable&quot;</span> var<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>set-variable-value! var val env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>target <span class="synSpecial">(</span>env-loop var env <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>var vars vals<span class="synSpecial">)</span>
                                    <span class="synSpecial">(</span><span class="synIdentifier">set-car!</span> vals val<span class="synSpecial">)))))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> target
        target
        <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unbound variable: SET!&quot;</span> var<span class="synSpecial">))))</span>

<span class="synComment">;; 見つかればtargetにvalsが束縛される．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>define-variable! var val env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>frame <span class="synSpecial">(</span>first-frame env<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>target <span class="synSpecial">(</span>scan var <span class="synSpecial">(</span>frame-variables frame<span class="synSpecial">)</span> <span class="synSpecial">(</span>frame-values frame<span class="synSpecial">)</span>
                        <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>var vars vals<span class="synSpecial">)</span> vals<span class="synSpecial">))))</span>
      <span class="synSpecial">(</span><span class="synStatement">if</span> target
          <span class="synSpecial">(</span><span class="synIdentifier">set-car!</span> target val<span class="synSpecial">)</span>
          <span class="synSpecial">(</span>add-binding-to-frame! var val frame<span class="synSpecial">)))))</span>
</pre>


