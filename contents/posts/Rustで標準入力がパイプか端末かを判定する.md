---
title: "Rustで標準入力がパイプか端末かを判定する"
published: 2022/10/07
tags:
    - Rust
---

パイプから標準入力に渡した場合はそのまま処理し、端末から入力する場合はプロンプトを表示したくて調べた。

libcの [ISATTY](https://linuxjm.osdn.jp/html/LDP_man-pages/man3/isatty.3.html) を使えばよい。
[libc](https://docs.rs/libc/latest/libc/) クレートか libc をラップした [nix](https://docs.rs/nix/latest/nix/) クレートでlibcの関数を叩ける。
ここでは Rust で使いやすいようにラップしてくれている `nix` を使う。
`nix::unistd::isatty` は指定されたファイルディスクリプタが端末を参照する場合に `Ok(true)` を返すのでそこで判定する。

```rust
use std::{
    error::Error,
    io::{self, stdout, Write},
};

use nix::{libc::STDIN_FILENO, unistd::isatty};

fn main() -> Result<(), Box<dyn Error>> {
    let mut buffer = String::new();
    if let Ok(true) = isatty(STDIN_FILENO) {
        print!("tty> ");
        stdout().flush().unwrap();
    }

    let stdin = io::stdin();
    stdin.read_line(&mut buffer)?;
    print!("{}", buffer);
    Ok(())
}
```

パイプから標準入力に文字列を渡すと渡した文字列がそのまま印字される。
```shell
$ echo Hello | cargo run
Hello
```

直接起動した際は `term> ` と印字され、文字列を入力して改行すると入力した文字が表示される。

```shell
$ cargo run
tty> Hello
Hello
```
