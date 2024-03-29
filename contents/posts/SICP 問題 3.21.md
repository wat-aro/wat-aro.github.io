---
title: "SICP 問題 3.21"
published: 2015/11/19
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>front-ptr queue<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> queue<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>rear-ptr queue<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> queue<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>set-front-ptr! queue item<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">set-car!</span> queue item<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>set-rear-ptr! queue item<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">set-cdr!</span> queue item<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>empty-queue? queue<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span>front-ptr queue<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-queue<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">'()</span> <span class="synSpecial">'()))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>front-queue queue<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>empty-queue? queue<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>error <span class="synConstant">&quot;FRONT called with an empty queue&quot;</span> queue<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synIdentifier">car</span> <span class="synSpecial">(</span>front-ptr queue<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>insert-queue! queue item<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>new-pair <span class="synSpecial">(</span><span class="synIdentifier">cons</span> item <span class="synSpecial">'())))</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>empty-queue? queue<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>set-front-ptr! queue new-pair<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>set-rear-ptr! queue new-pair<span class="synSpecial">)</span>
           queue<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span>
           <span class="synSpecial">(</span><span class="synIdentifier">set-cdr!</span> <span class="synSpecial">(</span>rear-ptr queue<span class="synSpecial">)</span> new-pair<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>set-rear-ptr! queue new-pair<span class="synSpecial">)</span>
           queue<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>delete-queue! queue<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>empty-queue? queue<span class="synSpecial">)</span>
         <span class="synSpecial">(</span>error <span class="synConstant">&quot;DELETE! called with an empty queue&quot;</span> queue<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span>
         <span class="synSpecial">(</span>set-front-ptr! queue <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> <span class="synSpecial">(</span>front-ptr queue<span class="synSpecial">)))</span>
         queue<span class="synSpecial">)))</span>
</pre>


<p>項目がキューに二度挿入されているのではなく，最後に挿入した項目へ向いたポインタが二つある．
front-ptrの最後のポインタとrear-ptrがそう．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; print-queue</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>print-queue queue<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>front-ptr queue<span class="synSpecial">))</span>
</pre>


