---
title: "SICP 問題 5.16"
published: 2016/01/29
tags:
  - scheme
  - SICP
---

<p>命令トレースを出来るようにする．<br/>
executeがtraceフラグを引数に取り，trace-onなら命令を印字し，trace-offなら#fを返す．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-new-machine<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>pc <span class="synSpecial">(</span>make-register <span class="synSpecial">'</span>pc<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>flag <span class="synSpecial">(</span>make-register <span class="synSpecial">'</span>flag<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>stack <span class="synSpecial">(</span>make-stack<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>the-instruction-sequence <span class="synSpecial">'())</span>
        <span class="synSpecial">(</span>the-instruction-counter <span class="synConstant">0</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span>tracing-flag <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>inst<span class="synSpecial">)</span> <span class="synConstant">#f</span><span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>the-ops
           <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>initialize-stack
                       <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">()</span> <span class="synSpecial">(</span>stack <span class="synSpecial">'</span>initialize<span class="synSpecial">)))</span>
                 <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>print-stack-statistics
                       <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">()</span> <span class="synSpecial">(</span>stack <span class="synSpecial">'</span>print-statistics<span class="synSpecial">)))))</span>
          <span class="synSpecial">(</span>register-table
           <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>pc pc<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>flag flag<span class="synSpecial">))))</span>
      <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>allocate-register name<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">assoc</span> name register-table<span class="synSpecial">)</span>
            <span class="synSpecial">(</span>error <span class="synConstant">&quot;Multiply defined rgister: &quot;</span> name<span class="synSpecial">)</span>
            <span class="synSpecial">(</span><span class="synStatement">set!</span> register-table
                  <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> name <span class="synSpecial">(</span>make-register name<span class="synSpecial">))</span>
                        register-table<span class="synSpecial">)))</span>
        <span class="synSpecial">'</span>register-allocated<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>lookup-register name<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>val <span class="synSpecial">(</span><span class="synIdentifier">assoc</span> name register-table<span class="synSpecial">)))</span>
          <span class="synSpecial">(</span><span class="synStatement">if</span> val
              <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> val<span class="synSpecial">)</span>
              <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown register: &quot;</span> name<span class="synSpecial">))))</span>
      <span class="synComment">;; tracing-flagを引数に取るようにする．</span>
      <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>execute trace<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>insts <span class="synSpecial">(</span>get-contents pc<span class="synSpecial">)))</span>
          <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> insts<span class="synSpecial">)</span>
              <span class="synSpecial">'</span>done
              <span class="synSpecial">(</span><span class="synStatement">begin</span>
                <span class="synSpecial">(</span><span class="synStatement">set!</span> the-instruction-counter <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synConstant">1</span> the-instruction-counter<span class="synSpecial">))</span>
                <span class="synSpecial">(</span>trace <span class="synSpecial">(</span><span class="synIdentifier">caar</span> insts<span class="synSpecial">))</span>    <span class="synComment">;trace-onならここで命令を印字．offなら#fを返す.</span>
                <span class="synSpecial">((</span>instruction-execution-proc <span class="synSpecial">(</span><span class="synIdentifier">car</span> insts<span class="synSpecial">)))</span>
                <span class="synSpecial">(</span>execute trace<span class="synSpecial">)))))</span>
      <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>trace-on<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">set!</span> tracing-flag <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>inst<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">display</span> inst<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">newline</span><span class="synSpecial">)))</span>
        <span class="synSpecial">'</span>trace-on<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>trace-off<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">set!</span> tracing-flag <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>inst<span class="synSpecial">)</span> <span class="synConstant">#f</span><span class="synSpecial">))</span>
        <span class="synSpecial">'</span>trace-off<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>initialize-counter<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">set!</span> instruction-counter <span class="synConstant">0</span><span class="synSpecial">))</span>
      <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>dispatch message<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>start<span class="synSpecial">)</span>
               <span class="synSpecial">(</span>set-contents! pc the-instruction-sequence<span class="synSpecial">)</span>
               <span class="synSpecial">(</span>execute tracing-flag<span class="synSpecial">))</span>
              <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>install-instruction-sequence<span class="synSpecial">)</span>
               <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>seq<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synStatement">set!</span> the-instruction-sequence seq<span class="synSpecial">)))</span>
              <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>allocate-register<span class="synSpecial">)</span> allocate-register<span class="synSpecial">)</span>
              <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>get-register<span class="synSpecial">)</span> lookup-register<span class="synSpecial">)</span>
              <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>install-operations<span class="synSpecial">)</span>
               <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>ops<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synStatement">set!</span> the-ops <span class="synSpecial">(</span><span class="synIdentifier">append</span> the-ops ops<span class="synSpecial">))))</span>
              <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>stack<span class="synSpecial">)</span> stack<span class="synSpecial">)</span>
              <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>operations<span class="synSpecial">)</span> the-ops<span class="synSpecial">)</span>
              <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>get-counter<span class="synSpecial">)</span> the-instruction-counter<span class="synSpecial">)</span>
              <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>initilize-counter<span class="synSpecial">)</span> <span class="synSpecial">(</span>initilize-counter<span class="synSpecial">))</span>
              <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>trace-on<span class="synSpecial">)</span> <span class="synSpecial">(</span>trace-on<span class="synSpecial">))</span>
              <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>trace-off<span class="synSpecial">)</span> <span class="synSpecial">(</span>trace-off<span class="synSpecial">))</span>
              <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown request -- MACHINE&quot;</span> message<span class="synSpecial">))))</span>
      dispatch<span class="synSpecial">)))</span>
</pre>


<p>test</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span>fact-machine <span class="synSpecial">'</span>trace-on<span class="synSpecial">)</span>
trace-on
gosh&gt; <span class="synSpecial">(</span>set-register-contents! fact-machine <span class="synSpecial">'</span>n <span class="synConstant">10</span><span class="synSpecial">)</span>
done
gosh&gt; <span class="synSpecial">(</span>start fact-machine<span class="synSpecial">)</span>
<span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label fact-done<span class="synSpecial">))</span>
<span class="synSpecial">(</span>test <span class="synSpecial">(</span>op <span class="synIdentifier">=</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label base-case<span class="synSpecial">))</span>
<span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
<span class="synSpecial">(</span>save n<span class="synSpecial">)</span>
<span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>op <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label after-fact<span class="synSpecial">))</span>
<span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label fact-loop<span class="synSpecial">))</span>
<span class="synSpecial">(</span>test <span class="synSpecial">(</span>op <span class="synIdentifier">=</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label base-case<span class="synSpecial">))</span>
<span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
<span class="synSpecial">(</span>save n<span class="synSpecial">)</span>
<span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>op <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label after-fact<span class="synSpecial">))</span>
<span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label fact-loop<span class="synSpecial">))</span>
<span class="synSpecial">(</span>test <span class="synSpecial">(</span>op <span class="synIdentifier">=</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label base-case<span class="synSpecial">))</span>
<span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
<span class="synSpecial">(</span>save n<span class="synSpecial">)</span>
<span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>op <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label after-fact<span class="synSpecial">))</span>
<span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label fact-loop<span class="synSpecial">))</span>
<span class="synSpecial">(</span>test <span class="synSpecial">(</span>op <span class="synIdentifier">=</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label base-case<span class="synSpecial">))</span>
<span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
<span class="synSpecial">(</span>save n<span class="synSpecial">)</span>
<span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>op <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label after-fact<span class="synSpecial">))</span>
<span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label fact-loop<span class="synSpecial">))</span>
<span class="synSpecial">(</span>test <span class="synSpecial">(</span>op <span class="synIdentifier">=</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label base-case<span class="synSpecial">))</span>
<span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
<span class="synSpecial">(</span>save n<span class="synSpecial">)</span>
<span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>op <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label after-fact<span class="synSpecial">))</span>
<span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label fact-loop<span class="synSpecial">))</span>
<span class="synSpecial">(</span>test <span class="synSpecial">(</span>op <span class="synIdentifier">=</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label base-case<span class="synSpecial">))</span>
<span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
<span class="synSpecial">(</span>save n<span class="synSpecial">)</span>
<span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>op <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label after-fact<span class="synSpecial">))</span>
<span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label fact-loop<span class="synSpecial">))</span>
<span class="synSpecial">(</span>test <span class="synSpecial">(</span>op <span class="synIdentifier">=</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label base-case<span class="synSpecial">))</span>
<span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
<span class="synSpecial">(</span>save n<span class="synSpecial">)</span>
<span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>op <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label after-fact<span class="synSpecial">))</span>
<span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label fact-loop<span class="synSpecial">))</span>
<span class="synSpecial">(</span>test <span class="synSpecial">(</span>op <span class="synIdentifier">=</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label base-case<span class="synSpecial">))</span>
<span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
<span class="synSpecial">(</span>save n<span class="synSpecial">)</span>
<span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>op <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label after-fact<span class="synSpecial">))</span>
<span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label fact-loop<span class="synSpecial">))</span>
<span class="synSpecial">(</span>test <span class="synSpecial">(</span>op <span class="synIdentifier">=</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label base-case<span class="synSpecial">))</span>
<span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
<span class="synSpecial">(</span>save n<span class="synSpecial">)</span>
<span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>op <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label after-fact<span class="synSpecial">))</span>
<span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label fact-loop<span class="synSpecial">))</span>
<span class="synSpecial">(</span>test <span class="synSpecial">(</span>op <span class="synIdentifier">=</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label base-case<span class="synSpecial">))</span>
<span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
<span class="synSpecial">(</span>restore n<span class="synSpecial">)</span>
<span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
<span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op <span class="synIdentifier">*</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
<span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
<span class="synSpecial">(</span>restore n<span class="synSpecial">)</span>
<span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
<span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op <span class="synIdentifier">*</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
<span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
<span class="synSpecial">(</span>restore n<span class="synSpecial">)</span>
<span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
<span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op <span class="synIdentifier">*</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
<span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
<span class="synSpecial">(</span>restore n<span class="synSpecial">)</span>
<span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
<span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op <span class="synIdentifier">*</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
<span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
<span class="synSpecial">(</span>restore n<span class="synSpecial">)</span>
<span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
<span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op <span class="synIdentifier">*</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
<span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
<span class="synSpecial">(</span>restore n<span class="synSpecial">)</span>
<span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
<span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op <span class="synIdentifier">*</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
<span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
<span class="synSpecial">(</span>restore n<span class="synSpecial">)</span>
<span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
<span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op <span class="synIdentifier">*</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
<span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
<span class="synSpecial">(</span>restore n<span class="synSpecial">)</span>
<span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
<span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op <span class="synIdentifier">*</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
<span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
<span class="synSpecial">(</span>restore n<span class="synSpecial">)</span>
<span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
<span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op <span class="synIdentifier">*</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
<span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
done
</pre>


