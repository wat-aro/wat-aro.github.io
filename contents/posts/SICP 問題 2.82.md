---
title: "SICP 問題 2.82"
published: 2015/11/01
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>apply-generic op <span class="synSpecial">.</span> args<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>type-tags <span class="synSpecial">(</span><span class="synIdentifier">map</span> type-tag args<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>try-coercion args tags<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> tags<span class="synSpecial">)</span>
          <span class="synSpecial">(</span>error <span class="synConstant">&quot;Nomethod for these types&quot;</span>
                 <span class="synSpecial">(</span><span class="synIdentifier">list</span> op type-tags<span class="synSpecial">))</span>
          <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>new-args <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span>get-coercion <span class="synSpecial">(</span><span class="synIdentifier">car</span> tags<span class="synSpecial">)</span>
                                                         <span class="synSpecial">(</span>type-tag x<span class="synSpecial">)))</span>
                               args<span class="synSpecial">)))</span>
            <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>new-type-tags <span class="synSpecial">(</span><span class="synIdentifier">map</span> type-tag new-args<span class="synSpecial">)))</span>
              <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>peroc <span class="synSpecial">(</span>get op <span class="synSpecial">(</span>new-type-tags<span class="synSpecial">))))</span>
                <span class="synSpecial">(</span><span class="synStatement">if</span> proc
                    <span class="synSpecial">(</span><span class="synIdentifier">apply</span> proc <span class="synSpecial">(</span>contents new-args<span class="synSpecial">))</span>
                    <span class="synSpecial">(</span>try-coercion new-args <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> tags<span class="synSpecial">))))))))</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>pero <span class="synSpecial">(</span>get op types<span class="synSpecial">)))</span>
      <span class="synSpecial">(</span><span class="synStatement">if</span> proc
          <span class="synSpecial">(</span><span class="synIdentifier">apply</span> proc <span class="synSpecial">(</span><span class="synIdentifier">map</span> contents args<span class="synSpecial">))</span>
          <span class="synSpecial">(</span>try-coercion args typep-tags<span class="synSpecial">)))))</span>
</pre>


