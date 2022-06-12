---
title: "SICP 問題 4.16"
published: 2015/12/23
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; a</span>
 <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>lookup-variable-value var env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>target <span class="synSpecial">(</span>env-loop var env <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>var vars vals<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> vals<span class="synSpecial">)))))</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> target <span class="synSpecial">'</span><span class="synConstant">*unassigned*</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unassigned variable&quot;</span> var<span class="synSpecial">))</span>
          <span class="synSpecial">(</span>target target<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unbound variable&quot;</span> var<span class="synSpecial">)))))</span>

<span class="synComment">;; b</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>scan-out-defines proc<span class="synSpecial">)</span>
  <span class="synComment">;; 選択子</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>def-list def-body-list<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> def-body-list<span class="synSpecial">))</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>body-list def-body-list<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> def-body-list<span class="synSpecial">))</span>
  <span class="synComment">;; lambda式の本体を受け取って，内部でdefineを使ってる式と使ってない式のリストを返す</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>split-def-body proc-body-list<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> iter <span class="synSpecial">((</span>proc-body-list proc-body-list<span class="synSpecial">)</span>
               <span class="synSpecial">(</span>def <span class="synSpecial">'())</span>
               <span class="synSpecial">(</span>body <span class="synSpecial">'()))</span>
      <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> proc-body-list<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">reverse</span> def<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">reverse</span> body<span class="synSpecial">)))</span>
            <span class="synSpecial">((</span>definition? <span class="synSpecial">(</span><span class="synIdentifier">car</span> proc-body-list<span class="synSpecial">))</span>
             <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> proc-body-list<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> proc-body-list<span class="synSpecial">)</span> def<span class="synSpecial">)</span> body<span class="synSpecial">))</span>
            <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> proc-body-list<span class="synSpecial">)</span> def <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> proc-body-list<span class="synSpecial">)</span> body<span class="synSpecial">))))))</span>
  <span class="synComment">;; 本体</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>def-body-list <span class="synSpecial">(</span>split-def-body <span class="synSpecial">(</span>lambda-body proc<span class="synSpecial">))))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span>def-list def-body-list<span class="synSpecial">))</span>
        proc
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>lambda <span class="synSpecial">(</span>lambda-parameters proc<span class="synSpecial">)</span>
              <span class="synSpecial">(</span>make-let <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span>definition-variable x<span class="synSpecial">)</span> <span class="synSpecial">'</span><span class="synConstant">*unassigned*</span><span class="synSpecial">))</span>
                             <span class="synSpecial">(</span>def-list def-body-list<span class="synSpecial">))</span>
                        <span class="synSpecial">(</span><span class="synIdentifier">append</span> <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>set!
                                                       <span class="synSpecial">(</span>definition-variable x<span class="synSpecial">)</span>
                                                       <span class="synSpecial">(</span>definition-value x<span class="synSpecial">)))</span>
                                     <span class="synSpecial">(</span>def-list def-body-list<span class="synSpecial">))</span>
                                <span class="synSpecial">(</span>body-list def-body-list<span class="synSpecial">)))))))</span>
</pre>




<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span>scan-out-defines <span class="synSpecial">'(</span>lambda <span class="synSpecial">(</span>vars<span class="synSpecial">)</span>
                           <span class="synSpecial">(</span>define u e1<span class="synSpecial">)</span>
                           <span class="synSpecial">(</span>define v e2<span class="synSpecial">)</span>
                           e3<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>vars<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>u <span class="synConstant">*unassigned*</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>v <span class="synConstant">*unassigned*</span><span class="synSpecial">))</span> <span class="synSpecial">((</span><span class="synStatement">set!</span> u e1<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synStatement">set!</span> v e2<span class="synSpecial">)</span> e3<span class="synSpecial">)))</span>
</pre>




<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; c</span>
<span class="synComment">;; どちらに組み込んだでも同じが，procedure-bodyは二箇所で呼ばれているので一箇所でしか呼ばれていないmake-procedureに組み込んだ方が良い．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-procedure parameters body env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>procedure parameters <span class="synSpecial">(</span>scan-out-defines body<span class="synSpecial">)</span> env<span class="synSpecial">))</span>
</pre>


