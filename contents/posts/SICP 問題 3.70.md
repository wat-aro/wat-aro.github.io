---
title: "SICP 問題 3.70"
published: 2015/12/16
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; mergeを参考にして重みをつけてmerge-weightedを定義する</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>merge s1 s2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>stream-null? s1<span class="synSpecial">)</span> s2<span class="synSpecial">)</span>
        <span class="synSpecial">((</span>stream-null? s2<span class="synSpecial">)</span> s1<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>s1car <span class="synSpecial">(</span>stream-car s1<span class="synSpecial">))</span>
                    <span class="synSpecial">(</span>s2car <span class="synSpecial">(</span>stream-car s2<span class="synSpecial">)))</span>
                <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">&lt;</span> s1car s2car<span class="synSpecial">)</span>
                       <span class="synSpecial">(</span>cons-stream s1car
                                    <span class="synSpecial">(</span>merge <span class="synSpecial">(</span>stream-cdr s1<span class="synSpecial">)</span> s2<span class="synSpecial">)))</span>
                      <span class="synSpecial">((</span><span class="synIdentifier">&gt;</span> s1car s2car<span class="synSpecial">)</span>
                       <span class="synSpecial">(</span>cons-stream s2car
                                    <span class="synSpecial">(</span>merge s1 <span class="synSpecial">(</span>stream-cdr s2<span class="synSpecial">))))</span>
                      <span class="synSpecial">(</span><span class="synStatement">else</span>
                       <span class="synSpecial">(</span>cons-stream s1car
                                    <span class="synSpecial">(</span>merge <span class="synSpecial">(</span>stream-cdr s1<span class="synSpecial">)</span>
                                           <span class="synSpecial">(</span>stream-cdr s2<span class="synSpecial">)))))))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>merge-weighted s1 s2 weight<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>stream-null? s1<span class="synSpecial">)</span> s2<span class="synSpecial">)</span>
        <span class="synSpecial">((</span>stream-null? s2<span class="synSpecial">)</span> s1<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>s1car <span class="synSpecial">(</span>stream-car s1<span class="synSpecial">))</span>
                    <span class="synSpecial">(</span>s2car <span class="synSpecial">(</span>stream-car s2<span class="synSpecial">)))</span>
                <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>w1 <span class="synSpecial">(</span>weight s1car<span class="synSpecial">))</span>
                      <span class="synSpecial">(</span>w2 <span class="synSpecial">(</span>weight s2car<span class="synSpecial">)))</span>
                  <span class="synSpecial">(</span><span class="synStatement">cond</span>
                   <span class="synSpecial">((</span><span class="synIdentifier">&lt;</span> w1 w2<span class="synSpecial">)</span>
                    <span class="synSpecial">(</span>cons-stream s1car
                                 <span class="synSpecial">(</span>merge-weighted <span class="synSpecial">(</span>stream-cdr s1<span class="synSpecial">)</span> s2 weight<span class="synSpecial">)))</span>
                   <span class="synSpecial">(</span><span class="synStatement">else</span>
                    <span class="synSpecial">(</span>cons-stream s2car
                                 <span class="synSpecial">(</span>merge-weighted s1 <span class="synSpecial">(</span>stream-cdr s2<span class="synSpecial">)</span> weight<span class="synSpecial">)))))))))</span>

<span class="synComment">;; pairsを参考にweighted-pairsを定義する</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>pairs s t<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>cons-stream
   <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span>stream-car s<span class="synSpecial">)</span> <span class="synSpecial">(</span>stream-car t<span class="synSpecial">))</span>
   <span class="synSpecial">(</span>interleave
    <span class="synSpecial">(</span>stream-map <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span>stream-car s<span class="synSpecial">)</span> x<span class="synSpecial">))</span>
                <span class="synSpecial">(</span>stream-cdr t<span class="synSpecial">))</span>
    <span class="synSpecial">(</span>pairs <span class="synSpecial">(</span>stream-cdr s<span class="synSpecial">)</span> <span class="synSpecial">(</span>stream-cdr t<span class="synSpecial">)))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>weighted-pairs s t weight<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>cons-stream
   <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span>stream-car s<span class="synSpecial">)</span> <span class="synSpecial">(</span>stream-car t<span class="synSpecial">))</span>
   <span class="synSpecial">(</span>merge-weighted
    <span class="synSpecial">(</span>stream-map <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span>stream-car s<span class="synSpecial">)</span> x<span class="synSpecial">))</span>
                <span class="synSpecial">(</span>stream-cdr t<span class="synSpecial">))</span>
    <span class="synSpecial">(</span>weighted-pairs <span class="synSpecial">(</span>stream-cdr s<span class="synSpecial">)</span> <span class="synSpecial">(</span>stream-cdr t<span class="synSpecial">)</span> weight<span class="synSpecial">)</span>
    weight<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> i+j <span class="synSpecial">(</span>weighted-pairs integers integers <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> x<span class="synSpecial">)))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synError">2i+3j+5ij</span>
  <span class="synSpecial">(</span>weighted-pairs integers integers
                  <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> <span class="synConstant">2</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> x<span class="synSpecial">))</span>
                                 <span class="synSpecial">(</span><span class="synIdentifier">*</span> <span class="synConstant">3</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> x<span class="synSpecial">))</span>
                                 <span class="synSpecial">(</span><span class="synIdentifier">*</span> <span class="synConstant">5</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> x<span class="synSpecial">))))))</span>

<span class="synComment">;; 重みづけがちゃんと機能しているかを確認する</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>stream-head-weight s n weight<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> iter <span class="synSpecial">((</span>s s<span class="synSpecial">)</span>
             <span class="synSpecial">(</span>n n<span class="synSpecial">))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">zero?</span> n<span class="synSpecial">)</span>
        <span class="synSpecial">'</span>done
        <span class="synSpecial">(</span><span class="synStatement">begin</span>
          <span class="synSpecial">(</span><span class="synIdentifier">display</span> <span class="synSpecial">(</span>stream-car s<span class="synSpecial">))</span>
          <span class="synSpecial">(</span><span class="synIdentifier">display</span> <span class="synConstant">&quot; : &quot;</span><span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synIdentifier">display</span> <span class="synSpecial">(</span>weight <span class="synSpecial">(</span>stream-car s<span class="synSpecial">)))</span>
          <span class="synSpecial">(</span><span class="synIdentifier">newline</span><span class="synSpecial">)</span>
          <span class="synSpecial">(</span>iter <span class="synSpecial">(</span>stream-cdr s<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">1</span><span class="synSpecial">))))))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (stream-head-weight i+j 20 (lambda (x) (+ (car x) (cadr x))))
(1 1) : 2
(1 2) : 3
(2 2) : 4
(1 3) : 4
(2 3) : 5
(1 4) : 5
(3 3) : 6
(2 4) : 6
(1 5) : 6
(3 4) : 7
(2 5) : 7
(1 6) : 7
(4 4) : 8
(3 5) : 8
(2 6) : 8
(1 7) : 8
(4 5) : 9
(3 6) : 9
(2 7) : 9
(1 8) : 9
done
gosh&gt; (stream-head-weight 2i+3j+5ij 20 (lambda (x) (+ (* 2 (car x))
                                                      (* 3 (cadr x))
                                                      (* 5 (car x) (cadr x)))))
(1 1) : 10
(1 2) : 18
(1 3) : 26
(2 2) : 30
(1 4) : 34
(1 5) : 42
(2 3) : 43
(1 6) : 50
(2 4) : 56
(1 7) : 58
(3 3) : 60
(1 8) : 66
(2 5) : 69
(1 9) : 74
(3 4) : 78
(2 6) : 82
(1 10) : 82
(1 11) : 90
(2 7) : 95
(3 5) : 96
done</pre>


