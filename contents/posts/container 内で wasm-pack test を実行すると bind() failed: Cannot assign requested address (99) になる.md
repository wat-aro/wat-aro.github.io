---
title: "container 内で wasm-pack test を実行すると bind() failed: Cannot assign requested address (99) になる"
published: 2021/08/25
---

<p>wasm-pack を使える Docker 環境を作成し、その中で<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%C1%A5%E5%A1%BC%A5%C8%A5%EA%A5%A2%A5%EB">チュートリアル</a>をしていたところ、タイトルのようなエラーが出て <code>wasm-pack test</code> が実行できなかった。<br />
このコンテナでは rust, wasm-pack, npm が使えるだけの状態で、コンテナ内に <a class="keyword" href="http://d.hatena.ne.jp/keyword/Chrome">Chrome</a> がインストールされていないことが原因だった。<br />
Dockerfile に <code>google-chrome-stable</code> を追加すると無事実行できるようになりました。</p>

<pre class="code lang-diff" data-lang="diff" data-unlink><span class="synSpecial">-RUN apt-get update -qq \</span>
<span class="synSpecial">- &amp;&amp; apt-get install -y libnss3</span>
<span class="synIdentifier">+RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add \</span>
<span class="synIdentifier">+  &amp;&amp; echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main' | tee /etc/apt/sources.list.d/google-chrome.list \</span>
<span class="synIdentifier">+  &amp;&amp; apt-get update -qq \</span>
<span class="synIdentifier">+  &amp;&amp; apt-get install -y google-chrome-stable libnss3 libgconf-2-4</span>
</pre>


<p>chromedriver が <a class="keyword" href="http://d.hatena.ne.jp/keyword/ipv6">ipv6</a> の subnet を探しているんじゃないかなどかなり回り道をしてしまった</p>

