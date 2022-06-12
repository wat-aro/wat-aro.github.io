---
title: "SICP 問題 5.40"
published: 2016/02/09
tags:
  - scheme
  - SICP
---

<p>翻訳時環境を維持し，compile-lambda-bodyで拡張するように変更する．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>compile-lambda-body <span class="synIdentifier">exp</span> proc-entry ct-env<span class="synSpecial">)</span> <span class="synComment">;; ct-envを追加</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>formals <span class="synSpecial">(</span>lambda-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
    <span class="synSpecial">(</span>append-instruction-sequences
     <span class="synSpecial">(</span>make-instruction-sequence
      <span class="synSpecial">'(</span>env proc argl<span class="synSpecial">)</span> <span class="synSpecial">'(</span>env<span class="synSpecial">)</span>

      <span class="synSpecial">`(,</span>proc-entry
        <span class="synSpecial">(</span>assign env <span class="synSpecial">(</span>op compiled-procedure-env<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>assign env
                <span class="synSpecial">(</span>op extend-environment<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>const <span class="synSpecial">,</span>formals<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>reg argl<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>reg env<span class="synSpecial">))))</span>
       <span class="synSpecial">(</span>compile-sequence <span class="synSpecial">(</span>lambda-body <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">'</span>val <span class="synSpecial">'</span>return <span class="synSpecial">(</span><span class="synIdentifier">cons</span> formals ct-env<span class="synSpecial">)))))</span> <span class="synComment">;; ct-envを拡張</span>
</pre>


<p>後はcompileするときに引数にct-envを取るように書く手続きを変更する．</p>

