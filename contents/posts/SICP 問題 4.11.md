---
title: "SICP 問題 4.11"
published: 2015/12/21
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; フレームを束縛のリストとして表現</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-frame variables <span class="synIdentifier">values</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synIdentifier">cons</span> variables <span class="synIdentifier">values</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>first-binding frame<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> frame<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>rest-bindings frame<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> frame<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>binding-variable binding<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> binding<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>binding-value binding<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> binding<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-binding var val<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> var val<span class="synSpecial">))</span>


<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>add-binding-to-frame! var val fram<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">set!</span> frame <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>make-binding var val<span class="synSpecial">)</span> frame<span class="synSpecial">)))</span>

<span class="synComment">;; 変更無し</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>extend-environment vars vals base-env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> <span class="synSpecial">(</span><span class="synIdentifier">length</span> vars<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">length</span> vals<span class="synSpecial">))</span>
      <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>make-frame vars vals<span class="synSpecial">)</span> base-env<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">&lt;</span> <span class="synSpecial">(</span><span class="synIdentifier">length</span> vars<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">length</span> vals<span class="synSpecial">))</span>
          <span class="synSpecial">(</span>error <span class="synConstant">&quot;Too many arguments supplied&quot;</span> vars vals<span class="synSpecial">)</span>
          <span class="synSpecial">(</span>error <span class="synConstant">&quot;Too few arguments supplied&quot;</span> vars vals<span class="synSpecial">))))</span>

<span class="synComment">;; 変更無し</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>lookup-variable-value var env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>env-loop env<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>scan vars vals<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> vars<span class="synSpecial">)</span>
             <span class="synSpecial">(</span>env-loop <span class="synSpecial">(</span>enclosing-environment env<span class="synSpecial">)))</span>
            <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> var <span class="synSpecial">(</span><span class="synIdentifier">car</span> vars<span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> vals<span class="synSpecial">))</span>
            <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>scan <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> vars<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> vals<span class="synSpecial">)))))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> env the-empty-environment<span class="synSpecial">)</span>
        <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unbound variable&quot;</span> var<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>frame <span class="synSpecial">(</span>first-frame env<span class="synSpecial">)))</span>
          <span class="synSpecial">(</span>scan <span class="synSpecial">(</span>frame-variables frame<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>frame-values frame<span class="synSpecial">)))))</span>
  <span class="synSpecial">(</span>env-loop env<span class="synSpecial">))</span>

<span class="synComment">;; frame-variablesとframe-valuesを作ればset-variable-value!とdefine-variable!は変更なし</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>frame-variables frame<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synIdentifier">car</span> frame<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>frame-values frame<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synIdentifier">cdr</span> frame<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>set-variable-value! var val env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>env-loop env<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>scan vars vals<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> vars<span class="synSpecial">)</span>
             <span class="synSpecial">(</span>env-loop <span class="synSpecial">(</span>enclosing-environment env<span class="synSpecial">)))</span>
            <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> var <span class="synSpecial">(</span><span class="synIdentifier">car</span> vars<span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synIdentifier">set-car!</span> vals val<span class="synSpecial">))</span>
            <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>scan <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> vars<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> vals<span class="synSpecial">)))))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> env the-empty-environment<span class="synSpecial">)</span>
        <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unbound variable: SET!&quot;</span> var<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>frame <span class="synSpecial">(</span>first-frame env<span class="synSpecial">)))</span>
          <span class="synSpecial">(</span>scan <span class="synSpecial">(</span>frame-variables frame<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>frame-values frame<span class="synSpecial">)))))</span>
  <span class="synSpecial">(</span>env-loop env<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>define-variable! var val env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>frame <span class="synSpecial">(</span>first-frame env<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>scan vars vals<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> vars<span class="synSpecial">)</span>
             <span class="synSpecial">(</span>add-binding-to-frame! var val frame<span class="synSpecial">))</span>
            <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> var <span class="synSpecial">(</span><span class="synIdentifier">car</span> vars<span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synIdentifier">set-car!</span> vals val<span class="synSpecial">))</span>
            <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>scan <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> vars<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> vals<span class="synSpecial">)))))</span>
    <span class="synSpecial">(</span>scan <span class="synSpecial">(</span>frame-variables frame<span class="synSpecial">)</span> <span class="synSpecial">(</span>frame-values frame<span class="synSpecial">))))</span>

<span class="synComment">;; 作らない場合はassqで走査する</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>set-variable-value var val env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>env-loop env<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>target <span class="synSpecial">(</span><span class="synIdentifier">assq</span> var <span class="synSpecial">(</span>first-frame env<span class="synSpecial">))))</span>
      <span class="synSpecial">(</span><span class="synStatement">if</span> target
          <span class="synSpecial">(</span><span class="synIdentifier">set-cdr!</span> target val<span class="synSpecial">)</span>
          <span class="synSpecial">(</span>env-loop <span class="synSpecial">(</span>enclosing-environment env<span class="synSpecial">))))))</span>
<span class="synSpecial">(</span>env-loop env<span class="synSpecial">)</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>define-variable! var val env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let*</span> <span class="synSpecial">((</span>frame <span class="synSpecial">(</span>first-frame env<span class="synSpecial">))</span>
         <span class="synSpecial">(</span>target <span class="synSpecial">(</span><span class="synIdentifier">assq</span> var frame<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> target
        <span class="synSpecial">(</span><span class="synIdentifier">set-cdr!</span> target val<span class="synSpecial">)</span>
        <span class="synSpecial">(</span>add-binding-to-frame! var val frame<span class="synSpecial">))))</span>
</pre>


