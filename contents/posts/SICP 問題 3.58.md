---
title: "SICP 問題 3.58"
published: 2015/12/09
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>expand num den radix<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>cons-stream
   <span class="synSpecial">(</span><span class="synIdentifier">quotient</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> num radix<span class="synSpecial">)</span> den<span class="synSpecial">)</span>
   <span class="synSpecial">(</span>expand <span class="synSpecial">(</span><span class="synIdentifier">remainder</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> num radix<span class="synSpecial">)</span> den<span class="synSpecial">)</span> den radix<span class="synSpecial">)))</span>

<span class="synError">#|</span>
<span class="synSpecial">(</span><span class="synIdentifier">/</span> num den<span class="synSpecial">)</span><span class="synError">を表す少数を生成する．</span>
<span class="synSpecial">(</span>expand <span class="synConstant">1</span> <span class="synConstant">7</span> <span class="synConstant">10</span><span class="synSpecial">)</span><span class="synError">は</span>
<span class="synConstant">1</span>
<span class="synConstant">4</span>
<span class="synConstant">2</span>
<span class="synConstant">8</span>
<span class="synConstant">5</span>
<span class="synConstant">7</span>

<span class="synSpecial">(</span>expand <span class="synConstant">3</span> <span class="synConstant">8</span> <span class="synConstant">10</span><span class="synSpecial">)</span><span class="synError">は</span>
<span class="synConstant">3</span>
<span class="synConstant">7</span>
<span class="synConstant">5</span>
<span class="synConstant">0</span>

<span class="synError">つまり0.375で割り切れる．</span>
<span class="synError">|#</span>
</pre>


