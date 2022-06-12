---
title: "SICP 問題 4.30"
published: 2016/01/08
tags:
  - scheme
  - SICP
---

<p>並びの中の式は最後まで評価されないのではないかというCy D. Fectの心配に答える．</p>

<p>a</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; 元のeval-sequence</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>eval-sequence exps env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>last-exp? exps<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>first-exp exps<span class="synSpecial">)</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>first-exp exps<span class="synSpecial">)</span> env<span class="synSpecial">)</span>
              <span class="synSpecial">(</span>eval-sequence <span class="synSpecial">(</span>rest-exps exps<span class="synSpecial">)</span> env<span class="synSpecial">))))</span>

<span class="synComment">;; Cy D.Fectが提案したeval-sequence</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>eval-sequence exps env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>last-exp? exps<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>first-exp exps<span class="synSpecial">)</span> env<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>actual-value <span class="synSpecial">(</span>first-exp exps<span class="synSpecial">)</span> env<span class="synSpecial">)</span>
              <span class="synSpecial">(</span>eval-sequence <span class="synSpecial">(</span>rest-exps exps<span class="synSpecial">)</span> env<span class="synSpecial">))))</span>
</pre>




<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">for-each</span> proc items<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> items<span class="synSpecial">)</span>
      <span class="synSpecial">'</span>done
      <span class="synSpecial">(</span><span class="synStatement">begin</span> <span class="synSpecial">(</span>proc <span class="synSpecial">(</span><span class="synIdentifier">car</span> items<span class="synSpecial">))</span>
             <span class="synSpecial">(</span><span class="synIdentifier">for-each</span> proc <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> items<span class="synSpecial">)))))</span>

<span class="synComment">;;; M-Eval value:</span>
ok

<span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span><span class="synIdentifier">for-each</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">newline</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">display</span> x<span class="synSpecial">))</span>
          <span class="synSpecial">'(</span><span class="synConstant">57</span> <span class="synConstant">321</span> <span class="synConstant">88</span><span class="synSpecial">))</span>

<span class="synConstant">57</span>
<span class="synConstant">321</span>
<span class="synConstant">88</span>
<span class="synComment">;;; M-Eval value:</span>
done
</pre>


<p>初めのbeginで以下の式になる．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">begin</span> <span class="synSpecial">((</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">newline</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">display</span> x<span class="synSpecial">))</span> <span class="synConstant">57</span><span class="synSpecial">)</span>
       <span class="synSpecial">(</span><span class="synIdentifier">for-each</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">newline</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">display</span> x<span class="synSpecial">))</span>
                 <span class="synSpecial">'(</span><span class="synConstant">321</span> <span class="synConstant">88</span><span class="synSpecial">)))</span>
</pre>


<p>beginの一つ目の式では(newline)はそのままevalされてM-Eval inputに空行が印字される．
二つ目の式は(display x)で，このxに(thunk 57)が入るが，displayは基本式なのでforceされ57になる．
そして57が印字される．
これを繰り返すのでfor-eachは正しく動く.
　<br/>
b</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>p1 x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">set!</span> x <span class="synSpecial">(</span><span class="synIdentifier">cons</span> x <span class="synSpecial">'(</span><span class="synConstant">2</span><span class="synSpecial">)))</span>
  x<span class="synSpecial">)</span>

<span class="synComment">;;; M-Eval value:</span>
ok

<span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>p2 x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>p e<span class="synSpecial">)</span>
    e
    x<span class="synSpecial">))</span>

<span class="synComment">;;; M-Eval value:</span>
ok

<span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>p2 x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>p e<span class="synSpecial">)</span>
    e
    x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>p <span class="synSpecial">(</span><span class="synStatement">set!</span> x <span class="synSpecial">(</span><span class="synIdentifier">cons</span> x <span class="synSpecial">'(</span><span class="synConstant">2</span><span class="synSpecial">)))))</span>

<span class="synComment">;;; M-Eval value:</span>
ok
</pre>


<p>本文のeval-sequenceではp1のset!は基本手続きなので実行される．<br/>
p2のpは複合手続きなので遅延され実行されない．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span>p1 <span class="synConstant">1</span><span class="synSpecial">)</span>

<span class="synComment">;;; M-Eval value:</span>
<span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synConstant">2</span><span class="synSpecial">)</span>

<span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span>p2 <span class="synConstant">1</span><span class="synSpecial">)</span>
</pre>


<p>Cyの提案するeval-sequenceの場合</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span>p1 <span class="synConstant">1</span><span class="synSpecial">)</span>

<span class="synComment">;;; M-Eval value:</span>
<span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synConstant">2</span><span class="synSpecial">)</span>

<span class="synComment">;;; M-Eval input:</span>
<span class="synSpecial">(</span>p2 <span class="synConstant">1</span><span class="synSpecial">)</span>

<span class="synComment">;;; M-Eval value:</span>
<span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synConstant">2</span><span class="synSpecial">)</span>
</pre>


<p>c
aでやったfor-eachの振る舞いはCyのeval-sequenceでも変わらない．
aの式では基本手続きを使うために遅延されない．
Cyの式では強制的に評価するため遅延されない．</p>

<p>d
ググってみた感じでは直列化して，最後の式が必要になったタイミングで他の式も強制的に評価するのがいいと思いました．
読んだのはこちら↓</p>

<p><iframe src="//hatenablog-parts.com/embed?url=http%3A%2F%2Fd.hatena.ne.jp%2Fleque%2F20101202%2Fp1" title=" CSNagoya SICP 読書会: ex. 4.30 d., 4.31 - 月の塵" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="http://d.hatena.ne.jp/leque/20101202/p1">d.hatena.ne.jp</a></cite></p>

