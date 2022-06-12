---
title: "SICP 問題 4.39"
published: 2016/01/11
tags:
  - scheme
  - SICP
---

<p>制限の順番は解には影響しないが，その時間には影響する．<br/>
失敗が多い制限ほど先にテストするほうが実行速度は速くなる．</p>

<pre class="code" data-lang="" data-unlink>;; 本来のmultiple-dwelling
(define (multiple-dwelling)
  (let ((baker (amb 1 2 3 4 5))
        (cooper (amb 1 2 3 4 5))
        (fletcher (amb 1 2 3 4 5))
        (miller (amb 1 2 3 4 5))
        (sith (amb 1 2 3 4 5)))
    (require (distinct (list baker cooper fletcher miller smith)))
    (require (not (= baker 5)))
    (require (not (= cooper 1)))
    (require (not (= fletcher 5)))
    (require (not (= fletcher 1)))
    (require (&lt; cooper miller))
    (require (not (= (abs (- smith fletcher)) 1)))
    (require (not (= (abs (- fletcher cooper)))))
    (list (list &#39;baker baker)
          (list &#39;cooper cooper)
          (list &#39;fletcher fletcher)
          (list &#39;miller miller)
          (list &#39;smith smith))))

;; 改良版
(define (multiple-dwelling)
  (let ((baker (amb 1 2 3 4 5))
        (cooper (amb 1 2 3 4 5))
        (fletcher (amb 1 2 3 4 5))
        (miller (amb 1 2 3 4 5))
        (sith (amb 1 2 3 4 5)))
    (require (distinct (list baker cooper fletcher miller smith)))
    (require (&lt; cooper miller))
    (require (not (= (abs (- fletcher cooper)))))
    (require (not (= (abs (- smith fletcher)) 1)))
    (require (not (= fletcher 1)))
    (require (not (= fletcher 5)))
    (require (not (= baker 5)))
    (require (not (= cooper 1)))
    (list (list &#39;baker baker)
          (list &#39;cooper cooper)
          (list &#39;fletcher fletcher)
          (list &#39;miller miller)
          (list &#39;smith smith))))</pre>


