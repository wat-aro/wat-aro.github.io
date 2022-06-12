---
title: "SICP 問題 5.23"
published: 2016/02/02
tags:
  - scheme
  - SICP
---

<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%EC%A5%B8%A5%B9%A5%BF">レジスタ</a>マシン上に実装した評価器でcondとletを実装する．<br/>
cond->ifのような構文変換器が機械演算として仮定してよいので，let->lambdaも使用する．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink>eval-dispatch
   <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op self-evaluating?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
   <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label ev-self-eval<span class="synSpecial">))</span>
   <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op variable?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
   <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label ev-variable<span class="synSpecial">))</span>
   <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op quoted?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
   <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label ev-quoted<span class="synSpecial">))</span>
   <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op assignment?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
   <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label ev-assignment<span class="synSpecial">))</span>
   <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op definition?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
   <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label ev-definition<span class="synSpecial">))</span>
   <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op if?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
   <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label ev-if<span class="synSpecial">))</span>
   <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op cond?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg <span class="synIdentifier">exp</span><span class="synSpecial">))</span>          <span class="synComment">;cond?を追加</span>
   <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label ev-cond<span class="synSpecial">))</span>
   <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op lambda?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
   <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label ev-lambda<span class="synSpecial">))</span>
   <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op let?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
   <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label ev-let<span class="synSpecial">))</span>
   <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op begin?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
   <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label ev-begin<span class="synSpecial">))</span>
   <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op application?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
   <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label ev-application<span class="synSpecial">))</span>
   <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label unknown-expression-type<span class="synSpecial">))</span>

 ev-cond
   <span class="synSpecial">(</span>assign <span class="synIdentifier">exp</span> <span class="synSpecial">(</span>op cond-&gt;if<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
   <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label eval-dispatch<span class="synSpecial">))</span>

 ev-let
   <span class="synSpecial">(</span>assign <span class="synIdentifier">exp</span> <span class="synSpecial">(</span>op let-&gt;combination<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
   <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label eval-dispatch<span class="synSpecial">))</span>
</pre>


