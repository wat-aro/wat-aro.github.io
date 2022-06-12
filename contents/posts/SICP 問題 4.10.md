---
title: "SICP 問題 4.10"
published: 2015/12/20
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; 後置式にする</span>
<span class="synComment">;; 全部はめんどうなのでquoteだけ．</span>
<span class="synComment">;; リストの最後の項か尋ねるlast?</span>
<span class="synComment">;; 空リストは#fを返す．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>last? lst<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> lst<span class="synSpecial">)</span>
      <span class="synConstant">#f</span>
      <span class="synSpecial">(</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lst<span class="synSpecial">))))</span>

<span class="synComment">;; リストの最後の項を取る選択子last</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>last lst<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>last? lst<span class="synSpecial">)</span>
      lst
      <span class="synSpecial">(</span>lst <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lst<span class="synSpecial">))))</span>

<span class="synComment">;; cdrの逆で最後の項を取り除いたリストを返す</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>rid-last lst<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> iter <span class="synSpecial">((</span>lst lst<span class="synSpecial">)</span>
             <span class="synSpecial">(</span>result <span class="synSpecial">'()))</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> lst<span class="synSpecial">)</span> <span class="synSpecial">(</span>error <span class="synConstant">&quot;pair required, but got&quot;</span> lst<span class="synSpecial">))</span>
          <span class="synSpecial">((</span>last? lst<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">reverse</span> result<span class="synSpecial">))</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lst<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> lst<span class="synSpecial">)</span> result<span class="synSpecial">))))))</span>

<span class="synComment">;; クオート式</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>quoted? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>quote<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>text-of-quotation <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>rid-last <span class="synIdentifier">exp</span><span class="synSpecial">))</span>

<span class="synComment">;; リストが指定sれた記号から始まるかどうかを確認する手続き</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> tag<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">pair?</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span>last <span class="synIdentifier">exp</span><span class="synSpecial">)</span> tag<span class="synSpecial">)</span>
      false<span class="synSpecial">))</span>
</pre>


