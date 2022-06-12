---
title: "SICP 問題 2.84"
published: 2015/11/02
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>apply-generic op <span class="synSpecial">.</span> args<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>type-tags <span class="synSpecial">(</span><span class="synIdentifier">map</span> type-tag args<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>tower <span class="synSpecial">'(</span>complex real rational scheme-number<span class="synSpecial">)))</span>
    <span class="synComment">;; 同じタイプか調べる述語</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>same-type? a b<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span>type-tag a<span class="synSpecial">)</span> <span class="synSpecial">(</span>type-tag b<span class="synSpecial">)))</span>
    <span class="synComment">;; aよりもbのほうが階層が高いか調べる述語</span>
    <span class="synComment">;; 両方をraiseしながらcomplexに先になったほうが階層が高い</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>type-&lt; a b<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>same-type? a b<span class="synSpecial">)</span> false<span class="synSpecial">)</span>
              <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span>type-tag a<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> tower<span class="synSpecial">))</span> true<span class="synSpecial">)</span>
              <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span>type-tag b<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> tower<span class="synSpecial">))</span> false<span class="synSpecial">)</span>
              <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>type-&lt; <span class="synSpecial">((</span>get <span class="synSpecial">'</span>raise <span class="synSpecial">(</span>type-tag a<span class="synSpecial">))</span> a<span class="synSpecial">)</span>
                            <span class="synSpecial">((</span>get <span class="synSpecial">'</span>raise <span class="synSpecial">(</span>type-tag b<span class="synSpecial">))</span> b<span class="synSpecial">)))))</span>
    <span class="synComment">;; リストの中でもっとも高い階層の型を調べる</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>highest-type lst<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">let</span> iter <span class="synSpecial">((</span>result <span class="synSpecial">(</span><span class="synIdentifier">car</span> lst<span class="synSpecial">))</span>
                 <span class="synSpecial">(</span>rest <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lst<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> rest<span class="synSpecial">)</span> result<span class="synSpecial">)</span>
              <span class="synSpecial">((</span>type-&lt; result <span class="synSpecial">(</span><span class="synIdentifier">car</span> rest<span class="synSpecial">))</span>
               <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">car</span> rest<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> rest<span class="synSpecial">)))</span>
              <span class="synSpecial">(</span><span class="synStatement">else</span>
               <span class="synSpecial">(</span>iter result <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> rest<span class="synSpecial">))))))</span>
    <span class="synComment">;; リストの要素すべてを最も階層の高い型highまでraiseする</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>same-highest-type high lst<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synStatement">let</span> iter <span class="synSpecial">((</span>target x<span class="synSpecial">))</span>
                         <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> high target<span class="synSpecial">)</span>
                             target
                             <span class="synSpecial">(</span>iter <span class="synSpecial">((</span>get <span class="synSpecial">'</span>raise <span class="synSpecial">(</span>type-tag target<span class="synSpecial">))</span>
                                    target<span class="synSpecial">)))))</span>
           lst<span class="synSpecial">))</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>proc <span class="synSpecial">(</span>get op types<span class="synSpecial">)))</span>
      <span class="synSpecial">(</span><span class="synStatement">if</span> proc
          <span class="synSpecial">(</span><span class="synIdentifier">apply</span> proc <span class="synSpecial">(</span><span class="synIdentifier">map</span> contents args<span class="synSpecial">))</span>
          <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>new-args <span class="synSpecial">(</span>same-highest-type <span class="synSpecial">(</span>highest-type args<span class="synSpecial">)</span>
                                             args<span class="synSpecial">)))</span>
            <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>proc <span class="synSpecial">(</span>get op <span class="synSpecial">(</span>type-tag <span class="synSpecial">(</span><span class="synIdentifier">car</span> new-args<span class="synSpecial">)))))</span>
              <span class="synSpecial">(</span><span class="synStatement">if</span> proc
                  <span class="synSpecial">(</span><span class="synIdentifier">apply</span> proc <span class="synSpecial">(</span><span class="synIdentifier">map</span> contents new-args<span class="synSpecial">))</span>
                  <span class="synSpecial">(</span>error <span class="synConstant">&quot;Nomethod for these types&quot;</span>
                         <span class="synSpecial">(</span><span class="synIdentifier">list</span> op type-tags<span class="synSpecial">)))))))))</span>
</pre>


