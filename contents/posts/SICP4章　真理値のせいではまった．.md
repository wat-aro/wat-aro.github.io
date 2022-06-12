---
title: "SICP4章　真理値のせいではまった．"
published: 2015/12/25
tags:
  - SICP
  - scheme
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">append</span> x y<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> x<span class="synSpecial">)</span>
      y
      <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> x<span class="synSpecial">)</span>
            <span class="synSpecial">(</span><span class="synIdentifier">append</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> x<span class="synSpecial">)</span> y<span class="synSpecial">))))</span>
</pre>


<p>これが動かなかったんですよ．<br/>
はじめはeval-sequenceで(first-exp exp)をevalしていなかったとかそういうのだったんですけど，<br/>
どうしても動かなくて．<br/>
debug printでも(null? x)が#fになってるのになぜかyが返ってくるんです．</p>

<p>eval-ifはtrue?で真偽が決まります．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>eval-if <span class="synIdentifier">exp</span> env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>true? <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>if-predicate <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">))</span>
      <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>if-consequent <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>if-alternative <span class="synIdentifier">exp</span><span class="synSpecial">)</span> env<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>true? x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> x <span class="synSpecial">'</span>false<span class="synSpecial">)))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>false? x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> x <span class="synSpecial">'</span>false<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>setup-environment<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>initial-env
         <span class="synSpecial">(</span>extend-environment <span class="synSpecial">(</span>primitive-procedure-names<span class="synSpecial">)</span>
                             <span class="synSpecial">(</span>primitive-procedure-objects<span class="synSpecial">)</span>
                             the-empty-environment<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span>define-variable! <span class="synSpecial">'</span>true true initial-env<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>define-variable! <span class="synSpecial">'</span>false false initial-env<span class="synSpecial">)</span>
    initial-env<span class="synSpecial">))</span>
</pre>


<p>散々迷ってここが原因だとわかりました．<br/>
<a class="keyword" href="http://d.hatena.ne.jp/keyword/SICP">SICP</a>では#tや#fじゃなくてtrue,falseになっています．<br/>
他のコードも統一するために</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> true <span class="synConstant">#t</span><span class="synSpecial">)</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> false <span class="synConstant">#f</span><span class="synSpecial">)</span>
</pre>


<p>としていたのが裏目にでました．<br/>
ここで作ったdebug printで#fとなっていてもこの評価器はtrueを返しているというややこしいことになっていました．<br/>
eval-ifも間違っていない．選択子も正しくできている．<br/>
null?も問題ない．(null? x)のxはきちんと'(a b c)に束縛されている．<br/>
可能性を全部潰してやっとここに行き着きました．<br/>
全部を#tと#fに統一してやっと解決しました．<br/>
これは辛かった．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>true? x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> x <span class="synSpecial">'</span><span class="synConstant">#f</span><span class="synSpecial">)))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>false? x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> x <span class="synSpecial">'</span><span class="synConstant">#f</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>setup-environment<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>initial-env
         <span class="synSpecial">(</span>extend-environment <span class="synSpecial">(</span>primitive-procedure-names<span class="synSpecial">)</span>
                             <span class="synSpecial">(</span>primitive-procedure-objects<span class="synSpecial">)</span>
                             the-empty-environment<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span>define-variable! <span class="synSpecial">'</span><span class="synConstant">#t</span> <span class="synConstant">#t</span> initial-env<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>define-variable! <span class="synSpecial">'</span><span class="synConstant">#f</span> <span class="synConstant">#f</span> initial-env<span class="synSpecial">)</span>
    initial-env<span class="synSpecial">))</span>
</pre>


<p>超循環評価器はこういう時厳しいですね．</p>

