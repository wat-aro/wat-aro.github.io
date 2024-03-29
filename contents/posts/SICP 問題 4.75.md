---
title: "SICP 問題 4.75"
published: 2016/01/21
tags:
  - scheme
  - SICP
---

<p>指定した質問を満足する項目がデータベースに一つしかないときに成功する特殊形式uniqueの実装．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; streamの個数を調べる．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>stream-length s<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> iter <span class="synSpecial">((</span>stream s<span class="synSpecial">)</span>
             <span class="synSpecial">(</span>count <span class="synConstant">0</span><span class="synSpecial">))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>stream-null? stream<span class="synSpecial">)</span>
        count
        <span class="synSpecial">(</span>iter <span class="synSpecial">(</span>stream-cdr stream<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> count <span class="synConstant">1</span><span class="synSpecial">)))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>unique-query exps<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> exps<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>uniquely-asserted contents frame-stream<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>stream-flatmap
    <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>frame<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>result <span class="synSpecial">(</span>qeval <span class="synSpecial">(</span>unique-query contents<span class="synSpecial">)</span>
                           <span class="synSpecial">(</span>singleton-stream frame<span class="synSpecial">))))</span>
        <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span>stream-null? result<span class="synSpecial">))</span>
                 <span class="synSpecial">(</span><span class="synIdentifier">=</span> <span class="synSpecial">(</span>stream-length result<span class="synSpecial">)</span> <span class="synConstant">1</span><span class="synSpecial">))</span>
            result
            the-empty-stream<span class="synSpecial">)))</span>
    frame-stream<span class="synSpecial">))</span>

<span class="synSpecial">(</span>put <span class="synSpecial">'</span>unique <span class="synSpecial">'</span>qeval uniquely-asserted<span class="synSpecial">)</span>
</pre>


<p>test</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;;; Query input:</span>
<span class="synSpecial">(</span>unique <span class="synSpecial">(</span>job ?x <span class="synSpecial">(</span>computer wizard<span class="synSpecial">)))</span>

<span class="synComment">;;; Query result:</span>
<span class="synSpecial">(</span>unique <span class="synSpecial">(</span>job <span class="synSpecial">(</span>Bitdiddle Ben<span class="synSpecial">)</span> <span class="synSpecial">(</span>computer wizard<span class="synSpecial">)))</span>

<span class="synComment">;;; Query input:</span>
<span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span>job ?x ?j<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>unique <span class="synSpecial">(</span>job ?anyone ?j<span class="synSpecial">)))</span>

<span class="synComment">;;; Query result:</span>
<span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span>job <span class="synSpecial">(</span>Aull DeWitt<span class="synSpecial">)</span> <span class="synSpecial">(</span>administration secretary<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>unique <span class="synSpecial">(</span>job <span class="synSpecial">(</span>Aull DeWitt<span class="synSpecial">)</span> <span class="synSpecial">(</span>administration secretary<span class="synSpecial">))))</span>
<span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span>job <span class="synSpecial">(</span>Cratchet Robert<span class="synSpecial">)</span> <span class="synSpecial">(</span>accounting scrivener<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>unique <span class="synSpecial">(</span>job <span class="synSpecial">(</span>Cratchet Robert<span class="synSpecial">)</span> <span class="synSpecial">(</span>accounting scrivener<span class="synSpecial">))))</span>
<span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span>job <span class="synSpecial">(</span>Scrooge Eben<span class="synSpecial">)</span> <span class="synSpecial">(</span>accounting chief accountant<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>unique <span class="synSpecial">(</span>job <span class="synSpecial">(</span>Scrooge Eben<span class="synSpecial">)</span> <span class="synSpecial">(</span>accounting chief accountant<span class="synSpecial">))))</span>
<span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span>job <span class="synSpecial">(</span>Warbucks Oliver<span class="synSpecial">)</span> <span class="synSpecial">(</span>administration big wheel<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>unique <span class="synSpecial">(</span>job <span class="synSpecial">(</span>Warbucks Oliver<span class="synSpecial">)</span> <span class="synSpecial">(</span>administration big wheel<span class="synSpecial">))))</span>
<span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span>job <span class="synSpecial">(</span>Reasoner Louis<span class="synSpecial">)</span> <span class="synSpecial">(</span>computer programmer trainee<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>unique <span class="synSpecial">(</span>job <span class="synSpecial">(</span>Reasoner Louis<span class="synSpecial">)</span> <span class="synSpecial">(</span>computer programmer trainee<span class="synSpecial">))))</span>
<span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span>job <span class="synSpecial">(</span>Tweakit Lem E<span class="synSpecial">)</span> <span class="synSpecial">(</span>computer technician<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>unique <span class="synSpecial">(</span>job <span class="synSpecial">(</span>Tweakit Lem E<span class="synSpecial">)</span> <span class="synSpecial">(</span>computer technician<span class="synSpecial">))))</span>
<span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span>job <span class="synSpecial">(</span>Bitdiddle Ben<span class="synSpecial">)</span> <span class="synSpecial">(</span>computer wizard<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>unique <span class="synSpecial">(</span>job <span class="synSpecial">(</span>Bitdiddle Ben<span class="synSpecial">)</span> <span class="synSpecial">(</span>computer wizard<span class="synSpecial">))))</span>
</pre>


