---
title: "SICP 問題 4.27"
published: 2016/01/07
tags:
  - scheme
  - SICP
---

<p>遅延評価</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> count <span class="synConstant">0</span><span class="synSpecial">)</span>

<span class="synComment">;;; M-Eval value:</span>
ok

<span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>id x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">set!</span> count <span class="synSpecial">(</span><span class="synIdentifier">+</span> count <span class="synConstant">1</span><span class="synSpecial">))</span>
  x<span class="synSpecial">)</span>

<span class="synComment">;;; M-Eval value:</span>
ok

<span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> w <span class="synSpecial">(</span>id <span class="synSpecial">(</span>id <span class="synConstant">10</span><span class="synSpecial">)))</span>

<span class="synComment">;;; M-Eval value:</span>
ok 

<span class="synComment">;;; M-Eval input:</span>
count

<span class="synComment">;;; M-Eval value:</span>
<span class="synConstant">1</span>

<span class="synComment">;;; M-Eval input:</span>
w

<span class="synComment">;;; M-Eval value:</span>
<span class="synConstant">10</span>

<span class="synComment">;;; M-Eval input:</span>
count

<span class="synComment">;;; M-Eval value:</span>
<span class="synConstant">2</span>
</pre>


<p>wを定義する時に<code>(id (id 10))</code>がevalされる．<br/>
aplication?からmy-applyに送られる．<br/>
この時にoperatorはactual-valueされるがoperandsはされない．<br/>
そこで<code>(set! count (+ count 1))</code>の行からcountが1になり，<code>(id (id 10))</code>の値は<code>(thunk (id 10))</code>として保存される．．<br/>
その後，wを評価すると，<code>(actual-value w)</code>となるのでdelayしていた部分が全てforceされる．<br/>
しかし，この時点で<code>(id (id 10))</code>の値は<code>(id 10)</code>であると保存されているので<code>(thunk (id 10))</code>が返されるだけでset!行は実行されない．<br/>
そして<code>(thunk (id 10))</code>が評価されてcountが2になる．<br/>
　<br/>
環境の中身は以下のようになっている．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; the-global-environment
<span class="synError">#0=</span><span class="synSpecial">(((</span>w id count driver-loop try false true <span class="synIdentifier">car</span> <span class="synIdentifier">cdr</span> <span class="synIdentifier">cons</span> <span class="synIdentifier">null?</span> <span class="synIdentifier">=</span> <span class="synIdentifier">-</span> <span class="synIdentifier">+</span> <span class="synIdentifier">*</span> <span class="synIdentifier">/</span><span class="synSpecial">)</span>
     <span class="synSpecial">(</span>thunk <span class="synSpecial">(</span>id <span class="synConstant">10</span><span class="synSpecial">)</span> <span class="synConstant">#0#</span><span class="synSpecial">)</span>
     <span class="synSpecial">(</span>procedure <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">((</span><span class="synStatement">set!</span> count <span class="synSpecial">(</span><span class="synIdentifier">+</span> count <span class="synConstant">1</span><span class="synSpecial">))</span> x<span class="synSpecial">)</span> <span class="synConstant">#0#</span><span class="synSpecial">)</span>
     <span class="synConstant">1</span>
     <span class="synSpecial">(</span>procedure <span class="synSpecial">()</span>
                <span class="synSpecial">((</span>prompt-for-input input-prompt<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>input <span class="synSpecial">(</span><span class="synIdentifier">read</span><span class="synSpecial">)))</span>
                   <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>output <span class="synSpecial">(</span>actual-value input the-global-environment<span class="synSpecial">)))</span>
                     <span class="synSpecial">(</span>announce-output output<span class="synSpecial">)</span>
                     <span class="synSpecial">(</span>user-print output<span class="synSpecial">)))</span>
                 <span class="synSpecial">(</span>driver-loop<span class="synSpecial">))</span> <span class="synConstant">#0#</span><span class="synSpecial">)</span>
     <span class="synSpecial">(</span>procedure <span class="synSpecial">(</span>a b<span class="synSpecial">)</span> <span class="synSpecial">((</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> a <span class="synConstant">0</span><span class="synSpecial">)</span> <span class="synConstant">1</span> b<span class="synSpecial">))</span> <span class="synConstant">#0#</span><span class="synSpecial">)</span>
     <span class="synConstant">#f</span>
     <span class="synConstant">#t</span>
     <span class="synSpecial">(</span>primitive <span class="synError">#&lt;subr</span> car&gt;<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>primitive <span class="synError">#&lt;subr</span> cdr&gt;<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>primitive <span class="synError">#&lt;subr</span> cons&gt;<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>primitive <span class="synError">#&lt;subr</span> null?&gt;<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>primitive <span class="synError">#&lt;subr</span> <span class="synStatement">=&gt;</span><span class="synSpecial">)</span>
     <span class="synSpecial">(</span>primitive <span class="synError">#&lt;subr</span> <span class="synError">-&gt;</span><span class="synSpecial">)</span>
     <span class="synSpecial">(</span>primitive <span class="synError">#&lt;subr</span> <span class="synError">+&gt;</span><span class="synSpecial">)</span>
     <span class="synSpecial">(</span>primitive <span class="synError">#&lt;subr</span> *&gt;<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>primitive <span class="synError">#&lt;subr</span> /&gt;<span class="synSpecial">)))</span>
</pre>


<p>wの値は <code>(thunk (id 10))</code>になっている．</p>

