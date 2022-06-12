---
title: "SICP 問題2.25"
published: 2015/10/19
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synConstant">3</span> <span class="synSpecial">(</span><span class="synConstant">5</span> <span class="synConstant">7</span><span class="synSpecial">)</span> <span class="synConstant">9</span><span class="synSpecial">)</span>
<span class="synSpecial">(</span><span class="synIdentifier">car</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span><span class="synSpecial">)))))</span>

<span class="synSpecial">((</span><span class="synConstant">7</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synIdentifier">car</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> <span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synSpecial">(</span><span class="synConstant">2</span> <span class="synSpecial">(</span><span class="synConstant">3</span> <span class="synSpecial">(</span><span class="synConstant">4</span> <span class="synSpecial">(</span><span class="synConstant">5</span> <span class="synSpecial">(</span><span class="synConstant">6</span> <span class="synConstant">7</span><span class="synSpecial">))))))</span>
<span class="synSpecial">(</span><span class="synIdentifier">car</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> <span class="synSpecial">))))))))))))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (car (cdr (car (cdr (cdr &#39;(1 3 (5 7) 9))))))
7
gosh&gt; (car (car &#39;((7))))
7
gosh&gt; (car (cdr (car (cdr (car (cdr (car (cdr (car (cdr (car (cdr &#39;(1 (2 (3 (4 (5 (6 7))))))))))))))))))
7</pre>


