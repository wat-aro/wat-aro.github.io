---
title: "SICP 問題 5.19"
published: 2016/01/31
tags:
  - scheme
  - SICP
---

<p>ラベルから何番目の命令の直前に<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%D6%A5%EC%A1%BC%A5%AF%A5%DD%A5%A4%A5%F3%A5%C8">ブレークポイント</a>を入れられるようにする．<br/>
実装した手続きのテストはREPLで試したが，テストの記述は省略．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>set-breakpoint machine label n<span class="synSpecial">)</span>
  <span class="synSpecial">((</span>machine <span class="synSpecial">'</span>set-breakpoint<span class="synSpecial">)</span> label n<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>proceed-machine machine<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>machine <span class="synSpecial">'</span>proceed<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>cancel-breakpoint machine label n<span class="synSpecial">)</span>
  <span class="synSpecial">((</span>machine <span class="synSpecial">'</span>cancel-breakpoint<span class="synSpecial">)</span> label n<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>cancel-all-breakpoints machine<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>machine <span class="synSpecial">'</span>cancel-all-breakpoints<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>trace-on machine<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>machine <span class="synSpecial">'</span>trace-on<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>trace-off machine<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>machine <span class="synSpecial">'</span>trace-off<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-new-machine<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>pc <span class="synSpecial">(</span>make-register <span class="synSpecial">'</span>pc<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>flag <span class="synSpecial">(</span>make-register <span class="synSpecial">'</span>flag<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>stack <span class="synSpecial">(</span>make-stack<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>the-instruction-sequence <span class="synSpecial">'())</span>
        <span class="synSpecial">(</span>the-instruction-counter <span class="synConstant">0</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span>tracing-flag <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>inst<span class="synSpecial">)</span> <span class="synConstant">#f</span><span class="synSpecial">))</span>
        <span class="synSpecial">(</span>tracing-label <span class="synSpecial">'</span>global<span class="synSpecial">)</span>
        <span class="synSpecial">(</span>breakpoint <span class="synSpecial">'())</span>                <span class="synComment">;連想リストのリスト</span>
        <span class="synSpecial">(</span>label-number <span class="synConstant">1</span><span class="synSpecial">))</span>
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
                <span class="synSpecial">((</span>check-breakpoint breakpoint<span class="synSpecial">)</span> <span class="synSpecial">(</span>format <span class="synConstant">&quot;break! ~s: ~s&quot;</span>
                                                       tracing-label label-number<span class="synSpecial">))</span>
                <span class="synSpecial">(</span><span class="synStatement">else</span>
                 <span class="synSpecial">((</span>instruction-execution-proc <span class="synSpecial">(</span><span class="synIdentifier">car</span> insts<span class="synSpecial">)))</span>
                 <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>label-exp? <span class="synSpecial">(</span><span class="synIdentifier">caar</span> insts<span class="synSpecial">))</span>
                        <span class="synSpecial">(</span><span class="synStatement">set!</span> tracing-label <span class="synSpecial">(</span><span class="synIdentifier">cadaar</span> insts<span class="synSpecial">))</span>
                        <span class="synSpecial">(</span><span class="synStatement">set!</span> label-number <span class="synConstant">1</span><span class="synSpecial">))</span>
                       <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synStatement">set!</span> the-instruction-counter <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synConstant">1</span> the-instruction-counter<span class="synSpecial">))</span>
                             <span class="synSpecial">(</span><span class="synStatement">set!</span> label-number <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synConstant">1</span> label-number<span class="synSpecial">))</span>
                             <span class="synSpecial">(</span>trace <span class="synSpecial">(</span><span class="synIdentifier">caar</span> insts<span class="synSpecial">))))</span>
                 <span class="synSpecial">(</span>execute trace<span class="synSpecial">)))))</span>
      <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>proceed<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>insts <span class="synSpecial">(</span>get-contents pc<span class="synSpecial">)))</span>
         <span class="synSpecial">((</span>instruction-execution-proc <span class="synSpecial">(</span><span class="synIdentifier">car</span> insts<span class="synSpecial">)))</span>
         <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>label-exp? <span class="synSpecial">(</span><span class="synIdentifier">caar</span> insts<span class="synSpecial">))</span>
                <span class="synSpecial">(</span><span class="synStatement">set!</span> tracing-label <span class="synSpecial">(</span><span class="synIdentifier">cdaar</span> insts<span class="synSpecial">))</span>
                <span class="synSpecial">(</span><span class="synStatement">set!</span> label-number <span class="synConstant">1</span><span class="synSpecial">))</span>
               <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synStatement">set!</span> the-instruction-counter <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synConstant">1</span> the-instruction-counter<span class="synSpecial">))</span>
                     <span class="synSpecial">(</span><span class="synStatement">set!</span> label-number <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synConstant">1</span> label-number<span class="synSpecial">))</span>
                     <span class="synSpecial">(</span>tracing-flag <span class="synSpecial">(</span><span class="synIdentifier">caar</span> insts<span class="synSpecial">))))</span>
         <span class="synSpecial">(</span>execute tracing-flag<span class="synSpecial">)))</span>
      <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>cancel-breakpoint label n<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">set!</span> breakpoint <span class="synSpecial">(</span><span class="synIdentifier">remove</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> label n<span class="synSpecial">)</span> breakpoint<span class="synSpecial">)))</span>
      <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">remove</span> x lis<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> lis<span class="synSpecial">)</span> <span class="synSpecial">(</span>error <span class="synConstant">&quot;Cannot find in breakpoint&quot;</span> x<span class="synSpecial">))</span>
              <span class="synSpecial">((</span><span class="synIdentifier">equal?</span> x <span class="synSpecial">(</span><span class="synIdentifier">car</span> lis<span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lis<span class="synSpecial">))</span>
              <span class="synSpecial">(</span><span class="synStatement">else</span>
               <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> lis<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">remove</span> x <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lis<span class="synSpecial">))))))</span>
      <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>cancel-all-breakpoints<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">set!</span> breakpoint <span class="synSpecial">'()))</span>
      <span class="synComment">;; breakpointを引数に取り，再帰で一致するものがないか調べる．</span>
      <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>check-breakpoint breakpoint<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> breakpoint<span class="synSpecial">)</span> <span class="synConstant">#f</span><span class="synSpecial">)</span>
              <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">caar</span> breakpoint<span class="synSpecial">)</span> tracing-label<span class="synSpecial">)</span>
               <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">cdar</span> breakpoint<span class="synSpecial">)</span> label-number<span class="synSpecial">)</span> <span class="synConstant">#t</span><span class="synSpecial">)</span>
                     <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>check-breakpoint <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> breakpoint<span class="synSpecial">)))))</span>
              <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>check-breakpoint <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> breakpoint<span class="synSpecial">)))))</span>
      <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>set-breakpoint label n<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">set!</span> breakpoint <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> label n<span class="synSpecial">)</span> breakpoint<span class="synSpecial">)))</span>
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
              <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>set-breakpoint<span class="synSpecial">)</span> set-breakpoint<span class="synSpecial">)</span>
              <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>proceed<span class="synSpecial">)</span> <span class="synSpecial">(</span>proceed<span class="synSpecial">))</span>
              <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>cancel-breakpoint<span class="synSpecial">)</span> cancel-breakpoint<span class="synSpecial">)</span>
              <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>cancel-all-breakpoints<span class="synSpecial">)</span> <span class="synSpecial">(</span>cancel-all-breakpoints<span class="synSpecial">))</span>
              <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown request -- MACHINE&quot;</span> message<span class="synSpecial">))))</span>
      dispatch<span class="synSpecial">)))</span>
</pre>


