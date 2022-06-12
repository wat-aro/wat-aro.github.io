---
title: "varとvalを間違えてはまった話"
published: 2015/12/23
tags:
  - scheme
  - SICP
---

<p>ちょっとしたミスにかなり時間取られました．<br/>
スコープがどうなってるか調べようと色々手続き作ろうしていたらよくわからないエラーが出てしまい．<br/>
はじめはappって名前のlambda式をdefineするとエラーが出るっていうよくわからない症状で．<br/>
途中でmy-applyからのエラーだとわかり，その後，何度か環境を評価し直したりしていて，
同じ変数名でdefineした時に正しくvalueが環境に保存されていないことに気付きました．<br/>
下に書いたようにvarとvalの違いが原因でした．<br/>
これのせいで二時間くらい取られました．<br/>
環境の中を覗いても，何が期待した状態なのかをなかなか読み取れなかったのも時間がかかった原因の一つですね．<br/>
自分のために残しておきます．<br/>
でもまだこの段階で気付けてよかったです．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>define-variable! var val env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>frame <span class="synSpecial">(</span>first-frame env<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>target <span class="synSpecial">(</span>scan var <span class="synSpecial">(</span>frame-variables frame<span class="synSpecial">)</span> <span class="synSpecial">(</span>frame-values frame<span class="synSpecial">)</span>
                        <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>var vars vals<span class="synSpecial">)</span> vals<span class="synSpecial">))))</span>
      <span class="synSpecial">(</span><span class="synStatement">if</span> target
          <span class="synSpecial">(</span><span class="synIdentifier">set-car!</span> target var<span class="synSpecial">)</span>  <span class="synComment">;;ここのvarが間違い</span>
          <span class="synSpecial">(</span>add-binding-to-frame! var val frame<span class="synSpecial">)))))</span>
</pre>




<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>define-variable! var val env<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>frame <span class="synSpecial">(</span>first-frame env<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>target <span class="synSpecial">(</span>scan var <span class="synSpecial">(</span>frame-variables frame<span class="synSpecial">)</span> <span class="synSpecial">(</span>frame-values frame<span class="synSpecial">)</span>
                        <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>var vars vals<span class="synSpecial">)</span> vals<span class="synSpecial">))))</span>
      <span class="synSpecial">(</span><span class="synStatement">if</span> target
          <span class="synSpecial">(</span><span class="synIdentifier">set-car!</span> target val<span class="synSpecial">)</span> <span class="synComment">;; valに修正</span>
          <span class="synSpecial">(</span>add-binding-to-frame! var val frame<span class="synSpecial">)))))</span>
</pre>


