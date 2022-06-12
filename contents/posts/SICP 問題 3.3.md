---
title: "SICP 問題 3.3"
published: 2015/11/05
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-account balance password<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>withdraw amount<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">&gt;=</span> balance amount<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">begin</span> <span class="synSpecial">(</span><span class="synStatement">set!</span> balance <span class="synSpecial">(</span><span class="synIdentifier">-</span> balance amount<span class="synSpecial">))</span>
               balance<span class="synSpecial">)</span>
        <span class="synConstant">&quot;Insufficient funds&quot;</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>deposit amount<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">set!</span> balance <span class="synSpecial">(</span><span class="synIdentifier">+</span> balance amount<span class="synSpecial">))</span>
    balance<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>login-error amount<span class="synSpecial">)</span> <span class="synConstant">&quot;Incorrect password&quot;</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>dispatch pass m<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> pass password<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> m <span class="synSpecial">'</span>withdraw<span class="synSpecial">)</span> withdraw<span class="synSpecial">)</span>
              <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> m <span class="synSpecial">'</span>deposit<span class="synSpecial">)</span> deposit<span class="synSpecial">)</span>
              <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown request: MAKE-ACCOUNT&quot;</span>
                           m<span class="synSpecial">)))</span>
        login-error<span class="synSpecial">))</span>
  dispatch<span class="synSpecial">)</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (define acc (make-account 100 &#39;secret-password))
acc
gosh&gt; ((acc &#39;secret-password &#39;withdraw) 50)
50
gosh&gt; ((acc &#39;some-password &#39;deposit) 40)
&#34;Incorrect password&#34;</pre>


