---
title: "SICP 問題 4.37"
published: 2016/01/11
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>a-pythagorean-triple-between low high<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>i <span class="synSpecial">(</span>an-integer-between low high<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>hsq <span class="synSpecial">(</span><span class="synIdentifier">*</span> high high<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>j <span class="synSpecial">(</span>an-integer-between i high<span class="synSpecial">)))</span>
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>ksq <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> i i<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> j j<span class="synSpecial">))))</span>
        <span class="synSpecial">(</span>require <span class="synSpecial">(</span><span class="synIdentifier">&gt;=</span> hsq ksq<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>k <span class="synSpecial">(</span><span class="synIdentifier">sqrt</span> ksq<span class="synSpecial">)))</span>
          <span class="synSpecial">(</span>require <span class="synSpecial">(</span><span class="synIdentifier">integer?</span> k<span class="synSpecial">))</span>
          <span class="synSpecial">(</span><span class="synIdentifier">list</span> i j k<span class="synSpecial">))))))</span>
</pre>


<p>これは元の手続きよりも効率的になっている．<br/>
i,jについてはhigh以下の数について全数を探索するが，kはそれがないため探索数が減っている．</p>

