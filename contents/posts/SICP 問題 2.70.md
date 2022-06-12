---
title: "SICP 問題 2.70"
published: 2015/10/27
tags:
  - scheme
  - SICP
---


<pre class="code" data-lang="" data-unlink>gosh&gt; (define q-pairs &#39;((A 2) (BOOM 1) (GET 2) (JOB 2) (NA 16) (SHA 3)
                       (YIP 9) (WAH 1)))
q-pairs
gosh&gt; (define q-tree
  (successive-merge (make-leaf-set q-pairs)))
q-tree
gosh&gt; (define message
  &#39;(GET A JOB
    SHA NA NA NA NA NA NA NA NA
    GET A JOB
    SHA NA NA NA NA NA NA NA NA
    WAH YIP YIP YIP YIP YIP YIP YIP YIP YIP
    SHA BOOM))
message
gosh&gt; (encode message q-tree)
(1 1 1 1 1 1 1 0 0 1 1 1 1 0 1 1 1 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 0 0 1 1 1 1 0 1 1 1 
 0 0 0 0 0 0 0 0 0 1 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 1 1 0 1 1 0 1 1)
gosh&gt; (length (encode message q-tree))
84
gosh&gt; (decode (encode message q-tree) q-tree)
(GET A JOB SHA NA NA NA NA NA NA NA NA GET A JOB 
 SHA NA NA NA NA NA NA NA NA WAH YIP YIP YIP YIP YIP YIP YIP YIP YIP SHA BOOM)</pre>


<p>符号化には84bit必要．
八記号アルファベットの固定長符号の場合は</p>

<pre class="code" data-lang="" data-unlink>gosh&gt;(length message)
36</pre>


<p>36 * (log2 8) = 108
なので108bit必要．</p>

