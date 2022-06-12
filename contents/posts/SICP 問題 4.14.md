---
title: "SICP 問題 4.14"
published: 2015/12/22
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; M-EVAL中の手続きは先頭に'procedureがついたリスト．</span>
<span class="synComment">;; 基層のLispのmapを使うとただのリストとして受け取ってしまうためにうまくいかない．</span>


<span class="synSpecial">(</span><span class="synStatement">define</span> primitive-procedures
  <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>car <span class="synIdentifier">car</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>cdr <span class="synIdentifier">cdr</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>cons <span class="synIdentifier">cons</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>null? <span class="synIdentifier">null?</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>map <span class="synIdentifier">map</span><span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>primitive-procedure-names<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synIdentifier">car</span> primitive-procedures<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>primitive-procedure-objects<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>proc<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>primitive <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> proc<span class="synSpecial">)))</span>
       primitive-procedures<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>setup-environment<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>initial-env
         <span class="synSpecial">(</span>extend-environment <span class="synSpecial">(</span>primitive-procedure-names<span class="synSpecial">)</span>
                             <span class="synSpecial">(</span>primitive-procedure-objects<span class="synSpecial">)</span>
                             the-empty-environment<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span>define-variable! <span class="synSpecial">'</span>true true initial-env<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>define-variable! <span class="synSpecial">'</span>false false initial-env<span class="synSpecial">)</span>
    initial-env<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> the-global-environment <span class="synSpecial">(</span>setup-environment<span class="synSpecial">))</span>
</pre>




<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span>driver-loop<span class="synSpecial">)</span>


<span class="synComment">;;; M-EVAL input:</span>
<span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synIdentifier">car</span> <span class="synSpecial">'((</span>a <span class="synConstant">1</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>b <span class="synConstant">2</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>c <span class="synConstant">3</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>d <span class="synConstant">4</span><span class="synSpecial">)))</span>
<span class="synConstant">***</span> ERROR: invalid application: <span class="synSpecial">((</span>primitive <span class="synError">#&lt;subr</span> car&gt;<span class="synSpecial">)</span> <span class="synSpecial">(</span>a <span class="synConstant">1</span><span class="synSpecial">))</span>
Stack Trace:
_______________________________________
  <span class="synConstant">0</span>  <span class="synSpecial">(</span><span class="synIdentifier">eval</span> input the-global-environment<span class="synSpecial">)</span>
        At line <span class="synConstant">961</span> of <span class="synConstant">&quot;/Users/home/work/scheme/SICP/4.1.scm&quot;</span>
  <span class="synConstant">1</span>  <span class="synSpecial">(</span><span class="synIdentifier">eval</span> expr env<span class="synSpecial">)</span>
        At line <span class="synConstant">179</span> of <span class="synConstant">&quot;/usr/local/Cellar/gauche/0.9.4/share/gauche-0.9/0.9.4/lib/gauche/interactive.scm&quot;</span>
</pre>




<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> primitive-procedures
  <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>car <span class="synIdentifier">car</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>cdr <span class="synIdentifier">cdr</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>cons <span class="synIdentifier">cons</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>null? <span class="synIdentifier">null?</span><span class="synSpecial">)))</span>
</pre>




<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span>driver-loop<span class="synSpecial">)</span>


<span class="synComment">;;; M-EVAL input:</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">map</span> proc lst<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> lst<span class="synSpecial">)</span>
      <span class="synSpecial">'()</span>
      <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>proc <span class="synSpecial">(</span><span class="synIdentifier">car</span> lst<span class="synSpecial">))</span>
            <span class="synSpecial">(</span><span class="synIdentifier">map</span> proc <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lst<span class="synSpecial">)))))</span>

<span class="synComment">;;; M-EVAL value</span>
ok

<span class="synComment">;;; M-EVAL input:</span>
<span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synIdentifier">car</span> <span class="synSpecial">'((</span>a <span class="synConstant">1</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>b <span class="synConstant">2</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>c <span class="synConstant">3</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>d <span class="synConstant">4</span><span class="synSpecial">)))</span>

<span class="synComment">;;; M-EVAL value</span>
<span class="synSpecial">(</span>a b c d<span class="synSpecial">)</span>
</pre>


