# Ruby に型をつけるお気持ち

wat-aro

---

## 自己紹介

- wat-aro
- Haskell, Elm なんかが好き

---

## おしながき

- Ruby の型のおさらい
- ruby-signature の記法
- 実例を通して

---

### `Ruby` の型のおさらい

- 型検査器 steep, sorbet
- rbi ファイルに型定義を書くがそれぞれ文法が違う
- Ruby 3 では型シグネチャが導入される
- 周辺ツール群は外部ライブラリとして提供

---

### `Ruby` の型シグナチャ

- ruby-signature
- https://github.com/ruby/ruby-signature
- steep, sorbet にこのシグネチャを使ってもらう

---

---

## `ruby-signature` の記法

- プリミティブな型は Class instance type で定義
- Interface type であるメソッドを持った型というのも定義できる
- Literal type, Union Type, Intersection type, Optional type で柔軟な型定義ができる
- ivar や メソッドの型定義も直観的
- 型付けできないものは `untyped`

---

### プリミティブな型

- Integer
- String
- Hash[Symbol, String]

---

### `Record type`

- Hash の型を指定
- `{ id: Integer, name: String }`

---

### `Interface type`

例: each メソッドを持っている型

```ruby
interface _Each[A, B]
  def each: { (A) -> void } -> B
end
```

---

### `Literal type`

- 型の取り得る値を限定できる
- `1` という型は Integer かつ 値を `1` に限定
- "hello world"という型や`:to_s`という型を定義可能

---

### `Union type`

- 型の和を表わす
- `Integer | String` は Integer or String

---

### `Intersection type`

- 交差型
- `Integer & String` は Integer and String
- Hash の合成が主な用途？
- `{ id: Integer } & { name: String }` は `{ id: Integer, name: String }`

---

### `Optional type`

- みんな大好き null 安全
- `Integer?` で `Integer | nil`

---

### ivar やメソッドの型定義

- `@name: String` で ivar
- `def to_s: () -> String` でメソッドを定義

---

### 所見

- TypeScript の影響が強い
  - Literal type
  - Intersection type
- Interface type があればダックタイプもやりやすそう
- 想像していたよりもリッチ
- any じゃなくて untyped なのはわかりやすくていい

---

---

## 実例を通して

ruby-signature はまだ StandardLibrary の片付けが終わっていないので
適当なものに型をつけてみる

---

### Abbrev モジュール

- StandardLibrary で最初に表示されている
- module_function abbrev 一つだけのモジュールなので簡単
- まだ ruby-signature で定義されていない

---

### Abbrev#abbrev とは

`abbrev(words, pattern = nil)`

```ruby
Abbrev.abbrev(['ruby'])
#=>  {"ruby"=>"ruby", "rub"=>"ruby", "ru"=>"ruby", "r"=>"ruby"}

Abbrev.abbrev(%w{ car cone })
#=> {"ca"=>"car", "con"=>"cone", "co"=>"cone", "car"=>"car", "cone"=>"cone"}

Abbrev.abbrev(%w{car box cone crab}, /b/)
#=> {"box"=>"box", "bo"=>"box", "b"=>"box", "crab" => "crab"}

Abbrev.abbrev(%w{car box cone}, 'ca')
#=> {"car"=>"car", "ca"=>"car"}
```

String の配列をうけとり、String を分解して key とし、元の String を value とする Hash を返す

---

### まずはシンプルなケース

```ruby
Abbrev.abbrev(['ruby'])
#=>  {"ruby"=>"ruby", "rub"=>"ruby", "ru"=>"ruby", "r"=>"ruby"}
```

これに型を付けると

```ruby
module Abbrev
  def self?.abbrev: (Array[String]) -> Hash[String, String]
end
```

`def self?` は module function 用の書き方
空配列を受け取っても空ハッシュを返すだけなので問題なし。

---

### 第 2 引数について

example を見ると String と Regexp を受け取ることを想定しているよう

```ruby
Abbrev.abbrev(%w{car box cone crab}, /b/)
#=> {"box"=>"box", "bo"=>"box", "b"=>"box", "crab" => "crab"}

Abbrev.abbrev(%w{car box cone}, 'ca')
#=> {"car"=>"car", "ca"=>"car"}
```

じゃあ Integer とか渡したらエラーになるのかな？

---

### 想定していなさそうな型の引数を渡してみる

```ruby
Abbrev.abbrev(%w{12345}, 1)
#=> {}
```

エラーにならないだと…
この場合って型はどうつければいいのか。
実装を abbrev の実装を見てみると

---

### abbrev の実装

- String, Regexp 以外は `!~` を直接使っている
- `Integer#!~` は常に true を返す

```ruby
def abbrev(words, pattern = nil)
  ...
  if pattern.is_a?(String)
    pattern = /\A#{Regexp.quote(pattern)}/  # regard as a prefix
  end
```

```ruby
  words.each do |word|
    next if word.empty?
    word.size.downto(1) { |len|
      abbrev = word[0...len]
      next if pattern && pattern !~ abbrev
      ...
    }
  end
end
```

```ruby
  words.each do |word|
    next if pattern && pattern !~ word
    table[word] = word
  end
  table
end
```

---

### abbrev の第 2 引数は String, Regexp 以外を考慮していない

- String, Regexp 以外を考慮しておらず、たまたま `{}` を返すようになっているだけに見える
- 実行時にエラーにならない場合はどう型をつければよいのか
  - Integer or Object を引数に取ることを認める
  - String と Regexp 以外は認めない

---

### このような場合にどうすればよいか

- ドキュメントにどう書かれているか
- エラーでないために困る場合を想定してどう検査してほしいかを考える

---

### ドキュメント

> The optional pattern parameter is a pattern or a string.
> Only input strings that match the pattern or start with the string are included in the output hash.

pattern とは言っているけれど、それが Regexp とは限定していない。

---

### エラーでないために困る場合を想定してどう検査してほしいかを考える

何かのメソッドの返り値が String や Regexp だと思っていたのに Integer だった場合

```ruby
def some_method: () -> (String | Integer)

pattern = some_method()

Abbrev.abbrev(["12345"], pattern)
#=> {}
```

Integer が来てここでエラーにならなくてもその後で不整合がおこる場合に困る。
ここを通るテストがない場合になぜ駄目なのかの調査が必要になる。
それよりも型検査で弾いてくれたほうが嬉しい。

---

### 結果

```ruby
module Abbrev
  def self?.abbrev: (Array[String], ?(String | Regexp | nil)) -> Hash[String, String]
end

```

第 2 引数は String, Regexp, nil としました。
この定義で ruby-signature に PR を送ってマージされた。

---

## まとめ

- ruby-signature の紹介
- ドキュメントにない場合でもそれっぽく動く場合がある
- どう動いてほしいかを考えて型をつけないといけない場合がある
