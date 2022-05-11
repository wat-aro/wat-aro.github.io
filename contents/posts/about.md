---
title: About
published: '2022-05-08'
tags:
  - JavaScript
  - Haskell
  - Rust
---

## 自己紹介

### wat-aro :+1:

- 2016-09 - 現在 永和システムマネジメントアジャイル事業部

## SNS

- [Twitter](https://twitter.com/wat_aro)
- [GitHub](https://github.com/wat-aro)

## Slides

- [React Hooks のすすめ](https://wat-aro.dev/recommendation-of-hook) in えにしテック永和技術交流会 2020/10/23
- [Ruby に型をつけるお気持ち](https://wat-aro.dev/feeling-to-type-ruby) in ESM Real Rounge#4 2020/01/15
- [Elm ことはじめ](https://wat-aro.dev/getting-started-with-elm) in ESM Real Rounge#2 2019/10/28
- [パイプライン演算子](https://wat-aro.dev/pipeline-operator) in 2019 年 6 月みんなの時間 2019/06/20

```js
function foo(bar) {
  var a = 42,
    b = 'Prism';
  return a + bar(b);
}
```

```haskell
(|>) :: a -> (a -> b) -> b
a |> f = f a
```

```rust
use std::{sync::{Arc, Barrier}, thread};

fn main() {
    let mut v = Vec::new();

    let barrier = Arc::new(Barrier::new(10));

    for i in 0..10 {
        let b = barrier.clone();
        let th = thread::spawn(move || {
            b.wait();
            println!("finished barrier{}", i);
        });
        v.push(th);
    }

    for th in v {
        th.join().unwrap();
    }
}
```
