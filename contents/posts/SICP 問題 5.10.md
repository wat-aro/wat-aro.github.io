---
title: "SICP 問題 5.10"
published: 2016/01/27
tags:
  - scheme
  - SICP
---

<p>新しく構文を追加する．<br/>
簡単にincrementとdecrementで．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-execution-procedure inst labels machine
                                  pc flag stack ops<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> inst<span class="synSpecial">)</span> <span class="synSpecial">'</span>assign<span class="synSpecial">)</span>
         <span class="synSpecial">(</span>make-assign inst machine labels ops pc<span class="synSpecial">))</span>
        <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> inst<span class="synSpecial">)</span> <span class="synSpecial">'</span>test<span class="synSpecial">)</span>
         <span class="synSpecial">(</span>make-test inst machine labels ops flag pc<span class="synSpecial">))</span>
        <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> inst<span class="synSpecial">)</span> <span class="synSpecial">'</span>branch<span class="synSpecial">)</span>
         <span class="synSpecial">(</span>make-branch inst machine labels flag pc<span class="synSpecial">))</span>
        <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> inst<span class="synSpecial">)</span> <span class="synSpecial">'</span>goto<span class="synSpecial">)</span>
         <span class="synSpecial">(</span>make-goto inst machine labels pc<span class="synSpecial">))</span>
        <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> inst<span class="synSpecial">)</span> <span class="synSpecial">'</span>save<span class="synSpecial">)</span>
         <span class="synSpecial">(</span>make-save inst machine stack pc<span class="synSpecial">))</span>
        <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> inst<span class="synSpecial">)</span> <span class="synSpecial">'</span>restore<span class="synSpecial">)</span>
         <span class="synSpecial">(</span>make-restore inst machine stack pc<span class="synSpecial">))</span>
        <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> inst<span class="synSpecial">)</span> <span class="synSpecial">'</span>perform<span class="synSpecial">)</span>
         <span class="synSpecial">(</span>make-perform inst machine labels ops pc<span class="synSpecial">))</span>
        <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> inst<span class="synSpecial">)</span> <span class="synSpecial">'</span>increment<span class="synSpecial">)</span>    <span class="synComment">;increment</span>
         <span class="synSpecial">(</span>make-increment inst machine pc<span class="synSpecial">))</span>
        <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> inst<span class="synSpecial">)</span> <span class="synSpecial">'</span>decrement<span class="synSpecial">)</span>    <span class="synComment">;decrement</span>
         <span class="synSpecial">(</span>make-decrement inst machine pc<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown instruction type -- ASSEMBLE&quot;</span> inst<span class="synSpecial">))))</span>

<span class="synComment">;;; 選択子</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>increment-reg-name name<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> name<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>decrement-reg-name name<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> name<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-increment inst machine pc<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>target <span class="synSpecial">(</span>get-register machine <span class="synSpecial">(</span>increment-reg-name inst<span class="synSpecial">))))</span>
    <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">()</span>
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>value <span class="synSpecial">(</span>get-contents target<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">number?</span> value<span class="synSpecial">)</span>
               <span class="synSpecial">(</span>set-contents! target <span class="synSpecial">(</span><span class="synIdentifier">+</span> value <span class="synConstant">1</span><span class="synSpecial">))</span>
               <span class="synSpecial">(</span>advance-pc pc<span class="synSpecial">))</span>
              <span class="synSpecial">(</span>error <span class="synConstant">&quot;INCREMENT require number, but&quot;</span> value<span class="synSpecial">))))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-decrement inst machine pc<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>target <span class="synSpecial">(</span>get-register machine <span class="synSpecial">(</span>decrement-reg-name inst<span class="synSpecial">))))</span>
    <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">()</span>
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>value <span class="synSpecial">(</span>get-contents target<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">number?</span> value<span class="synSpecial">)</span>
               <span class="synSpecial">(</span>set-contents! target <span class="synSpecial">(</span><span class="synIdentifier">-</span> value <span class="synConstant">1</span><span class="synSpecial">))</span>
               <span class="synSpecial">(</span>advance-pc pc<span class="synSpecial">))</span>
              <span class="synSpecial">(</span>error <span class="synConstant">&quot;DECREMENT require number, but&quot;</span> value<span class="synSpecial">))))))</span>
</pre>


<p>test</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> add-two
  <span class="synSpecial">(</span>make-machine
   <span class="synSpecial">'(</span>a<span class="synSpecial">)</span>
   <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">)</span>
   <span class="synSpecial">'(</span>controller
     main
     <span class="synSpecial">(</span>increment a<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>increment a<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>increment a<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>decrement a<span class="synSpecial">)</span>
     done<span class="synSpecial">)))</span>

gosh&gt; <span class="synSpecial">(</span>set-register-contents! add-two <span class="synSpecial">'</span>a <span class="synConstant">200</span><span class="synSpecial">)</span>
done
gosh&gt; <span class="synSpecial">(</span>start add-two<span class="synSpecial">)</span>
done
gosh&gt; <span class="synSpecial">(</span>get-register-contents add-two <span class="synSpecial">'</span>a<span class="synSpecial">)</span>
<span class="synConstant">202</span>
</pre>


