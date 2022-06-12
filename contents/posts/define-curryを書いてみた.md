---
title: "define-curryを書いてみた"
published: 2016/01/06
tags:
  - scheme
---

<p>カリー化や部分適用の話が<a class="keyword" href="http://d.hatena.ne.jp/keyword/Twitter">Twitter</a>で流れてきたのでマクロの練習として書いてみました．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; lambda式を引数に取り，カリー化されたlambda式を返す</span>
<span class="synComment">;; いらなかった</span>
<span class="synComment">;; (define-syntax curry</span>
<span class="synComment">;;   (syntax-rules (lambda) ;; 修正</span>
<span class="synComment">;;     [(_ (lambda (arg) body ...))</span>
<span class="synComment">;;      (lambda (arg) body ...)]</span>
<span class="synComment">;;     [(_ (lambda (first rest ...) body ...))</span>
<span class="synComment">;;      (lambda (first) (curry (lambda (rest ...) body ...)))]))</span>

<span class="synSpecial">(</span><span class="synStatement">define-syntax</span> lambda-curry
  <span class="synSpecial">(</span><span class="synStatement">syntax-rules</span> <span class="synSpecial">()</span>
    <span class="synSpecial">[(</span>_ <span class="synSpecial">()</span> body ...<span class="synSpecial">)</span>
     <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">()</span> body ...<span class="synSpecial">)]</span> <span class="synComment">;; 修正：引数が０個の手続きに対応</span>
    <span class="synSpecial">[(</span>_ <span class="synSpecial">(</span>arg<span class="synSpecial">)</span> body ...<span class="synSpecial">)</span>
     <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>arg<span class="synSpecial">)</span> body ...<span class="synSpecial">)]</span>
    <span class="synSpecial">[(</span>_ <span class="synSpecial">(</span>first rest ...<span class="synSpecial">)</span> body ...<span class="synSpecial">)</span>
     <span class="synSpecial">(</span><span class="synStatement">letrec</span> <span class="synSpecial">((</span>func <span class="synSpecial">(</span>case-lambda
                     <span class="synSpecial">[()</span> func<span class="synSpecial">]</span>
                     <span class="synSpecial">[(</span>arg<span class="synSpecial">)</span> <span class="synSpecial">((</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>first<span class="synSpecial">)</span> <span class="synSpecial">(</span>lambda-curry <span class="synSpecial">(</span>rest ...<span class="synSpecial">)</span> body ...<span class="synSpecial">))</span> arg<span class="synSpecial">)]</span>
                     <span class="synSpecial">[</span>args <span class="synSpecial">((</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>first<span class="synSpecial">)</span>
                              <span class="synSpecial">(</span><span class="synIdentifier">apply</span> <span class="synSpecial">(</span>lambda-curry <span class="synSpecial">(</span>rest ...<span class="synSpecial">)</span> body ...<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> args<span class="synSpecial">)))</span>
                            <span class="synSpecial">(</span><span class="synIdentifier">car</span> args<span class="synSpecial">))])))</span>
       func<span class="synSpecial">)]))</span> <span class="synComment">;;このfuncがなくてもなぜか動く．</span>

<span class="synSpecial">(</span><span class="synStatement">define-syntax</span> define-curry
  <span class="synSpecial">(</span><span class="synStatement">syntax-rules</span> <span class="synSpecial">()</span>
    <span class="synComment">;; lambda-curryが0引数に対応したのでいらない</span>
    <span class="synComment">;; [(_ (func-name) body ...)</span>
    <span class="synComment">;;  (define (func-name) body ...)]</span>
    <span class="synSpecial">[(</span>_ <span class="synSpecial">(</span>func-name args ...<span class="synSpecial">)</span> body ...<span class="synSpecial">)</span>
     <span class="synSpecial">(</span><span class="synStatement">define</span> func-name <span class="synSpecial">(</span>lambda-curry <span class="synSpecial">(</span>args ...<span class="synSpecial">)</span> body ...<span class="synSpecial">))]</span>
    <span class="synSpecial">[(</span>_ var val<span class="synSpecial">)</span>
     <span class="synSpecial">(</span><span class="synStatement">define</span> var val<span class="synSpecial">)]))</span>
</pre>


<p>　<br/>
清書</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define-syntax</span> lambda-curry
  <span class="synSpecial">(</span><span class="synStatement">syntax-rules</span> <span class="synSpecial">()</span>
    <span class="synSpecial">((</span>_ <span class="synSpecial">()</span> b0 b1 ...<span class="synSpecial">)</span>
     <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">()</span> b0 b1 ...<span class="synSpecial">))</span>
    <span class="synSpecial">((</span>_ <span class="synSpecial">(</span>arg<span class="synSpecial">)</span> b0 b1 ...<span class="synSpecial">)</span>
     <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>arg<span class="synSpecial">)</span> b0 b1 ...<span class="synSpecial">))</span>
    <span class="synSpecial">((</span>_ <span class="synSpecial">(</span>first rest ...<span class="synSpecial">)</span> b0 b1 ...<span class="synSpecial">)</span>
     <span class="synSpecial">(</span><span class="synStatement">letrec</span> <span class="synSpecial">((</span>func <span class="synSpecial">(</span>case-lambda
                     <span class="synSpecial">(()</span> func<span class="synSpecial">)</span>
                     <span class="synSpecial">((</span>arg<span class="synSpecial">)</span> <span class="synSpecial">((</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>first<span class="synSpecial">)</span> <span class="synSpecial">(</span>lambda-curry <span class="synSpecial">(</span>rest ...<span class="synSpecial">)</span> b0 b1 ...<span class="synSpecial">))</span> arg<span class="synSpecial">))</span>
                     <span class="synSpecial">(</span>args <span class="synSpecial">((</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>first<span class="synSpecial">)</span>
                              <span class="synSpecial">(</span><span class="synIdentifier">apply</span> <span class="synSpecial">(</span>lambda-curry <span class="synSpecial">(</span>rest ...<span class="synSpecial">)</span> b0 b1 ...<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> args<span class="synSpecial">)))</span>
                            <span class="synSpecial">(</span><span class="synIdentifier">car</span> args<span class="synSpecial">))))))</span>
       func<span class="synSpecial">))))</span> <span class="synComment">;;このfuncがなくてもなぜか動く．</span>

<span class="synSpecial">(</span><span class="synStatement">define-syntax</span> define-curry
  <span class="synSpecial">(</span><span class="synStatement">syntax-rules</span> <span class="synSpecial">()</span>
    <span class="synSpecial">((</span>_ <span class="synSpecial">(</span>func-name args ...<span class="synSpecial">)</span> b0 b1 ...<span class="synSpecial">)</span>
     <span class="synSpecial">(</span><span class="synStatement">define</span> func-name <span class="synSpecial">(</span>lambda-curry <span class="synSpecial">(</span>args ...<span class="synSpecial">)</span> b0 b1 ...<span class="synSpecial">)))</span>
    <span class="synSpecial">((</span>_ var val<span class="synSpecial">)</span>
     <span class="synSpecial">(</span><span class="synStatement">define</span> var val<span class="synSpecial">))))</span>
</pre>


<p>test</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span><span class="synStatement">define</span> f <span class="synSpecial">(</span>lambda-curry <span class="synSpecial">(</span>a b<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">/</span> a b<span class="synSpecial">)))</span>
f
gosh&gt; <span class="synSpecial">(</span>f <span class="synConstant">1</span> <span class="synConstant">2</span><span class="synSpecial">)</span>
<span class="synConstant">1/2</span>
gosh&gt; <span class="synSpecial">(</span><span class="synStatement">define</span> g <span class="synSpecial">(</span>lambda-curry <span class="synSpecial">(</span>a b c<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> a b c<span class="synSpecial">)))</span>
g
gosh&gt; <span class="synSpecial">(</span>g <span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span><span class="synSpecial">)</span>
<span class="synConstant">6</span>
gosh&gt; <span class="synError">#&lt;undef&gt;</span>
gosh&gt; <span class="synSpecial">(</span><span class="synStatement">define</span> f <span class="synSpecial">(</span>lambda-curry <span class="synSpecial">(</span>a b<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">/</span> a b<span class="synSpecial">)))</span>
f
gosh&gt; <span class="synSpecial">(</span>f <span class="synConstant">1</span> <span class="synConstant">2</span><span class="synSpecial">)</span>
<span class="synConstant">1/2</span>
gosh&gt; <span class="synError">#&lt;undef&gt;</span>
gosh&gt; <span class="synSpecial">(</span>define-curry <span class="synSpecial">(</span>f a b<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">/</span> a b<span class="synSpecial">))</span>
f
gosh&gt; <span class="synSpecial">(</span>f <span class="synConstant">1</span><span class="synSpecial">)</span>
<span class="synError">#&lt;closure</span> <span class="synSpecial">(</span><span class="synConstant">#f</span> <span class="synConstant">#f</span><span class="synSpecial">)</span><span class="synIdentifier">&gt;</span>
gosh&gt; <span class="synSpecial">((</span>f <span class="synConstant">1</span><span class="synSpecial">)</span> <span class="synConstant">2</span><span class="synSpecial">)</span>
<span class="synConstant">1/2</span>
gosh&gt; <span class="synSpecial">(</span>f <span class="synConstant">1</span> <span class="synConstant">2</span><span class="synSpecial">)</span>
<span class="synConstant">1/2</span>
gosh&gt; <span class="synSpecial">(</span>define-curry <span class="synSpecial">(</span>g a b c<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> a b c<span class="synSpecial">))</span>
g
gosh&gt; <span class="synSpecial">(</span>g <span class="synConstant">1</span><span class="synSpecial">)</span>
<span class="synError">#&lt;closure</span> <span class="synSpecial">(</span><span class="synConstant">#f</span> <span class="synConstant">#f</span><span class="synSpecial">)</span><span class="synIdentifier">&gt;</span>
gosh&gt; <span class="synSpecial">((</span>g <span class="synConstant">1</span><span class="synSpecial">)</span> <span class="synConstant">2</span><span class="synSpecial">)</span>
<span class="synError">#&lt;closure</span> <span class="synSpecial">(</span><span class="synConstant">#f</span> <span class="synConstant">#f</span> <span class="synConstant">#f</span><span class="synSpecial">)</span><span class="synIdentifier">&gt;</span>
gosh&gt; <span class="synSpecial">(((</span>g <span class="synConstant">1</span><span class="synSpecial">)</span> <span class="synConstant">2</span> <span class="synSpecial">)</span> <span class="synConstant">3</span><span class="synSpecial">)</span>
<span class="synConstant">6</span>
gosh&gt; <span class="synSpecial">((</span>g <span class="synConstant">1</span><span class="synSpecial">)</span> <span class="synConstant">2</span> <span class="synConstant">3</span><span class="synSpecial">)</span>
<span class="synConstant">6</span>
gosh&gt; <span class="synSpecial">((</span>g <span class="synConstant">1</span> <span class="synConstant">2</span><span class="synSpecial">)</span> <span class="synConstant">3</span><span class="synSpecial">)</span>
<span class="synConstant">6</span>
gosh&gt; <span class="synSpecial">(</span>g <span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span><span class="synSpecial">)</span>
<span class="synConstant">6</span>
</pre>


<p>修正1
<blockquote class="twitter-tweet" lang="HASH(0xa7a3470)"><p lang="ja" dir="ltr">curry の定義は (syntax-rules (lambda) ...) にしないと (curry (foo (x) x)) とかでも動いてしましそう&#10;<a href="https://t.co/DUJHFogOQg">https://t.co/DUJHFogOQg</a></p>&mdash; でこれき (@dico_leque) <a href="https://twitter.com/dico_leque/status/684596402043813888">January 6, 2016</a></blockquote><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
　<br/>
　<br/>
修正2</p>

<p><blockquote class="twitter-tweet" lang="HASH(0xa7a3470)"><p lang="ja" dir="ltr">引数がゼロ個の手続きはこのマクロでは作れないな。&#10;(lambda-curry () (* 1 2)) みたいなの。&#10;それができたからといって使いどころもないけど。</p>&mdash; 齊藤敦志 (@SaitoAtsushi) <a href="https://twitter.com/SaitoAtsushi/status/684595362833694720">January 6, 2016</a></blockquote><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script></p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span>lambda-curry <span class="synSpecial">()</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synConstant">1</span> <span class="synConstant">2</span><span class="synSpecial">))</span>
<span class="synError">#&lt;closure</span> <span class="synError">#f&gt;</span>
gosh&gt; <span class="synSpecial">((</span>lambda-curry <span class="synSpecial">()</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synConstant">1</span> <span class="synConstant">2</span><span class="synSpecial">)))</span>
<span class="synConstant">3</span>
</pre>


<p>　<br/>
修正3
<blockquote class="twitter-tweet" lang="HASH(0xa7a3470)"><p lang="ja" dir="ltr">lambda-curryのletrecは要らない気がする。define-curryの最初のパターンもlambda-curryが0引数対応したなら要らない気がする。 <a href="https://t.co/h4ClDCC5ev">https://t.co/h4ClDCC5ev</a></p>&mdash; Kei (@tk_riple) <a href="https://twitter.com/tk_riple/status/684665486274093056">January 6, 2016</a></blockquote><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script></p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span><span class="synStatement">define</span> f <span class="synSpecial">(</span>lambda-curry <span class="synSpecial">(</span>a b<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">/</span> a b<span class="synSpecial">)))</span>
f
gosh&gt; <span class="synSpecial">(</span>f <span class="synConstant">1</span> <span class="synConstant">2</span><span class="synSpecial">)</span>
<span class="synConstant">1/2</span>
gosh&gt; <span class="synSpecial">((</span>f <span class="synConstant">3</span><span class="synSpecial">)</span> <span class="synConstant">4</span><span class="synSpecial">)</span>
<span class="synConstant">3/4</span>
gosh&gt; <span class="synSpecial">(</span>define-curry <span class="synSpecial">(</span>f<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synConstant">1</span> <span class="synConstant">1</span><span class="synSpecial">))</span>
f
gosh&gt; <span class="synSpecial">(</span>f<span class="synSpecial">)</span>
<span class="synConstant">2</span>
</pre>


