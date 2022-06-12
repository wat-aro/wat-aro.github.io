---
title: "SICP 問題 3.4"
published: 2015/11/06
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-account balance password<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>counter <span class="synConstant">0</span><span class="synSpecial">))</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>withdraw amount<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">&gt;=</span> balance amount<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synStatement">begin</span> <span class="synSpecial">(</span><span class="synStatement">set!</span> balance <span class="synSpecial">(</span><span class="synIdentifier">-</span> balance amount<span class="synSpecial">))</span>
                 balance<span class="synSpecial">)</span>
          <span class="synConstant">&quot;Insufficient funds&quot;</span><span class="synSpecial">))</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>deposit amount<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">set!</span> balance <span class="synSpecial">(</span><span class="synIdentifier">+</span> balance amount<span class="synSpecial">))</span>
      balance<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>login-error amount<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">set!</span> counter <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synConstant">1</span> counter<span class="synSpecial">))</span>
      <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">&gt;=</span> counter <span class="synConstant">7</span><span class="synSpecial">)</span>
          <span class="synSpecial">(</span>coll-the-cop<span class="synSpecial">)</span>
          <span class="synConstant">&quot;Incorrect password&quot;</span><span class="synSpecial">))</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>call-the-cops<span class="synSpecial">)</span>
      <span class="synConstant">&quot;110&quot;</span><span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>dispatch pass m<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> pass password<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> m <span class="synSpecial">'</span>withdraw<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span><span class="synStatement">set!</span> counter <span class="synConstant">0</span><span class="synSpecial">)</span>
                 withdraw<span class="synSpecial">)</span>
                <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> m <span class="synSpecial">'</span>deposit<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span><span class="synStatement">set!</span> counter <span class="synConstant">0</span><span class="synSpecial">)</span>
                 deposit<span class="synSpecial">)</span>
                <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown request: MAKE-ACCOUNT&quot;</span>
                             m<span class="synSpecial">)))</span>
          login-error<span class="synSpecial">))</span>
    dispatch<span class="synSpecial">))</span>
</pre>


