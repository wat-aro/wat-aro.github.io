---
title: "SICP 問題 4.62"
published: 2016/01/16
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; last-pairに該当するルールを作る</span>
<span class="synSpecial">(</span>rule <span class="synSpecial">(</span>last-pair <span class="synSpecial">(</span>?x<span class="synSpecial">)</span> <span class="synSpecial">(</span>?x<span class="synSpecial">)))</span>

<span class="synSpecial">(</span>rule <span class="synSpecial">(</span>last-pair? <span class="synSpecial">(</span>?x <span class="synSpecial">.</span> ?y<span class="synSpecial">)</span> ?z<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>last-pair? ?y ?z<span class="synSpecial">))</span>

<span class="synComment">;; 質問</span>
<span class="synSpecial">(</span>last-pair <span class="synSpecial">(</span><span class="synConstant">3</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>?x<span class="synSpecial">))</span>
<span class="synComment">;; ひとつ目の質問にマッチして</span>
<span class="synComment">;; ?x=3となるので</span>
<span class="synSpecial">(</span>last-pair <span class="synSpecial">(</span><span class="synConstant">3</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synConstant">3</span><span class="synSpecial">))</span>
<span class="synComment">;; と出力されるはず．</span>


<span class="synComment">;; 質問</span>
<span class="synSpecial">(</span>last-pair <span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span><span class="synSpecial">)</span> ?x<span class="synSpecial">)</span>
<span class="synComment">;; まずふたつ目の質問にマッチする．</span>
<span class="synComment">;; ?y=1, ?z=(2 3).二行目で(last-pair (2 3) ?x)となる．</span>
<span class="synComment">;; 次にまた二つ目の質問にマッチ．</span>
<span class="synComment">;; ?y=2,?z=(3).二行目で(last-pair (3) ?x)</span>
<span class="synComment">;; ひとつ目の質問にマッチ．(last-pair (3) (3))</span>
<span class="synSpecial">(</span>last-pair <span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synConstant">3</span><span class="synSpecial">))</span>

<span class="synComment">;; 質問</span>
<span class="synSpecial">(</span>last-pair <span class="synSpecial">(</span><span class="synConstant">2</span> ?x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synConstant">3</span><span class="synSpecial">))</span>
<span class="synComment">;; まず二つ目の質問にマッチする．</span>
<span class="synComment">;; ?y=2, ?z=?x, ?x=3.</span>
<span class="synComment">;; ２行目で(last-pair ?x (3))となる．</span>
<span class="synComment">;; 実装がわからないのでここから想像．</span>
<span class="synComment">;; まずひとつ目の質問を評価機は試す．</span>
<span class="synComment">;; すると(last-pair (3) (3))になる．</span>
<span class="synComment">;; 次に二つ目の質問を試す．</span>
<span class="synComment">;; すると(last-pair (?x . ?y) (3))かつ(last-pair ?y (3))</span>
<span class="synComment">;; なのでどの組み合わせを試しても成り立つ．</span>
<span class="synComment">;; ここで無限ループになる．</span>
<span class="synComment">;; 仮にすべての組み合わせを試して，それに対して</span>
<span class="synComment">;; 二行目の質問もさらにすべての組み合わせに対して成り立つ．</span>
</pre>


