---
title: "RSPレジスタに対する勘違い"
published: 2021/09/16
---

<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/RSP">RSP</a><a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%EC%A5%B8%A5%B9%A5%BF">レジスタ</a>とスタックについて勘違いしていた。</p>

<p>スタックが下に伸びていくという話から実際のデータも大きいアドレスから小さいアドレスへと順に入っているとイメージしてしまっていた。<br />
このような状態では<a class="keyword" href="http://d.hatena.ne.jp/keyword/RSP">RSP</a><a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%EC%A5%B8%A5%B9%A5%BF">レジスタ</a>がスタックトップに入っているデータの先頭を指していると考えると、スタックトップよりも先にスタックトップが示すデータが入ってしまっている。<br />
仮にこのスタックに更にpushした場合、<a class="keyword" href="http://d.hatena.ne.jp/keyword/RSP">RSP</a>を進めるまえに、現在のスタックトップに入っているデータ分、<a class="keyword" href="http://d.hatena.ne.jp/keyword/RSP">RSP</a>を進める必要が出てしまい、現在のデータの大きさをどこかに保持していないとだめになってしまう。<br />
この状態でスタックの計算を考えていたため混乱してしまった。</p>

<p>実際にはデータはアドレスの小さいほうから大きいほうに向かって入っている。<br />
この場合<a class="keyword" href="http://d.hatena.ne.jp/keyword/RSP">RSP</a>が指すスタックトップはデータのある領域とデータのない領域の境目を指すことになる。<br />
変数のデータ領域を確保するために、<a class="keyword" href="http://d.hatena.ne.jp/keyword/RSP">RSP</a>を減算する時は変数のバイトサイズ分引くだけでよい。</p>

<p><span itemscope itemtype="http://schema.org/Photograph"><img src="https://cdn-ak.f.st-hatena.com/images/fotolife/w/wat-aro/20210916/20210916221321.png" alt="f:id:wat-aro:20210916221321p:plain" width="826" height="583" loading="lazy" title="" class="hatena-fotolife" itemprop="image"></span></p>

<p>低レイヤわからん</p>

