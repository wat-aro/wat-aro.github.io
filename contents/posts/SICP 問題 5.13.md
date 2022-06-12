---
title: "SICP 問題 5.13"
published: 2016/01/29
tags:
  - scheme
  - SICP
---

<p>make-machineで<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%EC%A5%B8%A5%B9%A5%BF">レジスタ</a>のリストを登録するのではなく，  <br/>
命令の中で初めてassignされるときに<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%EC%A5%B8%A5%B9%A5%BF">レジスタ</a>を登録するように変更する．<br/>
make-machineとmake-new-machineの変更だけですむ．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;;; register-namesを削除</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-machine ops controller-text<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>machine <span class="synSpecial">(</span>make-new-machine<span class="synSpecial">)))</span>
    <span class="synSpecial">((</span>machine <span class="synSpecial">'</span>install-operations<span class="synSpecial">)</span> ops<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>insts <span class="synSpecial">(</span>assemble controller-text machine<span class="synSpecial">)))</span>
      <span class="synSpecial">((</span>machine <span class="synSpecial">'</span>install-instruction-sequence<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> insts<span class="synSpecial">))</span>
      <span class="synSpecial">((</span>machine <span class="synSpecial">'</span>install-instruction-types<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> insts<span class="synSpecial">))</span>
      <span class="synSpecial">((</span>machine <span class="synSpecial">'</span>install-label-registers<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">caddr</span> insts<span class="synSpecial">))</span>
      <span class="synSpecial">((</span>machine <span class="synSpecial">'</span>install-saved-registers<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadddr</span> insts<span class="synSpecial">))</span>
      <span class="synSpecial">((</span>machine <span class="synSpecial">'</span>install-register-sources<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> <span class="synSpecial">(</span><span class="synIdentifier">cddddr</span> insts<span class="synSpecial">)))</span>
      machine<span class="synSpecial">)))</span>

<span class="synComment">;;; lookupで見つからなければallocateで登録．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-new-machine<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>pc <span class="synSpecial">(</span>make-register <span class="synSpecial">'</span>pc<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>flag <span class="synSpecial">(</span>make-register <span class="synSpecial">'</span>flag<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>the-instruction-sequence <span class="synSpecial">'())</span>
        <span class="synSpecial">(</span>the-instruction-types <span class="synSpecial">'())</span>
        <span class="synSpecial">(</span>the-label-registers <span class="synSpecial">'())</span>
        <span class="synSpecial">(</span>the-saved-registers <span class="synSpecial">'())</span>
        <span class="synSpecial">(</span>the-register-sources <span class="synSpecial">'()))</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>register-table
           <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>pc pc<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>flag flag<span class="synSpecial">))))</span>
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>the-ops
             <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>initialize-stack
                         <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">()</span>
                           <span class="synSpecial">(</span><span class="synIdentifier">for-each</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>stack<span class="synSpecial">)</span> <span class="synSpecial">(</span>stack <span class="synSpecial">'</span>initialize<span class="synSpecial">))</span>
                                     register-table<span class="synSpecial">))))))</span>
        <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>allocate-register name<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">assoc</span> name register-table<span class="synSpecial">)</span>
              <span class="synSpecial">(</span>error <span class="synConstant">&quot;Multiply defined rgister: &quot;</span> name<span class="synSpecial">)</span>
              <span class="synComment">;; 登録した後にそのレジスタを返す</span>
              <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>reg <span class="synSpecial">(</span>make-register name<span class="synSpecial">)))</span>
                   <span class="synSpecial">(</span><span class="synStatement">set!</span> register-table
                         <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> name reg<span class="synSpecial">)</span>
                               register-table<span class="synSpecial">))</span>
                   reg<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>lookup-register name<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>val <span class="synSpecial">(</span><span class="synIdentifier">assoc</span> name register-table<span class="synSpecial">)))</span>
            <span class="synSpecial">(</span><span class="synStatement">if</span> val
                <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> val<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>allocate-register name<span class="synSpecial">))))</span> <span class="synComment">;; 見つからなければ新たに登録する．</span>
        <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>execute<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>insts <span class="synSpecial">(</span>get-contents pc<span class="synSpecial">)))</span>
            <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> insts<span class="synSpecial">)</span>
                <span class="synSpecial">'</span>done
                <span class="synSpecial">(</span><span class="synStatement">begin</span>
                  <span class="synSpecial">((</span>instruction-execution-proc <span class="synSpecial">(</span><span class="synIdentifier">car</span> insts<span class="synSpecial">)))</span>
                  <span class="synSpecial">(</span>execute<span class="synSpecial">)))))</span>
        <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>dispatch message<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>start<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span>set-contents! pc the-instruction-sequence<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span>execute<span class="synSpecial">))</span>
                <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>install-instruction-sequence<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>seq<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synStatement">set!</span> the-instruction-sequence seq<span class="synSpecial">)))</span>
                <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>allocate-register<span class="synSpecial">)</span> allocate-register<span class="synSpecial">)</span>
                <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>get-register<span class="synSpecial">)</span> lookup-register<span class="synSpecial">)</span>
                <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>install-operations<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>ops<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synStatement">set!</span> the-ops <span class="synSpecial">(</span><span class="synIdentifier">append</span> the-ops ops<span class="synSpecial">))))</span>
                <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>operations<span class="synSpecial">)</span> the-ops<span class="synSpecial">)</span>
                <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>install-instruction-types<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>types<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synStatement">set!</span> the-instruction-types types<span class="synSpecial">)))</span>
                <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>install-label-registers<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>regs<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synStatement">set!</span> the-label-registers regs<span class="synSpecial">)))</span>
                <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>install-saved-registers<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>saved<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synStatement">set!</span> the-saved-registers saved<span class="synSpecial">)))</span>
                <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>install-register-sources<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>sources<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synStatement">set!</span> the-register-sources sources<span class="synSpecial">)))</span>
                <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>instruction-types<span class="synSpecial">)</span> the-instruction-types<span class="synSpecial">)</span>
                <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>label-registers<span class="synSpecial">)</span> the-label-registers<span class="synSpecial">)</span>
                <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>saved-registers<span class="synSpecial">)</span> the-saved-registers<span class="synSpecial">)</span>
                <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>register-sources<span class="synSpecial">)</span> the-register-sources<span class="synSpecial">)</span>
                <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown request -- MACHINE&quot;</span> message<span class="synSpecial">))))</span>
        dispatch<span class="synSpecial">))))</span>
</pre>


<p>test</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> fib-machine
  <span class="synSpecial">(</span>make-machine
   <span class="synComment">;; '(n val continue)</span>
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

gosh&gt; <span class="synSpecial">(</span>set-register-contents! fib-machine <span class="synSpecial">'</span>n <span class="synConstant">20</span><span class="synSpecial">)</span>
done
gosh&gt; <span class="synSpecial">(</span>start fib-machine<span class="synSpecial">)</span>
done
gosh&gt; <span class="synSpecial">(</span>get-register-contents fib-machine <span class="synSpecial">'</span>val<span class="synSpecial">)</span>
<span class="synConstant">6765</span>
</pre>


