---
title: "SICP 問題 5.48"
published: 2016/02/10
tags:
  - scheme
  - SICP
---

<p>ECEVALのrepl上で<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%D1%A5%A4%A5%EB">コンパイル</a>出来るようにする．<br/>
これで動くかなって思ったら動いた．<br/>
ただトレースした命令列を見ると，<br/>
apply-dispatchからprimitive-procedureにジャンプせずに先頭に戻っている．<br/>
なぜそうなるのかわからない．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; 環境を拡張してprimitive-procedureとしてcompile-and-run を登録</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>setup-environment-with-compile<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>extend-environment
   <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>compile-and-run<span class="synSpecial">)</span>
   <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>primitive compile-and-run<span class="synSpecial">))</span>
   <span class="synSpecial">(</span>setup-environment<span class="synSpecial">)))</span>

<span class="synComment">;; setup-environment-with-compileの環境からecevalに入るようにする</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>compile-and-go expression<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>instructions
         <span class="synSpecial">(</span>assemble <span class="synSpecial">(</span>statements
                    <span class="synSpecial">(</span>compile expression <span class="synSpecial">'</span>val <span class="synSpecial">'</span>return <span class="synSpecial">'()))</span>
                   eceval<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">set!</span> the-global-environment <span class="synSpecial">(</span>setup-environment-with-compile<span class="synSpecial">))</span>
    <span class="synSpecial">(</span>set-register-contents! eceval <span class="synSpecial">'</span>val instructions<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>set-register-contents! eceval <span class="synSpecial">'</span>flag true<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>start eceval<span class="synSpecial">)))</span>

<span class="synComment">; ; and-goとは違い環境の初期設定はいらない．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>compile-and-run expression<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>instructions
         <span class="synSpecial">(</span>assemble <span class="synSpecial">(</span>statements
                    <span class="synSpecial">(</span>compile expression <span class="synSpecial">'</span>val <span class="synSpecial">'</span>return <span class="synSpecial">'()))</span>
                   eceval<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span>set-register-contents! eceval <span class="synSpecial">'</span>val instructions<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>set-register-contents! eceval <span class="synSpecial">'</span>flag true<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>start eceval<span class="synSpecial">)))</span>

<span class="synComment">;; 環境をwith-compileのほうにしてflagをfalseにしてからecevalに入る．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>start-eceval<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">set!</span> the-global-environment <span class="synSpecial">(</span>setup-environment-with-compile<span class="synSpecial">))</span>
  <span class="synSpecial">(</span>set-register-contents! eceval <span class="synSpecial">'</span>flag false<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>start eceval<span class="synSpecial">))</span>
</pre>


