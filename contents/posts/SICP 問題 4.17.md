---
title: "SICP 問題 4.17"
published: 2015/12/25
tags:
  - scheme
  - SICP
---

<p>lambdaを評価すると新しくフレームが作られます．<br/>
これを防ぐためにletで<em>unassignment</em>を束縛するのではなくdefineで内部定義します．<br/>
define-variable!はフレームに新たな変数を追加する手続きなので余計なフレームは作られません．<br/>
<span itemscope itemtype="http://schema.org/Photograph"><a href="http://f.hatena.ne.jp/wat-aro/20151225194001" class="hatena-fotolife" itemprop="url"><img src="http://cdn-ak.f.st-hatena.com/images/fotolife/w/wat-aro/20151225/20151225194001.jpg" alt="f:id:wat-aro:20151225194001j:image" title="f:id:wat-aro:20151225194001j:image" class="hatena-fotolife" itemprop="image"></a></span></p>

<pre class="code" data-lang="" data-unlink>scheme
(define (scan-out-defines body)
  (define (split-def-body proc-body)
    (let iter ((proc-body proc-body)
               (def &#39;())
               (body &#39;()))
      (cond ((null? proc-body) (cons (reverse def) (reverse body)))
            ((definition? (car proc-body)) (iter (cdr proc-body)
                                                 (cons (car proc-body) def)
                                                 body))
            (else (iter (cdr proc-body)
                        def
                        (cons (car proc-body) body))))))
  (let* ((def-body-list (split-def-body body))
         (def-list (car def-body-list))
         (body-list (cdr def-body-list)))
    (if (null? def-list)
        body
        (append  (map (lambda (x) (make-definition (definition-variable x) &#39;&#39;*unassigned*))
                    def-list)
                 (map (lambda (x) (list &#39;set! (definition-variable x)
                                        (definition-value x)))
                      def-list)
                 body-list))))</pre>


