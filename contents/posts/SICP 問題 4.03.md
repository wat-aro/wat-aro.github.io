---
title: "SICP 問題 4.03"
published: 2015/12/18
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; evalをデータ主導スタイルに書き換える．</span>
<span class="synComment">;; 本文で定義されたeval</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synIdentifier">exp</span> env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>self-evaluating? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
        <span class="synSpecial">((</span>variable? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>lookup-valiable-value <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>quoted? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>text-of-quotation <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">((</span>assignment? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>eval-assignment <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>definition? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>eval-definition <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>if? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>eval-if <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>lambda? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>make-procedure <span class="synSpecial">(</span>lambda-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                                       <span class="synSpecial">(</span>lambda-body <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                                       env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>begin? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span>eval-sequence <span class="synSpecial">(</span>begin-actions <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>cond? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>cond-&gt;if <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>application? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">apply</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>operator <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>list-of-values <span class="synSpecial">(</span>operands <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span>
         <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown expression type: EVAL&quot;</span> <span class="synIdentifier">exp</span><span class="synSpecial">))))</span>

<span class="synComment">;; opを持つexpと持たないexpで分ける．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synIdentifier">exp</span> env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>self-evaluating? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
        <span class="synSpecial">((</span>variable? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>lookup-valiable-value <span class="synIdentifier">exp</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>op <span class="synSpecial">(</span>get <span class="synSpecial">'</span>eval <span class="synSpecial">(</span>operator <span class="synIdentifier">exp</span><span class="synSpecial">))))</span> <span class="synComment">;;opが見付からなければfalseが束縛</span>
          <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">(</span>op
                 <span class="synSpecial">(</span>op <span class="synSpecial">(</span>operands <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">))</span>
                <span class="synSpecial">((</span>application? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                 <span class="synSpecial">(</span><span class="synIdentifier">apply</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>operator <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">)</span>
                        <span class="synSpecial">(</span>list-of-values <span class="synSpecial">(</span>operands <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">)))</span>
                <span class="synSpecial">(</span><span class="synStatement">else</span>
                 <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown expression type: EVAL&quot;</span> <span class="synIdentifier">exp</span><span class="synSpecial">))))))</span>


<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-table<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>local-table <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span><span class="synConstant">*table*</span><span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>lookup key-1 key-2<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>subtable <span class="synSpecial">(</span><span class="synIdentifier">assoc</span> key-1 <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> local-table<span class="synSpecial">))))</span>
        <span class="synSpecial">(</span><span class="synStatement">if</span> subtable
            <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>record <span class="synSpecial">(</span><span class="synIdentifier">assoc</span> key-2 <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> subtable<span class="synSpecial">))))</span>
              <span class="synSpecial">(</span><span class="synStatement">if</span> record
                  <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> record<span class="synSpecial">)</span>
                  false<span class="synSpecial">))</span>
            false<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>insert! key-1 key-2 value<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>subtable <span class="synSpecial">(</span><span class="synIdentifier">assoc</span> key-1 <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> local-table<span class="synSpecial">))))</span>
        <span class="synSpecial">(</span><span class="synStatement">if</span> subtable
            <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>record <span class="synSpecial">(</span><span class="synIdentifier">assoc</span> key-2 <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> subtable<span class="synSpecial">))))</span>
              <span class="synSpecial">(</span><span class="synStatement">if</span> record
                  <span class="synSpecial">(</span><span class="synIdentifier">set-cdr!</span> record value<span class="synSpecial">)</span>
                  <span class="synSpecial">(</span><span class="synIdentifier">set-cdr!</span> subtable
                            <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> key-2 value<span class="synSpecial">)</span>
                                  <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> subtable<span class="synSpecial">)))))</span>
            <span class="synSpecial">(</span><span class="synIdentifier">set-cdr!</span> local-table
                      <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> key-1
                                  <span class="synSpecial">(</span><span class="synIdentifier">cons</span> key-2 value<span class="synSpecial">))</span>
                            <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> local-table<span class="synSpecial">)))))</span>
      <span class="synSpecial">'</span>ok<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>dispatch m<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> m <span class="synSpecial">'</span>lookup-proc<span class="synSpecial">)</span> lookup<span class="synSpecial">)</span>
            <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> m <span class="synSpecial">'</span>insert-proc!<span class="synSpecial">)</span> insert!<span class="synSpecial">)</span>
            <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown operation -- TABLE&quot;</span> m<span class="synSpecial">))))</span>
    dispatch<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> operation-table <span class="synSpecial">(</span>make-table<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> get <span class="synSpecial">(</span>operation-table <span class="synSpecial">'</span>lookup-proc<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> put <span class="synSpecial">(</span>operation-table <span class="synSpecial">'</span>insert-proc!<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>install-eval-package<span class="synSpecial">)</span>
  <span class="synComment">;; クオート式</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>text-of-quotation <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
  <span class="synComment">;; 代入</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>eval-assignment <span class="synIdentifier">exp</span> env<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>set-variable-value! <span class="synSpecial">(</span>assignment-variable <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                         <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>assignment-value <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">)</span>
                         env<span class="synSpecial">)</span>
    <span class="synSpecial">'</span>ok<span class="synSpecial">)</span>
  <span class="synComment">;; 定義</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>eval-definition <span class="synIdentifier">exp</span> env<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>define-variable! <span class="synSpecial">(</span>definition-variable <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>definition-value <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">)</span>
      env<span class="synSpecial">)</span>
    <span class="synSpecial">'</span>ok<span class="synSpecial">)</span>
  <span class="synComment">;; 条件式</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>eval-if <span class="synIdentifier">exp</span> env<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>true? <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>if-predicate <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>if-consequent <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>if-alternative <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">)))</span>
  <span class="synComment">;; lambda</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>lambda-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>lambda-body <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cddr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
  <span class="synComment">;; 列</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>eval-sequence exps env<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>last-exp? exps<span class="synSpecial">)</span>
           <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>first-exp exps<span class="synSpecial">)</span> env<span class="synSpecial">))</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span>
           <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>first-exp exps<span class="synSpecial">)</span> env<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>eval-sequence <span class="synSpecial">(</span>rest-exps exps<span class="synSpecial">)</span> env<span class="synSpecial">))))</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>begin-actions <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>cond-&gt;if <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>expand-clauses <span class="synSpecial">(</span>cond-clauses <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>expand-clauses clauses<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> clauses<span class="synSpecial">)</span>
        <span class="synSpecial">'</span>false <span class="synComment">;; else 説は無い</span>
        <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>first <span class="synSpecial">(</span><span class="synIdentifier">car</span> clauses<span class="synSpecial">))</span>
              <span class="synSpecial">(</span>rest <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> clauses<span class="synSpecial">)))</span>
          <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>cond-else-clause? first<span class="synSpecial">)</span>
              <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> rest<span class="synSpecial">)</span>
                  <span class="synSpecial">(</span>sequence-&gt;exp <span class="synSpecial">(</span>cond-actions first<span class="synSpecial">))</span>
                  <span class="synSpecial">(</span>error <span class="synConstant">&quot;ELSE clause isn't last: COND-&gt;IF&quot;</span>
                         clauses<span class="synSpecial">))</span>
              <span class="synSpecial">(</span>make-if <span class="synSpecial">(</span>cond-predicate first<span class="synSpecial">)</span>
                       <span class="synSpecial">(</span>sequence-&gt;exp <span class="synSpecial">(</span>cond-actions first<span class="synSpecial">))</span>
                       <span class="synSpecial">(</span>expand-clauses rest<span class="synSpecial">))))))</span>
  <span class="synSpecial">(</span>put <span class="synSpecial">'</span>eval <span class="synSpecial">'</span>quote text-of-quotation<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>put <span class="synSpecial">'</span>eval <span class="synSpecial">'</span>set! eval-assignment<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>put <span class="synSpecial">'</span>eval <span class="synSpecial">'</span>define eval-definition<span class="synSpecial">)</span>v
  <span class="synSpecial">(</span>put <span class="synSpecial">'</span>eval <span class="synSpecial">'</span>if eval-if<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>put <span class="synSpecial">'</span>eval <span class="synSpecial">'</span>lambda <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span><span class="synIdentifier">exp</span> env<span class="synSpecial">)</span> <span class="synSpecial">(</span>make-procedure <span class="synSpecial">(</span>lambda-parameters <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                                                       <span class="synSpecial">(</span>lambda-body <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
                                                       env<span class="synSpecial">)))</span>
  <span class="synSpecial">(</span>put <span class="synSpecial">'</span>eval <span class="synSpecial">'</span>begin <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span><span class="synIdentifier">exp</span> env<span class="synSpecial">)</span> <span class="synSpecial">(</span>eval-sequence <span class="synSpecial">(</span>begin-actions <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">)))</span>
  <span class="synSpecial">(</span>put <span class="synSpecial">'</span>eval <span class="synSpecial">'</span>cond <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span><span class="synIdentifier">exp</span> env<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>cond-&gt;if <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">)))</span>
<span class="synSpecial">'</span>done<span class="synSpecial">)</span>
</pre>


