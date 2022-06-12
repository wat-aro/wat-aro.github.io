---
title: "プログラミングGauche 8.3.3練習問題"
published: 2015/09/21
tags:
  - scheme
  - gauche
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>any-pred <span class="synSpecial">.</span> preds<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>fold <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>pred false<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synStatement">or</span> <span class="synSpecial">(</span>pred x<span class="synSpecial">)</span> false<span class="synSpecial">))</span> <span class="synConstant">#f</span> preds<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>every-pred <span class="synSpecial">.</span> preds<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>fold <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>pred true<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span>pred x<span class="synSpecial">)</span> true<span class="synSpecial">))</span> <span class="synConstant">#t</span> preds<span class="synSpecial">)))</span>
</pre>


