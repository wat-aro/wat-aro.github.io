---
title: "プログラミングGauche 14.3.2練習問題"
published: 2015/09/22
tags:
  - scheme
  - gauche
  - scheme
  - gauche
---

<p><code>call-with-input-string</code>と<code>call-with-output-string</code>を使って<code>write-to-string</code>と<code>read-drom-string</code>を実装する．<br/>
ポートの挙動がよくわかってなかったので苦戦した．<br/>
こういう時にREPLはありがたい．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>write-to-string arg<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>call-with-output-string <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>port<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">write</span> arg port<span class="synSpecial">))))</span>


<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>read-from-string <span class="synIdentifier">string</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span>call-with-input-string <span class="synIdentifier">string</span> <span class="synIdentifier">read</span><span class="synSpecial">))</span>
</pre>


