---
title: "SICP 問題 2.11"
published: 2015/10/13
tags:
  - scheme
  - SICP
---

<p>(define (div-interval x y)
  (let <a href="#f-162e29d7" name="fn-162e29d7" title="lowx (lower-bound x">*1</a>
        (upx (upper-bound x))
        (lowy (lower-bound y))
        (upy (upper-bound y)))
    (cond <a href="#f-d05df02c" name="fn-d05df02c" title="> lowx 0)        ;;xは正
           (cond ((> lowy 0) ;;yは正
                  (make-interval ( lowx lowy)
                                 ( upx upy)))
                 ((&lt; upy 0) ;;yは負
                  (make-interval ( upx upy)
                                 ( lowx lowy)))
                 (else ;;yは０を跨ぐ
                  (make-interval ( upx lowy)
                                 ( upx upy)))))
          ((&lt; upx 0) ;;xは負
           (cond ((> lowy 0) ;;yは正
                  (make-interval ( upx upy)
                                 ( lowx lowy)))
                 ((&lt; upy 0) ;;yは負
                  (make-interval ( lowx lowy)
                                 ( upx upy)))
                 (else ;;yは０を跨ぐ
                  (maek-interval ( upx upy)
                                 ( upx lowy)))))
          (else ;;xは０を跨ぐ
           (cond ((> lowy 0) ;;yは正
                  (make-interval ( lowx upy)
                                 ( upx upy)))
                 ((&lt; upy 0) ;;yは負
                  (make-interval ( upx upy)
                                 ( lowx upy)))
                 (else ;;yは０を跨ぐ
                  (make-interval (if (&lt; ( lowx loxy) ( upx upy">*2</a>
                                     (<em> upx upy)
                                     (</em> lowx lowy))
                                 (if (&lt; (<em> lowx upy) (</em> upx lowy))
                                     (<em> lowx upy)
                                     (</em> upx lowy)))))))))</p>
<div class="footnote">
<p class="footnote"><a href="#fn-162e29d7" name="f-162e29d7" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">lowx (lower-bound x</span></p>
<p class="footnote"><a href="#fn-d05df02c" name="f-d05df02c" class="footnote-number">*2</a><span class="footnote-delimiter">:</span><span class="footnote-text">> lowx 0)        ;;xは正
           (cond ((> lowy 0) ;;yは正
                  (make-interval (<em> lowx lowy)
                                 (</em> upx upy)))
                 ((&lt; upy 0) ;;yは負
                  (make-interval (<em> upx upy)
                                 (</em> lowx lowy)))
                 (else ;;yは０を跨ぐ
                  (make-interval (<em> upx lowy)
                                 (</em> upx upy)))))
          ((&lt; upx 0) ;;xは負
           (cond ((> lowy 0) ;;yは正
                  (make-interval (<em> upx upy)
                                 (</em> lowx lowy)))
                 ((&lt; upy 0) ;;yは負
                  (make-interval (<em> lowx lowy)
                                 (</em> upx upy)))
                 (else ;;yは０を跨ぐ
                  (maek-interval (<em> upx upy)
                                 (</em> upx lowy)))))
          (else ;;xは０を跨ぐ
           (cond ((> lowy 0) ;;yは正
                  (make-interval (<em> lowx upy)
                                 (</em> upx upy)))
                 ((&lt; upy 0) ;;yは負
                  (make-interval (<em> upx upy)
                                 (</em> lowx upy)))
                 (else ;;yは０を跨ぐ
                  (make-interval (if (&lt; (<em> lowx loxy) (</em> upx upy</span></p>
</div>
