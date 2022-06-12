---
title: "SICP 問題 2.53"
published: 2015/10/25
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>a <span class="synSpecial">'</span>b <span class="synSpecial">'</span>c<span class="synSpecial">)</span>
<span class="synSpecial">(</span>a b c<span class="synSpecial">)</span>

<span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>george<span class="synSpecial">))</span>
<span class="synSpecial">((</span>george<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synIdentifier">cdr</span> <span class="synSpecial">'((</span>x1 x2<span class="synSpecial">)</span> <span class="synSpecial">(</span>y1 y2<span class="synSpecial">)))</span>
<span class="synSpecial">((</span>y1 y2<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synIdentifier">cadr</span> <span class="synSpecial">'((</span>x1 x2<span class="synSpecial">)</span> <span class="synSpecial">(</span>y1 y2<span class="synSpecial">)))</span>
<span class="synSpecial">(</span>y1 y2<span class="synSpecial">)</span>

<span class="synSpecial">(</span><span class="synIdentifier">pair?</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> <span class="synSpecial">'(</span>a short list<span class="synSpecial">)))</span>
<span class="synConstant">#f</span>

<span class="synSpecial">(</span><span class="synIdentifier">memq</span> <span class="synSpecial">'</span>red <span class="synSpecial">'((</span>red shoes<span class="synSpecial">)</span> <span class="synSpecial">(</span>blue socks<span class="synSpecial">)))</span>
<span class="synConstant">#f</span>

<span class="synSpecial">(</span><span class="synIdentifier">memq</span> <span class="synSpecial">'</span>red <span class="synSpecial">'(</span>red shoes blue socks<span class="synSpecial">))</span>
<span class="synSpecial">(</span>red shoes blue socks<span class="synSpecial">)</span>
</pre>


