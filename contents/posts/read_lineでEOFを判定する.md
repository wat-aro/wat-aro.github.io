---
title: "read_lineでEOFを判定する"
published: 2022/10/10
tags:
    - Rust
---

https://doc.rust-lang.org/std/io/trait.BufRead.html#method.read_line
`read_line` の返り値が `Ok(0)` の場合は `EOF` に到達している。
