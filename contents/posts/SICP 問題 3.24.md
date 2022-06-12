---
title: "SICP 問題 3.24"
published: 2015/11/22
tags:
  - scheme
  - SICP
---

<p>assocをequal?以外を使ってテストできるようにする．
make-table手続きはキーの等価性に使うsame-key?手続きを引数にとる．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-table same-key?<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">assoc</span> key value records<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> records<span class="synSpecial">)</span> <span class="synConstant">#f</span><span class="synSpecial">)</span>
          <span class="synSpecial">((</span>same-key? key <span class="synSpecial">(</span><span class="synIdentifier">caar</span> records<span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> records<span class="synSpecial">))</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">assoc</span> key <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> records<span class="synSpecial">)))))</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>local-table <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span><span class="synConstant">*table*</span><span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>lookup key-1 key-2<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>subtable <span class="synSpecial">(</span><span class="synIdentifier">assoc</span> key-1 <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> local-table<span class="synSpecial">))))</span>
        <span class="synSpecial">(</span><span class="synStatement">if</span> subtable
            <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>record <span class="synSpecial">(</span><span class="synIdentifier">assoc</span> key-2 <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> subtable<span class="synSpecial">))))</span>
              <span class="synSpecial">(</span><span class="synStatement">if</span> record
                  <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> record<span class="synSpecial">)</span>
                  false<span class="synSpecial">))</span>
            false<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>insert! key-1 key-2 value<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>subtable <span class="synSpecial">(</span><span class="synIdentifier">assoc</span> key-1 <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> local-table<span class="synSpecial">))))</span>
        <span class="synSpecial">(</span><span class="synStatement">if</span> subtable
            <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>record <span class="synSpecial">(</span><span class="synIdentifier">assoc</span> key-2 <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> subtable<span class="synSpecial">))))</span>
              <span class="synSpecial">(</span><span class="synStatement">if</span> record
                  <span class="synSpecial">(</span><span class="synIdentifier">set-cdr!</span> record value<span class="synSpecial">)</span>
                  <span class="synSpecial">(</span><span class="synIdentifier">set-cdr!</span> subtable
                            <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> key-2 value<span class="synSpecial">)</span>
                                  <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> subtable<span class="synSpecial">)))))</span>
            <span class="synSpecial">(</span><span class="synIdentifier">set-cdr!</span> local-table
                      <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> key-1
                                  <span class="synSpecial">(</span><span class="synIdentifier">cons</span> key-2 value<span class="synSpecial">))</span>
                            <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> local-table<span class="synSpecial">)))))</span>
      <span class="synSpecial">'</span>ok<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>dispatch m<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> m <span class="synSpecial">'</span>lookup-proc<span class="synSpecial">)</span> lookup<span class="synSpecial">)</span>
            <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> m <span class="synSpecial">'</span>insert-proc!<span class="synSpecial">)</span> insert!<span class="synSpecial">)</span>
            <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown operation -- TABLE&quot;</span> m<span class="synSpecial">))))</span>
    dispatch<span class="synSpecial">))</span>
</pre>


