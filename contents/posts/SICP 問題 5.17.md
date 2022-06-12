---
title: "SICP 問題 5.17"
published: 2016/01/29
tags:
  - scheme
  - SICP
---

<p>トレースログにラベルネームをつける．<br/>
　<br/>
extract-labelsでlabelを見つけた時に('label labe-name)の形でinsts, labels両方に登録する．<br/>
make-new-machineでtracing-labelを作り，そこに現在のラベルを登録する．<br/>
<a href="#f-c0dd7cf5" name="fn-c0dd7cf5" title="'label label-name">*1</a>の実行形式はそのまま(advanced-pc pc)でpcをすすめるだけ．<br/>
後はexecuteを調整する</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>extract-labels text receive<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> text<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>receive <span class="synSpecial">'()</span> <span class="synSpecial">'())</span>
      <span class="synSpecial">(</span>extract-labels
       <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> text<span class="synSpecial">)</span>
       <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>insts labels<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>next-inst <span class="synSpecial">(</span><span class="synIdentifier">car</span> text<span class="synSpecial">)))</span>
           <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">symbol?</span> next-inst<span class="synSpecial">)</span>
               <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">assoc</span> next-inst labels<span class="synSpecial">)</span>
                   <span class="synSpecial">(</span>error
                    <span class="synConstant">&quot;The same label name is used to indicate two different location &quot;</span>
                    label-name<span class="synSpecial">)</span>
                   <span class="synComment">;; ここでlabelは('label . next-inst)の形でinstsに登録</span>
                   <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>insts <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>label next-inst<span class="synSpecial">))</span> insts<span class="synSpecial">)))</span>
                     <span class="synSpecial">(</span>receive insts
                         <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>make-label-entry next-inst insts<span class="synSpecial">)</span>
                               labels<span class="synSpecial">))))</span>
               <span class="synSpecial">(</span>receive <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>make-instruction next-inst<span class="synSpecial">)</span>
                              insts<span class="synSpecial">)</span>
                   labels<span class="synSpecial">)))))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-new-machine<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>pc <span class="synSpecial">(</span>make-register <span class="synSpecial">'</span>pc<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>flag <span class="synSpecial">(</span>make-register <span class="synSpecial">'</span>flag<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>stack <span class="synSpecial">(</span>make-stack<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>the-instruction-sequence <span class="synSpecial">'())</span>
        <span class="synSpecial">(</span>the-instruction-counter <span class="synConstant">0</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span>tracing-flag <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>inst<span class="synSpecial">)</span> <span class="synConstant">#f</span><span class="synSpecial">))</span>
        <span class="synSpecial">(</span>tracing-label <span class="synSpecial">'</span>global<span class="synSpecial">))</span>
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
      <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>execute trace<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>insts <span class="synSpecial">(</span>get-contents pc<span class="synSpecial">)))</span>
          <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> insts<span class="synSpecial">)</span> <span class="synSpecial">'</span>done<span class="synSpecial">)</span>
                <span class="synSpecial">(</span><span class="synStatement">else</span>
                 <span class="synSpecial">((</span>instruction-execution-proc <span class="synSpecial">(</span><span class="synIdentifier">car</span> insts<span class="synSpecial">)))</span>
                 <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>label-exp? <span class="synSpecial">(</span><span class="synIdentifier">caar</span> insts<span class="synSpecial">))</span>
                        <span class="synSpecial">(</span><span class="synStatement">set!</span> tracing-label <span class="synSpecial">(</span><span class="synIdentifier">cdaar</span> insts<span class="synSpecial">)))</span>
                       <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synStatement">set!</span> the-instruction-counter <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synConstant">1</span> the-instruction-counter<span class="synSpecial">))</span>
                             <span class="synSpecial">(</span>trace <span class="synSpecial">(</span><span class="synIdentifier">caar</span> insts<span class="synSpecial">))))</span>
                 <span class="synSpecial">(</span>execute trace<span class="synSpecial">)))))</span>
      <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>trace-on<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">set!</span> tracing-flag <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>inst<span class="synSpecial">)</span>
                             <span class="synSpecial">(</span><span class="synIdentifier">display</span> tracing-label<span class="synSpecial">)</span>
                             <span class="synSpecial">(</span><span class="synIdentifier">display</span> <span class="synConstant">&quot; : &quot;</span><span class="synSpecial">)</span>
                             <span class="synSpecial">(</span><span class="synIdentifier">display</span> inst<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">newline</span><span class="synSpecial">)))</span>
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

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-execution-procedure inst labels machine
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
        <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> inst<span class="synSpecial">)</span> <span class="synSpecial">'</span>label<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">()</span> <span class="synSpecial">(</span>advance-pc pc<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown instruction type -- ASSEMBLE&quot;</span> inst<span class="synSpecial">))))</span>
</pre>


<p>test</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> fib-machine
  <span class="synSpecial">(</span>make-machine
   <span class="synSpecial">'(</span>n val continue<span class="synSpecial">)</span>
   <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>&lt; <span class="synIdentifier">&lt;</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>- <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>+ <span class="synIdentifier">+</span><span class="synSpecial">))</span>
   <span class="synSpecial">'(</span>start
     <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label fib-done<span class="synSpecial">))</span>
     fib-loop
     <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op &lt;<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">))</span>
     <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label immediate-answer<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label afterfib-n-1<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>save n<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>op -<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label fib-loop<span class="synSpecial">))</span>
     afterfib-n-1
     <span class="synSpecial">(</span>restore n<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>op -<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">))</span>
     <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label afterfib-n-2<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>save val<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label fib-loop<span class="synSpecial">))</span>
     afterfib-n-2
     <span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>restore val<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>assign val
             <span class="synSpecial">(</span>op +<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
     immediate-answer
     <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>reg n<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
     fib-done
     <span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>op print-stack-statistics<span class="synSpecial">)))))</span>

gosh&gt; <span class="synSpecial">(</span>set-register-contents! fib-machine <span class="synSpecial">'</span>n <span class="synConstant">3</span><span class="synSpecial">)</span>
done
gosh&gt; <span class="synSpecial">(</span>fib-machine <span class="synSpecial">'</span>trace-on<span class="synSpecial">)</span>
trace-on
gosh&gt; <span class="synSpecial">(</span>start fib-machine<span class="synSpecial">)</span>
<span class="synSpecial">(</span>start<span class="synSpecial">)</span> : <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label fib-done<span class="synSpecial">))</span>
<span class="synSpecial">(</span>fib-loop<span class="synSpecial">)</span> : <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op <span class="synIdentifier">&lt;</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span>fib-loop<span class="synSpecial">)</span> : <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label immediate-answer<span class="synSpecial">))</span>
<span class="synSpecial">(</span>fib-loop<span class="synSpecial">)</span> : <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
<span class="synSpecial">(</span>fib-loop<span class="synSpecial">)</span> : <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label afterfib-n-1<span class="synSpecial">))</span>
<span class="synSpecial">(</span>fib-loop<span class="synSpecial">)</span> : <span class="synSpecial">(</span>save n<span class="synSpecial">)</span>
<span class="synSpecial">(</span>fib-loop<span class="synSpecial">)</span> : <span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>op <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span>fib-loop<span class="synSpecial">)</span> : <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label fib-loop<span class="synSpecial">))</span>
<span class="synSpecial">(</span>fib-loop<span class="synSpecial">)</span> : <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op <span class="synIdentifier">&lt;</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span>fib-loop<span class="synSpecial">)</span> : <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label immediate-answer<span class="synSpecial">))</span>
<span class="synSpecial">(</span>fib-loop<span class="synSpecial">)</span> : <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
<span class="synSpecial">(</span>fib-loop<span class="synSpecial">)</span> : <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label afterfib-n-1<span class="synSpecial">))</span>
<span class="synSpecial">(</span>fib-loop<span class="synSpecial">)</span> : <span class="synSpecial">(</span>save n<span class="synSpecial">)</span>
<span class="synSpecial">(</span>fib-loop<span class="synSpecial">)</span> : <span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>op <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span>fib-loop<span class="synSpecial">)</span> : <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label fib-loop<span class="synSpecial">))</span>
<span class="synSpecial">(</span>fib-loop<span class="synSpecial">)</span> : <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op <span class="synIdentifier">&lt;</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span>fib-loop<span class="synSpecial">)</span> : <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label immediate-answer<span class="synSpecial">))</span>
<span class="synSpecial">(</span>immediate-answer<span class="synSpecial">)</span> : <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>reg n<span class="synSpecial">))</span>
<span class="synSpecial">(</span>immediate-answer<span class="synSpecial">)</span> : <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
<span class="synSpecial">(</span>afterfib-n-1<span class="synSpecial">)</span> : <span class="synSpecial">(</span>restore n<span class="synSpecial">)</span>
<span class="synSpecial">(</span>afterfib-n-1<span class="synSpecial">)</span> : <span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>op <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span>afterfib-n-1<span class="synSpecial">)</span> : <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label afterfib-n-2<span class="synSpecial">))</span>
<span class="synSpecial">(</span>afterfib-n-1<span class="synSpecial">)</span> : <span class="synSpecial">(</span>save val<span class="synSpecial">)</span>
<span class="synSpecial">(</span>afterfib-n-1<span class="synSpecial">)</span> : <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label fib-loop<span class="synSpecial">))</span>
<span class="synSpecial">(</span>fib-loop<span class="synSpecial">)</span> : <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op <span class="synIdentifier">&lt;</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span>fib-loop<span class="synSpecial">)</span> : <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label immediate-answer<span class="synSpecial">))</span>
<span class="synSpecial">(</span>immediate-answer<span class="synSpecial">)</span> : <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>reg n<span class="synSpecial">))</span>
<span class="synSpecial">(</span>immediate-answer<span class="synSpecial">)</span> : <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
<span class="synSpecial">(</span>afterfib-n-2<span class="synSpecial">)</span> : <span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
<span class="synSpecial">(</span>afterfib-n-2<span class="synSpecial">)</span> : <span class="synSpecial">(</span>restore val<span class="synSpecial">)</span>
<span class="synSpecial">(</span>afterfib-n-2<span class="synSpecial">)</span> : <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
<span class="synSpecial">(</span>afterfib-n-2<span class="synSpecial">)</span> : <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op <span class="synIdentifier">+</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">))</span>
<span class="synSpecial">(</span>afterfib-n-2<span class="synSpecial">)</span> : <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
<span class="synSpecial">(</span>afterfib-n-1<span class="synSpecial">)</span> : <span class="synSpecial">(</span>restore n<span class="synSpecial">)</span>
<span class="synSpecial">(</span>afterfib-n-1<span class="synSpecial">)</span> : <span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>op <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span>afterfib-n-1<span class="synSpecial">)</span> : <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label afterfib-n-2<span class="synSpecial">))</span>
<span class="synSpecial">(</span>afterfib-n-1<span class="synSpecial">)</span> : <span class="synSpecial">(</span>save val<span class="synSpecial">)</span>
<span class="synSpecial">(</span>afterfib-n-1<span class="synSpecial">)</span> : <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label fib-loop<span class="synSpecial">))</span>
<span class="synSpecial">(</span>fib-loop<span class="synSpecial">)</span> : <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op <span class="synIdentifier">&lt;</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span>fib-loop<span class="synSpecial">)</span> : <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label immediate-answer<span class="synSpecial">))</span>
<span class="synSpecial">(</span>immediate-answer<span class="synSpecial">)</span> : <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>reg n<span class="synSpecial">))</span>
<span class="synSpecial">(</span>immediate-answer<span class="synSpecial">)</span> : <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
<span class="synSpecial">(</span>afterfib-n-2<span class="synSpecial">)</span> : <span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
<span class="synSpecial">(</span>afterfib-n-2<span class="synSpecial">)</span> : <span class="synSpecial">(</span>restore val<span class="synSpecial">)</span>
<span class="synSpecial">(</span>afterfib-n-2<span class="synSpecial">)</span> : <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
<span class="synSpecial">(</span>afterfib-n-2<span class="synSpecial">)</span> : <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op <span class="synIdentifier">+</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">))</span>
<span class="synSpecial">(</span>afterfib-n-2<span class="synSpecial">)</span> : <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">6</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">4</span><span class="synSpecial">)(</span>fib-done<span class="synSpecial">)</span> : <span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>op print-stack-statistics<span class="synSpecial">))</span>
done
</pre>

<div class="footnote">
<p class="footnote"><a href="#fn-c0dd7cf5" name="f-c0dd7cf5" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">'label label-name</span></p>
</div>
