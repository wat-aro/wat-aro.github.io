---
title: "SICP 問題 5.37"
published: 2016/02/07
tags:
  - scheme
  - SICP
---

<p>preservingを修正して常にsaveとrestoreをさせ，修正前と後を比較する．</p>

<p>修正前</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>preserving regs seq1 seq2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> regs<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>append-instruction-sequences seq1 seq2<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>first-reg <span class="synSpecial">(</span><span class="synIdentifier">car</span> regs<span class="synSpecial">)))</span>     <span class="synComment">;first-regが</span>
        <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span>needs-register? seq2 first-reg<span class="synSpecial">)</span> <span class="synComment">;seq2に必要なレジスタで</span>
                 <span class="synSpecial">(</span>modifies-register? seq1 first-reg<span class="synSpecial">))</span> <span class="synComment">;seq1が変更するレジスタなら</span>
            <span class="synSpecial">(</span>preserving
             <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> regs<span class="synSpecial">)</span>
             <span class="synSpecial">(</span>make-instruction-sequence
              <span class="synComment">;; needs ここでsaveするのでfirst-regが必要になるのでlist-union</span>
              <span class="synSpecial">(</span>list-union <span class="synSpecial">(</span><span class="synIdentifier">list</span> first-reg<span class="synSpecial">)</span>
                          <span class="synSpecial">(</span>registers-needed seq1<span class="synSpecial">))</span>
              <span class="synComment">;; modify saveしてのseq2の前にrestoreするのでseq2から見ればfirst-reg変更無し</span>
              <span class="synSpecial">(</span>list-difference <span class="synSpecial">(</span>registers-modified seq1<span class="synSpecial">)</span>
                               <span class="synSpecial">(</span><span class="synIdentifier">list</span> first-reg<span class="synSpecial">))</span>
              <span class="synComment">;; statements 条件を満たすfirst-regの場合はseq1をsaveとrestoreで挟む</span>
              <span class="synSpecial">(</span><span class="synIdentifier">append</span> <span class="synSpecial">`((</span>save <span class="synSpecial">,</span>first-reg<span class="synSpecial">))</span>
                      <span class="synSpecial">(</span>statements seq1<span class="synSpecial">)</span>
                      <span class="synSpecial">`((</span>restore <span class="synSpecial">,</span>first-reg<span class="synSpecial">))))</span>
             seq2<span class="synSpecial">)</span>
            <span class="synSpecial">(</span>preserving <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> regs<span class="synSpecial">)</span> seq1 seq2<span class="synSpecial">)))))</span>
</pre>


<p>必要ないsaveやrestoreは一切されない，賢いpreserving．</p>

<pre class="code" data-lang="" data-unlink>gosh&gt; (compile
       &#39;(define (f a b)
          (+ a b))
       &#39;val &#39;next)
((env)
 (val)
 ((assign val (op make-compiled-procedure) (label entry34) (reg env))
  (goto (label after-lambda35))
  entry34
  (assign env (op compiled-procedure-env) (reg proc))
  (assign env (op extend-environment) (const (a b)) (reg argl) (reg env))
  (assign proc (op lookup-variable-value) (const +) (reg env))
  (assign val (op lookup-variable-value) (const a) (reg env))
  (assign argl (op list) (reg val))
  (assign val (op lookup-variable-value) (const b) (reg env))
  (assign val (op list) (reg val))
  (assign argl (op append) (reg argl) (reg val))
  (test (op primitive-procedure?) (reg proc))
  (branch (label primitive-branch36))
  compiled-branch37
  (assign val (op compiled-procedure-entry) (reg proc))
  (goto (reg val))
  primitive-branch36
  (assign val (op apply-primitive-procedure) (reg proc) (reg argl))
  (goto (reg continue))
  after-call38
  after-lambda35
  (perform (op define-variable!) (const f) (reg val) (reg env))
  (assign val (const ok))
  ))</pre>


<p>修正後</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>preserving regs seq1 seq2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> regs<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>append-instruction-sequences seq1 seq2<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>first-reg <span class="synSpecial">(</span><span class="synIdentifier">car</span> regs<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span>preserving
         <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> regs<span class="synSpecial">)</span>
         <span class="synSpecial">(</span>make-instruction-sequence
          <span class="synSpecial">(</span>list-union <span class="synSpecial">(</span><span class="synIdentifier">list</span> first-reg<span class="synSpecial">)</span>
                      <span class="synSpecial">(</span>registers-needed seq1<span class="synSpecial">))</span>
          <span class="synSpecial">(</span>list-difference <span class="synSpecial">(</span>registers-modified seq1<span class="synSpecial">)</span>
                           <span class="synSpecial">(</span><span class="synIdentifier">list</span> first-reg<span class="synSpecial">))</span>
          <span class="synSpecial">(</span><span class="synIdentifier">append</span> <span class="synSpecial">`((</span>save <span class="synSpecial">,</span>first-reg<span class="synSpecial">))</span>
                  <span class="synSpecial">(</span>statements seq1<span class="synSpecial">)</span>
                  <span class="synSpecial">`((</span>restore <span class="synSpecial">,</span>first-reg<span class="synSpecial">))))</span>
         seq2<span class="synSpecial">))))</span>
</pre>




<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span>compile
       <span class="synSpecial">'(</span>define <span class="synSpecial">(</span>f a b<span class="synSpecial">)</span>
          <span class="synSpecial">(</span>+ a b<span class="synSpecial">))</span>
       <span class="synSpecial">'</span>val <span class="synSpecial">'</span>next<span class="synSpecial">)</span>
<span class="synSpecial">((</span>continue env<span class="synSpecial">)</span>                         <span class="synComment">;まずcontinueを必要とするようになっている．</span>
 <span class="synSpecial">(</span>val<span class="synSpecial">)</span>
 <span class="synSpecial">((</span>save continue<span class="synSpecial">)</span>                       <span class="synComment">;ここでsave continueするから</span>
  <span class="synSpecial">(</span>save env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>                       <span class="synComment">;ここでさらにsave continueしている．</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op make-compiled-procedure<span class="synSpecial">)</span> <span class="synSpecial">(</span>label entry41<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>                    <span class="synComment">;ここで復帰．</span>
  <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label after-lambda42<span class="synSpecial">))</span>         <span class="synComment">;ここまでで無駄なsave 3. 無駄なrestore 1</span>
  entry41
  <span class="synSpecial">(</span>assign env <span class="synSpecial">(</span>op compiled-procedure-env<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign env <span class="synSpecial">(</span>op extend-environment<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">(</span>a b<span class="synSpecial">))</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>                       <span class="synComment">;ここでまたsave continue</span>
  <span class="synSpecial">(</span>save env<span class="synSpecial">)</span>                            <span class="synComment">;env</span>
  <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>                       <span class="synComment">;continue</span>
  <span class="synSpecial">(</span>assign proc <span class="synSpecial">(</span>op lookup-variable-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synIdentifier">+</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>                    <span class="synComment">;restore c</span>
  <span class="synSpecial">(</span>restore env<span class="synSpecial">)</span>                         <span class="synComment">;restore e</span>
  <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>                    <span class="synComment">;restore c</span>
  <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>                       <span class="synComment">;save c</span>
  <span class="synSpecial">(</span>save proc<span class="synSpecial">)</span>                           <span class="synComment">;save p</span>
  <span class="synSpecial">(</span>save env<span class="synSpecial">)</span>                            <span class="synComment">;save e</span>
  <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>                       <span class="synComment">;save c</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op lookup-variable-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>const a<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>                    <span class="synComment">;restore c</span>
  <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op <span class="synIdentifier">list</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>restore env<span class="synSpecial">)</span>                         <span class="synComment">;restore e</span>
  <span class="synSpecial">(</span>save argl<span class="synSpecial">)</span>                           <span class="synComment">;save a</span>
  <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>                       <span class="synComment">;save c</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op lookup-variable-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>const b<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>                    <span class="synComment">;restore c</span>
  <span class="synSpecial">(</span>restore argl<span class="synSpecial">)</span>                        <span class="synComment">;restore a</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op <span class="synIdentifier">list</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op <span class="synIdentifier">append</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>restore proc<span class="synSpecial">)</span>                        <span class="synComment">;restore p</span>
  <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>                    <span class="synComment">;restore c</span>
  <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op primitive-procedure?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label primitive-branch43<span class="synSpecial">))</span>
  compiled-branch44
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op compiled-procedure-entry<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  primitive-branch43
  <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>                       <span class="synComment">;save c</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op apply-primitive-procedure<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>                    <span class="synComment">;restore c</span>
  <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
  after-call45
  after-lambda42
  <span class="synSpecial">(</span>restore env<span class="synSpecial">)</span>                         <span class="synComment">;restore e 最初のenv</span>
  <span class="synSpecial">(</span>perform <span class="synSpecial">(</span>op define-variable!<span class="synSpecial">)</span> <span class="synSpecial">(</span>const f<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>const ok<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>                    <span class="synComment">;最初のcontinue</span>
  <span class="synSpecial">))</span>
</pre>


