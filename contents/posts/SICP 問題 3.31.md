---
title: "SICP 問題 3.31"
published: 2015/11/26
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; accept-action-procedure!でprocを実行して初期化している部分で初期化しないとどうなるか．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-wire<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>signal-value <span class="synConstant">0</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span>action-procedures <span class="synSpecial">'()))</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>set-my-signal! new-value<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> signal-value new-value<span class="synSpecial">))</span>
          <span class="synSpecial">(</span><span class="synStatement">begin</span> <span class="synSpecial">(</span><span class="synStatement">set!</span> signal-value new-value<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span>call-each action-procedures<span class="synSpecial">))</span>
          <span class="synSpecial">'</span>done<span class="synSpecial">))</span>

    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>accept-action-procedure! proc<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">set!</span> action-procedures <span class="synSpecial">(</span><span class="synIdentifier">cons</span> proc action-procedures<span class="synSpecial">))</span>
      <span class="synSpecial">(</span>proc<span class="synSpecial">))</span> <span class="synComment">;;この(proc)がないとどうなるか</span>

    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>dispatch m<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> m <span class="synSpecial">'</span>get-signal<span class="synSpecial">)</span> signal-value<span class="synSpecial">)</span>
            <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> m <span class="synSpecial">'</span>set-signal!<span class="synSpecial">)</span> set-my-signal!<span class="synSpecial">)</span>
            <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> m <span class="synSpecial">'</span>add-action!<span class="synSpecial">)</span> accept-action-procedure!<span class="synSpecial">)</span>
            <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown operation -- WIRE&quot;</span> m<span class="synSpecial">))))</span>
    dispatch<span class="synSpecial">))</span>

<span class="synComment">;; and-gate手続きをつかって述べる．</span>
<span class="synComment">;; ここでprocがないとここの内部定義and-action-procedureを登録しているだけで実行しない．</span>
<span class="synComment">;; つまりafter-delayも実行しない．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>and-gate a1 a2 output<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>and-action-procedure<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>new-value
           <span class="synSpecial">(</span>logical-and <span class="synSpecial">(</span>get-signal a1<span class="synSpecial">)</span> <span class="synSpecial">(</span>get-signal a2<span class="synSpecial">))))</span>
      <span class="synSpecial">(</span>after-delay and-gate-delay
                   <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">()</span>
                     <span class="synSpecial">(</span>set-signal! output new-value<span class="synSpecial">)))))</span>
  <span class="synSpecial">(</span>add-action! a1 and-action-procedure<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>add-action! a2 and-action-procedure<span class="synSpecial">)</span>
  <span class="synSpecial">'</span>ok<span class="synSpecial">)</span>

<span class="synComment">;; after-delay手続きでthe-agendaに登録している．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>after-delay <span class="synStatement">delay</span> action<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>add-to-agenda! <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synStatement">delay</span> <span class="synSpecial">(</span>current-time the-agenda<span class="synSpecial">))</span>
                  action
                  the-agenda<span class="synSpecial">))</span>

<span class="synComment">;; propagateはthe-agendaに登録されたactionを一つずつ実行する．</span>
<span class="synComment">;; after-delayが呼ばれていないので何も登録されていないため何も実行できない．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>propagate<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>empty-agenda? the-agenda<span class="synSpecial">)</span>
      <span class="synSpecial">'</span>done
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>first-item <span class="synSpecial">(</span>first-agenda-item the-agenda<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span>first-item<span class="synSpecial">)</span>
        <span class="synSpecial">(</span>remove-first-agenda-item! the-agenda<span class="synSpecial">)</span>
        <span class="synSpecial">(</span>propagate<span class="synSpecial">))))</span>
</pre>


