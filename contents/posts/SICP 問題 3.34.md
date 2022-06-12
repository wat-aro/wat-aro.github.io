---
title: "SICP 問題 3.34"
published: 2015/12/03
tags:
  - scheme
  - SICP
---

<p>平方器をmultiplierを使って実装する時の問題点</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-connector<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>value false<span class="synSpecial">)</span> <span class="synSpecial">(</span>informant false<span class="synSpecial">)</span> <span class="synSpecial">(</span>constraints <span class="synSpecial">'()))</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>set-my-value newval setter<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span>has-value? me<span class="synSpecial">))</span>
             <span class="synSpecial">(</span><span class="synStatement">set!</span> value newval<span class="synSpecial">)</span>
             <span class="synSpecial">(</span><span class="synStatement">set!</span> informant setter<span class="synSpecial">)</span>
             <span class="synSpecial">(</span>for-each-except setter
                              inform-about-value
                              constraints<span class="synSpecial">))</span>
            <span class="synSpecial">((</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> value newval<span class="synSpecial">))</span>
             <span class="synSpecial">(</span>error <span class="synConstant">&quot;Contradiction&quot;</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> value newval<span class="synSpecial">)))</span>
            <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">'</span>ignored<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>forget-my-value retractor<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> retractor informant<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synStatement">begin</span> <span class="synSpecial">(</span><span class="synStatement">set!</span> informant false<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span>for-each-except retractor
                                  inform-about-no-value
                                  constraints<span class="synSpecial">))</span>
          <span class="synSpecial">'</span>ignored<span class="synSpecial">))</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>connect new-constraint<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">memq</span> new-constraint constraints<span class="synSpecial">))</span>
          <span class="synSpecial">(</span><span class="synStatement">set!</span> constraints
                <span class="synSpecial">(</span><span class="synIdentifier">cons</span> new-constraint constraints<span class="synSpecial">)))</span>
      <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>has-value? me<span class="synSpecial">)</span>
          <span class="synSpecial">(</span>inform-about-value new-constraint<span class="synSpecial">))</span>
      <span class="synSpecial">'</span>done<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>me request<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> request <span class="synSpecial">'</span>has-value?<span class="synSpecial">)</span>
             <span class="synSpecial">(</span><span class="synStatement">if</span> informant true false<span class="synSpecial">))</span>
            <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> request <span class="synSpecial">'</span>value<span class="synSpecial">)</span> value<span class="synSpecial">)</span>
            <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> request <span class="synSpecial">'</span>set-value!<span class="synSpecial">)</span> set-my-value<span class="synSpecial">)</span>
            <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> request <span class="synSpecial">'</span>forget<span class="synSpecial">)</span> forget-my-value<span class="synSpecial">)</span>
            <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> request <span class="synSpecial">'</span>connect<span class="synSpecial">)</span> connect<span class="synSpecial">)</span>
            <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown operation -- CONNECTOR&quot;</span> request<span class="synSpecial">))))</span>
    me<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>multiplier m1 m2 product<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>process-new-value<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synStatement">or</span> <span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span>has-value? m1<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> <span class="synSpecial">(</span>get-value m1<span class="synSpecial">)</span> <span class="synConstant">0</span><span class="synSpecial">))</span>
               <span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span>has-value? m2<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> <span class="synSpecial">(</span>get-value m2<span class="synSpecial">)</span> <span class="synConstant">0</span><span class="synSpecial">)))</span>
           <span class="synSpecial">(</span>set-value! product <span class="synConstant">0</span> me<span class="synSpecial">))</span>
          <span class="synSpecial">((</span><span class="synStatement">and</span> <span class="synSpecial">(</span>has-value? m1<span class="synSpecial">)</span> <span class="synSpecial">(</span>has-value? m2<span class="synSpecial">))</span>
           <span class="synSpecial">(</span>set-value! product
                       <span class="synSpecial">(</span><span class="synIdentifier">*</span> <span class="synSpecial">(</span>get-value m1<span class="synSpecial">)</span> <span class="synSpecial">(</span>get-value m2<span class="synSpecial">))</span>
                       me<span class="synSpecial">))</span>
          <span class="synSpecial">((</span><span class="synStatement">and</span> <span class="synSpecial">(</span>has-value? product<span class="synSpecial">)</span> <span class="synSpecial">(</span>has-value? m1<span class="synSpecial">))</span>
           <span class="synSpecial">(</span>set-value! m2
                       <span class="synSpecial">(</span><span class="synIdentifier">/</span> <span class="synSpecial">(</span>get-value product<span class="synSpecial">)</span> <span class="synSpecial">(</span>get-value m1<span class="synSpecial">))</span>
                       me<span class="synSpecial">))</span>
          <span class="synSpecial">((</span><span class="synStatement">and</span> <span class="synSpecial">(</span>has-value? product<span class="synSpecial">)</span> <span class="synSpecial">(</span>has-value? m2<span class="synSpecial">))</span>
           <span class="synSpecial">(</span>set-value! m1
                       <span class="synSpecial">(</span><span class="synIdentifier">/</span> <span class="synSpecial">(</span>get-value product<span class="synSpecial">)</span> <span class="synSpecial">(</span>get-value m2<span class="synSpecial">))</span>
                       me<span class="synSpecial">))))</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>process-forget-value<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>forget-value! product me<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>forget-value! m1 me<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>forget-value! m2 me<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>process-new-value<span class="synSpecial">))</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>me request<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> request <span class="synSpecial">'</span>I-have-a-value<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>process-new-value<span class="synSpecial">))</span>
          <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> request <span class="synSpecial">'</span>I-lost-my-value<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>process-forget-value<span class="synSpecial">))</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span>
           <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown request -- MULTIPLIER&quot;</span> request<span class="synSpecial">))))</span>
  <span class="synSpecial">(</span>connect m1 me<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>connect m2 me<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>connect product me<span class="synSpecial">)</span>
  me<span class="synSpecial">)</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>squarer a b<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>multiplier a a b<span class="synSpecial">))</span>

<span class="synComment">;; bを求める場合はうまく動く．aが定まれば(* a a)の値がbに伝わる．</span>
<span class="synComment">;; aを求める時にはこれは動かない．</span>
<span class="synComment">;; multiplierは第一引数を求める時に(/ 第三引数 第二引数)を計算するが，</span>
<span class="synComment">;; 今の場合は第二引数がわからない．</span>
<span class="synComment">;; 同様に第二引数も求められない．</span>
</pre>


