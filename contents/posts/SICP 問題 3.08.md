---
title: "SICP 問題 3.08"
published: 2015/11/11
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> f
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>a <span class="synConstant">1</span><span class="synSpecial">))</span>
    <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">set!</span> a <span class="synSpecial">(</span><span class="synIdentifier">*</span> a x<span class="synSpecial">))</span>
      a<span class="synSpecial">)))</span>
</pre>


<p>(f 0) (f 1)の順に評価したら0,0が返り，(f 1) (f 0)の順に評価すると1, 0 が返ってくれば題意を満たしたことになる．</p>

<pre class="code" data-lang="" data-unlink>gosh&gt; (define f
  (let ((a 1))
    (lambda (x)
      (set! a (* a x))
      a)))
f
gosh&gt; (f 0)
0
gosh&gt; (f 1)
0
gosh&gt; (define f
  (let ((a 1))
    (lambda (x)
      (set! a (* a x))
      a)))
f
gosh&gt; (f 1)
1
gosh&gt; (f 0)
0</pre>




<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; letをlambdaで書き換えてみた</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> f
  <span class="synSpecial">((</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>a<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">set!</span> a <span class="synSpecial">(</span><span class="synIdentifier">*</span> a x<span class="synSpecial">))</span>
      a<span class="synSpecial">))</span> <span class="synConstant">1</span><span class="synSpecial">))</span>
</pre>


