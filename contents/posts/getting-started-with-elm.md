---
title: Elm ことはじめ
published: '2019-10-28'
---

# `Elm` ことはじめ

---

## 自己紹介

- wat-aro
- 10%の時間では Elm でフロントエンドをやっていました
- 関数型が好きです

---

## おしながき

- Elm とは
- 文法
- TEA
- まとめ

---

## Elm とは

- 静的型付け Alt JS
- A delightfull language
- No Runtime Exception
- Great Peerformance
- Small Assets

---

### 静的型付けの Alt JS

Haskell like な見た目

```elm
map : (a -> b) -> List a -> List b
map f list =
  case list of
    [] -> []
    (x :: xs) -> f x :: (map f xs)
```

---

### 静的型付けの Alt JS

強力な型推論と親切なエラーメッセージ

```elm
> 1 + "1"
-- TYPE MISMATCH ----------------------------------------------------------- elm

I cannot do addition with String values like this one:

4|   1 + "1"
         ^^^
The (+) operator only works with Int and Float values.

Hint: Switch to the (++) operator to append strings!
```

---

### A delightful language

公式サイトが言ってます

[![Image from Gyazo](https://i.gyazo.com/772c9e8c416140a595a7ca586a66a159.png)](https://gyazo.com/772c9e8c416140a595a7ca586a66a159)

---

### Great Peerformance

[![Image from Gyazo](https://i.gyazo.com/50ecbb1475d7b22a2495ebdc087d59af.png)](https://gyazo.com/50ecbb1475d7b22a2495ebdc087d59af)

---

### Small Assets

[![Image from Gyazo](https://i.gyazo.com/7e580ab002610cd302a89046d9e28e0a.png)](https://gyazo.com/7e580ab002610cd302a89046d9e28e0a)

---

---

## 文法

- デフォルトカリー化
- Haskell-like 型定義
- パターンマッチ

---

### デフォルトカリー化

ML や Haskell のようにデフォルトでカリー化されている

```elm
add : Int -> Int -> Int
add x y = x + y

add 2 3  -- 5

add2 : Int -> Int
add2 = add 2

add2 3 -- 5
```

---

### Haskell-like 型定義

- Haskell like な型定義
- 代数的データ型
- 型クラスはない

```elm
type Maybe a
  = Just a
  | Nothing
```

型アノテーションのコロンは一つ

```elm
42 : Int
"Hello Elm" : String
```

---

### パターンマッチ

- 型定義に沿った形でパターンマッチができる
- 網羅性検査もされるので漏れが出ない
- 漏れているとコンパイルエラー

```elm
type Maybe a
  = Just a
  | Nothing
```

```elm
map : (a -> b) -> Maybe a -> Maybe b
map f x = case x of
  Just a -> Maybe (f a)
  Nothing -> Nothing

```

---

---

## The Elm Architecture(TEA)

- `view`は`model`を受け取って`HTML`を作成する
- `HTML`から`msg`を投げ、`update`が現在の`model`と`msg`から新しい`model`を作成する
- 新しい`model`から再度`HTML`を作成する

```elm
sandbox :
    { init : model
    , view : model -> Html msg
    , update : msg -> model -> model
    }
    -> Program () model msg
```

---

### sandbox のライフサイクル

![Browser.sandbox](https://guide.elm-lang.org/effects/diagrams/sandbox.svg)

---

### カヌンターアプリの例

- `+` ボタンと `-` ボタンがあるカウンター
- https://elm-lang.org/examples/buttons
- モデルの初期値は 0
- update と view はそれぞれの名前の関数

```elm
sandbox :
    { init : model
    , view : model -> Html msg
    , update : msg -> model -> model
    }
    -> Program () model msg

main : Program () Int Msg
main =
  Browser.sandbox { init = 0, update = update, view = view }
```

---

### まずはメッセージの型定義から

- Msg は Increment と Decrement の二つ
- Increment が来たら model を +1 する
- Decrement が来たら model を -1 する
- RunTime System が update の返り値を受け取り現在のモデルを更新する

```elm
type Msg = Increment | Decrement

update : Msg -> Int -> Int
update msg model =
  case msg of
    Increment ->
      model + 1

    Decrement ->
      model - 1
```

---

### 描画に使う関数

- HTML タグ のタグも関数で定義されている
- div の第一引数は Attribute msg のリスト
- div の第二引数は Html msg のリスト
- onClick の引数に msg を渡すと、クリックされた時にそのメッセージを投げる
- text は文字列の描画用の関数
- 型変数になっている部分は型推論で解決される

```elm
div : List (Attribute msg) -> List (Html msg) -> Html msg
button : List (Attribute msg) -> List (Html msg) -> Html msg
onClick : msg -> Attribute msg
text : String -> Html msg
```

---

### 描画部分

- さっきの関数を使って view を構成する

```elm
view : Int -> Html Msg
view model =
  div []
    [ button [ onClick Decrement ] [ text "-" ]
    , div [] [ text (String.fromInt model) ]
    , button [ onClick Increment ] [ text "+" ]
    ]
```

---

### 副作用を扱う例(Cat gifs)

- 猫の GIF 画像をランダムに取得し描画するアプリ
- https://elm-lang.org/examples/cat-gifs
- `element` を使う

---

### Browser.element

- `view`は変わらない
- `update`の返り値が `model`から`(model, Cmd msg)`に変更
- 外部からのイベントを扱う `subscriptions` が追加(今回は扱いません)

```elm
element :
    { init : flags -> ( model, Cmd msg )
    , view : model -> Html msg
    , update : msg -> model -> ( model, Cmd msg )
    , subscriptions : model -> Sub msg
    }
    -> Program flags model msg
```

---

### Cmd とは

- 主に副作用を扱う(e.g. HTTP リクエスト, 乱数生成, 現在時の取得)
- 実行した結果 `Cmd msg` を返し、その`msg`が `Runtime System` によって `update`に渡される

---

### 副作用を扱った場合のライフサイクル

![Browser.element](https://guide.elm-lang.org/effects/diagrams/element.svg)

---

### Cat Gifs の Msg

- 再度猫 Gif を取得する MorePlease
- 猫 Gif の取得した結果を表す GotGif (Result Http.Error String)
- Result error value 型は成功・失敗を表すことが出来る

```elm
type Msg
  = MorePlease
  | GotGif (Result Http.Error String)
```

---

### Cat Gif の Model

- 猫画像取に失敗したら Failure
- 取得中は Loading
- 取得に成功したら Success に 猫 Gif の URL を文字列で持つ

```elm
type Model
  = Failure
  | Loading
  | Success String
```

---

### Cat Gif の Initialize phase

- モデルの初期値は Loading
- getRandomCatGif で猫 Gif を取得する
- Http.get の返り値の型が Cmd msg なので Cmd を強制される

```elm
init : () -> (Model, Cmd Msg)
init _ =
  (Loading, getRandomCatGif)

get : { url : String, expect : Expect msg } -> Cmd msg

getRandomCatGif : Cmd Msg
getRandomCatGif =
  Http.get
    { url = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cat"
    , expect = Http.expectJson GotGif gifDecoder
    }
```

---

### Cat Gif の更新 phase

- MorePlease メッセージなら Loading 状態にして猫 Gif を取得しにいく
- 取得した結果、成功していればモデルに URL を入れて描画、失敗していれば Failure 画面に

```elm
update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    MorePlease ->
      (Loading, getRandomCatGif)

    GotGif result ->
      case result of
        Ok url ->
          (Success url, Cmd.none)

        Err _ ->
          (Failure, Cmd.none)
```

---

### Cat Gif の描画

- view でもパターンマッチで状態を網羅して描画しているかが検査できる

```elm
view : Model -> Html Msg
view model =
  div []
    [ h2 [] [ text "Random Cats" ]
    , viewGif model
    ]

viewGif : Model -> Html Msg
viewGif model =
  case model of
    Failure ->
      div []
        [ text "I could not load a random cat for some reason. "
        , button [ onClick MorePlease ] [ text "Try Again!" ]
        ]

    Loading ->
      text "Loading..."

    Success url ->
      div []
        [ button [ onClick MorePlease, style "display" "block" ] [ text "More Please!" ]
        , img [ src url ] []
        ]
```

---

### TEA

- 副作用を扱わない場合 model, update, message, view によって構成される
- view から message を投げ、その message に合わせて model を更新する
- 副作用を扱う場合は update から副作用(Cmd)を実行し、Cmd からまた message を投げ update で受け取る
- 今回は見ていないけれど、外部からの入力(時間によって発するイベントや websocket のイベントなど\*\*は subscription で扱う

---

## まとめ

- Elm の基本的なところを紹介しました
- TEA を紹介しました
- 簡潔な型定義とパターンマッチで安全にフロントエンドが開発できるよ！
