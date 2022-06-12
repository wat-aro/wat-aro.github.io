---
title: "SICP 問題 5.18"
published: 2016/01/29
tags:
  - scheme
  - SICP
---

<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%EC%A5%B8%A5%B9%A5%BF">レジスタ</a>の値をトレース出来るようにする</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;;; registerがtraceを持ち，trace-onがメッセージパッシングされたらトレースする．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-register name<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>contents <span class="synSpecial">'</span><span class="synConstant">*unssaigned*</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span>trace <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>contents value<span class="synSpecial">)</span> <span class="synConstant">#f</span><span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>dispatch message<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>get<span class="synSpecial">)</span> contents<span class="synSpecial">)</span>
            <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>set<span class="synSpecial">)</span>
             <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>value<span class="synSpecial">)</span>
               <span class="synSpecial">(</span>trace contents value<span class="synSpecial">)</span>
               <span class="synSpecial">(</span><span class="synStatement">set!</span> contents value<span class="synSpecial">)))</span>
            <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>trace-on<span class="synSpecial">)</span>
             <span class="synSpecial">(</span><span class="synStatement">set!</span> trace <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>contents value<span class="synSpecial">)</span>
                           <span class="synSpecial">(</span>format <span class="synConstant">#t</span> <span class="synConstant">&quot;register: ~6s   oldv-value: ~s new-value: ~s\n&quot;</span>
                                   name contents value<span class="synSpecial">)))</span>
             <span class="synSpecial">'</span>trace-on<span class="synSpecial">)</span>
            <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> message <span class="synSpecial">'</span>trace-off<span class="synSpecial">)</span>
             <span class="synSpecial">(</span><span class="synStatement">set!</span> trace <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>contents value<span class="synSpecial">)</span> <span class="synConstant">#f</span><span class="synSpecial">))</span>
             <span class="synSpecial">'</span>trace-off<span class="synSpecial">)</span>
            <span class="synSpecial">(</span><span class="synStatement">else</span>
             <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown request -- REGISTER&quot;</span> message<span class="synSpecial">))))</span>
    dispatch<span class="synSpecial">))</span>
</pre>


