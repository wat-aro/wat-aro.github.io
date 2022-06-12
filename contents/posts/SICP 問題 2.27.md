---
title: "SICP 問題 2.27"
published: 2015/10/19
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> x <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synConstant">1</span> <span class="synConstant">2</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synConstant">3</span> <span class="synConstant">4</span><span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">reverse</span> items<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> items<span class="synSpecial">)</span>
      items
      <span class="synSpecial">(</span><span class="synIdentifier">append</span> <span class="synSpecial">(</span><span class="synIdentifier">reverse</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> items<span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> items<span class="synSpecial">)))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>deep-reverse items<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> items<span class="synSpecial">)</span> nil<span class="synSpecial">)</span>
        <span class="synSpecial">((</span><span class="synIdentifier">pair?</span> items<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">append</span> <span class="synSpecial">(</span>deep-reverse <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> items<span class="synSpecial">))</span>
                               <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span>deep-reverse <span class="synSpecial">(</span><span class="synIdentifier">car</span> items<span class="synSpecial">)))))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> items<span class="synSpecial">)))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (deep-reverse x)
((4 3) (2 1))
gosh&gt; (define y (list (list 1 2) (list 3 4 (list 5 6 7))))
y
gosh&gt; (deep-reverse y)
(((7 6 5) 4 3) (2 1))</pre>


