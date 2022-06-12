---
title: "SICP 問題 3.25"
published: 2015/11/22
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; keyではなくkey-listを'(x y z)という形で渡す</span>
<span class="synComment">;; key-listのcdrがnullになるまで再帰すればkeyの数がいくつでも対応できる</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-table<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>local-table <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span><span class="synConstant">*local-table*</span><span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>lookup key-list<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">let</span> loop <span class="synSpecial">((</span>key-list key-list<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span>table local-table<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> key-list<span class="synSpecial">)</span>
            false
            <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>record <span class="synSpecial">(</span><span class="synIdentifier">assoc</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> key-list<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> table<span class="synSpecial">))))</span>
              <span class="synSpecial">(</span><span class="synStatement">and</span> record
                   <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> key-list<span class="synSpecial">))</span>
                       record
                       <span class="synSpecial">(</span>loop <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> key-list<span class="synSpecial">)</span> recordf<span class="synSpecial">)))))))</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>insert! key-list value<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">let</span> loop <span class="synSpecial">((</span>key-list key-list<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span>table local-table<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> key-list<span class="synSpecial">)</span>
            false
            <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>record <span class="synSpecial">(</span><span class="synIdentifier">assoc</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> key-list<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> table<span class="synSpecial">))))</span>
              <span class="synSpecial">(</span><span class="synStatement">if</span> record
                  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> key-list<span class="synSpecial">))</span>
                      <span class="synSpecial">(</span><span class="synIdentifier">set-cdr!</span> record value<span class="synSpecial">)</span>
                      <span class="synSpecial">(</span>loop <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> key-list<span class="synSpecial">)</span>
                            record<span class="synSpecial">))</span>
                  <span class="synSpecial">(</span><span class="synIdentifier">set-cdr!</span> table
                            <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> key-list<span class="synSpecial">)</span> value<span class="synSpecial">)</span>
                                  <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> table<span class="synSpecial">)))))))</span>
      <span class="synSpecial">'</span>ok<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>dispatch m<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> m <span class="synSpecial">'</span>lookup-proc<span class="synSpecial">)</span> lookup<span class="synSpecial">)</span>
            <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> m <span class="synSpecial">'</span>insert-proc!<span class="synSpecial">)</span> insert!<span class="synSpecial">)</span>
            <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown operation -- TABLE&quot;</span> m<span class="synSpecial">)))))</span>
  dispatch<span class="synSpecial">)</span>
</pre>


