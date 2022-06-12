---
title: "SICP 問題 4.09"
published: 2015/12/19
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; iteratorの実装</span>
<span class="synComment">;; whileの使用例</span>
<span class="synSpecial">(</span>while <span class="synSpecial">(</span><span class="synIdentifier">&lt;</span> i <span class="synConstant">10</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">begin</span> <span class="synSpecial">(</span><span class="synIdentifier">display</span> i<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">newline</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synStatement">set!</span> i <span class="synSpecial">(</span><span class="synIdentifier">+</span> i <span class="synConstant">1</span><span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">let</span> while <span class="synSpecial">()</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">&lt;</span> i <span class="synConstant">10</span><span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">begin</span>
        <span class="synSpecial">(</span><span class="synStatement">begin</span> <span class="synSpecial">(</span><span class="synIdentifier">display</span> i<span class="synSpecial">)</span>
               <span class="synSpecial">(</span><span class="synIdentifier">newline</span><span class="synSpecial">)</span>
               <span class="synSpecial">(</span><span class="synStatement">set!</span> i <span class="synSpecial">(</span><span class="synIdentifier">+</span> i <span class="synConstant">1</span><span class="synSpecial">)))</span>
        <span class="synSpecial">(</span>while<span class="synSpecial">))))</span>

<span class="synComment">;; 破壊的です．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>while? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>while<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>while-predicate <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>while-body <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">caddr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>while-&gt;let <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span>make-named-let <span class="synSpecial">'</span>my-while <span class="synSpecial">'()</span>
                  <span class="synSpecial">(</span>make-if <span class="synSpecial">(</span>while-predicate <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                           <span class="synSpecial">(</span>meke-begin
                            <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span>while-body <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                                  <span class="synSpecial">'(</span>my-while<span class="synSpecial">)))</span>
                           <span class="synSpecial">'())))</span>
</pre>


