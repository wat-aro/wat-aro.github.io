---
title: "SICP 問題 5.44"
published: 2016/02/09
tags:
  - scheme
  - SICP
---

<p>基本手続きの名前を含む式の正しいコードを翻訳するため，翻訳時環境を調べるようにする．</p>

<pre class="code" data-lang="" data-unlink>  (cond ((self-evaluating? exp)
         (compile-self-evaluating exp target linkage))
        ((variable? exp)
         (compile-variable exp target linkage ct-env))
        ((quoted? exp) (compile-quoted exp target linkage))
        ((assignment? exp)
         (compile-assignment exp target linkage ct-env))
        ((definition? exp)
         (compile-definition exp target linkage ct-env))
        ((if? exp) (compile-if exp target linkage ct-env))
        ((lambda? exp)
         (compile-lambda exp target linkage ct-env))
        ((let? exp)
         (compile (let-&gt;combination exp) target linkage ct-env))
        ((begin? exp)
         (compile-sequence (begin-actions exp)
                           target linkage ct-env))
        ((cond? exp) (compile (cond-&gt;if exp) target linkage ct-env))
        ((open-code? exp ct-env)           ;ct-envも渡して翻訳時環境に上書きされていないか調べる
         (compile-open-code exp target linkage ct-env))
        ((application? exp)
         (compile-application exp target linkage ct-env))
        (else
         (error &#34;Unknown expression type -- COMPILE&#34; exp))))

(define (not-overwrite? op ct-env)
  (let ((address (find-variable op ct-env )))
    (eq? address &#39;not-found)))

(define (open-code? exp ct-env)
  (and (memq (car exp) &#39;(= * - +))
       (not-overwrite? (car exp) ct-env)))</pre>


<p>test</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">((</span>env<span class="synSpecial">)</span>
 <span class="synSpecial">(</span>val<span class="synSpecial">)</span>
 <span class="synSpecial">((</span>assign val <span class="synSpecial">(</span>op make-compiled-procedure<span class="synSpecial">)</span> <span class="synSpecial">(</span>label entry14<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label after-lambda15<span class="synSpecial">))</span>
  entry14
  <span class="synSpecial">(</span>assign env <span class="synSpecial">(</span>op compiled-procedure-env<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign env <span class="synSpecial">(</span>op extend-environment<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synIdentifier">*</span> a b x y<span class="synSpecial">))</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign proc <span class="synSpecial">(</span>op lexical-address-lookup<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">(</span><span class="synConstant">0</span> <span class="synConstant">0</span><span class="synSpecial">))</span> <span class="synSpecial">(</span>const <span class="synSpecial">((</span><span class="synIdentifier">+</span> <span class="synIdentifier">*</span> a b x y<span class="synSpecial">))))</span> <span class="synComment">;;ここで+を探すのにct-envの中身から探しているので成功.open-codeになっていない．</span>
  <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>save proc<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>assign proc <span class="synSpecial">(</span>op lexical-address-lookup<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">(</span><span class="synConstant">0</span> <span class="synConstant">1</span><span class="synSpecial">))</span> <span class="synSpecial">(</span>const <span class="synSpecial">((</span><span class="synIdentifier">+</span> <span class="synIdentifier">*</span> a b x y<span class="synSpecial">))))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op lexical-address-lookup<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">(</span><span class="synConstant">0</span> <span class="synConstant">5</span><span class="synSpecial">))</span> <span class="synSpecial">(</span>const <span class="synSpecial">((</span><span class="synIdentifier">+</span> <span class="synIdentifier">*</span> a b x y<span class="synSpecial">))))</span>
  <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op <span class="synIdentifier">list</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op lexical-address-lookup<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">(</span><span class="synConstant">0</span> <span class="synConstant">3</span><span class="synSpecial">))</span> <span class="synSpecial">(</span>const <span class="synSpecial">((</span><span class="synIdentifier">+</span> <span class="synIdentifier">*</span> a b x y<span class="synSpecial">))))</span>
  <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op <span class="synIdentifier">cons</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op primitive-procedure?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label primitive-branch19<span class="synSpecial">))</span>
  compiled-branch20
  <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label after-call21<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op compiled-procedure-entry<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  primitive-branch19
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op apply-primitive-procedure<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">))</span>
  after-call21
  <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op <span class="synIdentifier">list</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>save argl<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>assign proc <span class="synSpecial">(</span>op lexical-address-lookup<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">(</span><span class="synConstant">0</span> <span class="synConstant">1</span><span class="synSpecial">))</span> <span class="synSpecial">(</span>const <span class="synSpecial">((</span><span class="synIdentifier">+</span> <span class="synIdentifier">*</span> a b x y<span class="synSpecial">))))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op lexical-address-lookup<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">(</span><span class="synConstant">0</span> <span class="synConstant">4</span><span class="synSpecial">))</span> <span class="synSpecial">(</span>const <span class="synSpecial">((</span><span class="synIdentifier">+</span> <span class="synIdentifier">*</span> a b x y<span class="synSpecial">))))</span>
  <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op <span class="synIdentifier">list</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op lexical-address-lookup<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">(</span><span class="synConstant">0</span> <span class="synConstant">2</span><span class="synSpecial">))</span> <span class="synSpecial">(</span>const <span class="synSpecial">((</span><span class="synIdentifier">+</span> <span class="synIdentifier">*</span> a b x y<span class="synSpecial">))))</span>
  <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op <span class="synIdentifier">cons</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op primitive-procedure?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label primitive-branch16<span class="synSpecial">))</span>
  compiled-branch17
  <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label after-call18<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op compiled-procedure-entry<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  primitive-branch16
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op apply-primitive-procedure<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">))</span>
  after-call18
  <span class="synSpecial">(</span>restore argl<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op <span class="synIdentifier">cons</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>restore proc<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op primitive-procedure?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label primitive-branch22<span class="synSpecial">))</span>
  compiled-branch23
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op compiled-procedure-entry<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
  primitive-branch22
  <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op apply-primitive-procedure<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
  after-call24
  after-lambda15
  <span class="synSpecial">))</span>
</pre>


