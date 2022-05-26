---
title: JSON parser を書いた
published: '2022/05/27'
tags:
  - Rust
  - nom
---

yak shaving で作っていた JSON parser が一応完成。  
Rust 楽しいすなあ。

Haskell の parsec の感覚で使えるかと思って [nom](https://github.com/Geal/nom) を使ってみたけれど、最初はなかなかとっつきづらく。  
まあだいたい慣れることができたのでよし！

せっかくなので [crates.io](https://crates.io/) に公開したのだけれど、  
https://doc.rust-jp.rs/book-ja/ch14-02-publishing-to-crates-io.html を見ながら `cargo publish` すると他の crate と比べて表示が足りない。  
`Cargo.toml` に `respository` や `documentation` を追加する必要があったのね。

https://crates.io/crates/wson

名前は `wat-aro` の json parser で `wson` にした。  
テストがめんどうでした。  
[json.org](https://www.json.org/json-en.html)にはお世話になりました。

さっさと movable type を変換するぞ！
