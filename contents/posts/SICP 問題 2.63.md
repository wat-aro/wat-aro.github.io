---
title: "SICP 問題 2.63"
published: 2015/10/26
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>tree-&gt;list-1 tree<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> tree<span class="synSpecial">)</span>
      <span class="synSpecial">'()</span>
      <span class="synSpecial">(</span><span class="synIdentifier">append</span> <span class="synSpecial">(</span>tree-&gt;list-1 <span class="synSpecial">(</span>left-branch tree<span class="synSpecial">))</span>
              <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>entry tree<span class="synSpecial">)</span>
                    <span class="synSpecial">(</span>tree-&gt;list-1 <span class="synSpecial">(</span>right-branch tree<span class="synSpecial">))))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>tree-&gt;list-2 tree<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>copy-to-list tree result-list<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> tree<span class="synSpecial">)</span>
        result-list
        <span class="synSpecial">(</span>copy-to-list <span class="synSpecial">(</span>left-branch tree<span class="synSpecial">)</span>
                      <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>entry tree<span class="synSpecial">)</span>
                            <span class="synSpecial">(</span>copy-to-list <span class="synSpecial">(</span>right-branch tree<span class="synSpecial">)</span>
                                          result-list<span class="synSpecial">)))))</span>
  <span class="synSpecial">(</span>copy-to-list tree <span class="synSpecial">'()))</span>
</pre>


<p>この二つの手続きは同じリストを生じる．<br/>
　<br/>
ステップ数も同じ．appendとconsの差で2のほうが遅く増加する．</p>

