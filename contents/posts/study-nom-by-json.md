---
title: nom のお勉強
published: '2022/05/16'
tags:
  - Rust
  - nom
---

旧ブログの `movable type` を `markdown` に変換したい。  
まずは [nom](https://github.com/Geal/nom) でパースしようと思ったが Readme を読んでもいまいちしっくりこない。  
とりあえず練習がてら何かをパースしてみる。  
仕様があるほうが嬉しいので探してみると [json](https://www.json.org/json-ja.html) を見つけた。  
`digits` までは書けた。  
[digit1](https://docs.rs/nom/latest/nom/character/complete/fn.digit1.html) を使えば終わりなのだが、それでは練習にならないため定義通りに実装。

https://github.com/wat-aro/wjson

```rust
fn zero(input: &str) -> IResult<&str, u64> {
    map(char('0'), |c| c.to_string().parse::<u64>().unwrap())(input)
}

fn onenine(input: &str) -> IResult<&str, u64> {
    map(
        alt((
            char('1'),
            char('2'),
            char('3'),
            char('4'),
            char('5'),
            char('6'),
            char('7'),
            char('8'),
            char('9'),
        )),
        |c| c.to_string().parse::<u64>().unwrap(),
    )(input)
}

pub fn digit(input: &str) -> IResult<&str, u64> {
    alt((zero, onenine))(input)
}

pub fn digits(input: &str) -> IResult<&str, u64> {
    let (rest, v) = many1(digit)(input)?;
    let str_vec: String = v.iter().map(|d| d.to_string()).collect::<String>();

    Ok((rest, str_vec.parse().unwrap()))
}
```

まだ `Rust` を書き慣れないけれど楽しい。
