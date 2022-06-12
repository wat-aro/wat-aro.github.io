---
title: "SICP 問題 4.40"
published: 2016/01/11
tags:
  - scheme
  - SICP
---

<p>人の階への割り当ての組みは，相異なるという要求の前では5<sup>5</sup>通りある．  <br/>
要求の後では5!通りになる．  <br/>
　<br/>
ambで生成してすぐにテストすることで効率的な手続き</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>multiple-dwelling<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>baker <span class="synSpecial">(</span>amb <span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span> <span class="synConstant">4</span> <span class="synConstant">5</span><span class="synSpecial">)))</span>
    <span class="synSpecial">(</span>require <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> baker <span class="synConstant">5</span><span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>cooper <span class="synSpecial">(</span>amb <span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span> <span class="synConstant">4</span> <span class="synConstant">5</span><span class="synSpecial">)))</span>
      <span class="synSpecial">(</span>require <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> cooper <span class="synConstant">1</span><span class="synSpecial">)))</span>
      <span class="synSpecial">(</span>distinct? <span class="synSpecial">(</span><span class="synIdentifier">list</span> baker cooper<span class="synSpecial">))</span>
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>fletcher <span class="synSpecial">(</span>amb <span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span> <span class="synConstant">4</span> <span class="synConstant">5</span><span class="synSpecial">)))</span>
        <span class="synSpecial">(</span>require <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> fletcher <span class="synConstant">1</span><span class="synSpecial">)))</span>
        <span class="synSpecial">(</span>require <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> fletcher <span class="synConstant">5</span><span class="synSpecial">)))</span>
        <span class="synSpecial">(</span>require <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> <span class="synSpecial">(</span><span class="synIdentifier">abs</span> <span class="synSpecial">(</span><span class="synIdentifier">-</span> fletcher cooper<span class="synSpecial">))</span> <span class="synConstant">1</span><span class="synSpecial">)))</span>
        <span class="synSpecial">(</span>require <span class="synSpecial">(</span>distinct? <span class="synSpecial">(</span><span class="synIdentifier">list</span> baker cooper fletcher<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>miller <span class="synSpecial">(</span>amb <span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span> <span class="synConstant">4</span> <span class="synConstant">5</span><span class="synSpecial">)))</span>
          <span class="synSpecial">(</span>require <span class="synSpecial">(</span><span class="synIdentifier">&lt;</span> cooper miller<span class="synSpecial">))</span>
          <span class="synSpecial">(</span>require <span class="synSpecial">(</span>distinct? <span class="synSpecial">(</span><span class="synIdentifier">list</span> baker cooper fletcher miller<span class="synSpecial">)))</span>
          <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>smith <span class="synSpecial">(</span>amb <span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span> <span class="synConstant">4</span> <span class="synConstant">5</span><span class="synSpecial">)))</span>
            <span class="synSpecial">(</span>require <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> <span class="synSpecial">(</span><span class="synIdentifier">abs</span> <span class="synSpecial">(</span><span class="synIdentifier">-</span> smith fletcher<span class="synSpecial">))</span> <span class="synConstant">1</span><span class="synSpecial">)))</span>
            <span class="synSpecial">(</span>require <span class="synSpecial">(</span>distinct? <span class="synSpecial">(</span><span class="synIdentifier">list</span> baker cooper fletcher miller smith<span class="synSpecial">)))</span>
            <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>baker baker<span class="synSpecial">)</span>
                  <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>cooper cooper<span class="synSpecial">)</span>
                  <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>fletcher fletcher<span class="synSpecial">)</span>
                  <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>miller miller<span class="synSpecial">)</span>
                  <span class="synSpecial">(</span>lsit <span class="synSpecial">'</span>smith smith<span class="synSpecial">))))))))</span>
</pre>


