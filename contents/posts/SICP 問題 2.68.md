---
title: "SICP 問題 2.68"
published: 2015/10/27
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>encode message tree<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> message<span class="synSpecial">)</span>
      <span class="synSpecial">'()</span>
      <span class="synSpecial">(</span><span class="synIdentifier">append</span> <span class="synSpecial">(</span>encode-symbol <span class="synSpecial">(</span><span class="synIdentifier">car</span> message<span class="synSpecial">)</span> tree<span class="synSpecial">)</span>
              <span class="synSpecial">(</span>encode <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> message<span class="synSpecial">)</span> tree<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>encode-symbol msg tree<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>leaf? tree<span class="synSpecial">)</span>
      <span class="synSpecial">'()</span>
      <span class="synSpecial">(</span><span class="synStatement">cond</span>
       <span class="synSpecial">((</span><span class="synIdentifier">memq</span> msg <span class="synSpecial">(</span>symbols <span class="synSpecial">(</span>left-branch tree<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synConstant">0</span>
              <span class="synSpecial">(</span>encode-symbol msg <span class="synSpecial">(</span>left-branch tree<span class="synSpecial">))))</span>
       <span class="synSpecial">((</span><span class="synIdentifier">memq</span> msg <span class="synSpecial">(</span>symbols <span class="synSpecial">(</span>right-branch tree<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synConstant">1</span>
              <span class="synSpecial">(</span>encode-symbol msg <span class="synSpecial">(</span>right-branch tree<span class="synSpecial">))))</span>
       <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>error symbol <span class="synConstant">&quot;is not Found&quot;</span><span class="synSpecial">)))))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (encode &#39;(A D A B B C A) sample-tree)
(0 1 1 0 0 1 0 1 0 1 1 1 0)
gosh&gt; (decode (encode &#39;(A D A B B C A) sample-tree) sample-tree)
(A D A B B C A)</pre>


