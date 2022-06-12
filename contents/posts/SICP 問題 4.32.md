---
title: "SICP 問題 4.32"
published: 2016/01/10
tags:
  - scheme
  - SICP
---

<p>遅延度の高い遅延リストではcar部も遅延されているので未定義の変数を使って構成するできる．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> my-stream <span class="synSpecial">(</span><span class="synIdentifier">cons</span> x y<span class="synSpecial">))</span>

<span class="synComment">;;; M-Eval value:</span>
ok

<span class="synComment">;;; M-Eval input:</span>
my-stream

<span class="synComment">;;; M-Eval value:</span>
<span class="synSpecial">(</span>compound-procedure <span class="synSpecial">(</span>m<span class="synSpecial">)</span> <span class="synSpecial">((</span>m x y<span class="synSpecial">))</span> <span class="synConstant">&lt;procedure-env&gt;</span><span class="synSpecial">)</span>
</pre>


<p>car部もlazy-evaluateされるのでlazyなリスト（ストリーム）だけでなくlazyな<a class="keyword" href="http://d.hatena.ne.jp/keyword/%CC%DA%B9%BD%C2%A4">木構造</a>も作ることができる．</p>

