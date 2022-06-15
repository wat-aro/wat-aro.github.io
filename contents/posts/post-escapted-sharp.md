---
title: Next.js で URL に#を含むページを作成する
published: 2022/06/14
tags:
  - Next.js
---

## tl;dr

next.js で `#` が含まれた static page のリンクは `#` でなく `%2325` にする必要がある。
アクセスできるようになったが、そもそも URL に `#` を入れないのがよい。

## 事象

はてなブログからの記事を移行する際に、記事のタイトルを markdown のファイル名にしていた。
`/posts/Array#slice.md` を元に出力した `/posts/Arrray#slice` ページにアクセスしようとすると 404 になってしまう。

## 環境

- Next.js

## 解決策

普通に `#` だけをパーセントエンコーディングしてリンクを生成したところ、 `next dev` で実行する際はうまくいったが、 `next export` してデプロイするとアクセスできない。
実際に `Next.js` が出力した html を見てみると ファイル名の `#` が html のファイル名の時点で `%25` に変換されていた。
https://github.com/wat-aro/wat-aro.github.io/blob/47a30b9d9a1d03154b7934bfde91f3809b2006cc/posts/Array%2523slice.html

アクセスする際のリンクが `/posts/Array%25slice` だとうまくいかないのはこのせいだった。
html 自体が `/posts/Array%25slice` に配置されているので、ここへアクセスするためには `%25` をさらにパーセントエンコーディングしないといけない。
URL を生成する際に `#` を `%2325` に変換すると `next export` した際にきちんと動くようになった :smile:

しかし、 `next dev` ではうごかない。
`next export` -> `#` が変換された html にアクセス
`next dev` -> `#` を変換していない html にアクセス
という具合の挙動になっていそう。
`export` と `dev` でファイル名が違うため環境によって分岐しないと両方で表示できるようにはならない。

`#` が入らないように調整するのが一番よさそうですね。
