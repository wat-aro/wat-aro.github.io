---
title: "SICP 問題 2.10"
published: 2015/10/13
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; y が0をまたがる区間の時はエラーを返す</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>div-interval x y<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">&gt;</span> <span class="synConstant">0</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> <span class="synSpecial">(</span>lower-bound y<span class="synSpecial">)</span> <span class="synSpecial">(</span>upper-bound y<span class="synSpecial">)))</span>
      <span class="synSpecial">(</span>error <span class="synConstant">&quot;error&quot;</span><span class="synSpecial">)</span>
      <span class="synSpecial">(</span>mul-interval x
                    <span class="synSpecial">(</span>make-interval <span class="synSpecial">(</span><span class="synIdentifier">/</span> <span class="synSpecial">(</span>upper-bound y<span class="synSpecial">))</span>
                                   <span class="synSpecial">(</span><span class="synIdentifier">/</span> <span class="synSpecial">(</span>lower-bound y<span class="synSpecial">))))))</span>
</pre>


