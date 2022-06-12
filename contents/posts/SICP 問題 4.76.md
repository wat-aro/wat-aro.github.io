---
title: "SICP 問題 4.76"
published: 2016/01/21
tags:
  - scheme
  - SICP
---

<p>本文中のandはひとつ目の質問を満たす表明に対して次の質問を満たす表明をデータベースから探してくる．<br/>
それを２つの質問をそれぞれ満たすストリームをまず作り，<br/>
矛盾がないようにそれらを組み合わせるconjoin特殊形式を実装する．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>conjoin conjuncts frame-stream<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>empty-conjunction? conjuncts<span class="synSpecial">)</span>
      frame-stream
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>first <span class="synSpecial">(</span>qeval <span class="synSpecial">(</span>first-conjunct conjuncts<span class="synSpecial">)</span> frame-stream<span class="synSpecial">))</span>
            <span class="synSpecial">(</span>rest <span class="synSpecial">(</span>conjoin <span class="synSpecial">(</span>rest-conjuncts conjuncts<span class="synSpecial">)</span> frame-stream<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span>conjoin-frame-stream first rest<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>conjoin-frame-stream fs1 fs2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>stream-filter
   <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>frame<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> frame <span class="synSpecial">'</span>failed<span class="synSpecial">)))</span>
   <span class="synSpecial">(</span>stream-flatmap
    <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>frame1<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>stream-map
       <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>frame2<span class="synSpecial">)</span> <span class="synSpecial">(</span>conjoin-consistent frame1 frame2<span class="synSpecial">))</span>
       fs2<span class="synSpecial">))</span>
    fs1<span class="synSpecial">)))</span>


<span class="synComment">;; f2をフレームと考え，f1のvarがf2にあるかを調べる．</span>
<span class="synComment">;; f2にあってf1のvarの値と同じならOK．違えばfailed.なければf2を拡張する．</span>
<span class="synComment">;; 上記手順はexend-if-possibleがやる．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>conjoin-consistent f1 f2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> f1<span class="synSpecial">)</span> f2
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>extend-frame2 <span class="synSpecial">(</span>extend-if-possible <span class="synSpecial">(</span><span class="synIdentifier">caar</span> f1<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdar</span> f1<span class="synSpecial">)</span> f2<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> extend-frame2 <span class="synSpecial">'</span>failed<span class="synSpecial">)</span>
            <span class="synSpecial">'</span>failed
            <span class="synSpecial">(</span>conjoin-consistent <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> f1<span class="synSpecial">)</span> extend-frame2<span class="synSpecial">)))))</span>

<span class="synSpecial">(</span>put <span class="synSpecial">'</span>and <span class="synSpecial">'</span>qeval conjoin<span class="synSpecial">)</span>

<span class="synComment">;; 本文で定義されたextend-if-possible</span>
<span class="synComment">;; (? x)が値を指していればその値を返す．(? y)となっていれば，さらにその値を探す．</span>
<span class="synComment">;; varもvalも(? x)同じものを指していればfailedが返る．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>extend-if-possible var val frame<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>binding <span class="synSpecial">(</span>binding-in-frame var frame<span class="synSpecial">)))</span> <span class="synComment">;フレームからvarに対応するvalを探して束縛</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">(</span>binding
           <span class="synSpecial">(</span>unify-match <span class="synSpecial">(</span>binding-value binding<span class="synSpecial">)</span> val frame<span class="synSpecial">))</span>
          <span class="synComment">;; 上のletで探してきたvalもまた(? y)という形だった場合は更にフレームから探してくる．</span>
          <span class="synSpecial">((</span>var? val<span class="synSpecial">)</span>
           <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>binding <span class="synSpecial">(</span>binding-in-frame val frame<span class="synSpecial">)))</span>
             <span class="synSpecial">(</span><span class="synStatement">if</span> binding
                 <span class="synSpecial">(</span>unify-match var <span class="synSpecial">(</span>binding-value binding<span class="synSpecial">)</span> frame<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span>extend var val frame<span class="synSpecial">))))</span> <span class="synComment">;見つからなければフレームを拡張</span>
          <span class="synSpecial">((</span>depends-on? val var frame<span class="synSpecial">)</span>     <span class="synComment">;valとvarが同じく(? x)だった場合はfailed</span>
           <span class="synSpecial">'</span>failed<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>extend var val frame<span class="synSpecial">)))))</span>
</pre>


