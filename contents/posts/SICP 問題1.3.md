---
title: "SICP 問題1.3"
published: 2015/10/03
tags:
  - scheme
---

<p>1.3  三つの数を引数としてとり，大きい二つの数の事情の話を返す手続きを書け<br/>
　<br/>
答えはa<sup>2</sup> + b<sup>2</sup>, b<sup>2</sup> + c<sup>2</sup>, c<sup>2</sup> + a<sup>2</sup>の３通りがあるのでその分け方をもとに書く</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>sum-of-squares-large2 a b c<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synStatement">or</span> <span class="synSpecial">(</span><span class="synIdentifier">&lt;=</span> a b c<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">&lt;=</span> a c b<span class="synSpecial">))</span>
         <span class="synSpecial">(</span>sum-of-squares b c<span class="synSpecial">))</span>
        <span class="synSpecial">((</span><span class="synStatement">or</span> <span class="synSpecial">(</span><span class="synIdentifier">&lt;=</span> b a c<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">&lt;=</span> b c a<span class="synSpecial">))</span>
         <span class="synSpecial">(</span>sum-of-squares a c<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>sum-of-squares a c<span class="synSpecial">))))</span>
</pre>


