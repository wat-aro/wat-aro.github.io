---
title: "SICP 問題 3.26"
published: 2015/11/22
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-table<span class="synSpecial">)</span>
  <span class="synComment">;; tree</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-tree key value left-branch right-branch<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synIdentifier">list</span> key value left-branch right-branch<span class="synSpecial">))</span>
  <span class="synComment">;; 選択子</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>key-tree tree<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> tree<span class="synSpecial">))</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>value-tree tree<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> tree<span class="synSpecial">))</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>left-branch tree<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">caddr</span> tree<span class="synSpecial">))</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>right-branch tree<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadddr</span> tree<span class="synSpecial">))</span>
  <span class="synComment">;; set</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>set-value! value tree<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synIdentifier">set-car!</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> tree<span class="synSpecial">)</span> value<span class="synSpecial">))</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>set-left-branch! left tree<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synIdentifier">set-car!</span> <span class="synSpecial">(</span><span class="synIdentifier">cddr</span> tree<span class="synSpecial">)</span> left<span class="synSpecial">))</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>set-right-branch! right tree<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synIdentifier">set-car!</span> <span class="synSpecial">(</span><span class="synIdentifier">cdddr</span> tree<span class="synSpecial">)</span> right<span class="synSpecial">))</span>

  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>local-table <span class="synSpecial">(</span>make-tree <span class="synSpecial">'</span><span class="synConstant">*table*</span> <span class="synSpecial">'()</span> <span class="synSpecial">'()</span> <span class="synSpecial">'())))</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>lookup key-list<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">let</span> iter <span class="synSpecial">((</span>key-list key-list<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span>table local-table<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> table<span class="synSpecial">)</span> false<span class="synSpecial">)</span>
              <span class="synSpecial">((</span><span class="synIdentifier">=</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> key-list<span class="synSpecial">)</span> <span class="synSpecial">(</span>key-tree table<span class="synSpecial">))</span>
               <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> key-list<span class="synSpecial">))</span>
                   table
                   <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> key-list<span class="synSpecial">)</span> <span class="synSpecial">(</span>value-tree table<span class="synSpecial">))))</span>
              <span class="synSpecial">((</span><span class="synIdentifier">&lt;</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> key-list<span class="synSpecial">)</span> <span class="synSpecial">(</span>key-tree table<span class="synSpecial">))</span>
               <span class="synSpecial">(</span>iter key-list <span class="synSpecial">(</span>left-branch table<span class="synSpecial">)))</span>
              <span class="synSpecial">((</span><span class="synIdentifier">&gt;</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> key-list<span class="synSpecial">)</span> <span class="synSpecial">(</span>key-tree table<span class="synSpecial">))</span>
               <span class="synSpecial">(</span>iter key-list <span class="synSpecial">(</span>right-branch table<span class="synSpecial">))))))</span>

    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>insert! key-list value<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">let</span> iter <span class="synSpecial">((</span>key-list key-list<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span>table local-table<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span>key-tree local-table<span class="synSpecial">)</span> <span class="synSpecial">'</span><span class="synConstant">*table*</span><span class="synSpecial">)</span>
               <span class="synSpecial">(</span><span class="synStatement">set!</span> local-table <span class="synSpecial">(</span>insert-iter! key-list value<span class="synSpecial">)))</span>
              <span class="synSpecial">((</span><span class="synIdentifier">=</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> key-list<span class="synSpecial">)</span> <span class="synSpecial">(</span>key-tree table<span class="synSpecial">))</span>
               <span class="synSpecial">(</span>set-value! <span class="synSpecial">(</span>insert-iter! key-list value<span class="synSpecial">)</span> table<span class="synSpecial">))</span>
              <span class="synSpecial">((</span><span class="synIdentifier">&lt;</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> key-list<span class="synSpecial">)</span> <span class="synSpecial">(</span>key-tree table<span class="synSpecial">))</span>
               <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span>left-branch table<span class="synSpecial">))</span>
                   <span class="synSpecial">(</span>set-left-branch! <span class="synSpecial">(</span>insert-iter! key-list value<span class="synSpecial">)</span> table<span class="synSpecial">)</span>
                   <span class="synSpecial">(</span>iter key-list <span class="synSpecial">(</span>left-branch table<span class="synSpecial">))))</span>
              <span class="synSpecial">((</span><span class="synIdentifier">&gt;</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> key-list<span class="synSpecial">)</span> <span class="synSpecial">(</span>key-tree table<span class="synSpecial">))</span>
               <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span>right-branch table<span class="synSpecial">))</span>
                   <span class="synSpecial">(</span>set-right-branch! <span class="synSpecial">(</span>insert-iter! key-list value<span class="synSpecial">)</span> table<span class="synSpecial">)</span>
                   <span class="synSpecial">(</span>iter key-list <span class="synSpecial">(</span>right-branch table<span class="synSpecial">))))))</span>
      <span class="synSpecial">'</span>done<span class="synSpecial">)</span>

    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>insert-iter! key-list value<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> key-list<span class="synSpecial">))</span>
          <span class="synSpecial">(</span>make-tree <span class="synSpecial">(</span><span class="synIdentifier">car</span> key-list<span class="synSpecial">)</span> value <span class="synSpecial">'()</span> <span class="synSpecial">'())</span>
          <span class="synSpecial">(</span>make-tree <span class="synSpecial">(</span><span class="synIdentifier">car</span> key-list<span class="synSpecial">)</span>
                     <span class="synSpecial">(</span>insert-iter! <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> key-list<span class="synSpecial">)</span> value<span class="synSpecial">)</span> <span class="synSpecial">'()</span> <span class="synSpecial">'())))</span>

    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>printing<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synIdentifier">display</span> local-table<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synIdentifier">newline</span><span class="synSpecial">))</span>

    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>dispatch m<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> m <span class="synSpecial">'</span>lookup<span class="synSpecial">)</span> lookup<span class="synSpecial">)</span>
            <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> m <span class="synSpecial">'</span>insert!<span class="synSpecial">)</span> insert!<span class="synSpecial">)</span>
            <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> m <span class="synSpecial">'</span>printing<span class="synSpecial">)</span> <span class="synSpecial">(</span>printing<span class="synSpecial">))</span>
            <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">((</span>error <span class="synConstant">&quot;Unknown operation --TABLE&quot;</span> m<span class="synSpecial">)))))</span>
  dispatch<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>lookup table key-list<span class="synSpecial">)</span>
  <span class="synSpecial">((</span>table <span class="synSpecial">'</span>lookup<span class="synSpecial">)</span> key-list<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>insert! table key-list value<span class="synSpecial">)</span>
  <span class="synSpecial">((</span>table <span class="synSpecial">'</span>insert!<span class="synSpecial">)</span> key-list value<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>printing table<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>table <span class="synSpecial">'</span>printing<span class="synSpecial">))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (define t1 (make-table))
t1
gosh&gt; (insert! t1 &#39;(1 3) &#39;a)
done
gosh&gt; (printing t1)
(1 (3 a () ()) () ())
#&lt;undef&gt;
gosh&gt; (lookup t1 &#39;(1 3))
(3 a () ())</pre>


