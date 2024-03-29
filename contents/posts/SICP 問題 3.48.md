---
title: "SICP 問題 3.48"
published: 2015/12/06
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; make-accountの引数にidを追加．</span>
<span class="synComment">;; dispatchの引数に'numberで口座番号を参照できる．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-account-and-serializer balance id<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>withdraw amount<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">&gt;=</span> balance amount<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">begin</span> <span class="synSpecial">(</span><span class="synStatement">set!</span> balance <span class="synSpecial">(</span><span class="synIdentifier">-</span> balance amount<span class="synSpecial">))</span>
               balance<span class="synSpecial">)</span>
        <span class="synConstant">&quot;Insufficient funds&quot;</span><span class="synSpecial">))</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>deposit amount<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">set!</span> balance <span class="synSpecial">(</span><span class="synIdentifier">+</span> balance amount<span class="synSpecial">))</span>
    balance<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>balance-serializer <span class="synSpecial">(</span>make-serializer<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>dispatch m<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> m <span class="synSpecial">'</span>withdraw<span class="synSpecial">)</span> withdraw<span class="synSpecial">)</span>
            <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> m <span class="synSpecial">'</span>deposit<span class="synSpecial">)</span> deposit<span class="synSpecial">)</span>
            <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> m <span class="synSpecial">'</span>balance<span class="synSpecial">)</span> balance<span class="synSpecial">)</span>
            <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> m <span class="synSpecial">'</span>id<span class="synSpecial">)</span> id<span class="synSpecial">)</span>
            <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> m <span class="synSpecial">'</span>serializer<span class="synSpecial">)</span> balance-serializer<span class="synSpecial">)</span>
            <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown request: MAKE-ACCOUNT&quot;</span> m<span class="synSpecial">))))</span>
    dispatch<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>exchange account1 account2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>difference <span class="synSpecial">(</span><span class="synIdentifier">-</span> <span class="synSpecial">(</span>account1 <span class="synSpecial">'</span>balance<span class="synSpecial">)</span>
                       <span class="synSpecial">(</span>account2 <span class="synSpecial">'</span>balance<span class="synSpecial">))))</span>
    <span class="synSpecial">((</span>account1 <span class="synSpecial">'</span>withdraw<span class="synSpecial">)</span> difference<span class="synSpecial">)</span>
    <span class="synSpecial">((</span>account2 <span class="synSpecial">'</span>deposit<span class="synSpecial">)</span> difference<span class="synSpecial">)))</span>

<span class="synComment">;; 口座番号の小さいほうから先にserialize.</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>serialized-exchange account1 account2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>id1 <span class="synSpecial">(</span>account1 <span class="synSpecial">'</span>id<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>id2 <span class="synSpecial">(</span>account2 <span class="synSpecial">'</span>id<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>smaller <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">&lt;</span> id1 id2<span class="synSpecial">)</span> account1 account2<span class="synSpecial">))</span>
          <span class="synSpecial">(</span>bigger <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">&lt;</span> id1 id2<span class="synSpecial">))</span> account2 account1<span class="synSpecial">))</span>
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>serializer1 <span class="synSpecial">(</span>smaller <span class="synSpecial">'</span>serializer<span class="synSpecial">))</span>
            <span class="synSpecial">(</span>serializer2 <span class="synSpecial">(</span>bigger <span class="synSpecial">'</span>serializer<span class="synSpecial">)))</span>
        <span class="synSpecial">((</span>serializer2 <span class="synSpecial">(</span>serializer1 exchange<span class="synSpecial">))</span>
         account1 account2<span class="synSpecial">)))))</span>
</pre>


<p>smallerとbiggerへの束縛のいい方法がわからず<a class="keyword" href="http://d.hatena.ne.jp/keyword/twitter">twitter</a>で聞いたところ，</p>

<p><blockquote class="twitter-tweet"><p lang="ja" dir="ltr">R7RS (というか let-values が使える環境) ならこんな感じかなぁ。&#10;(let-values (((x y) (if (&lt; a b) (values a b) (values b a))))&#10;  body ...)</p>&mdash; 齊藤敦志 (@SaitoAtsushi) <a href="https://twitter.com/SaitoAtsushi/status/673495343506448384">December 6, 2015</a></blockquote><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script><cite class="hatena-citation"><a href="https://t.co/GfONknuk5e">t.co</a></cite></p>

<p>と教えていただいたので書き換えました．<br/>
二回比較するのが嫌だったんですよね．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; 口座番号の小さいほうから先にserialize.</span>
<span class="synSpecial">(</span>use srfi-11<span class="synSpecial">)</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>serialized-exchange account1 account2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>id1 <span class="synSpecial">(</span>account1 <span class="synSpecial">'</span>id<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>id2 <span class="synSpecial">(</span>account2 <span class="synSpecial">'</span>id<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span>let-values <span class="synSpecial">(</span>smaller bigger<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">&lt;</span> id1 id2<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synIdentifier">values</span> id1 id2<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synIdentifier">values</span> id2 id1<span class="synSpecial">))</span>
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>serializer1 <span class="synSpecial">(</span>smaller <span class="synSpecial">'</span>serializer<span class="synSpecial">))</span>
            <span class="synSpecial">(</span>serializer2 <span class="synSpecial">(</span>bigger <span class="synSpecial">'</span>serializer<span class="synSpecial">)))</span>
        <span class="synSpecial">((</span>serializer2 <span class="synSpecial">(</span>serializer1 exchange<span class="synSpecial">))</span>
         account1 account2<span class="synSpecial">)))))</span>
</pre>


