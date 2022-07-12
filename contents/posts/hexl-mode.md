---
title: Emacs でバイナリファイルを編集する
published: '2022/07/12'
tags:
  - Emacs
---

`M-x hexl-find-file` でファイルを開く。
`cat` を開くと↓のようになる

`M-x hexl-find-file` `/usr/bin/cat`
![hexl-mode](/images/hexl-mode.png)

`C-M-x` で 16進数を書き込める。
そのまま入力するとキーコードがそのまま入力されてるみたい。
