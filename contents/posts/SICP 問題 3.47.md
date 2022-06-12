---
title: "SICP 問題 3.47"
published: 2015/12/06
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synError">#|</span>
<span class="synError">このような形でmake-semaphoreは使われる．</span>
<span class="synError">|#</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-serializer<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>semaphore <span class="synSpecial">(</span>make-semaphore <span class="synConstant">6</span><span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>p<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>serialized-p <span class="synSpecial">.</span> args<span class="synSpecial">)</span>
        <span class="synSpecial">(</span>semaphore <span class="synSpecial">'</span>acquire<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>val <span class="synSpecial">(</span><span class="synIdentifier">apply</span> p args<span class="synSpecial">)))</span>
          <span class="synSpecial">(</span>semaphore <span class="synSpecial">'</span>release<span class="synSpecial">)</span>
          val<span class="synSpecial">))</span>
      serialized-p<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-mutex<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>cell <span class="synSpecial">(</span><span class="synIdentifier">list</span> false<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>the-mutex m<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> m <span class="synSpecial">'</span>acquire<span class="synSpecial">)</span>
             <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>test-and-set! cell<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span>the-mutex <span class="synSpecial">'</span>acquire<span class="synSpecial">)))</span> <span class="synComment">;;retry</span>
            <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> m <span class="synSpecial">'</span>release <span class="synSpecial">(</span>clear! cell<span class="synSpecial">)))))</span>
    the-mutex<span class="synSpecial">))</span>
<span class="synError">#|</span>
<span class="synError">上を見ればわかるように評価した手続きをした後はかならずreleaseしている．</span>
<span class="synError">それを踏まえてmake-semaphoreを実装する．</span>

<span class="synError">・release</span>
<span class="synSpecial">(</span>mutex <span class="synSpecial">'</span>release<span class="synSpecial">)</span><span class="synError">をするとcellがクリアされる．</span>
<span class="synError">何度clear!しても問題はないのでsemaphoreがreleaseするたびに</span><span class="synSpecial">(</span>mutex <span class="synSpecial">'</span>release<span class="synSpecial">)</span><span class="synError">を実行して次の処理が行えるようにする．</span>
<span class="synError">releaseした後にはcounterから1引いておく.</span>

<span class="synError">・acquire</span>
<span class="synError">releaseはmake-serializerのようにセマフォを使う手続きから行うのでacquire内では行わない．</span>
<span class="synError">counterがnと同じならば</span><span class="synSpecial">(</span>mutex <span class="synSpecial">'</span>acquire<span class="synSpecial">)</span><span class="synError">でロックし，カウンターを１増やす．</span>
<span class="synError">counterがnより大きければ</span><span class="synSpecial">(</span>mutex <span class="synSpecial">'</span>acquire<span class="synSpecial">)</span><span class="synError">内でretryする．</span>
<span class="synError">ここでカウンターを１増やさないとreleaseと数が合わなくなり，counterが負になるので1増やす．</span>
<span class="synError">counterがnよりも小さければcounterを１増やす．処理が終われば呼び出し元からreleaseが呼ばれる．</span>
<span class="synError">|#</span>


<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-semaphore n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>counter <span class="synConstant">0</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>mutex <span class="synSpecial">(</span>make-mutex<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>acquire<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">&lt;=</span> counter n<span class="synSpecial">)</span>
             <span class="synSpecial">(</span>mutex <span class="synSpecial">'</span>acquire<span class="synSpecial">)</span>
             <span class="synSpecial">(</span><span class="synStatement">set!</span> counter <span class="synSpecial">(</span><span class="synIdentifier">+</span> counter <span class="synConstant">1</span><span class="synSpecial">)))</span>
            <span class="synSpecial">((</span><span class="synIdentifier">&lt;</span> counter n<span class="synSpecial">)</span>
             <span class="synSpecial">(</span><span class="synStatement">set!</span> counter <span class="synSpecial">(</span><span class="synIdentifier">+</span> counter <span class="synConstant">1</span><span class="synSpecial">)))))</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>release<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>mutex <span class="synSpecial">'</span>release<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">set!</span> counter <span class="synSpecial">(</span><span class="synIdentifier">-</span> counter <span class="synConstant">1</span><span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>dispatch m<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> m <span class="synSpecial">'</span>acquire<span class="synSpecial">)</span> acquire<span class="synSpecial">)</span>
            <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> m <span class="synSpecial">'</span>release<span class="synSpecial">)</span> release<span class="synSpecial">)</span>
            <span class="synSpecial">(</span><span class="synStatement">else</span>
             <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown request -- MAKE-SEMAPHORE&quot;</span> m<span class="synSpecial">))))))</span>
</pre>


