---
title: "SICP 問題 4.15"
published: 2015/12/22
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; 引数の手続きpとオブジェクトaについて，式(p a)停止するかどうかを正確に判断するような手続きhalts?</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>run-forever<span class="synSpecial">)</span> <span class="synSpecial">(</span>run-forever<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>try p<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>halts? p p<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>run-forever<span class="synSpecial">)</span>
      <span class="synSpecial">'</span>halted<span class="synSpecial">))</span>

<span class="synSpecial">(</span>try try<span class="synSpecial">)</span>

<span class="synComment">;; まずこれが停止すると仮定する．すると(halts? try try)はtrueを返し，then節(run-forever)を実行するので停止しない．</span>
<span class="synComment">;; 次にこれが停止しないと仮定する．(halts? try try)がfalseなのでelse節'haltsが実行されるので停止する．</span>
<span class="synComment">;; 矛盾するのでhalts?は定義できない．</span>
</pre>


