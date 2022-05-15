---
title: ブログを移転しました
published: '2022/05/15'
---

https://wat-aro.hatenablog.com/ のブログを移転。
`github.io` 用にドメインは前から取得していたが、やっとサイトを作成する気になった。
今後はこちらに書いていくつもり。

使用技術は

- Next.js
- TypeScript
- Tailwind CSS
- github.io

Next.js の開発体験はいいね。  
あまり難しいことはやらないつもりだけど、 `webassembly` まわりの何かを仕込んでみたい。  
残作業は

- 旧ブログのデータのインポート
- OGP の設定
- reveal.js で書いたスライドをこのサイトで表示できるようにする

### 旧ブログのデータのインポート

はてなブログは `Movable Type` でデータをエクスポートできる。  
これを `markdown` に変換して移行する予定。  
`Rust` の練習にちょうどいいかなーと思ってる。

### OGP の設定

[puppeteer](https://github.com/puppeteer/puppeteer) を使う予定。  
`next export` を叩く前に `markdown` のファイルごとにスクリーンショットを取ればいけるかと。  
若干めんどくさくなっているが、最後まで頑張ろう。

### reveal.js で書いたスライドをこのサイトで表示できるようにする

プロフィールにリンクはあるけれど、これを `Next.js` で管理できるようにしたい。  
しばらくは [About](https://wat-aro.dev/about) に書いたままにする。

### 最後に

数年まともにブログを書いてこなかったので今後はちゃんと書いていくつもり。  
やるぞ！
