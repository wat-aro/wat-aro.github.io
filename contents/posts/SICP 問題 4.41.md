---
title: "SICP 問題 4.41"
published: 2016/01/11
tags:
  - scheme
  - SICP
---

<p>多住居手続きを<a class="keyword" href="http://d.hatena.ne.jp/keyword/scheme">scheme</a>で実装．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span>use util.combinations<span class="synSpecial">)</span>
<span class="synSpecial">(</span>use srfi-1<span class="synSpecial">)</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>multiple-dwelling<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">filter</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span>
            <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>baker <span class="synSpecial">(</span>first x<span class="synSpecial">))</span>
                  <span class="synSpecial">(</span>cooper <span class="synSpecial">(</span>second x<span class="synSpecial">))</span>
                  <span class="synSpecial">(</span>fletcher <span class="synSpecial">(</span>third x<span class="synSpecial">))</span>
                  <span class="synSpecial">(</span>miller <span class="synSpecial">(</span>fourth x<span class="synSpecial">))</span>
                  <span class="synSpecial">(</span>smith <span class="synSpecial">(</span>fifth x<span class="synSpecial">)))</span>
              <span class="synSpecial">(</span><span class="synStatement">and</span>
               <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> baker <span class="synConstant">5</span><span class="synSpecial">))</span>
               <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> cooper <span class="synConstant">1</span><span class="synSpecial">))</span>
               <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> fletcher <span class="synConstant">5</span><span class="synSpecial">))</span>
               <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> fletcher <span class="synConstant">1</span><span class="synSpecial">))</span>
               <span class="synSpecial">(</span><span class="synIdentifier">&lt;</span> cooper miller<span class="synSpecial">)</span>
               <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> <span class="synSpecial">(</span><span class="synIdentifier">abs</span> <span class="synSpecial">(</span><span class="synIdentifier">-</span> smith fletcher<span class="synSpecial">))</span> <span class="synConstant">1</span><span class="synSpecial">))</span>
               <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> <span class="synSpecial">(</span><span class="synIdentifier">abs</span> <span class="synSpecial">(</span><span class="synIdentifier">-</span> fletcher cooper<span class="synSpecial">))</span> <span class="synConstant">1</span><span class="synSpecial">)))))</span>
          <span class="synSpecial">(</span>permutations <span class="synSpecial">'(</span><span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span> <span class="synConstant">4</span> <span class="synConstant">5</span><span class="synSpecial">))))</span>
</pre>


