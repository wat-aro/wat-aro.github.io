---
title: "SICP 問題 2.66"
published: 2015/10/27
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>lookup-tree given-key set-of-records<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>key-record <span class="synSpecial">(</span>key <span class="synSpecial">(</span><span class="synIdentifier">car</span> set-of-records<span class="synSpecial">))))</span>
          <span class="synSpecial">((</span><span class="synIdentifier">null?</span> set-of-records<span class="synSpecial">)</span> false<span class="synSpecial">)</span>
          <span class="synSpecial">((</span><span class="synIdentifier">=</span> given-key key-record<span class="synSpecial">)</span>
           <span class="synSpecial">(</span><span class="synIdentifier">car</span> set-of-records<span class="synSpecial">))</span>
          <span class="synSpecial">((</span><span class="synIdentifier">&lt;</span> given-key key-record<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>lookup-tree given-key <span class="synSpecial">(</span>left-branch set-of-records<span class="synSpecial">)))</span>
          <span class="synSpecial">((</span><span class="synIdentifier">&lt;</span> key-record given-key<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>lookup-tree given-key <span class="synSpecial">(</span>right-branch set-of-records<span class="synSpecial">))))))</span>
</pre>


