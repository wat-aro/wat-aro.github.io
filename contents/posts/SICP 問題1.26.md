---
title: "SICP 問題1.26"
published: 2015/10/07
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>expmod base <span class="synIdentifier">exp</span> m<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">=</span> <span class="synIdentifier">exp</span> <span class="synConstant">0</span><span class="synSpecial">)</span> <span class="synConstant">1</span><span class="synSpecial">)</span>
        <span class="synSpecial">((</span><span class="synIdentifier">even?</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">remainder</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> <span class="synSpecial">(</span>expmod base <span class="synSpecial">(</span><span class="synIdentifier">/</span> <span class="synIdentifier">exp</span> <span class="synConstant">2</span><span class="synSpecial">)</span> m<span class="synSpecial">)</span>
                       <span class="synSpecial">(</span>expmod base <span class="synSpecial">(</span><span class="synIdentifier">/</span> <span class="synIdentifier">exp</span> <span class="synConstant">2</span><span class="synSpecial">)</span> m<span class="synSpecial">))</span>
                    m<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">remainder</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> base <span class="synSpecial">(</span>expmod base <span class="synSpecial">(</span><span class="synIdentifier">-</span> <span class="synIdentifier">exp</span> <span class="synConstant">1</span><span class="synSpecial">)</span> m<span class="synSpecial">))</span>
                         m<span class="synSpecial">))))</span>
</pre>


<p>square を使わないことで * の部分で <code>(expomd base (/ exp 2) m)</code> が二回呼ばれているため．<a class="keyword" href="http://d.hatena.ne.jp/keyword/%C3%E0%BC%A1">逐次</a>平方になっていない．</p>

