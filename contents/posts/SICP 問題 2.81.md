---
title: "SICP 問題 2.81"
published: 2015/10/31
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; a</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>apply-generic op <span class="synSpecial">.</span> args<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>type-tags <span class="synSpecial">(</span><span class="synIdentifier">map</span> type-tag args<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>proc <span class="synSpecial">(</span>get op type-tags<span class="synSpecial">)))</span>
      <span class="synSpecial">(</span><span class="synStatement">if</span> proc <span class="synComment">;;false</span>
          <span class="synSpecial">(</span><span class="synIdentifier">apply</span> proc <span class="synSpecial">(</span><span class="synIdentifier">map</span> contents args<span class="synSpecial">))</span>
          <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> <span class="synSpecial">(</span><span class="synIdentifier">length</span> args<span class="synSpecial">)</span> <span class="synConstant">2</span><span class="synSpecial">)</span>
              <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>type1 <span class="synSpecial">(</span><span class="synIdentifier">car</span> type-tags<span class="synSpecial">))</span>
                    <span class="synSpecial">(</span>type2 <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> type-tags<span class="synSpecial">))</span>
                    <span class="synSpecial">(</span>a1 <span class="synSpecial">(</span><span class="synIdentifier">car</span> args<span class="synSpecial">))</span>
                    <span class="synSpecial">(</span>a2 <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> args<span class="synSpecial">)))</span>
                <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>t1-&gt;t2 <span class="synSpecial">(</span>get-coercion type1 type2<span class="synSpecial">))</span>
                      <span class="synSpecial">(</span>t2-&gt;t1 <span class="synSpecial">(</span>get-coercion type2 type1<span class="synSpecial">)))</span>
                  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">(</span>t1-&gt;t2 <span class="synComment">;;true</span>
                         <span class="synSpecial">(</span>apply-generic op <span class="synSpecial">(</span>t1-&gt;t2 a1<span class="synSpecial">)</span> a2<span class="synSpecial">))</span> <span class="synComment">;;complex-&gt;complex</span>
                        <span class="synSpecial">(</span>t2-&gt;t1
                         <span class="synSpecial">(</span>apply-generic op a1 <span class="synSpecial">(</span>t2-&gt;t1 a2<span class="synSpecial">)))</span>
                        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>error <span class="synConstant">&quot;No method for these types&quot;</span>
                                     <span class="synSpecial">(</span><span class="synIdentifier">list</span> op type-tags<span class="synSpecial">))))))</span>
              <span class="synSpecial">(</span>error <span class="synConstant">&quot;Nomethod for these types&quot;</span>
                     <span class="synSpecial">(</span><span class="synIdentifier">list</span> op type-tags<span class="synSpecial">)))))))</span>

<span class="synComment">;; 引数に二つの複素数を持ってexpを呼び出すと，</span>
<span class="synComment">;; procがfalseになり，complexからcomplexへの変換を無限ループする</span>

<span class="synComment">;; b</span>
<span class="synComment">;; 無限ループに陥るのでLouisはまちがっている</span>

<span class="synComment">;; c</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>apply-generic op <span class="synSpecial">.</span> args<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>type-tags <span class="synSpecial">(</span><span class="synIdentifier">map</span> type-tag args<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>proc <span class="synSpecial">(</span>get op type-tags<span class="synSpecial">)))</span>
      <span class="synSpecial">(</span><span class="synStatement">if</span> proc
          <span class="synSpecial">(</span><span class="synIdentifier">apply</span> proc <span class="synSpecial">(</span><span class="synIdentifier">map</span> contents args<span class="synSpecial">))</span>
          <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> <span class="synSpecial">(</span><span class="synIdentifier">length</span> args<span class="synSpecial">)</span> <span class="synConstant">2</span><span class="synSpecial">)</span>
                   <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> type-tags<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> type-tags<span class="synSpecial">)))</span> <span class="synComment">;;同じtype-tagならエラーになる</span>
              <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>type1 <span class="synSpecial">(</span><span class="synIdentifier">car</span> type-tags<span class="synSpecial">))</span>
                    <span class="synSpecial">(</span>type2 <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> type-tags<span class="synSpecial">))</span>
                    <span class="synSpecial">(</span>a1 <span class="synSpecial">(</span><span class="synIdentifier">car</span> args<span class="synSpecial">))</span>
                    <span class="synSpecial">(</span>a2 <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> args<span class="synSpecial">)))</span>
                <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>t1-&gt;t2 <span class="synSpecial">(</span>get-coercion type1 type2<span class="synSpecial">))</span>
                      <span class="synSpecial">(</span>t2-&gt;t1 <span class="synSpecial">(</span>get-coercion type2 type1<span class="synSpecial">)))</span>
                  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">(</span>t1-&gt;t2
                         <span class="synSpecial">(</span>apply-generic op <span class="synSpecial">(</span>t1-&gt;t2 a1<span class="synSpecial">)</span> a2<span class="synSpecial">))</span>
                        <span class="synSpecial">(</span>t2-&gt;t1
                         <span class="synSpecial">(</span>apply-generic op a1 <span class="synSpecial">(</span>t2-&gt;t1 a2<span class="synSpecial">)))</span>
                        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>error <span class="synConstant">&quot;No method for these types&quot;</span>
                                     <span class="synSpecial">(</span><span class="synIdentifier">list</span> op type-tags<span class="synSpecial">))))))</span>
              <span class="synSpecial">(</span>error <span class="synConstant">&quot;Nomethod for these types&quot;</span>
                     <span class="synSpecial">(</span><span class="synIdentifier">list</span> op type-tags<span class="synSpecial">)))))))</span>
</pre>


