---
title: "SICP 問題 3.35"
published: 2015/12/03
tags:
  - scheme
  - SICP
---

<p>平方器を新しい基本制約として定義する．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>squarer a b<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>process-new-value<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>has-value? b<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">&lt;</span> <span class="synSpecial">(</span>get-value b<span class="synSpecial">)</span> <span class="synConstant">0</span><span class="synSpecial">)</span>
            <span class="synSpecial">(</span>error <span class="synConstant">&quot;square less than 0 -- SQUARER&quot;</span> <span class="synSpecial">(</span>get-balue b<span class="synSpecial">))</span>
            <span class="synSpecial">(</span>set-value! a <span class="synSpecial">(</span><span class="synIdentifier">sqrt</span> b<span class="synSpecial">)</span> me<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>set-value! b <span class="synSpecial">(</span>square a<span class="synSpecial">)</span> me<span class="synSpecial">)))</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>process-forget-value<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>forget-value! a me<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>forget-value! b me<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>process-new-value<span class="synSpecial">))</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>me request<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> request <span class="synSpecial">'</span>I-have-a-value<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>process-new-value<span class="synSpecial">))</span>
          <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> request <span class="synSpecial">'</span>I-lost-my-value<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>process-forget-value<span class="synSpecial">))</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span>
           <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown request -- SQUARER&quot;</span> request<span class="synSpecial">))))</span>
  me<span class="synSpecial">)</span>
</pre>


