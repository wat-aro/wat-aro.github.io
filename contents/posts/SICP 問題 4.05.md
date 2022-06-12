---
title: "SICP 問題 4.05"
published: 2015/12/18
tags:
  - scheme
  - SICP
---

<p>make-ifに渡す前にclauseをpredicateとactionにわかる．
(car action)に'=>があれば(cadr action)にpredicateを適用する．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>expand-clauses clauses<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> clauses<span class="synSpecial">)</span>
      <span class="synSpecial">'</span>false <span class="synComment">;; else 説は無い</span>
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>first <span class="synSpecial">(</span><span class="synIdentifier">car</span> clauses<span class="synSpecial">))</span>
            <span class="synSpecial">(</span>rest <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> clauses<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>cond-else-clause? first<span class="synSpecial">)</span>
            <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> rest<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>sequence-&gt;exp <span class="synSpecial">(</span>cond-actions first<span class="synSpecial">))</span>
                <span class="synSpecial">(</span>error <span class="synConstant">&quot;ELSE clause isn't last: COND-&gt;IF&quot;</span>
                       clauses<span class="synSpecial">))</span>
            <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>predicate <span class="synSpecial">(</span>cond-predicate first<span class="synSpecial">))</span>
                  <span class="synSpecial">(</span>action <span class="synSpecial">(</span>cond-action first<span class="synSpecial">)))</span>
              <span class="synSpecial">(</span>make-if <span class="synSpecial">(</span>cond-predicate first<span class="synSpecial">)</span>
                       <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> action<span class="synSpecial">)</span> <span class="synSpecial">'</span>=&gt;<span class="synSpecial">)</span>
                           <span class="synSpecial">((</span><span class="synIdentifier">cadr</span> action<span class="synSpecial">)</span> predicate<span class="synSpecial">)</span>
                           <span class="synSpecial">(</span>sequence-&gt;exp action<span class="synSpecial">))</span>
                       <span class="synSpecial">(</span>expand-clauses rest<span class="synSpecial">)))))))</span>
</pre>


