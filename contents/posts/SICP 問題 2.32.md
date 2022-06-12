---
title: "SICP 問題 2.32"
published: 2015/10/20
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>subsets s<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> s<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synIdentifier">list</span> nil<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>rest <span class="synSpecial">(</span>subsets <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> s<span class="synSpecial">))))</span>
        <span class="synSpecial">(</span><span class="synIdentifier">append</span> rest <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span>
                            <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> s<span class="synSpecial">)</span> x<span class="synSpecial">))</span>
                          rest<span class="synSpecial">)))))</span>

<span class="synComment">;;この式はまず最後まで再帰し，そこでrestに空リストを持って返ってくる．</span>
<span class="synComment">;;mapでcarとrestをconsして新しいリストを作りそれが返ったところでrestに入る．</span>
<span class="synComment">;;その繰り返しですべての部分集合が返される．</span>

s <span class="synIdentifier">=</span> nil
<span class="synSpecial">()</span>

s <span class="synIdentifier">=</span> <span class="synSpecial">(</span><span class="synConstant">3</span><span class="synSpecial">)</span>
rest <span class="synIdentifier">=</span> <span class="synSpecial">()</span>
<span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> s<span class="synSpecial">)</span> x<span class="synSpecial">)</span> <span class="synIdentifier">=</span> <span class="synSpecial">(</span><span class="synConstant">3</span><span class="synSpecial">)</span>

s <span class="synIdentifier">=</span> <span class="synSpecial">(</span><span class="synConstant">2</span> <span class="synConstant">3</span><span class="synSpecial">)</span>
rest <span class="synIdentifier">=</span> <span class="synSpecial">(()</span> <span class="synSpecial">(</span><span class="synConstant">3</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> s<span class="synSpecial">)</span> x<span class="synSpecial">)</span> <span class="synIdentifier">=</span> <span class="synSpecial">(</span><span class="synConstant">2</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synConstant">2</span> <span class="synConstant">3</span><span class="synSpecial">)</span>

s <span class="synIdentifier">=</span> <span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span><span class="synSpecial">)</span>
rest <span class="synIdentifier">=</span> <span class="synSpecial">(()</span> <span class="synSpecial">(</span><span class="synConstant">3</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synConstant">2</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synConstant">2</span> <span class="synConstant">3</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> s<span class="synSpecial">)</span> x<span class="synSpecial">)</span> <span class="synIdentifier">=</span> <span class="synSpecial">(</span><span class="synConstant">1</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synConstant">3</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synConstant">2</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span><span class="synSpecial">)</span>

<span class="synSpecial">(()</span> <span class="synSpecial">(</span><span class="synConstant">3</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synConstant">2</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synConstant">2</span> <span class="synConstant">3</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synConstant">1</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synConstant">3</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synConstant">2</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span><span class="synSpecial">))</span>
</pre>


