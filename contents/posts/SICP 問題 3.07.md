---
title: "SICP 問題 3.07"
published: 2015/11/07
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

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-joint account password new-account-password<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>dispatch entered-pass m<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> entered-pass new-account-password<span class="synSpecial">)</span>
        <span class="synSpecial">(</span>account password m<span class="synSpecial">)</span>
        <span class="synConstant">&quot;Incorrect password&quot;</span><span class="synSpecial">))</span>
  dispatch<span class="synSpecial">)</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (define peter-acc
  (make-account 100 &#39;open-sesame))
peter-acc
gosh&gt; (define paul-acc
  (make-joint peter-acc &#39;open-sesame &#39;rosebud))
paul-acc
gosh&gt; ((paul-acc &#39;rosebud &#39;deposit) 30)
130
gosh&gt; ((paul-acc &#39;rosebud &#39;withdraw) 50)
80
gosh&gt; ((peter-acc &#39;open-sesame &#39;withdraw) 50)
30</pre>


<p>意図したように動いてくれてます．<br/>
paul-accで 80まで減らしてpeterが50引き出すと残り30ってことは両方のアカウントが同じものを指してるってことですからね．<br/>
ただdefineで口座の指定をすると参照先のアカウントのパスワードが間違ってた場合に,make-jointする時点でエラー返したいですよね．<br/>
このやりかたじゃそれができないっていうのが気になります．</p>

