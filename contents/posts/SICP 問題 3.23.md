---
title: "SICP 問題 3.23"
published: 2015/11/20
tags:
  - scheme
  - SICP
---

<p>対を使って前後へのポインタを持ったdequeを実装する．</p>

<p><span itemscope itemtype="http://schema.org/Photograph"><img src="http://cdn-ak.f.st-hatena.com/images/fotolife/w/wat-aro/20151120/20151120224817.jpg" alt="f:id:wat-aro:20151120224817j:plain" title="f:id:wat-aro:20151120224817j:plain" class="hatena-fotolife" itemprop="image"></span></p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; dequeの実装</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>value-ptr ptr<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">caar</span> ptr<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>prev-ptr ptr<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdar</span> ptr<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>next-ptr ptr<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> ptr<span class="synSpecial">))</span>

<span class="synComment">;; ((value))というリストを作る</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-ptr value<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> value<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-queue<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">'()</span> <span class="synSpecial">'()))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>front-ptr queue<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> queue<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>rear-ptr queue<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> queue<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>empty-queue? queue<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span>front-queue queue<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-empty-queue queue<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>set-front-ptr! queue <span class="synSpecial">'())</span>
  <span class="synSpecial">(</span>set-rear-ptr! queue <span class="synSpecial">'())</span>
  queue<span class="synSpecial">)</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>printing queue<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> recur <span class="synSpecial">((</span>deque <span class="synSpecial">(</span>front-ptr queue<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> deque<span class="synSpecial">)</span> <span class="synSpecial">'())</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span>
           <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>value-ptr deque<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span>recur <span class="synSpecial">(</span>next-ptr deque<span class="synSpecial">)))))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>set-front-ptr! queue item<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">set-car!</span> queue item<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>set-rear-ptr! queue item<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">set-cdr!</span> queue item<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>set-prev-ptr! ptr item<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">set-cdr!</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> ptr<span class="synSpecial">)</span> item<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>set-next-ptr! ptr item<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">set-cdr!</span> ptr item<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>front-insert-queue! queue item<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>new-item <span class="synSpecial">(</span>make-ptr item<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>empty-queue? queue<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>set-front-ptr! queue new-item<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>set-rear-ptr! queue new-item<span class="synSpecial">)</span>
           <span class="synSpecial">'</span>ok<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span>
           <span class="synSpecial">(</span>set-prev-ptr! <span class="synSpecial">(</span>front-queue queue<span class="synSpecial">)</span>
                          new-item<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>set-next-ptr! new-item
                          <span class="synSpecial">(</span>front-queue queue<span class="synSpecial">))</span>
           <span class="synSpecial">(</span>set-front-ptr! queue new-item<span class="synSpecial">)</span>
           <span class="synSpecial">'</span>ok<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>rear-insert-queue! queue item<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>new-item <span class="synSpecial">(</span>make-ptr item<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>empty-queue? queue<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>set-front-ptr! queue new-item<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>set-rear-ptr! queue new-item<span class="synSpecial">)</span>
           <span class="synSpecial">'</span>ok<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span>
           <span class="synSpecial">(</span>set-next-ptr! <span class="synSpecial">(</span>rear-queue queue<span class="synSpecial">)</span>
                          new-item<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>set-prev-ptr! new-item
                          <span class="synSpecial">(</span>rear-queue queue<span class="synSpecial">))</span>
           <span class="synSpecial">(</span>set-rear-ptr! queue new-item<span class="synSpecial">)</span>
           <span class="synSpecial">'</span>ok<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>front-delete-queue! queue<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>empty-queue? queue<span class="synSpecial">)</span>
         <span class="synSpecial">(</span>error <span class="synConstant">&quot;FRONT-DELETE! called with an empty queue&quot;</span> queue<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span>
         <span class="synSpecial">(</span><span class="synStatement">let*</span> <span class="synSpecial">((</span>old-front-ptr <span class="synSpecial">(</span>front-ptr queue<span class="synSpecial">))</span>
                <span class="synSpecial">(</span>new-front-ptr <span class="synSpecial">(</span>next-ptr old-front-ptr<span class="synSpecial">)))</span>
           <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> new-front-ptr<span class="synSpecial">)</span>
                  <span class="synSpecial">(</span>make-empty-queue queue<span class="synSpecial">)</span>
                  <span class="synSpecial">(</span>value-ptr old-front-ptr<span class="synSpecial">))</span>
                 <span class="synSpecial">(</span><span class="synStatement">else</span>
                  <span class="synSpecial">(</span>set-next-ptr! old-front-ptr
                                 <span class="synSpecial">'())</span>
                  <span class="synSpecial">(</span>set-prev-ptr! new-front-ptr
                                 <span class="synSpecial">'())</span>
                  <span class="synSpecial">(</span>set-front-ptr! queue new-front-ptr<span class="synSpecial">)</span>
                  <span class="synSpecial">(</span>value-ptr old-front-ptr<span class="synSpecial">)))))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>rear-delete-queue! queue<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>empty-queue? queue<span class="synSpecial">)</span>
         <span class="synSpecial">(</span>error <span class="synConstant">&quot;REAR-DELETE! called with an empty queue&quot;</span> queue<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span>
         <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>new-rear-ptr <span class="synSpecial">(</span>prev-ptr <span class="synSpecial">(</span>rear-ptr queue<span class="synSpecial">)))</span>
               <span class="synSpecial">(</span>old-rear-ptr <span class="synSpecial">(</span>rear-ptr queue<span class="synSpecial">)))</span>
           <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> new-rear-ptr<span class="synSpecial">)</span>
                  <span class="synSpecial">(</span>make-empty-queue queue<span class="synSpecial">)</span>
                  <span class="synSpecial">(</span>value-ptr old-rear<span class="synSpecial">))</span>
                 <span class="synSpecial">(</span><span class="synStatement">else</span>
                  <span class="synSpecial">(</span>set-prev-ptr! old-rear-ptr
                                 <span class="synSpecial">'())</span>
                  <span class="synSpecial">(</span>set-next-ptr! new-rear-ptr
                                 <span class="synSpecial">'())</span>
                  <span class="synSpecial">(</span>set-rear-ptr! queue new-rear-ptr<span class="synSpecial">)</span>
                  <span class="synSpecial">(</span>value-ptr old-rear-ptr<span class="synSpecial">)))))))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (define q1 (make-queue))
q1
gosh&gt; (printing q1)
()
gosh&gt; (front-insert-queue! q1 &#39;a)
ok
gosh&gt; (printing q1)
(a)
gosh&gt; (front-insert-queue! q1 &#39;b)
ok
gosh&gt; (printing q1)
(b a)
gosh&gt; (front-insert-queue! q1 &#39;c)
ok
gosh&gt; (printing q1)
(c b a)
gosh&gt; (front-delete-queue! q1)
c
gosh&gt; (printing q1)
(b a)
gosh&gt; (front-delete-queue! q1)
b
gosh&gt; (front-delete-queue! q1)
ok
gosh&gt; (printing q1)
()
gosh&gt; (define q1 (make-queue))
q1
gosh&gt; (printing q1)
()
gosh&gt; (front-insert-queue! q1 &#39;a)
ok
gosh&gt; (printing q1)
(a)
gosh&gt; (front-insert-queue! q1 &#39;b)
ok
gosh&gt; (printing q1)
(b a)
gosh&gt; (front-insert-queue! q1 &#39;c)
ok
gosh&gt; (printing q1)
(c b a)
gosh&gt; (front-delete-queue! q1)
c
gosh&gt; (printing q1)
(b a)
gosh&gt; (front-delete-queue! q1)
b
gosh&gt; (printing q1)
(a)
gosh&gt; (front-delete-queue! q1)
a
gosh&gt; (printing q1)
()
gosh&gt; (rear-insert-queue! q1 &#39;a)
ok
gosh&gt; (printing q1)
(a)
gosh&gt; (rear-insert-queue! q1 &#39;b)
ok
gosh&gt; (printing q1)
(a b)
gosh&gt; (rear-insert-queue! q1 &#39;c)
ok
gosh&gt; (printing q1)
(a b c)
gosh&gt; (rear-delete-queue! q1)
c
gosh&gt; (printing q1)
(a b)
gosh&gt; (rear-delete-queue! q1)
b
gosh&gt; (printing q1)
(a)
gosh&gt; (rear-delete-queue! q1)
a
gosh&gt; (printing q1)
()</pre>


