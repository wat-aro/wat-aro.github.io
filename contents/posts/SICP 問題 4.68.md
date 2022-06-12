---
title: "SICP 問題 4.68"
published: 2016/01/18
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>my-reverse lst<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> iter <span class="synSpecial">((</span>lst lst<span class="synSpecial">)</span> <span class="synSpecial">(</span>result <span class="synSpecial">'()))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> lst<span class="synSpecial">)</span>
        result
        <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lst<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> lst<span class="synSpecial">)</span> result<span class="synSpecial">)))))</span>

<span class="synSpecial">(</span>rule <span class="synSpecial">(</span>append-to-form <span class="synSpecial">()</span> ?y ?y<span class="synSpecial">))</span>
<span class="synSpecial">(</span>rule <span class="synSpecial">(</span>append-to-form <span class="synSpecial">(</span>?u <span class="synSpecial">.</span> ?v<span class="synSpecial">)</span> ?y <span class="synSpecial">(</span>?u <span class="synSpecial">.</span> ?z<span class="synSpecial">))</span>
      <span class="synSpecial">(</span>append-to-form ?v ?y ?z<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synIdentifier">reverse</span> <span class="synSpecial">(</span>?x<span class="synSpecial">)</span> <span class="synSpecial">(</span>?x<span class="synSpecial">))</span><span class="synError">は当然成り立つ．</span>
<span class="synSpecial">(</span>?x <span class="synSpecial">.</span> ?y<span class="synSpecial">)</span> <span class="synError">?zの関係で考える．</span>
<span class="synError">?zの末尾は</span><span class="synSpecial">(</span>?x<span class="synSpecial">)</span><span class="synError">なので</span>
<span class="synSpecial">(</span><span class="synIdentifier">append</span> something <span class="synSpecial">(</span>?x<span class="synSpecial">)</span> ?z<span class="synSpecial">)</span>
<span class="synError">somethingは残った?yをreverseしたものなので</span>
<span class="synSpecial">(</span><span class="synIdentifier">reverse</span> ?y something<span class="synSpecial">)</span>
<span class="synError">規則として書いてみると</span>

<span class="synSpecial">(</span>rule <span class="synSpecial">(</span><span class="synIdentifier">reverse</span> <span class="synSpecial">(</span>?x<span class="synSpecial">)</span> <span class="synSpecial">(</span>?x<span class="synSpecial">)))</span>

<span class="synSpecial">(</span>rule <span class="synSpecial">(</span><span class="synIdentifier">reverse</span> <span class="synSpecial">(</span>?x <span class="synSpecial">.</span> ?y<span class="synSpecial">)</span> ?z<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span>append-to-form ?something ?x ?z<span class="synSpecial">)</span>
           <span class="synSpecial">(</span><span class="synIdentifier">reverse</span> ?y ?something<span class="synSpecial">)))</span>

<span class="synError">実際にリストを入れて確かめてみる．</span>
<span class="synSpecial">(</span><span class="synIdentifier">reverse</span> <span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span> <span class="synConstant">4</span><span class="synSpecial">)</span> ?z<span class="synSpecial">)</span>
<span class="synError">まず，appendで</span><span class="synSpecial">(</span>append-to-form ?something <span class="synSpecial">(</span><span class="synConstant">1</span><span class="synSpecial">)</span> ?z<span class="synSpecial">)</span><span class="synError">となる．</span>
<span class="synError">次の行で</span><span class="synSpecial">(</span><span class="synIdentifier">reverse</span> <span class="synSpecial">(</span><span class="synConstant">2</span> <span class="synConstant">3</span> <span class="synConstant">4</span><span class="synSpecial">)</span> ?something<span class="synSpecial">)</span>
<span class="synError">appendに進み</span><span class="synSpecial">(</span>append-to-form ?something2 <span class="synSpecial">(</span><span class="synConstant">2</span><span class="synSpecial">)</span> ?something<span class="synSpecial">)</span>
<span class="synSpecial">(</span><span class="synIdentifier">reverse</span> <span class="synSpecial">(</span><span class="synConstant">3</span> <span class="synConstant">4</span><span class="synSpecial">)</span> ?something2<span class="synSpecial">)</span>
<span class="synError">appendにいき</span><span class="synSpecial">(</span>append-to-form ?something3 <span class="synSpecial">(</span><span class="synConstant">3</span><span class="synSpecial">)</span> ?something2<span class="synSpecial">)</span>
<span class="synSpecial">(</span><span class="synIdentifier">reverse</span> <span class="synSpecial">(</span><span class="synConstant">4</span><span class="synSpecial">)</span> ?something3<span class="synSpecial">)</span>
<span class="synError">ひとつ目の定義から</span>
?something3 <span class="synIdentifier">=</span> <span class="synSpecial">(</span><span class="synConstant">4</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>append-to-form ?something3 <span class="synSpecial">(</span><span class="synConstant">3</span><span class="synSpecial">)</span> ?something2<span class="synSpecial">)</span><span class="synError">なので</span>
?something2 <span class="synIdentifier">=</span> <span class="synSpecial">(</span><span class="synConstant">4</span> <span class="synConstant">3</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>append-to-form ?something2 <span class="synSpecial">(</span><span class="synConstant">2</span><span class="synSpecial">)</span> ?something<span class="synSpecial">)</span><span class="synError">なので</span>
?something <span class="synIdentifier">=</span> <span class="synSpecial">(</span><span class="synConstant">4</span> <span class="synConstant">3</span> <span class="synConstant">2</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>append-to-form ?something <span class="synSpecial">(</span><span class="synConstant">1</span><span class="synSpecial">)</span> ?z<span class="synSpecial">)</span><span class="synError">なので</span>
?z <span class="synIdentifier">=</span> <span class="synSpecial">(</span><span class="synConstant">4</span> <span class="synConstant">3</span> <span class="synConstant">2</span> <span class="synConstant">1</span><span class="synSpecial">)</span>

<span class="synError">これでうまくいくはず．</span>

<span class="synError">次は逆を考えてみる．</span>
<span class="synSpecial">(</span><span class="synIdentifier">reverse</span> <span class="synSpecial">(</span>?x <span class="synSpecial">.</span> ?y<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span> <span class="synConstant">4</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span>append-to-form ?something ?x ?z<span class="synSpecial">))</span>
<span class="synError">候補は</span><span class="synSpecial">(</span><span class="synIdentifier">append</span> <span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span> <span class="synConstant">4</span><span class="synSpecial">)</span> <span class="synSpecial">'())(</span><span class="synIdentifier">append</span> <span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synConstant">4</span><span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synIdentifier">append</span> <span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synConstant">2</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synConstant">3</span> <span class="synConstant">4</span><span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synIdentifier">append</span> <span class="synSpecial">(</span><span class="synConstant">1</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synConstant">2</span> <span class="synConstant">3</span> <span class="synConstant">4</span><span class="synSpecial">))(</span>append-to-form <span class="synSpecial">()</span> <span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span> <span class="synConstant">4</span><span class="synSpecial">))</span>
<span class="synError">ここで?x</span> <span class="synIdentifier">=</span> <span class="synSpecial">()</span><span class="synError">とすると</span>
<span class="synError">?somethingは</span><span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span> <span class="synConstant">4</span><span class="synSpecial">)</span>
<span class="synSpecial">(</span><span class="synIdentifier">reverse</span> ?y <span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span> <span class="synConstant">4</span><span class="synSpecial">))</span>
<span class="synError">ここで?z</span> <span class="synIdentifier">=</span> <span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span> <span class="synConstant">4</span><span class="synSpecial">)</span><span class="synError">と同じになるので無限ループになる．</span>
<span class="synError">他のルートから進んでもかならずこのパターンもチェックするので無限ループは避けられない．</span>
</pre>


