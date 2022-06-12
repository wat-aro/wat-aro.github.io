---
title: "SICP 問題 5.08"
published: 2016/01/23
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink>start
 <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label here<span class="synSpecial">))</span>
here
 <span class="synSpecial">(</span>assign a <span class="synSpecial">(</span>const <span class="synConstant">3</span><span class="synSpecial">))</span>
 <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label there<span class="synSpecial">))</span>
here
 <span class="synSpecial">(</span>assign a <span class="synSpecial">(</span>const <span class="synConstant">4</span><span class="synSpecial">))</span>
 <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label there<span class="synSpecial">))</span>
there
</pre>


<p>この時thereに達した時のaの値は何かという問題．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>extract-labels text receive<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> text<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>receive <span class="synSpecial">'()</span> <span class="synSpecial">'())</span>
      <span class="synSpecial">(</span>extract-labels <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> text<span class="synSpecial">)</span>
                      <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>insts labels<span class="synSpecial">)</span>
                        <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>next-inst <span class="synSpecial">(</span><span class="synIdentifier">car</span> text<span class="synSpecial">)))</span>
                          <span class="synComment">;; symbolであればlabel</span>
                          <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">symbol?</span> next-inst<span class="synSpecial">)</span>
                              <span class="synComment">;; (receive insts labels)なのでsymbolならlabelsにcons</span>
                              <span class="synComment">;; falseならinstsにcons</span>
                              <span class="synSpecial">(</span>receive insts
                                  <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>make-label-entry next-inst insts<span class="synSpecial">)</span>
                                        labels<span class="synSpecial">))</span>
                              <span class="synSpecial">(</span>receive <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>make-instruction next-inst<span class="synSpecial">)</span>
                                             insts<span class="synSpecial">)</span>
                                  labels<span class="synSpecial">)))))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>update-insts! insts labels machine<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>pc <span class="synSpecial">(</span>get-register machine <span class="synSpecial">'</span>pc<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>flag <span class="synSpecial">(</span>get-register machine <span class="synSpecial">'</span>flag<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>stack <span class="synSpecial">(</span>machine <span class="synSpecial">'</span>stack<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>ops <span class="synSpecial">(</span>machine <span class="synSpecial">'</span>operations<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synIdentifier">for-each</span>
     <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>inst<span class="synSpecial">)</span>
       <span class="synSpecial">(</span>set-instruction-execution-proc!
        inst
        <span class="synSpecial">(</span>make-execution-procedure
         <span class="synSpecial">(</span>instruction-text inst<span class="synSpecial">)</span> labels machine
         pc flag stack ps<span class="synSpecial">)))</span>
     insts<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-label-entry label-name insts<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">cons</span> label-name insts<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>lookup-label labels label-name<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>val <span class="synSpecial">(</span><span class="synIdentifier">assoc</span> label-name labels<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> val
        <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> val<span class="synSpecial">)</span>
        <span class="synSpecial">(</span>error <span class="synConstant">&quot;Undefined label -- ASSEMBLE&quot;</span> label-name<span class="synSpecial">))))</span>
</pre>


<p>からlabelsは順番を保持してlabelsに登録されていく．
lookup-labelではassocが使われているので先頭に近いものが先に選ばれる．<br/>
そのため(goto (label here))で向かうのは最初のhere.
aには3が入っている．<br/>
　<br/>
これを同じラベルを違う場所に登録しようとするとエラーとなるようにする．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>extract-labels text receive<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> text<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>receive <span class="synSpecial">'()</span> <span class="synSpecial">'())</span>
      <span class="synSpecial">(</span>extract-labels <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> text<span class="synSpecial">)</span>
                      <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>insts labels<span class="synSpecial">)</span>
                        <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>next-inst <span class="synSpecial">(</span><span class="synIdentifier">car</span> text<span class="synSpecial">)))</span>
                          <span class="synComment">;; symbolであればlabel</span>
                          <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">symbol?</span> next-inst<span class="synSpecial">)</span>
                              <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">assoc</span> next-inst labels<span class="synSpecial">)</span> <span class="synComment">;;labelsに既に登録されていればここでtrueが返る</span>
                                  <span class="synSpecial">(</span>error <span class="synConstant">&quot;The same label name is used to indicate two different location &quot;</span> label-name<span class="synSpecial">)</span>
                                  <span class="synSpecial">(</span>receive insts
                                      <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>make-label-entry next-inst insts<span class="synSpecial">)</span>
                                            labels<span class="synSpecial">)))</span>
                              <span class="synSpecial">(</span>receive <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>make-instruction next-inst<span class="synSpecial">)</span>
                                             insts<span class="synSpecial">)</span>
                                  labels<span class="synSpecial">)))))))</span>
</pre>


