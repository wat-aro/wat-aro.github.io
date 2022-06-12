---
title: "SICP 問題 5.11-a"
published: 2016/01/28
tags:
  - scheme
  - SICP
---

<p>図5.12のfibonacci計算から1命令除去する．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;;; ex5.06で変更したこれを使う．</span>
<span class="synSpecial">(</span>controller
    <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label fib-done<span class="synSpecial">))</span>
  fib-loop
    <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op <span class="synIdentifier">&lt;</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">))</span>
    <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label immediate-answer<span class="synSpecial">))</span>
    <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label afterfib-n-1<span class="synSpecial">))</span>
    <span class="synSpecial">(</span>save n<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>op <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
    <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label fib-loop<span class="synSpecial">))</span>
  afterfib-n-1
    <span class="synSpecial">(</span>restore n<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>op <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">))</span>
    <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label afterfib-n-2<span class="synSpecial">))</span>
    <span class="synSpecial">(</span>save val<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label fib-loop<span class="synSpecial">))</span>
  afterfib-n-2
    <span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>                <span class="synComment">;ここを消して</span>
    <span class="synSpecial">(</span>restore val<span class="synSpecial">)</span>                       <span class="synComment">;ここで(restore n)</span>
    <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>assign val
            <span class="synSpecial">(</span>op <span class="synIdentifier">+</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">))</span>
    <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
  immediate-answer
    <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>reg n<span class="synSpecial">))</span>
    <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
    fib-done<span class="synSpecial">)</span>

<span class="synComment">;; 変更後</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> fib-machine
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
</pre>


<p>test</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span>set-register-contents! fib-machine <span class="synSpecial">'</span>n <span class="synConstant">6</span><span class="synSpecial">)</span>
done
gosh&gt; <span class="synSpecial">(</span>start fib-machine<span class="synSpecial">)</span>
done
gosh&gt; <span class="synSpecial">(</span>get-register-contents fib-machine <span class="synSpecial">'</span>val<span class="synSpecial">)</span>
<span class="synConstant">8</span>
gosh&gt; <span class="synSpecial">(</span>set-register-contents! fib-machine <span class="synSpecial">'</span>n <span class="synConstant">10</span><span class="synSpecial">)</span>
done
gosh&gt; <span class="synSpecial">(</span>start fib-machine<span class="synSpecial">)</span>
done
gosh&gt; <span class="synSpecial">(</span>get-register-contents fib-machine <span class="synSpecial">'</span>val<span class="synSpecial">)</span>
<span class="synConstant">55</span>
</pre>


