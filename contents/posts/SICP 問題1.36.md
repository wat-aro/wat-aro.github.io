---
title: "SICP 問題1.36"
published: 2015/10/08
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>fixed-point2 f first-guess<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>close-enough? v1 v2<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synIdentifier">&lt;</span> <span class="synSpecial">(</span><span class="synIdentifier">abs</span> <span class="synSpecial">(</span><span class="synIdentifier">-</span> v1 v2<span class="synSpecial">))</span> tolerance<span class="synSpecial">))</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>try guess<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>next <span class="synSpecial">(</span>f guess<span class="synSpecial">)))</span>
      <span class="synSpecial">(</span><span class="synIdentifier">display</span> guess<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synIdentifier">newline</span><span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>close-enough? guess next<span class="synSpecial">)</span>
          next
          <span class="synSpecial">(</span>try next<span class="synSpecial">))))</span>
  <span class="synSpecial">(</span>try first-guess<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>my-exp<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>fixed-point2 <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">/</span> <span class="synSpecial">(</span><span class="synIdentifier">log</span> <span class="synConstant">1000</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">log</span> x<span class="synSpecial">)))</span>
                <span class="synConstant">2.0</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>my-exp2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>fixed-point2 <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span>average x <span class="synSpecial">(</span><span class="synIdentifier">/</span> <span class="synSpecial">(</span><span class="synIdentifier">log</span> <span class="synConstant">1000</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">log</span> x<span class="synSpecial">))))</span>
                <span class="synConstant">2.0</span><span class="synSpecial">))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (my-exp)
2.0
9.965784284662087
3.004472209841214
6.279195757507157
3.759850702401539
5.215843784925895
4.182207192401397
4.8277650983445906
4.387593384662677
4.671250085763899
4.481403616895052
4.6053657460929
4.5230849678718865
4.577114682047341
4.541382480151454
4.564903245230833
4.549372679303342
4.559606491913287
4.552853875788271
4.557305529748263
4.554369064436181
4.556305311532999
4.555028263573554
4.555870396702851
4.555315001192079
4.5556812635433275
4.555439715736846
4.555599009998291
4.555493957531389
4.555563237292884
4.555517548417651
4.555547679306398
4.555527808516254
4.555540912917957
4.555532270803653
gosh&gt; (my-exp2)
2.0
5.9828921423310435
4.922168721308343
4.628224318195455
4.568346513136242
4.5577305909237005
4.555909809045131
4.555599411610624
4.5555465521473675
4.555537551999825</pre>


<p>平均緩和を使わなかった時は35ステップ．
使った場合は10ステップ．</p>

