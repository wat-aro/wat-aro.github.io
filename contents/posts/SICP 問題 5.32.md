---
title: "SICP 問題 5.32"
published: 2016/02/04
tags:
  - scheme
  - SICP
---

<p>a: <a class="keyword" href="http://d.hatena.ne.jp/keyword/%B1%E9%BB%BB%BB%D2">演算子</a>が記号である場合の組み合わせの式を別のクラスと認識し，そういう式を最適化する．</p>

<p>operatorがvariableであればenvをsaveしない．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink>     ev-application
     <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>assign unev <span class="synSpecial">(</span>op operands<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
     <span class="synSpecial">(</span>assign <span class="synIdentifier">exp</span> <span class="synSpecial">(</span>op operator<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
     <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op variable?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
     <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label ev-appl-symbol-operator<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>save env<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>save unev<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label ev-appl-did-operator<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label eval-dispatch<span class="synSpecial">))</span>

     ev-appl-symbol-operator
     <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label ev-appl-did-symbol-operator<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label eval-dispatch<span class="synSpecial">))</span>

     ev-appl-did-symbol-operator
     <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op empty-arglist<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>assign proc <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op no-operands?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg unev<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label apply-dispatch<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>save proc<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label ev-appl-operand-loop<span class="synSpecial">))</span>
</pre>


<p>　<br/>
　<br/>
b: 評価器にこのような翻訳系の最適化のすべてを組み込むことができ，翻訳系の利点をすべて除けるという考えについて<br/>
<a class="keyword" href="http://d.hatena.ne.jp/keyword/%C3%E0%BC%A1">逐次</a>評価する<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%A4%A5%F3%A5%BF%A5%D7%A5%EA%A5%BF">インタプリタ</a>ではどうしても翻訳系ほどの最適化は出来ない．</p>

