---
title: "SICP 問題 5.14"
published: 2016/01/29
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> fact-machine
  <span class="synSpecial">(</span>make-machine
   <span class="synSpecial">'(</span>continue n val<span class="synSpecial">)</span>
   <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>= <span class="synIdentifier">=</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>- <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>* <span class="synIdentifier">*</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>print print<span class="synSpecial">))</span>
   <span class="synSpecial">'(</span>controller
     <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label fact-done<span class="synSpecial">))</span>
     fact-loop
     <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op =<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
     <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label base-case<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>save n<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>op -<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
     <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label after-fact<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label fact-loop<span class="synSpecial">))</span>
     after-fact
     <span class="synSpecial">(</span>restore n<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op *<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
     base-case
     <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
     fact-done<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>fact n<span class="synSpecial">)</span>
  <span class="synSpecial">((</span>fact-machine <span class="synSpecial">'</span>stack<span class="synSpecial">)</span> <span class="synSpecial">'</span>initialize<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>set-register-contents! fact-machine <span class="synSpecial">'</span>n n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>start fact-machine<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>format <span class="synConstant">#t</span> <span class="synConstant">&quot;factorial: ~2d = ~10d&quot;</span> n <span class="synSpecial">(</span>get-register-contents fact-machine <span class="synSpecial">'</span>val<span class="synSpecial">))</span>
  <span class="synSpecial">((</span>fact-machine <span class="synSpecial">'</span>stack<span class="synSpecial">)</span> <span class="synSpecial">'</span>print-statistics<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">newline</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>display-fact n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> iter <span class="synSpecial">((</span>k <span class="synConstant">1</span><span class="synSpecial">))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> k n<span class="synSpecial">)</span>
        <span class="synSpecial">(</span>fact k<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">begin</span> <span class="synSpecial">(</span>fact k<span class="synSpecial">)</span>
               <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">+</span> k <span class="synConstant">1</span><span class="synSpecial">))))))</span>
</pre>




<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span>display-fact <span class="synConstant">10</span><span class="synSpecial">)</span>
factorial:  <span class="synConstant">1</span> <span class="synIdentifier">=</span>          <span class="synConstant">1</span>
<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">0</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">0</span><span class="synSpecial">)</span>
factorial:  <span class="synConstant">2</span> <span class="synIdentifier">=</span>          <span class="synConstant">2</span>
<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">2</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">2</span><span class="synSpecial">)</span>
factorial:  <span class="synConstant">3</span> <span class="synIdentifier">=</span>          <span class="synConstant">6</span>
<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">4</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">4</span><span class="synSpecial">)</span>
factorial:  <span class="synConstant">4</span> <span class="synIdentifier">=</span>         <span class="synConstant">24</span>
<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">6</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">6</span><span class="synSpecial">)</span>
factorial:  <span class="synConstant">5</span> <span class="synIdentifier">=</span>        <span class="synConstant">120</span>
<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">8</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">8</span><span class="synSpecial">)</span>
factorial:  <span class="synConstant">6</span> <span class="synIdentifier">=</span>        <span class="synConstant">720</span>
<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">10</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">10</span><span class="synSpecial">)</span>
factorial:  <span class="synConstant">7</span> <span class="synIdentifier">=</span>       <span class="synConstant">5040</span>
<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">12</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">12</span><span class="synSpecial">)</span>
factorial:  <span class="synConstant">8</span> <span class="synIdentifier">=</span>      <span class="synConstant">40320</span>
<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">14</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">14</span><span class="synSpecial">)</span>
factorial:  <span class="synConstant">9</span> <span class="synIdentifier">=</span>     <span class="synConstant">362880</span>
<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">16</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">16</span><span class="synSpecial">)</span>
factorial: <span class="synConstant">10</span> <span class="synIdentifier">=</span>    <span class="synConstant">3628800</span>
<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">18</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">18</span><span class="synSpecial">)</span>
<span class="synError">#&lt;undef&gt;</span>
</pre>


<p>total-depth, maximum-depthともに2(n-1)回になる．</p>

