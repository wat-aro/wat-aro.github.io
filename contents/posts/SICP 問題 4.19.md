---
title: "SICP 問題 4.19"
published: 2015/12/26
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>a <span class="synConstant">1</span><span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>f x<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synStatement">define</span> b <span class="synSpecial">(</span><span class="synIdentifier">+</span> a x<span class="synSpecial">))</span>
          <span class="synSpecial">(</span><span class="synStatement">define</span> a <span class="synConstant">5</span><span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synIdentifier">+</span> a b<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>f <span class="synConstant">10</span><span class="synSpecial">))</span>
</pre>


<p>これを同時定義する方法．<br/>
delayとforceを使えばできそうだけどと考えました．<br/>
内部定義が変数を定義しているときは値をdelayで包んで，<br/>
って考えたんですけど，評価する段階で今の実装じゃ無理だと思い諦めました．<br/>
その後<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B0%A5%B0%A4%EB">ググる</a>と下でも同じような考察が．</p>

<p><a href="http://practical-scheme.net/wiliki/wiliki.cgi?Scheme%3A%E5%86%85%E9%83%A8define%E3%81%AE%E8%A9%95%E4%BE%A1%E9%A0%86">http://practical-scheme.net/wiliki/wiliki.cgi?Scheme%3A%E5%86%85%E9%83%A8define%E3%81%AE%E8%A9%95%E4%BE%A1%E9%A0%86</a></p>

