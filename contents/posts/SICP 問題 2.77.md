---
title: "SICP 問題 2.77"
published: 2015/10/31
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span>put <span class="synSpecial">'</span>real-part <span class="synSpecial">'(</span>complex<span class="synSpecial">)</span> <span class="synIdentifier">real-part</span><span class="synSpecial">)</span>
<span class="synSpecial">(</span>put <span class="synSpecial">'</span>imag-part <span class="synSpecial">'(</span>complex<span class="synSpecial">)</span> <span class="synIdentifier">imag-part</span><span class="synSpecial">)</span>
<span class="synSpecial">(</span>put <span class="synSpecial">'</span>magnitude <span class="synSpecial">'(</span>complex<span class="synSpecial">)</span> <span class="synIdentifier">magnitude</span><span class="synSpecial">)</span>
<span class="synSpecial">(</span>put <span class="synSpecial">'</span>angle <span class="synSpecial">'(</span>complex<span class="synSpecial">)</span> <span class="synIdentifier">angle</span><span class="synSpecial">)</span>


<span class="synComment">;; magnitudeはcomplex型を知らないのでerrorを返す．</span>
<span class="synComment">;; なので表にcomplex型を追加すれば動く．</span>


<span class="synSpecial">(</span><span class="synIdentifier">magnitude</span> z<span class="synSpecial">)</span>
<span class="synComment">;=&gt;</span>
<span class="synSpecial">(</span><span class="synIdentifier">magnitude</span> <span class="synSpecial">(</span>complex ractangular <span class="synConstant">3</span> <span class="synSpecial">.</span> <span class="synConstant">4</span><span class="synSpecial">))</span>
<span class="synComment">;=&gt;</span>
<span class="synSpecial">(</span>apply-generic <span class="synIdentifier">magnitude</span> <span class="synSpecial">(</span>complex ractangular <span class="synConstant">3</span> <span class="synSpecial">.</span> <span class="synConstant">4</span><span class="synSpecial">))</span>
<span class="synComment">;=&gt;</span>
<span class="synSpecial">((</span>get <span class="synSpecial">'</span>magnitude <span class="synSpecial">'(</span>complex<span class="synSpecial">))</span> <span class="synSpecial">(</span>ractangular <span class="synConstant">3</span> <span class="synSpecial">.</span> <span class="synConstant">4</span><span class="synSpecial">))</span>
<span class="synComment">;=&gt;</span>
<span class="synSpecial">(</span><span class="synIdentifier">magnitude</span> <span class="synSpecial">(</span>ractangular <span class="synConstant">3</span> <span class="synSpecial">.</span> <span class="synConstant">4</span><span class="synSpecial">))</span>
<span class="synComment">;=&gt;</span>
<span class="synSpecial">(</span>apply-generic <span class="synIdentifier">magnitude</span> <span class="synSpecial">(</span>ractangular <span class="synConstant">3</span> <span class="synSpecial">.</span> <span class="synConstant">4</span><span class="synSpecial">))</span>
<span class="synComment">;=&gt;</span>
<span class="synSpecial">((</span>get <span class="synSpecial">'</span>magnitude <span class="synSpecial">'(</span>ractangular<span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synConstant">3</span> <span class="synSpecial">.</span> <span class="synConstant">4</span><span class="synSpecial">))</span>
<span class="synComment">;=&gt;</span>
<span class="synSpecial">(</span><span class="synIdentifier">magnitude</span> <span class="synSpecial">(</span><span class="synConstant">3</span> <span class="synSpecial">.</span> <span class="synConstant">4</span><span class="synSpecial">))</span>
<span class="synComment">;=&gt;</span>
<span class="synSpecial">(</span><span class="synIdentifier">sqrt</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span>square <span class="synConstant">3</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>square <span class="synConstant">4</span><span class="synSpecial">)))</span>
<span class="synComment">;=&gt;</span>
<span class="synConstant">5</span>
</pre>


