---
title: "SICP 問題 2.58b"
published: 2015/10/27
tags:
  - scheme
  - SICP
---

<p>2.58b は解けそうになかったので解答を見てできるかぎり解説を入れてみました．<br/>
一部修正しています．
解答は↓から</p>

<p><a href="https://github.com/sarabander/p2pu-sicp/blob/master/2.3/2.58.scm">p2pu-sicp/2.58.scm at master &middot; sarabander/p2pu-sicp &middot; GitHub</a></p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; partには'beforeか'afterが入り，symbolの位置でexpを前後に分ける．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>extract part symbol <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>iter subexp remaining<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> remaining<span class="synSpecial">)</span> remaining<span class="synSpecial">)</span>
          <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> remaining<span class="synSpecial">)</span> symbol<span class="synSpecial">)</span>
           <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> part <span class="synSpecial">'</span>before<span class="synSpecial">)</span> subexp<span class="synSpecial">)</span>
                 <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> part <span class="synSpecial">'</span>after<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> remaining<span class="synSpecial">))</span>
                 <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unclear, do you mean 'before or after?&quot;</span><span class="synSpecial">))))</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span>
           <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">append</span> subexp <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> remaining<span class="synSpecial">)))</span>
                 <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> remaining<span class="synSpecial">)))))</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>result <span class="synSpecial">(</span>iter nil <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">length</span> result<span class="synSpecial">)</span> <span class="synConstant">1</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">car</span> result<span class="synSpecial">)</span>
        result<span class="synSpecial">)))</span>

<span class="synComment">;; リストにシンボルが入っているかを問う述語</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>contains? symbol lis<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synStatement">or</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> lis<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">pair?</span> lis<span class="synSpecial">)))</span> false<span class="synSpecial">)</span>
        <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> symbol <span class="synSpecial">(</span><span class="synIdentifier">car</span> lis<span class="synSpecial">))</span> true<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>contains? symbol <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lis<span class="synSpecial">)))))</span>

<span class="synComment">;; sum</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>sum? x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>contains? <span class="synSpecial">'</span>+ x<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>addend s<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>extract <span class="synSpecial">'</span>before <span class="synSpecial">'</span>+ s<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>augend s<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>extract <span class="synSpecial">'</span>after <span class="synSpecial">'</span>+ s<span class="synSpecial">))</span>

<span class="synComment">;; product</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>product? x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>contains? <span class="synSpecial">'</span>* x<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>multiplier p<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>extract <span class="synSpecial">'</span>before <span class="synSpecial">'</span>* p<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>multiplicand p<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>extract <span class="synSpecial">'</span>after <span class="synSpecial">'</span>* p<span class="synSpecial">))</span>

<span class="synComment">;; exponentiation</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>exponentiation? e<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>contains? <span class="synSpecial">'</span>** e<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>base e<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>extract <span class="synSpecial">'</span>before <span class="synSpecial">'</span>** e<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>exponent e<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>extract <span class="synSpecial">'</span>after <span class="synSpecial">'</span>** e<span class="synSpecial">))</span>



<span class="synComment">;; 簡約</span>

<span class="synComment">;; かっこを外す</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>fringe tree<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> tree<span class="synSpecial">)</span> <span class="synSpecial">'())</span>
        <span class="synSpecial">((</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">pair?</span> tree<span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> tree<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">append</span> <span class="synSpecial">(</span>fringe <span class="synSpecial">(</span><span class="synIdentifier">car</span> tree<span class="synSpecial">))</span>
                      <span class="synSpecial">(</span>fringe <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> tree<span class="synSpecial">))))))</span>

<span class="synComment">;; 演算子で分けられたリストに分ける．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>split-by op polynome<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> polynome<span class="synSpecial">)</span> <span class="synSpecial">'())</span>
        <span class="synSpecial">((</span><span class="synStatement">or</span> <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">pair?</span> polynome<span class="synSpecial">))</span>
             <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span>contains? op polynome<span class="synSpecial">)))</span> <span class="synComment">;;追加．これがないと最後の項がシングルトン以外の場合空リストになる．</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> polynome<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">append</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span>extract <span class="synSpecial">'</span>before op polynome<span class="synSpecial">))</span>
                      <span class="synSpecial">(</span>split-by op <span class="synSpecial">(</span>extract <span class="synSpecial">'</span>after op polynome<span class="synSpecial">))))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>summands polynome<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>split-by <span class="synSpecial">'</span>+ polynome<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>factors polynome<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>split-by <span class="synSpecial">'</span>* polynome<span class="synSpecial">))</span>

<span class="synComment">;; リストの要素の間にopを入れる</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>infix op lst<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> lst<span class="synSpecial">)</span> <span class="synSpecial">'())</span>
        <span class="synSpecial">((</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lst<span class="synSpecial">))</span> lst<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">append</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> lst<span class="synSpecial">))</span>
                      <span class="synSpecial">(</span><span class="synIdentifier">cons</span> op
                            <span class="synSpecial">(</span>infix op <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lst<span class="synSpecial">)))))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>infix-add s<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>infix <span class="synSpecial">'</span>+ s<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>infix-multiply p<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>infix <span class="synSpecial">'</span>* p<span class="synSpecial">))</span>

<span class="synComment">;; リストの先頭のリストにだけopを適用する．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>apply-car op lst<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">append</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">apply</span> op <span class="synSpecial">(</span><span class="synIdentifier">car</span> lst<span class="synSpecial">)))</span>
          <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> lst<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>apply-car+ s<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>apply-car <span class="synIdentifier">+</span> s<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>apply-car* p<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>apply-car <span class="synIdentifier">*</span> p<span class="synSpecial">))</span>

<span class="synComment">;; (6)を6といった具合に数一つだけのリストをnumberにする</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>release-singleton e<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> <span class="synSpecial">(</span><span class="synIdentifier">length</span> e<span class="synSpecial">)</span> <span class="synConstant">1</span><span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synIdentifier">car</span> e<span class="synSpecial">)</span>
      e<span class="synSpecial">))</span>

<span class="synComment">;; 数だけを先頭にあつめてリストにする</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>group lst<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">filter</span> <span class="synIdentifier">number?</span> lst<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">filter</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>n<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">number?</span> n<span class="synSpecial">)))</span>
                      lst<span class="synSpecial">))))</span>

<span class="synComment">;; リストの先頭を最後にもっていく．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>shift-left lst<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">append</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lst<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> lst<span class="synSpecial">))))</span>


<span class="synComment">;; まずfringeでかっこを外し，summandsを使い，＋の位置で分けたリストに変換する．</span>
<span class="synComment">;; そのリストに対してmapで各要素にfactors,group,apply-car*,release-singletonの順に手続きを適用する．</span>
<span class="synComment">;; つまり，*でわけたリストに変換し，数字のみのリストをcarにもってきて，それに*を適用し，要素の間に＊をいれ，シングルトンがあれば，それを数字にする．</span>
<span class="synComment">;; これが全要素に完了した後に出来たリストに対して，group,apply-car+,shift-left,infix-add,fringeを順に適用する．</span>
<span class="synComment">;; 先頭に数字のみでできたリストを作り，それらを足し，リストの最後に移す．このリストの要素の間に＋を挿入し，かっこを取り払う．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>simplify polynome<span class="synSpecial">)</span>
  <span class="synSpecial">((</span>compose fringe
            infix-add
            shift-left
            apply-car+
            group<span class="synSpecial">)</span>
   <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synSpecial">(</span>compose release-singleton
                 infix-multiply
                 apply-car*
                 group
                 factors<span class="synSpecial">)</span>
        <span class="synSpecial">(</span>summands <span class="synSpecial">(</span>fringe polynome<span class="synSpecial">)))))</span>
</pre>


