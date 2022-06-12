---
title: "SICP 問題 5.39"
published: 2016/02/09
tags:
  - scheme
  - SICP
---

<p>文面アドレスと実行時環境とり値を検索するlexical-address-lookupと
値を変更するlexical-address-set!を実装する．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;;; 文面アドレスを使って変数の値を探す</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>lexical-address-lookup lex-add r-env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>frame <span class="synSpecial">(</span>frame-values <span class="synSpecial">(</span><span class="synIdentifier">list-ref</span> r-env <span class="synSpecial">(</span><span class="synIdentifier">car</span> lex-add<span class="synSpecial">)))))</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>val <span class="synSpecial">(</span><span class="synIdentifier">list-ref</span> frame <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> lex-add<span class="synSpecial">))))</span>
      <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> val <span class="synSpecial">'</span><span class="synConstant">*unassigned*</span><span class="synSpecial">)</span>
          <span class="synSpecial">(</span>error <span class="synConstant">&quot;*Unassigned* variable&quot;</span><span class="synSpecial">)</span>
          val<span class="synSpecial">))))</span>

<span class="synComment">;;; 文面アドレスにある値を変更する</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>lexical-address-set! lex-add val r-env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>frame <span class="synSpecial">(</span>frame-values <span class="synSpecial">(</span><span class="synIdentifier">list-ref</span> r-env <span class="synSpecial">(</span><span class="synIdentifier">car</span> lex-add<span class="synSpecial">)))))</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>iter frame count<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> count <span class="synConstant">0</span><span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synStatement">begin</span> <span class="synSpecial">(</span><span class="synIdentifier">set-car!</span> frame val<span class="synSpecial">)</span>
                 <span class="synSpecial">'</span>ok<span class="synSpecial">)</span>
          <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> frame<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">-</span> count <span class="synConstant">1</span><span class="synSpecial">))))</span>
    <span class="synSpecial">(</span>iter frame <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> lex-add<span class="synSpecial">))))</span>
</pre>


<p>test</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span><span class="synStatement">define</span> my-env <span class="synSpecial">(</span>extend-environment <span class="synSpecial">'(</span>x y<span class="synSpecial">)</span> <span class="synSpecial">'(</span><span class="synConstant">1</span> <span class="synConstant">2</span><span class="synSpecial">)</span> the-global-environment<span class="synSpecial">))</span>
my-env
gosh&gt; my-env
<span class="synSpecial">(((</span>x y<span class="synSpecial">)</span> <span class="synConstant">1</span> <span class="synConstant">2</span><span class="synSpecial">)</span>
 <span class="synSpecial">((</span>false true <span class="synIdentifier">car</span> <span class="synIdentifier">cdr</span> <span class="synIdentifier">cons</span> <span class="synIdentifier">null?</span> <span class="synIdentifier">=</span> <span class="synIdentifier">-</span> <span class="synIdentifier">+</span> <span class="synIdentifier">*</span> <span class="synIdentifier">/</span> <span class="synIdentifier">&gt;</span> <span class="synIdentifier">&lt;</span><span class="synSpecial">)</span>
  <span class="synConstant">#f</span>
  <span class="synConstant">#t</span>
  <span class="synSpecial">(</span>primitive <span class="synError">#&lt;subr</span> car&gt;<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>primitive <span class="synError">#&lt;subr</span> cdr&gt;<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>primitive <span class="synError">#&lt;subr</span> cons&gt;<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>primitive <span class="synError">#&lt;subr</span> null?&gt;<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>primitive <span class="synError">#&lt;subr</span> <span class="synStatement">=&gt;</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span>primitive <span class="synError">#&lt;subr</span> <span class="synError">-&gt;</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span>primitive <span class="synError">#&lt;subr</span> <span class="synError">+&gt;</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span>primitive <span class="synError">#&lt;subr</span> *&gt;<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>primitive <span class="synError">#&lt;subr</span> /&gt;<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>primitive <span class="synError">#&lt;subr</span> &gt;&gt;<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>primitive <span class="synError">#&lt;subr</span> <span class="synConstant">&lt;&gt;</span><span class="synSpecial">)))</span>
gosh&gt; <span class="synSpecial">(</span>lexical-address-lookup <span class="synSpecial">'(</span><span class="synConstant">0</span> <span class="synConstant">0</span><span class="synSpecial">)</span> my-env<span class="synSpecial">)</span>
<span class="synConstant">1</span>
gosh&gt; <span class="synSpecial">(</span>lexical-address-lookup <span class="synSpecial">'(</span><span class="synConstant">0</span> <span class="synConstant">1</span><span class="synSpecial">)</span> my-env<span class="synSpecial">)</span>
<span class="synConstant">2</span>
gosh&gt; <span class="synSpecial">(</span>lexical-address-lookup <span class="synSpecial">'(</span><span class="synConstant">1</span> <span class="synConstant">0</span><span class="synSpecial">)</span> my-env<span class="synSpecial">)</span>
<span class="synConstant">#f</span>
gosh&gt; <span class="synSpecial">(</span>lexical-address-lookup <span class="synSpecial">'(</span><span class="synConstant">1</span> <span class="synConstant">1</span><span class="synSpecial">)</span> my-env<span class="synSpecial">)</span>
<span class="synConstant">#t</span>
gosh&gt; <span class="synSpecial">(</span>lexical-address-set! <span class="synSpecial">'(</span><span class="synConstant">0</span> <span class="synConstant">0</span><span class="synSpecial">)</span> <span class="synSpecial">'</span>scheme my-env<span class="synSpecial">)</span>
ok
gosh&gt; <span class="synSpecial">(</span>lexical-address-lookup <span class="synSpecial">'(</span><span class="synConstant">0</span> <span class="synConstant">0</span><span class="synSpecial">)</span> my-env<span class="synSpecial">)</span>
scheme
gosh&gt; <span class="synSpecial">(</span>lexical-address-set! <span class="synSpecial">'(</span><span class="synConstant">1</span> <span class="synConstant">1</span><span class="synSpecial">)</span> <span class="synSpecial">'</span>SICP my-env<span class="synSpecial">)</span>
ok
gosh&gt; <span class="synSpecial">(</span>lexical-address-lookup <span class="synSpecial">'(</span><span class="synConstant">1</span> <span class="synConstant">1</span><span class="synSpecial">)</span> my-env<span class="synSpecial">)</span>
SICP
</pre>


