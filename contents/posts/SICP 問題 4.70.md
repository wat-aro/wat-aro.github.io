---
title: "SICP 問題 4.70"
published: 2016/01/18
tags:
  - scheme
  - SICP
---

<p>本文中のadd-assertion!とadd-rules!のletの目的は何か．
問題文のadd-assertion!ではダメな理由を述べよ．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; 本文中のadd-assertion!</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>add-assertion! assertion<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>store-assertion-in-index assertion<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>old-assertions THE-ASSERTIONS<span class="synSpecial">))</span>
    <span class="synSpecial">(</span><span class="synStatement">set!</span> THE-ASSERTIONS
          <span class="synSpecial">(</span>cons-stream assertion old-assertions<span class="synSpecial">))</span>
    <span class="synSpecial">'</span>ok<span class="synSpecial">))</span>

<span class="synComment">;; 問題文のadd-assertion!</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>add-assertion! assertion<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>store-assertion-in-index assertion<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">set!</span> THE-ASSERTIONS
        <span class="synSpecial">(</span>cons-stream assertion THE-ASSERTIONS<span class="synSpecial">))</span>
  <span class="synSpecial">'</span>ok<span class="synSpecial">)</span>
</pre>


<p>cons-streamはcarは評価し，cdrはdelayしてconsしている．<br/>
そのため，問題文のadd-assertion!ではset!した時にassertionは評価されているが，THE-ASSERTIONSは評価されていない．   <br/>
それがTHE-ASSERTIONSに代入されるのでもともとのTHE-ASSERTIONSにアクセスできなくなる．  <br/>
それを防ぐために本文中のadd-assertion!とadd-rule!ではset!する前にletで古い値を保存している．</p>

