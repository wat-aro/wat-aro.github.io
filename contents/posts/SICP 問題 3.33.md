---
title: "SICP 問題 3.33"
published: 2015/12/03
tags:
  - scheme
  - SICP
---

<p>入力として三つの<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B3%A5%CD%A5%AF%A5%BF">コネクタ</a>a,b,cをとり，cの値がaとbの値の平均であるような制約を達成する手続きaverager.<br/>
adderとmultiplierを繋ぐ<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B3%A5%CD%A5%AF%A5%BF">コネクタ</a>をp.<br/>
定数2に繋がる<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B3%A5%CD%A5%AF%A5%BF">コネクタ</a>をxとした．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>averager a b c<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>x <span class="synSpecial">(</span>make-connector<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>p <span class="synSpecial">(</span>make-connector<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span>adder a b p<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>multiplier c x p<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>constant <span class="synConstant">2</span> x<span class="synSpecial">)</span>
    <span class="synSpecial">'</span>ok<span class="synSpecial">))</span>
</pre>


