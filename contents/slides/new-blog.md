# Blog つくりました

---

## `About me`

- 石田和太郎
- wat-aro
- @wat_aro
- Github: wat-aro
- 元陸上自衛官
- Fjord 卒業生

---

## 今日するはなし

最近ブログを作ったのでその話をします。

---

## なぜつくることにしたの？

1. ドメインを取ったまま放置していたので使いたかった
1. はてなブログのマークダウン記法に不満があった
1. WebAssembly を好きに埋め込んで遊べる環境が欲しかった

===

### ドメインを取ったまま放置していたので使いたかった

`dev` ドメインが販売開始されてすぐに `wat-aro.dev` を取得。  
しかし使う場所がなかった。  
個人サイト作りたいけどめんどくさいが勝ってこの時点ではまだ動かず。  

===

### はてなブログのマークダウン記法に不満があった

はてなブログは `Github Flavored Markdown` ではないため  
スペース 2 個を `<br/>`  
改行二個で区切られた範囲を `<p>` タグで囲う。  
これが気に入らなくてブログを書かなくなってしまった。  

===

### `Webassembly` を好きに埋め込んで遊べる環境が欲しかった

なかなか仕事で `WebAssembly` を使う機会が訪れないため好きに扱える環境が欲しかった。

---

## どういうつくりにしたか

- GitHub Pages
- Next.js
- TypeScript
- Tailwind CSS
- unified

===

### `GitHub Pages`

静的サイトをホスティングしたいだけなので GitHub Pages を選択。  
無料かつカスタムドメインも使える。  
デプロイも `peaceiris/actions-gh-pages@v3` を使えば簡単。  

===

### `Next.js`

静的サイトを作りたいので Next.js の SSG で生成することに。  
初回アクセスは事前に生成した html を配布して、  
それ以降のページ遷移は json を使った Client Side Rendering。  

ネットワークタブを見ていると、そのページから遷移可能なページに必要な json をページが表示された後に裏側で取得している。  
おかげでサクサク動く。  

===

### `TypeScript`

型欲しいよね型。  
少しリファクタリングした際も型のおかげで直す場所がすぐにわかってとてもありがたかった。  
React との相性もいいのでおすすめ。  
Vue2 + TypeScript の組み合わせは知らない。  
Vue3 + TypeScript の体験はそこそこよかった。  

===

### `Tailwind CSS`

クラス名にスタイルが一つが結びついている。
```jsx
<div className="flex items-center gap-4 font-midium text-3xl h-full font-bold">
  <img
    className="rounded-full"
    src="/images/profile.jpg"
    width="48"
    height="48"
    alt="profile image"
  />
  {SITENAME}
</div>
```

===

### `Tailwind CSS`

流行っているので試しにつかってみた。  
かなり体験いいです。  
名前をつけて再利用したいものはコンポーネントにして、それ以外はこのクラス名で十分だった。  
CSS のクラス設計などを考えなくてよいのでおすすめ。

===

### `unified`

マークダウンや html を変換したりシリアライズしたりできるライブラリ。  
プラグインで色々な機能を足せる。

===

### `unified`

```ts [2-3|4-7|8-10|12|13-14]
export const markdownToHtml = async (markdown: string) => {
  const result = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkBreaks)
    .use(remarkEmoji)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeHatenaCodeBlock)
    .use(rehypePrismPlus, { ignoreMissing: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  return result.toString();
};
```

---

## はてなブログのデータ移行

はてなブログの過去記事も新ブログに移行したかった。  
はてなブログからデータをエクスポートすると markdown じゃなかった。  
`unified` で扱えるかたちに移行するぞい  

===

### `Rust`でパーサを作ってマークダウン(仮)に変換

エクスポートしたデータのフォーマットは Movable Type  
Rust でパーサを作って記事単位でマークダウンに変換。  
code ブロックの変換が面倒なため今はマークダウンの中に html がある状態  
そのうちちゃんとマークダウンに変換するぞ

---

## `GitHub Pages` で公開していたスライドもブログ内に移行

`reveal-ck` で生成したスライドを `GitHub Pages` で公開していた。  
`reveal-ck` は `reveal.js` を使ったツールなので `reveal.js` を自前で使って公開。  
どはまりした。  

===

### `reveal.js`

`reveawl.js` は内部で navigator などを使っている。  
Next.js だと import する時点では window オブジェクトがいないためエラーになる。  
Dynamic Import が必要。  
Dynamic Import するとなぜか2回目に表示したスライドが表示されない。  

===
### `reveal.js`

Dynamic Import したモジュールを `setState` で持たせると表示できた。

===

### `reveal.js`

表示はできたがなぜかスライドの順番がシャッフルされてしまう。  
コード読んでもなぜそうなるかよくわからない。  
config に `shuffle: false` を入れたらちゃんと動くようになった。  

===

### `reveal.js`

このスライドは今回作ったブログの上で動いています。  

---

## 今後の展望

1. html でごまかしている過去のブログデータをちゃんとマークダウンに変換する
1. Storybook を入れてスマホでの表示をもうちょっとちゃんと調整したい
1. WebAssembly の全文検索エンジンを入れて記事を検索できるようにしたい
1. サイトマップ・RSSフィードの導入

---

## まとめ

ブログを 1 からつくると楽しいですよ。  
無限にやりたいことが出てきますよ。  
そろそろフロントエンドじゃなくて Rust を触りたいぞ
