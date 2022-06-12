---
title: "SICP 問題 5.24"
published: 2016/02/02
tags:
  - scheme
  - SICP
---

<p>condを派生式ではなく構文として実装する．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; unevがcondの本体を保存．expはevalされる．</span>
 ev-cond
   <span class="synSpecial">(</span>assing unev <span class="synSpecial">(</span>op cond-clauses<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg <span class="synIdentifier">exp</span><span class="synSpecial">))</span> <span class="synComment">;((p1 e1) (p2 e2) ...)の形にする．</span>
   <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>                      <span class="synComment">;cond後の継続をsave</span>
   <span class="synSpecial">(</span>save env<span class="synSpecial">)</span>                           <span class="synComment">;現在の環境をsave</span>
   <span class="synSpecial">(</span>save unev<span class="synSpecial">)</span>                           <span class="synComment">;ev-cond-loopで復元できるようにsave</span>
   <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label ev-cond-test<span class="synSpecial">))</span>

 ev-cond-test
   <span class="synSpecial">(</span>restore <span class="synIdentifier">exp</span><span class="synSpecial">)</span>                        <span class="synComment">;unevの内容がexpにコピーされる．</span>
   <span class="synSpecial">(</span>restore env<span class="synSpecial">)</span>
   <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
   <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op <span class="synIdentifier">null?</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
   <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label ev-cond-null<span class="synSpecial">))</span>
   <span class="synSpecial">(</span>assign <span class="synIdentifier">exp</span> <span class="synSpecial">(</span>op <span class="synIdentifier">car</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg unev<span class="synSpecial">))</span>      <span class="synComment">;(p1 e1)の形に．</span>
   <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op cond-else-clause?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg <span class="synIdentifier">exp</span><span class="synSpecial">)</span>        <span class="synComment">;(else e1)なら</span>
   <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label ev-cond-else<span class="synSpecial">))</span>        <span class="synComment">;ev-cond-elseへ</span>
   <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
   <span class="synSpecial">(</span>save env<span class="synSpecial">)</span>
   <span class="synSpecial">(</span>save unev<span class="synSpecial">)</span>
   <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label ev-cond-loop<span class="synSpecial">))</span> <span class="synComment">;eval-dispatchの後ev-cond-loopに戻れるように代入</span>
   <span class="synSpecial">(</span>assign <span class="synIdentifier">exp</span> <span class="synSpecial">(</span>op cond-predicate<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
   <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label eval-dispatch<span class="synSpecial">))</span>

 ev-cond-loop
   <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op true?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
   <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label ev-cond-value<span class="synSpecial">))</span>
   <span class="synSpecial">(</span>restore unev<span class="synSpecial">)</span>
   <span class="synSpecial">(</span>restore env<span class="synSpecial">)</span>                        <span class="synComment">;環境を元に戻す</span>
   <span class="synSpecial">(</span>assign unev <span class="synSpecial">(</span>op <span class="synIdentifier">cdr</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg unev<span class="synSpecial">))</span>      <span class="synComment">;残りのclausesへ</span>
   <span class="synSpecial">(</span>save env<span class="synSpecial">)</span>
   <span class="synSpecial">(</span>save unev<span class="synSpecial">)</span>
   <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label ev-cond-test<span class="synSpecial">))</span>


 ev-cond-else
   <span class="synSpecial">(</span>assign <span class="synIdentifier">exp</span> <span class="synSpecial">(</span>op cond-actions<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
   <span class="synSpecial">(</span>assign <span class="synIdentifier">exp</span> <span class="synSpecial">(</span>op sequence-&gt;exp<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
   <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label eval-dispatch<span class="synSpecial">))</span>

 ev-cond-value
   <span class="synComment">;; expはpredicateを評価した値になってる．</span>
   <span class="synSpecial">(</span>restore <span class="synIdentifier">exp</span><span class="synSpecial">)</span>                        <span class="synComment">;unevが持っていたcond本体をexpがrestore</span>
   <span class="synSpecial">(</span>restore env<span class="synSpecial">)</span>
   <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
   <span class="synComment">;;((p1 e1 e1' ...) (p2 e2 e2' ...) ...)という形なのでcarを取る．</span>
   <span class="synSpecial">(</span>assign <span class="synIdentifier">exp</span> <span class="synSpecial">(</span>op <span class="synIdentifier">car</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
   <span class="synSpecial">(</span>assign <span class="synIdentifier">exp</span> <span class="synSpecial">(</span>op cond-actions<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg <span class="synIdentifier">exp</span><span class="synSpecial">))</span>  <span class="synComment">;(e1 e1' ...)にする．</span>
   <span class="synSpecial">(</span>assign <span class="synIdentifier">exp</span> <span class="synSpecial">(</span>op sequence-&gt;exp<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
   <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label eval-dispatch<span class="synSpecial">))</span>

 ev-cond-null
     <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>const cond-null-error<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label signal-error<span class="synSpecial">))</span>
</pre>


<p>test</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span>start eceval<span class="synSpecial">)</span>


<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">append</span> x y<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> x<span class="synSpecial">)</span> y<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> x<span class="synSpecial">)</span>
                    <span class="synSpecial">(</span><span class="synIdentifier">append</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> x<span class="synSpecial">)</span> y<span class="synSpecial">)))))</span>

<span class="synComment">;;; EC-Eval value:</span>
ok

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span><span class="synIdentifier">append</span> <span class="synSpecial">'(</span>a b c<span class="synSpecial">)</span> <span class="synSpecial">'(</span>d e f<span class="synSpecial">))</span>

<span class="synComment">;;; EC-Eval value:</span>
<span class="synSpecial">(</span>a b c d e f<span class="synSpecial">)</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">append</span> x y<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">))</span>

<span class="synComment">;;; EC-Eval value:</span>
ok

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span><span class="synIdentifier">append</span> <span class="synSpecial">'(</span>a b c<span class="synSpecial">)</span> <span class="synSpecial">'(</span>d e f<span class="synSpecial">))</span>
cond-null-error
</pre>


