---
title: "SICP 問題 4.51"
published: 2016/01/15
tags:
  - scheme
  - SICP
---

<p>バックトラックで戻らないpermanent-set!の実装</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; permanent-set!</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>analyze-permanent-assignment <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>var <span class="synSpecial">(</span>assignment-variable <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">(</span>vproc <span class="synSpecial">(</span>analyze <span class="synSpecial">(</span>assignment-value <span class="synIdentifier">exp</span><span class="synSpecial">))))</span>
    <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>env succeed fail<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>vproc env
             <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>val fail2<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span>set-variable-value! var val env<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span>succeed <span class="synSpecial">'</span>ok
                          fail2<span class="synSpecial">))</span>
             fail<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>permanent-assignment? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>permanent-set!<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>analyze <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>self-evaluating? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze-self-evaluating <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">((</span>quoted? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze-quoted <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">((</span>variable? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze-variable <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">((</span>assignment? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze-assignment <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">((</span>permanent-assignment? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze-permanent-assignment <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">((</span>definition? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze-definition <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">((</span>amb? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze-amb <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">((</span>ramb? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze-ramb <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">((</span>if? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze-if <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">((</span>lambda? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze-lambda <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">((</span>let? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze <span class="synSpecial">(</span>let-&gt;combination <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
        <span class="synSpecial">((</span>begin? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze-sequence <span class="synSpecial">(</span>begin-actions <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
        <span class="synSpecial">((</span>cond? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze <span class="synSpecial">(</span>cond-&gt;if <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
        <span class="synSpecial">((</span>application? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>analyze-application <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown expression type: ANALYZE&quot;</span> <span class="synIdentifier">exp</span><span class="synSpecial">))))</span>
</pre>


<p>test</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;;; Amb-Eval input:</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> count <span class="synConstant">0</span><span class="synSpecial">)</span>

<span class="synComment">;;; Starting a new problem</span>
<span class="synComment">;;; Amb-Eval value:</span>
ok

<span class="synComment">;;; Amb-Eval input:</span>
<span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>x <span class="synSpecial">(</span>an-element-of <span class="synSpecial">'(</span>a b c<span class="synSpecial">)))</span>
      <span class="synSpecial">(</span>y <span class="synSpecial">(</span>an-element-of <span class="synSpecial">'(</span>a b c<span class="synSpecial">))))</span>
  <span class="synSpecial">(</span>permanent-set! count <span class="synSpecial">(</span><span class="synIdentifier">+</span> count <span class="synConstant">1</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span>require <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> x y<span class="synSpecial">)))</span>
  <span class="synSpecial">(</span><span class="synIdentifier">list</span> x y count<span class="synSpecial">))</span>

<span class="synComment">;;; Starting a new problem</span>
<span class="synComment">;;; Amb-Eval value:</span>
<span class="synSpecial">(</span>a b <span class="synConstant">2</span><span class="synSpecial">)</span>

<span class="synComment">;;; Amb-Eval input:</span>
try-again

<span class="synComment">;;; Amb-Eval value:</span>
<span class="synSpecial">(</span>a c <span class="synConstant">3</span><span class="synSpecial">)</span>

<span class="synComment">;;; Amb-Eval input:</span>
try-again

<span class="synComment">;;; Amb-Eval value:</span>
<span class="synSpecial">(</span>b a <span class="synConstant">4</span><span class="synSpecial">)</span>
</pre>


<p>permanent-set!のかわりにset!を使うと</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;;; Amb-Eval input:</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> count <span class="synConstant">0</span><span class="synSpecial">)</span>

<span class="synComment">;;; Starting a new problem</span>
<span class="synComment">;;; Amb-Eval value:</span>
ok

<span class="synComment">;;; Amb-Eval input:</span>
<span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>x <span class="synSpecial">(</span>an-element-of <span class="synSpecial">'(</span>a b c<span class="synSpecial">)))</span>
      <span class="synSpecial">(</span>y <span class="synSpecial">(</span>an-element-of <span class="synSpecial">'(</span>a b c<span class="synSpecial">))))</span>
  <span class="synSpecial">(</span><span class="synStatement">set!</span> count <span class="synSpecial">(</span><span class="synIdentifier">+</span> count <span class="synConstant">1</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span>require <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> x y<span class="synSpecial">)))</span>
  <span class="synSpecial">(</span><span class="synIdentifier">list</span> x y count<span class="synSpecial">))</span>

<span class="synComment">;;; Starting a new problem</span>
<span class="synComment">;;; Amb-Eval value:</span>
<span class="synSpecial">(</span>a b <span class="synConstant">1</span><span class="synSpecial">)</span>

<span class="synComment">;;; Amb-Eval input:</span>
try-again

<span class="synComment">;;; Amb-Eval value:</span>
<span class="synSpecial">(</span>a c <span class="synConstant">1</span><span class="synSpecial">)</span>

<span class="synComment">;;; Amb-Eval input:</span>
try-again

<span class="synComment">;;; Amb-Eval value:</span>
<span class="synSpecial">(</span>b a <span class="synConstant">1</span><span class="synSpecial">)</span>
</pre>


<p>バックトラックで代入が元に戻るのでカウントが増えていかなくなる．</p>

<p><div class="hatena-asin-detail"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/4798135984/wataro-22/"><img src="http://ecx.images-amazon.com/images/I/511qf4jdYjL._SL160_.jpg" class="hatena-asin-detail-image" alt="計算機プログラムの構造と解釈 第2版" title="計算機プログラムの構造と解釈 第2版"></a><div class="hatena-asin-detail-info"><p class="hatena-asin-detail-title"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/4798135984/wataro-22/">計算機プログラムの構造と解釈 第2版</a></p><ul><li><span class="hatena-asin-detail-label">作者:</span> ハロルド<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%A8%A5%A4%A5%D6%A5%EB">エイブル</a>ソン,ジュリーサスマン,<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B8%A5%A7%A5%E9%A5%EB%A5%C9%A1%A6%A5%B8%A5%A7%A5%A4%A5%B5%A5%B9%A5%DE%A5%F3">ジェラルド・ジェイサスマン</a>,Harold Abelson,Julie Sussman,Gerald Jay Sussman,和田英一</li><li><span class="hatena-asin-detail-label">出版社/メーカー:</span> <a class="keyword" href="http://d.hatena.ne.jp/keyword/%E6%C6%B1%CB%BC%D2">翔泳社</a></li><li><span class="hatena-asin-detail-label">発売日:</span> 2014/05/17</li><li><span class="hatena-asin-detail-label">メディア:</span> 大型本</li><li><a href="http://d.hatena.ne.jp/asin/4798135984/wataro-22" target="_blank">この商品を含むブログ (2件) を見る</a></li></ul></div><div class="hatena-asin-detail-foot"></div></div></p>

