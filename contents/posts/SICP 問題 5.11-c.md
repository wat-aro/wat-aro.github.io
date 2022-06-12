---
title: "SICP 問題 5.11-c"
published: 2016/01/28
tags:
  - scheme
  - SICP
---

<p>各<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%EC%A5%B8%A5%B9%A5%BF">レジスタ</a>がスタックを持つようにしてpopやpushはそのスタックを使用するように修正する．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; make-registerがstackを持つ</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-register name<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>contents <span class="synSpecial">'</span><span class="synConstant">*unassaigned*</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span>stack <span class="synSpecial">(</span>make-stack<span class="synSpecial">)))</span>     <span class="synComment">;;(make-stack)</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>dispatch message<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>get<span class="synSpecial">)</span> contents<span class="synSpecial">)</span>
            <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>set<span class="synSpecial">)</span>
             <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>value<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synStatement">set!</span> contents value<span class="synSpecial">)))</span>
            <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>pop<span class="synSpecial">)</span>
             <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>val <span class="synSpecial">(</span>stack <span class="synSpecial">'</span>pop<span class="synSpecial">)))</span>
               <span class="synSpecial">((</span>dispatch <span class="synSpecial">'</span>set<span class="synSpecial">)</span> val<span class="synSpecial">)))</span>
            <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>push<span class="synSpecial">)</span>
             <span class="synSpecial">((</span>stack <span class="synSpecial">'</span>push<span class="synSpecial">)</span> contents<span class="synSpecial">))</span>
            <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>initialize<span class="synSpecial">)</span>
             <span class="synSpecial">(</span>stack <span class="synSpecial">'</span>initialize<span class="synSpecial">))</span>
            <span class="synSpecial">(</span><span class="synStatement">else</span>
             <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown request -- REGISTER&quot;</span> message<span class="synSpecial">))))</span>
    dispatch<span class="synSpecial">))</span>


<span class="synComment">;; make-new-machineはstackを持たなくなった．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-new-machine<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>pc <span class="synSpecial">(</span>make-register <span class="synSpecial">'</span>pc<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>flag <span class="synSpecial">(</span>make-register <span class="synSpecial">'</span>flag<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>the-instruction-sequence <span class="synSpecial">'()))</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>register-table
           <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>pc pc<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>flag flag<span class="synSpecial">))))</span>
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>the-ops                    <span class="synComment">;すべてのregisterに対してstackを初期化する手続きを入れる</span>
             <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>initialize-stack
                         <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">()</span>
                           <span class="synSpecial">(</span><span class="synIdentifier">for-each</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>stack<span class="synSpecial">)</span> <span class="synSpecial">(</span>stack <span class="synSpecial">'</span>initialize<span class="synSpecial">))</span>
                                     register-table<span class="synSpecial">))))))</span>
        <span class="synComment">;; registerをregiter-tableに登録する．</span>
        <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>allocate-register name<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">assoc</span> name register-table<span class="synSpecial">)</span>
              <span class="synSpecial">(</span>error <span class="synConstant">&quot;Multiply defined rgister: &quot;</span> name<span class="synSpecial">)</span>
              <span class="synSpecial">(</span><span class="synStatement">set!</span> register-table
                    <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> name <span class="synSpecial">(</span>make-register name<span class="synSpecial">))</span>
                          register-table<span class="synSpecial">)))</span>
          <span class="synSpecial">'</span>register-allocated<span class="synSpecial">)</span>
        <span class="synComment">;; registerの値をregister-tableから見つける．</span>
        <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>lookup-register name<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>val <span class="synSpecial">(</span><span class="synIdentifier">assoc</span> name register-table<span class="synSpecial">)))</span>
            <span class="synSpecial">(</span><span class="synStatement">if</span> val
                <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> val<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown register: &quot;</span> name<span class="synSpecial">))))</span>
        <span class="synComment">;; pc内に保存された手続きを実行する</span>
        <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>execute<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>insts <span class="synSpecial">(</span>get-contents pc<span class="synSpecial">)))</span>
            <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> insts<span class="synSpecial">)</span>
                <span class="synSpecial">'</span>done
                <span class="synSpecial">(</span><span class="synStatement">begin</span>
                  <span class="synSpecial">((</span>instruction-execution-proc <span class="synSpecial">(</span><span class="synIdentifier">car</span> insts<span class="synSpecial">)))</span>
                  <span class="synSpecial">(</span>execute<span class="synSpecial">)))))</span>
        <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>dispatch message<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>start<span class="synSpecial">)</span> <span class="synComment">;the-instruction-sequenceをpcに保存してexecute</span>
                 <span class="synSpecial">(</span>set-contents! pc the-instruction-sequence<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span>execute<span class="synSpecial">))</span>
                <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>install-instruction-sequence<span class="synSpecial">)</span> <span class="synComment">;the-instruction-sequenceにseqを登録</span>
                 <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>seq<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synStatement">set!</span> the-instruction-sequence seq<span class="synSpecial">)))</span>
                <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>allocate-register<span class="synSpecial">)</span> allocate-register<span class="synSpecial">)</span>
                <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>get-register<span class="synSpecial">)</span> lookup-register<span class="synSpecial">)</span>
                <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>install-operations<span class="synSpecial">)</span> <span class="synComment">;新しいopをthe-opsに追加</span>
                 <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>ops<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synStatement">set!</span> the-ops <span class="synSpecial">(</span><span class="synIdentifier">append</span> the-ops ops<span class="synSpecial">))))</span>
                <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>stack<span class="synSpecial">)</span> stack<span class="synSpecial">)</span>
                <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>operations<span class="synSpecial">)</span> the-ops<span class="synSpecial">)</span>
                <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown request -- MACHINE&quot;</span> message<span class="synSpecial">))))</span>
        dispatch<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-execution-procedure inst labels machine <span class="synComment">;引数からstackを削除</span>
                                  pc flag ops<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> inst<span class="synSpecial">)</span> <span class="synSpecial">'</span>assign<span class="synSpecial">)</span>
         <span class="synSpecial">(</span>make-assign inst machine labels ops pc<span class="synSpecial">))</span>
        <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> inst<span class="synSpecial">)</span> <span class="synSpecial">'</span>test<span class="synSpecial">)</span>
         <span class="synSpecial">(</span>make-test inst machine labels ops flag pc<span class="synSpecial">))</span>
        <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> inst<span class="synSpecial">)</span> <span class="synSpecial">'</span>branch<span class="synSpecial">)</span>
         <span class="synSpecial">(</span>make-branch inst machine labels flag pc<span class="synSpecial">))</span>
        <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> inst<span class="synSpecial">)</span> <span class="synSpecial">'</span>goto<span class="synSpecial">)</span>
         <span class="synSpecial">(</span>make-goto inst machine labels pc<span class="synSpecial">))</span>
        <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> inst<span class="synSpecial">)</span> <span class="synSpecial">'</span>save<span class="synSpecial">)</span>
         <span class="synSpecial">(</span>make-save inst machine pc<span class="synSpecial">))</span>   <span class="synComment">;引数からstackを削除</span>
        <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> inst<span class="synSpecial">)</span> <span class="synSpecial">'</span>restore<span class="synSpecial">)</span>
         <span class="synSpecial">(</span>make-restore inst machine pc<span class="synSpecial">))</span>  <span class="synComment">;引数からstackを削除</span>
        <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> inst<span class="synSpecial">)</span> <span class="synSpecial">'</span>perform<span class="synSpecial">)</span>
         <span class="synSpecial">(</span>make-perform inst machine labels ops pc<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown instruction type -- ASSEMBLE&quot;</span> inst<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>update-insts! insts labels machine<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>pc <span class="synSpecial">(</span>get-register machine <span class="synSpecial">'</span>pc<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>flag <span class="synSpecial">(</span>get-register machine <span class="synSpecial">'</span>flag<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>ops <span class="synSpecial">(</span>machine <span class="synSpecial">'</span>operations<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synIdentifier">for-each</span>
     <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>inst<span class="synSpecial">)</span>
       <span class="synSpecial">(</span>set-instruction-execution-proc!
        inst
        <span class="synSpecial">(</span>make-execution-procedure
         <span class="synSpecial">(</span>instruction-text inst<span class="synSpecial">)</span> labels machine
         pc flag ops<span class="synSpecial">)))</span>
     insts<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-save inst machine pc<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>reg <span class="synSpecial">(</span>get-register machine
                           <span class="synSpecial">(</span>stack-inst-reg-name inst<span class="synSpecial">))))</span>
    <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">()</span>
      <span class="synSpecial">(</span>reg <span class="synSpecial">'</span>push<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>advance-pc pc<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-restore inst machine pc<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>reg <span class="synSpecial">(</span>get-register machine
                           <span class="synSpecial">(</span>stack-inst-reg-name inst<span class="synSpecial">))))</span>
    <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">()</span>
      <span class="synSpecial">(</span>reg <span class="synSpecial">'</span>pop<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>advance-pc pc<span class="synSpecial">))))</span>
</pre>


<p>test.
5.11-bと同じくfib-machine2で動けばよく，fib-machineでは正しい答えが返らない．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> fib-machine2
  <span class="synSpecial">(</span>make-machine
   <span class="synSpecial">'(</span>n val continue<span class="synSpecial">)</span>
   <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>&lt; <span class="synIdentifier">&lt;</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>- <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>+ <span class="synIdentifier">+</span><span class="synSpecial">))</span>
   <span class="synSpecial">'(</span>controller
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
     fib-done<span class="synSpecial">)))</span>

gosh&gt; <span class="synSpecial">(</span>set-register-contents! fib-machine2 <span class="synSpecial">'</span>n <span class="synConstant">10</span><span class="synSpecial">)</span>
done
gosh&gt; <span class="synSpecial">(</span>start fib-machine2<span class="synSpecial">)</span>
done
gosh&gt; <span class="synSpecial">(</span>get-register-contents fib-machine2 <span class="synSpecial">'</span>val<span class="synSpecial">)</span>
<span class="synConstant">55</span>
</pre>




<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span>set-register-contents! fib-machine <span class="synSpecial">'</span>n <span class="synConstant">10</span><span class="synSpecial">)</span>
done
gosh&gt; <span class="synSpecial">(</span>start fib-machine<span class="synSpecial">)</span>
<span class="synConstant">***</span> ERROR: Empty stack -- POP
Stack Trace:
_______________________________________
  <span class="synConstant">0</span>  <span class="synSpecial">(</span>stack <span class="synSpecial">'</span>pop<span class="synSpecial">)</span>
        At line <span class="synConstant">1770</span> of <span class="synConstant">&quot;(standard input)&quot;</span>
  <span class="synConstant">1</span>  <span class="synSpecial">(</span>reg <span class="synSpecial">'</span>pop<span class="synSpecial">)</span>
        At line <span class="synConstant">1906</span> of <span class="synConstant">&quot;(standard input)&quot;</span>
  <span class="synConstant">2</span>  <span class="synSpecial">((</span>instruction-execution-proc <span class="synSpecial">(</span><span class="synIdentifier">car</span> insts<span class="synSpecial">)))</span>
        At line <span class="synConstant">1810</span> of <span class="synConstant">&quot;(standard input)&quot;</span>
  <span class="synConstant">3</span>  <span class="synSpecial">(</span><span class="synIdentifier">eval</span> expr env<span class="synSpecial">)</span>
        At line <span class="synConstant">179</span> of <span class="synConstant">&quot;/usr/local/Cellar/gauche/0.9.4/share/gauche-0.9/0.9.4/lib/gauche/interactive.scm&quot;</span>
</pre>


