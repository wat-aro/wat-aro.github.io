---
title: Arch Linux で日本語 man ページと英語 man ページを使い分ける
published: '2022/05/29'
tags:
  - Linux
  - Arch
---

普段コードを書く環境ではエラーメッセージのググラビリティを考えて locale を英語にしています。
日本語でエラーメッセージを表示しても同じ問題にひっかかっている issue や StackOverFlow などが出てきづらくなるためです。
でも man ページを読む際には日本語のほうが楽ですよね。
しかし日本語の man ページしか見れなくなるのも他の人に共有する際に困ってしまいます。
ここでは日本語と英語の man ページをいい感じに共存する方法を紹介します。

と言ってもやることは単純で

```shell
$ LANG=ja_JP.UTF-8 yay -S man-pages-ja
```

で日本語 man をインストールし、

```fish
abbr --add jman "LANG=ja_JP.UTF-8 man"
```

のように `abbr` を登録するか

```bash
alias jman='LANG=ja_JP.UTF-8 man'
```

のように `alias` を登録するだけです。
`PKGBUILD` を見るとわかるのですが、`man-pages-ja` では環境変数 `LANG` の値を見て日本語 man をインストールするディレクトリを判定しています。

```shell
package() {
    mkdir -p ${pkgdir}/usr/share/man/${LANG}
    cd ${srcdir}/${pkgname}-${pkgver}
    make install
}
```

そのため `yay -S` する際に `LANG` を渡すことで任意のディレクトリに日本語 man をインストールできるわけです。
こうすると `man` を叩けばオリジナルの man ページが、
`jman` を叩くと日本語の man ページが表示できるようになります。

めでたしめでたし。
