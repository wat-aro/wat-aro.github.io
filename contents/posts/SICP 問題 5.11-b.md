---
title: "SICP 問題 5.11-b"
published: 2016/01/28
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;;; stackに退避するときにレジスタを指定しておき，そのレジスタにresotre出来るように修正する．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-restore inst machine stack pc<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>reg <span class="synSpecial">(</span>get-register machine
                           <span class="synSpecial">(</span>stack-inst-reg-name inst<span class="synSpecial">))))</span>
    <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">()</span>
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>val <span class="synSpecial">(</span>pop stack<span class="synSpecial">)))</span>
        <span class="synComment">;; valのcarにregisterが入っているので呼び出し側のregと比較し#fならエラーを返す</span>
        <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> reg <span class="synSpecial">(</span><span class="synIdentifier">car</span> val<span class="synSpecial">))</span>
               <span class="synSpecial">(</span>set-contents! reg <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> val<span class="synSpecial">))</span>
               <span class="synSpecial">(</span>advance-pc pc<span class="synSpecial">))</span>
              <span class="synSpecial">(</span><span class="synStatement">else</span>
               <span class="synSpecial">(</span>error <span class="synConstant">&quot;RESTORE require the same register as save, but&quot;</span> reg<span class="synSpecial">)))))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-save inst machine stack pc<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>reg <span class="synSpecial">(</span>get-register machine
                           <span class="synSpecial">(</span>stack-inst-reg-name inst<span class="synSpecial">))))</span>
    <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">()</span>
      <span class="synSpecial">(</span>push stack <span class="synSpecial">(</span><span class="synIdentifier">cons</span> reg <span class="synSpecial">(</span>get-contents reg<span class="synSpecial">)))</span> <span class="synComment">;regも一緒にconsする．</span>
      <span class="synSpecial">(</span>advance-pc pc<span class="synSpecial">))))</span>
</pre>


<p>ex5.11-aで作ったfib-machineでテスト．これは失敗してほしい．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> fib-machine
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
     <span class="synSpecial">(</span>restore n<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>assign val
             <span class="synSpecial">(</span>op +<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
     immediate-answer
     <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>reg n<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
     fib-done<span class="synSpecial">)))</span>

gosh&gt; <span class="synSpecial">(</span>set-register-contents! fib-machine <span class="synSpecial">'</span>n <span class="synConstant">10</span><span class="synSpecial">)</span>
done
gosh&gt; <span class="synSpecial">(</span>start fib-machine<span class="synSpecial">)</span>
<span class="synConstant">***</span> ERROR: operation <span class="synIdentifier">-</span> is <span class="synIdentifier">not</span> defined between <span class="synSpecial">(</span><span class="synError">#&lt;closure</span> <span class="synSpecial">(</span>make-register dispatch<span class="synSpecial">)</span><span class="synIdentifier">&gt;</span> <span class="synSpecial">((</span>restore n<span class="synSpecial">)</span> <span class="synSpecial">.</span> <span class="synError">#&lt;closure</span> <span class="synSpecial">(</span>make-restore make-restore<span class="synSpecial">)</span><span class="synIdentifier">&gt;</span><span class="synSpecial">)</span> <span class="synSpecial">((</span>assign n <span class="synSpecial">(</span>op <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">))</span> <span class="synSpecial">.</span> <span class="synError">#&lt;closure</span> <span class="synSpecial">(</span>make-assign make-assign<span class="synSpecial">)</span><span class="synIdentifier">&gt;</span><span class="synSpecial">)</span> <span class="synSpecial">((</span>assign continue <span class="synSpecial">(</span>label afterfib-n-2<span class="synSpecial">))</span> <span class="synSpecial">.</span> <span class="synError">#&lt;closure</span> <span class="synSpecial">(</span>make-assign make-assign<span class="synSpecial">)</span><span class="synIdentifier">&gt;</span><span class="synSpecial">)</span> <span class="synSpecial">((</span>save val<span class="synSpecial">)</span> <span class="synSpecial">.</span> <span class="synError">#&lt;closure</span> <span class="synSpecial">(</span>make-save make-save<span class="synSpecial">)</span><span class="synIdentifier">&gt;</span><span class="synSpecial">)</span> <span class="synSpecial">((</span>goto <span class="synSpecial">(</span>label fib-loop<span class="synSpecial">))</span> <span class="synSpecial">.</span> <span class="synError">#&lt;closure</span> <span class="synSpecial">(</span>make-goto make-goto<span class="synSpecial">)</span><span class="synIdentifier">&gt;</span><span class="synSpecial">)</span> <span class="synSpecial">((</span>restore n<span class="synSpecial">)</span> <span class="synSpecial">.</span> <span class="synError">#&lt;closure</span> <span class="synSpecial">(</span>make-restore make-restore<span class="synSpecial">)</span><span class="synIdentifier">&gt;</span><span class="synSpecial">)</span> <span class="synSpecial">((</span>restore continue<span class="synSpecial">)</span> <span class="synSpecial">.</span> <span class="synError">#&lt;closure</span> <span class="synSpecial">(</span>make-restore make-restore<span class="synSpecial">)</span><span class="synIdentifier">&gt;</span><span class="synSpecial">)</span> <span class="synSpecial">((</span>assign val <span class="synSpecial">(</span>op <span class="synIdentifier">+</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">))</span> <span class="synSpecial">.</span> <span class="synError">#&lt;closure</span> <span class="synSpecial">(</span>make-assign make-assign<span class="synSpecial">)</span><span class="synIdentifier">&gt;</span><span class="synSpecial">)</span> <span class="synSpecial">((</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span> <span class="synSpecial">.</span> <span class="synError">#&lt;closure</span> <span class="synSpecial">(</span>make-goto make-goto<span class="synSpecial">)</span><span class="synIdentifier">&gt;</span><span class="synSpecial">)</span> <span class="synSpecial">((</span>assign val <span class="synSpecial">(</span>reg n<span class="synSpecial">))</span> <span class="synSpecial">.</span> <span class="synError">#&lt;closure</span> <span class="synSpecial">(</span>make-assign make-assign<span class="synSpecial">)</span><span class="synIdentifier">&gt;</span><span class="synSpecial">)</span> <span class="synSpecial">((</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span> <span class="synSpecial">.</span> <span class="synError">#&lt;closure</span> <span class="synSpecial">(</span>make-goto make-goto<span class="synSpecial">)</span><span class="synIdentifier">&gt;</span><span class="synSpecial">))</span> <span class="synStatement">and</span> <span class="synConstant">2</span>
Stack Trace:
_______________________________________
  <span class="synConstant">0</span>  <span class="synSpecial">(</span>value-proc<span class="synSpecial">)</span>
        At line <span class="synConstant">341</span> of <span class="synConstant">&quot;/Users//work/scheme/SICP/5.2.scm&quot;</span>
  <span class="synConstant">1</span>  <span class="synSpecial">(</span>set-contents! target <span class="synSpecial">(</span>value-proc<span class="synSpecial">))</span>
        At line <span class="synConstant">341</span> of <span class="synConstant">&quot;/Users//work/scheme/SICP/5.2.scm&quot;</span>
  <span class="synConstant">2</span>  <span class="synSpecial">((</span>instruction-execution-proc <span class="synSpecial">(</span><span class="synIdentifier">car</span> insts<span class="synSpecial">)))</span>
        At line <span class="synConstant">444</span> of <span class="synConstant">&quot;(standard input)&quot;</span>
  <span class="synConstant">3</span>  <span class="synSpecial">(</span><span class="synIdentifier">eval</span> expr env<span class="synSpecial">)</span>
        At line <span class="synConstant">179</span> of <span class="synConstant">&quot;/usr/local/Cellar/gauche/0.9.4/share/gauche-0.9/0.9.4/lib/gauche/interactive.scm&quot;</span>
</pre>


<p>ex5.06で作ったfib-machine2.これは成功してほしい．</p>

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
     <span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>               <span class="synComment">;ここを消して</span>
     <span class="synSpecial">(</span>restore val<span class="synSpecial">)</span>                      <span class="synComment">;ここで(restore n)</span>
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


