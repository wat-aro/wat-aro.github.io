---
title: "SICP 問題1.41"
published: 2015/10/09
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>inc n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synConstant">1</span> n<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>double f<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>f <span class="synSpecial">(</span>f x<span class="synSpecial">))))</span>
</pre>




<pre class="code" data-lang="" data-unlink>(define D double)
(define DD (D D))

(((D (D D)) inc) 5)
(((D DD) inc) 5)
((DD (DD inc)) 5)
((DD (D (D inc))))
((D (D (D (D inc)))) 5)
((D (D (D (lambda (x) (+ 2 x))))) 5)
((D (D (lambda (x) (+ 4 x)))) 5)
((D (lambda (x) (+ 8 x))) 5)
((lambda (x) (+ 16 x)) 5)
(+ 16 5)
21


gosh&gt; (((double (double double)) inc) 5)
21</pre>


