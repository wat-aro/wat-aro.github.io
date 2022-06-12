---
title: "SICP 問題 3.65"
published: 2015/12/11
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>ln2-summands n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>cons-stream <span class="synSpecial">(</span><span class="synIdentifier">/</span> <span class="synConstant">1.0</span> n<span class="synSpecial">)</span>
               <span class="synSpecial">(</span>stream-map <span class="synIdentifier">-</span> <span class="synSpecial">(</span>ln2-summands <span class="synSpecial">(</span><span class="synIdentifier">+</span> n <span class="synConstant">1</span><span class="synSpecial">)))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> ln2-stream
  <span class="synSpecial">(</span>partial-sums <span class="synSpecial">(</span>ln2-summands <span class="synConstant">1</span><span class="synSpecial">)))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (stream-head ln2-stream 20)
1.0
0.5
0.8333333333333333
0.5833333333333333
0.7833333333333332
0.6166666666666666
0.7595238095238095
0.6345238095238095
0.7456349206349207
0.6456349206349207
0.7365440115440116
0.6532106782106782
0.7301337551337552
0.6587051837051838
0.7253718503718505
0.6628718503718505
0.7216953797836152
0.6661398242280596
0.718771403175428
0.6687714031754279
done
gosh&gt; (stream-head (euler-transform ln2-stream) 20)
0.7
0.6904761904761905
0.6944444444444444
0.6924242424242424
0.6935897435897436
0.6928571428571428
0.6933473389355742
0.6930033416875522
0.6932539682539683
0.6930657506744464
0.6932106782106783
0.6930967180967181
0.6931879423258734
0.6931137858557215
0.6931748806748808
0.6931239512121866
0.6931668512550866
0.6931303775344023
0.693161647077867
0.6931346368409872
done
gosh&gt; (stream-head (accelerated-sequence euler-transform ln2-stream) 20)
1.0
0.7
0.6932773109243697
0.6931488693329254
0.6931471960735491
0.6931471806635636
0.6931471805604039
0.6931471805599445
0.6931471805599427
0.6931471805599454
+nan.0
+nan.0
+nan.0
+nan.0
+nan.0
+nan.0
+nan.0
+nan.0
+nan.0
+nan.0
done</pre>


<p>3.66はパス</p>

