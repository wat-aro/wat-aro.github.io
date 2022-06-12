---
title: "SICP 問題 5.41"
published: 2016/02/09
tags:
  - scheme
  - SICP
---

<p>翻訳時環境に対する変数の文面アドレスを返す手続きfind-variableの実装</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>find-variable var ct-env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>env-loop frame-address env<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>scan variable-address frame<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> frame<span class="synSpecial">)</span>
             <span class="synSpecial">(</span>env-loop <span class="synSpecial">(</span><span class="synIdentifier">+</span> frame-address <span class="synConstant">1</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>enclosing-environment env<span class="synSpecial">)))</span>
            <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> frame<span class="synSpecial">)</span> var<span class="synSpecial">)</span>
             <span class="synSpecial">(</span><span class="synIdentifier">list</span> frame-address variable-address<span class="synSpecial">))</span>
            <span class="synSpecial">(</span><span class="synStatement">else</span>
             <span class="synSpecial">(</span>scan <span class="synSpecial">(</span><span class="synIdentifier">+</span> variable-address <span class="synConstant">1</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> frame<span class="synSpecial">)))))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> env<span class="synSpecial">)</span>
        <span class="synSpecial">'</span>not-found
        <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>frame <span class="synSpecial">(</span>first-frame env<span class="synSpecial">)))</span>
          <span class="synSpecial">(</span>scan <span class="synConstant">0</span> frame<span class="synSpecial">))))</span>
  <span class="synSpecial">(</span>env-loop <span class="synConstant">0</span> ct-env<span class="synSpecial">))</span>
</pre>


<p>test</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span>find-variable <span class="synSpecial">'</span>c <span class="synSpecial">'((</span>y z<span class="synSpecial">)</span> <span class="synSpecial">(</span>a b c d e<span class="synSpecial">)</span> <span class="synSpecial">(</span>x y<span class="synSpecial">)))</span>
<span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synConstant">2</span><span class="synSpecial">)</span>
gosh&gt; <span class="synSpecial">(</span>find-variable <span class="synSpecial">'</span>x <span class="synSpecial">'((</span>y z<span class="synSpecial">)</span> <span class="synSpecial">(</span>a b c d e<span class="synSpecial">)</span> <span class="synSpecial">(</span>x y<span class="synSpecial">)))</span>
<span class="synSpecial">(</span><span class="synConstant">2</span> <span class="synConstant">0</span><span class="synSpecial">)</span>
gosh&gt; <span class="synSpecial">(</span>find-variable <span class="synSpecial">'</span>w <span class="synSpecial">'((</span>y z<span class="synSpecial">)</span> <span class="synSpecial">(</span>a b c d e<span class="synSpecial">)</span> <span class="synSpecial">(</span>x y<span class="synSpecial">)))</span>
not-found
</pre>


