---
title: "SICP 問題 5.09"
published: 2016/01/24
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; 演算はレジスタと定数にだけ使えるという条件を強要する．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-operation-exp <span class="synIdentifier">exp</span> machine labels operations<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>op <span class="synSpecial">(</span>lookup-prim <span class="synSpecial">(</span>operation-exp-op <span class="synIdentifier">exp</span><span class="synSpecial">)</span> operations<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>aprocs
         <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>e<span class="synSpecial">)</span>
                <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>label-exp? e<span class="synSpecial">)</span>
                    <span class="synSpecial">(</span>error <span class="synConstant">&quot;Operation can be used only with registers and constants -- ASSEMBLE&quot;</span> e<span class="synSpecial">)</span>
                    <span class="synSpecial">(</span>make-primitive-exp e machine labels<span class="synSpecial">)))</span>
              <span class="synSpecial">(</span>operation-exp-operands <span class="synIdentifier">exp</span><span class="synSpecial">))))</span>
    <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">()</span>
      <span class="synSpecial">(</span><span class="synIdentifier">apply</span> op <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>p<span class="synSpecial">)</span> <span class="synSpecial">(</span>p<span class="synSpecial">))</span> aprocs<span class="synSpecial">)))))</span>
</pre>


