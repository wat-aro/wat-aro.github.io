---
title: "SICP 問題 3.18"
published: 2015/11/19
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; 循環するリストを見つける手続き</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>cycle? x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> recur <span class="synSpecial">((</span>x x<span class="synSpecial">)</span>
              <span class="synSpecial">(</span>record <span class="synSpecial">'()))</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">pair?</span> x<span class="synSpecial">))</span> <span class="synConstant">#f</span><span class="synSpecial">)</span>
          <span class="synSpecial">((</span><span class="synIdentifier">memq</span> x record<span class="synSpecial">)</span> <span class="synConstant">#t</span><span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span>
           <span class="synSpecial">(</span><span class="synStatement">or</span> <span class="synSpecial">(</span>recur <span class="synSpecial">(</span><span class="synIdentifier">car</span> x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> x record<span class="synSpecial">))</span>
               <span class="synSpecial">(</span>recur <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> x record<span class="synSpecial">)))))))</span>
</pre>


