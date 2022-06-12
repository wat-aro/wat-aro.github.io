---
title: "SICP 問題 3.22"
published: 2015/11/20
tags:
  - scheme
  - SICP
---

<p>局所状態を持つ手続きとしてキューを定義する．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>insert-queue! queue item<span class="synSpecial">)</span>
  <span class="synSpecial">((</span>queue <span class="synSpecial">'</span>insert-queue!<span class="synSpecial">)</span> item<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>delete-queue! queue<span class="synSpecial">)</span>
  <span class="synSpecial">((</span>queue <span class="synSpecial">'</span>delete-queue!<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-queue<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>front-ptr <span class="synSpecial">'())</span>
        <span class="synSpecial">(</span>rear-ptr <span class="synSpecial">'()))</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>empty-queue?<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synIdentifier">null?</span> front-ptr<span class="synSpecial">))</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>insert-queue! item<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>new-item <span class="synSpecial">(</span><span class="synIdentifier">list</span> item<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>empty-queue?<span class="synSpecial">)</span>
               <span class="synSpecial">(</span><span class="synStatement">set!</span> front-ptr new-item<span class="synSpecial">)</span>
               <span class="synSpecial">(</span><span class="synStatement">set!</span> rear-ptr new-item<span class="synSpecial">)</span>
               front-ptr<span class="synSpecial">)</span>
              <span class="synSpecial">(</span><span class="synStatement">else</span>
               <span class="synSpecial">(</span><span class="synIdentifier">set-cdr!</span> rear-ptr new-item<span class="synSpecial">)</span>
               <span class="synSpecial">(</span><span class="synStatement">set!</span> rear-ptr new-item<span class="synSpecial">)</span>
               front-ptr<span class="synSpecial">))))</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>delete-queue!<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>empty-queue?<span class="synSpecial">)</span>
             <span class="synSpecial">(</span>error <span class="synConstant">&quot;DELETE called with an empty queue&quot;</span> front-ptr<span class="synSpecial">))</span>
            <span class="synSpecial">(</span><span class="synStatement">else</span>
             <span class="synSpecial">(</span><span class="synStatement">set!</span> front-ptr <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> front-ptr<span class="synSpecial">))</span>
             front-ptr<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>dispatch m<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> m <span class="synSpecial">'</span>insert-queue!<span class="synSpecial">)</span>
             insert-queue!<span class="synSpecial">)</span>
            <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> m <span class="synSpecial">'</span>delete-queue!<span class="synSpecial">)</span>
             delete-queue!<span class="synSpecial">)</span>
            <span class="synSpecial">(</span><span class="synStatement">else</span>
             <span class="synSpecial">(</span>error <span class="synConstant">&quot;Undefined operation -- MAKE-QUEUE&quot;</span> m<span class="synSpecial">))))</span>
    dispatch<span class="synSpecial">))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (define q1 (make-queue))
q1
gosh&gt; (insert-queue! q1 &#39;a)
(a)
gosh&gt; (insert-queue! q1 &#39;b)
(a b)
gosh&gt; (delete-queue! q1)
(b)</pre>


