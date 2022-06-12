---
title: "SICP 問題 5.12"
published: 2016/01/29
tags:
  - scheme
  - SICP
---

<p>シミュレータのメッセージパッシングインターフェースを拡張し，以下の情報にアクセスできるようにする．<br/>
・命令の型で，格納されたすべての異なる命令のリスト<br/>
・エントリポイントの保持に使った<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%EC%A5%B8%A5%B9%A5%BF">レジスタ</a>のリスト<br/>
・save, restoreされる異なる<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%EC%A5%B8%A5%B9%A5%BF">レジスタ</a>のリスト<br/>
・各<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%EC%A5%B8%A5%B9%A5%BF">レジスタ</a>に対して，異なる代入元のリスト<br/>
　<br/>
<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%A2%A5%BB%A5%F3%A5%D6%A5%E9">アセンブラ</a>を拡張しろってことなのでextra-labelsの継続渡しの部分で上記４つのリストの雛形を作り，<br/>
update-insts!で重複を削除し，ソートしてinstsと一緒に返すようにした．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>assemble controller-text machine<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>extract-labels controller-text
                  <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>insts labels type-insts label-regs saved-regs reg-sources<span class="synSpecial">)</span>
                    <span class="synSpecial">(</span>update-insts! insts labels machine type-insts
                                   label-regs saved-regs reg-sources<span class="synSpecial">)</span>
                    <span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>extract-labels text receive<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> text<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>receive <span class="synSpecial">'()</span> <span class="synSpecial">'()</span> <span class="synSpecial">'()</span> <span class="synSpecial">'()</span> <span class="synSpecial">'()</span> <span class="synSpecial">'())</span>
      <span class="synSpecial">(</span>extract-labels
       <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> text<span class="synSpecial">)</span>
       <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>insts labels type-insts label-regs saved-regs reg-sources<span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>next-inst <span class="synSpecial">(</span><span class="synIdentifier">car</span> text<span class="synSpecial">)))</span>
           <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">symbol?</span> next-inst<span class="synSpecial">)</span>
               <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">assoc</span> next-inst labels<span class="synSpecial">)</span>
                   <span class="synSpecial">(</span>error <span class="synConstant">&quot;The same label name is used to indicate two different location &quot;</span> label-name<span class="synSpecial">)</span>
                   <span class="synSpecial">(</span>receive
                       insts
                       <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>make-label-entry next-inst insts<span class="synSpecial">)</span>
                             labels<span class="synSpecial">)</span>
                     type-insts label-regs saved-regs reg-sources<span class="synSpecial">))</span>
               <span class="synSpecial">(</span>receive
                   <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>make-instruction next-inst<span class="synSpecial">)</span>
                         insts<span class="synSpecial">)</span>
                   labels
                 <span class="synSpecial">(</span><span class="synIdentifier">cons</span> next-inst type-insts<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span>add-label-reg next-inst label-regs<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span>add-saved-reg next-inst saved-regs<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span>add-reg-sources next-inst reg-sources<span class="synSpecial">))))))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>add-label-reg next-inst label-regs<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span>tagged-list? next-inst <span class="synSpecial">'</span>goto<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>tagged-list? <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> next-inst<span class="synSpecial">)</span> <span class="synSpecial">'</span>reg<span class="synSpecial">))</span>
      <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">cadadr</span> next-inst<span class="synSpecial">)</span> label-regs<span class="synSpecial">)</span>
      label-regs<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>add-saved-reg next-inst saved-regs<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>tagged-list? next-inst <span class="synSpecial">'</span>save<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> next-inst<span class="synSpecial">)</span> saved-regs<span class="synSpecial">)</span>
      saved-regs<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>add-reg-sources next-inst reg-sources<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>tagged-list? next-inst <span class="synSpecial">'</span>assign<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> next-inst<span class="synSpecial">)</span> reg-sources<span class="synSpecial">)</span>
      reg-sources<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>tag x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> x<span class="synSpecial">))</span>

<span class="synComment">;;; 重複は既に排除されている．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>sort-reg reg-sources<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>helper first items<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> items<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> first<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> first<span class="synSpecial">)))))</span>
          <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span>tag first<span class="synSpecial">)</span> <span class="synSpecial">(</span>tag <span class="synSpecial">(</span><span class="synIdentifier">car</span> items<span class="synSpecial">)))</span>
           <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>tag <span class="synSpecial">(</span><span class="synIdentifier">car</span> items<span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synIdentifier">append</span> <span class="synSpecial">(</span><span class="synIdentifier">cdar</span> items<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> first<span class="synSpecial">))))</span>
                 <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> items<span class="synSpecial">)))</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> items<span class="synSpecial">)</span> <span class="synSpecial">(</span>helper first <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> items<span class="synSpecial">))))))</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> recur <span class="synSpecial">((</span>lst reg-sources<span class="synSpecial">)</span> <span class="synSpecial">(</span>result <span class="synSpecial">'()))</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> lst<span class="synSpecial">)</span> result<span class="synSpecial">)</span>
          <span class="synSpecial">((</span><span class="synIdentifier">null?</span> result<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>recur <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lst<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">caar</span> lst<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">cdar</span> lst<span class="synSpecial">))))))</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>recur <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lst<span class="synSpecial">)</span> <span class="synSpecial">(</span>helper <span class="synSpecial">(</span><span class="synIdentifier">car</span> lst<span class="synSpecial">)</span> result<span class="synSpecial">))))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>update-insts! insts labels machine type-insts label-regs saved-regs reg-sources<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>pc <span class="synSpecial">(</span>get-register machine <span class="synSpecial">'</span>pc<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>flag <span class="synSpecial">(</span>get-register machine <span class="synSpecial">'</span>flag<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>ops <span class="synSpecial">(</span>machine <span class="synSpecial">'</span>operations<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synIdentifier">for-each</span>
     <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>inst<span class="synSpecial">)</span>
       <span class="synSpecial">(</span>set-instruction-execution-proc!
        inst
        <span class="synSpecial">(</span>make-execution-procedure
         <span class="synSpecial">(</span>instruction-text inst<span class="synSpecial">)</span> labels machine pc flag ops<span class="synSpecial">)))</span>
     insts<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synIdentifier">list</span> insts
          <span class="synSpecial">(</span>sort-reg <span class="synSpecial">(</span>delete-duplicates type-insts<span class="synSpecial">))</span>
          <span class="synSpecial">(</span>delete-duplicates label-regs<span class="synSpecial">)</span>
          <span class="synSpecial">(</span>delete-duplicates  saved-regs<span class="synSpecial">)</span>
          <span class="synSpecial">(</span>sort-reg <span class="synSpecial">(</span>delete-duplicates reg-sources<span class="synSpecial">)))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-machine register-names ops controller-text<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>machine <span class="synSpecial">(</span>make-new-machine<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synIdentifier">for-each</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>register-name<span class="synSpecial">)</span>
                <span class="synSpecial">((</span>machine <span class="synSpecial">'</span>allocate-register<span class="synSpecial">)</span> register-name<span class="synSpecial">))</span>
              register-names<span class="synSpecial">)</span>
    <span class="synSpecial">((</span>machine <span class="synSpecial">'</span>install-operations<span class="synSpecial">)</span> ops<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>insts <span class="synSpecial">(</span>assemble controller-text machine<span class="synSpecial">)))</span>
      <span class="synSpecial">((</span>machine <span class="synSpecial">'</span>install-instruction-sequence<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> insts<span class="synSpecial">))</span>
      <span class="synSpecial">((</span>machine <span class="synSpecial">'</span>install-instruction-types<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> insts<span class="synSpecial">))</span>
      <span class="synSpecial">((</span>machine <span class="synSpecial">'</span>install-label-registers<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">caddr</span> insts<span class="synSpecial">))</span>
      <span class="synSpecial">((</span>machine <span class="synSpecial">'</span>install-saved-registers<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadddr</span> insts<span class="synSpecial">))</span>
      <span class="synSpecial">((</span>machine <span class="synSpecial">'</span>install-register-sources<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> <span class="synSpecial">(</span><span class="synIdentifier">cddddr</span> insts<span class="synSpecial">)))</span>
      machine<span class="synSpecial">)))</span>

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
              <span class="synSpecial">(</span><span class="synStatement">set!</span> register-table
                    <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> name <span class="synSpecial">(</span>make-register name<span class="synSpecial">))</span>
                          register-table<span class="synSpecial">)))</span>
          <span class="synSpecial">'</span>register-allocated<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>lookup-register name<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>val <span class="synSpecial">(</span><span class="synIdentifier">assoc</span> name register-table<span class="synSpecial">)))</span>
            <span class="synSpecial">(</span><span class="synStatement">if</span> val
                <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> val<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown register: &quot;</span> name<span class="synSpecial">))))</span>
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

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>get-types machine<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>machine <span class="synSpecial">'</span>instruction-types<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>get-label-registers machine<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>machine <span class="synSpecial">'</span>label-registers<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>get-saved-registers machine<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>machine <span class="synSpecial">'</span>saved-registers<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>get-register-sources machine<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>machine <span class="synSpecial">'</span>register-sources<span class="synSpecial">))</span>
</pre>


<p>test</p>

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

<span class="synComment">;; 整形した</span>
gosh&gt; <span class="synSpecial">(</span>get-types fib-machine<span class="synSpecial">)</span>
<span class="synSpecial">((</span>assign <span class="synSpecial">(</span>continue <span class="synSpecial">(</span>label fib-done<span class="synSpecial">))</span>
         <span class="synSpecial">(</span>continue <span class="synSpecial">(</span>label afterfib-n-1<span class="synSpecial">))</span>
         <span class="synSpecial">(</span>n <span class="synSpecial">(</span>op <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
         <span class="synSpecial">(</span>n <span class="synSpecial">(</span>op <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">))</span>
         <span class="synSpecial">(</span>continue <span class="synSpecial">(</span>label afterfib-n-2<span class="synSpecial">))</span>
         <span class="synSpecial">(</span>n <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
         <span class="synSpecial">(</span>val <span class="synSpecial">(</span>op <span class="synIdentifier">+</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">))</span>
         <span class="synSpecial">(</span>val <span class="synSpecial">(</span>reg n<span class="synSpecial">)))</span>
 <span class="synSpecial">(</span>test <span class="synSpecial">((</span>op <span class="synIdentifier">&lt;</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">)))</span>
 <span class="synSpecial">(</span>branch <span class="synSpecial">((</span>label immediate-answer<span class="synSpecial">)))</span>
 <span class="synSpecial">(</span>save <span class="synSpecial">(</span>continue<span class="synSpecial">)</span>
       <span class="synSpecial">(</span>n<span class="synSpecial">)</span>
       <span class="synSpecial">(</span>val<span class="synSpecial">))</span>
 <span class="synSpecial">(</span>goto <span class="synSpecial">((</span>label fib-loop<span class="synSpecial">))</span>
       <span class="synSpecial">((</span>reg continue<span class="synSpecial">)))</span>
 <span class="synSpecial">(</span>restore <span class="synSpecial">(</span>n<span class="synSpecial">)</span>
          <span class="synSpecial">(</span>val<span class="synSpecial">)</span>
          <span class="synSpecial">(</span>continue<span class="synSpecial">)))</span>
gosh&gt; fib-machine
gosh&gt; <span class="synSpecial">(</span>get-types fib-machine<span class="synSpecial">)</span>
<span class="synSpecial">((</span>assign <span class="synSpecial">(</span>continue <span class="synSpecial">(</span>label fib-done<span class="synSpecial">))</span>
         <span class="synSpecial">(</span>continue <span class="synSpecial">(</span>label afterfib-n-1<span class="synSpecial">))</span>
         <span class="synSpecial">(</span>n <span class="synSpecial">(</span>op <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
         <span class="synSpecial">(</span>n <span class="synSpecial">(</span>op <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">))</span>
         <span class="synSpecial">(</span>continue <span class="synSpecial">(</span>label afterfib-n-2<span class="synSpecial">))</span>
         <span class="synSpecial">(</span>n <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
         <span class="synSpecial">(</span>val <span class="synSpecial">(</span>op <span class="synIdentifier">+</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">))</span>
         <span class="synSpecial">(</span>val <span class="synSpecial">(</span>reg n<span class="synSpecial">)))</span>
 <span class="synSpecial">(</span>test <span class="synSpecial">((</span>op <span class="synIdentifier">&lt;</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">)))</span>
 <span class="synSpecial">(</span>branch <span class="synSpecial">((</span>label immediate-answer<span class="synSpecial">)))</span>
 <span class="synSpecial">(</span>save <span class="synSpecial">(</span>continue<span class="synSpecial">)</span>
       <span class="synSpecial">(</span>n<span class="synSpecial">)</span>
       <span class="synSpecial">(</span>val<span class="synSpecial">))</span>
 <span class="synSpecial">(</span>goto <span class="synSpecial">((</span>label fib-loop<span class="synSpecial">))</span>
       <span class="synSpecial">((</span>reg continue<span class="synSpecial">)))</span>
 <span class="synSpecial">(</span>restore <span class="synSpecial">(</span>n<span class="synSpecial">)</span>
          <span class="synSpecial">(</span>val<span class="synSpecial">)</span>
          <span class="synSpecial">(</span>continue<span class="synSpecial">)))</span>
gosh&gt; <span class="synSpecial">(</span>get-label-registers fib-machine<span class="synSpecial">)</span>
<span class="synSpecial">(</span>continue<span class="synSpecial">)</span>
gosh&gt; <span class="synSpecial">(</span>get-saved-registers fib-machine<span class="synSpecial">)</span>
<span class="synSpecial">(</span>continue n val<span class="synSpecial">)</span>
gosh&gt; <span class="synSpecial">(</span>get-register-sources fib-machine<span class="synSpecial">)</span>
<span class="synSpecial">((</span>continue <span class="synSpecial">((</span>label fib-done<span class="synSpecial">))</span>
           <span class="synSpecial">((</span>label afterfib-n-1<span class="synSpecial">))</span>
           <span class="synSpecial">((</span>label afterfib-n-2<span class="synSpecial">)))</span>
 <span class="synSpecial">(</span>n <span class="synSpecial">((</span>op <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
    <span class="synSpecial">((</span>op <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">))</span>
    <span class="synSpecial">((</span>reg val<span class="synSpecial">)))</span>
 <span class="synSpecial">(</span>val <span class="synSpecial">((</span>op <span class="synIdentifier">+</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">))</span>
      <span class="synSpecial">((</span>reg n<span class="synSpecial">))))</span>
</pre>


