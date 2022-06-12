---
title: "SICP 問題 2.29"
published: 2015/10/20
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-mobile left right<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">list</span> left right<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-branch <span class="synIdentifier">length</span> structure<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synIdentifier">length</span> structure<span class="synSpecial">))</span>

<span class="synComment">;; a</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>left-branch mobile<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">car</span> mobile<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>right-branch mobile<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">car</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> mobile<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>branch-length branch<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">car</span> branch<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>branch-structure branch<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">car</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> branch<span class="synSpecial">)))</span>

<span class="synComment">;; b</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>total-weight mob<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">pair?</span> mob<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span>total-weight <span class="synSpecial">(</span>branch-structure <span class="synSpecial">(</span>left-branch mob<span class="synSpecial">)))</span>
         <span class="synSpecial">(</span>total-weight <span class="synSpecial">(</span>branch-structure <span class="synSpecial">(</span>right-branch mob<span class="synSpecial">))))))</span>

<span class="synComment">;; c</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>balanced? mob<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">pair?</span> mob<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> <span class="synSpecial">(</span>branch-length <span class="synSpecial">(</span>left-branch mob<span class="synSpecial">))</span>
                 <span class="synSpecial">(</span>total-weight <span class="synSpecial">(</span>left-branch mob<span class="synSpecial">)))</span>
              <span class="synSpecial">(</span><span class="synIdentifier">*</span> <span class="synSpecial">(</span>branch-length <span class="synSpecial">(</span>right-branch mob<span class="synSpecial">))</span>
                 <span class="synSpecial">(</span>total-weight <span class="synSpecial">(</span>right-branch mob<span class="synSpecial">))))</span>
           <span class="synSpecial">(</span>balanced? <span class="synSpecial">(</span>left-branch mob<span class="synSpecial">))</span>
           <span class="synSpecial">(</span>balanced? <span class="synSpecial">(</span>right-branch mob<span class="synSpecial">)))</span>
      <span class="synConstant">#f</span><span class="synSpecial">))</span>

<span class="synComment">;; d</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>right-branch mobile<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> mobile<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>branch-structure branch<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> branch<span class="synSpecial">))</span>
</pre>


