---
title: はてなブログの記事を Next.js 製ブログにインポート
published: 2022/06/15
tags:
  - Rust
  - Next.js
  - TypeScript
---

[旧ブログ](https://wat-aro.hatenablog.com/) の記事の移行が終わりました。
Rust のパーサコンビネータ [nom](https://github.com/Geal/nom) の使いかたに慣れるため [JSON parser](https://github.com/wat-aro/wson) を作ったりと寄り道が激しかったです。

はてなブログから記事をエクスポートすると [Movable Type](https://www.sixapart.jp/movabletype/) で書かれた txt ファイルをダウンロードできます。
これを変換して markdown で書いているこのサイトでインポートできるようにしたい。
[Movable Type のフォーマット](https://www.sixapart.jp/movabletype/manual/3.3/f_import_format/) にちゃんと対応するのは大変なので必要なところだけ対応した。

## movable_type_to_markdown

作った移行ツールがこちら https://github.com/wat-aro/movable_type_to_markdown
使ったことがなかったので [clap](https://github.com/clap-rs/clap) や [anyhow](https://github.com/dtolnay/anyhow) を使ってみた。
to_markdown といいつつ、実際は Movable Type ファイルに入っていた html のまま。
最初は html からマークダウンにしようかと考えていたけれどコードブロックの `pre` タグがめんどくさすぎて断念。

```shell
cargo run MOVABLE_TYPE_FILE OUTPUT_DIRECTORY
```

で OUTPUT_DIRECTORY に変換した markdown ファイルを出力できます。
作りはシンプルに パースして記事用のオブジェクトを作成してファイル作成。

## はまりどころ 1

Movable Type の複数行フィールド・セクションは `-----\n` によって区切られている。
本文で `-----------\n` などが使われている箇所があったためパースできなくなってしまった。
セパレータは行頭から開始される場合に限るため `\n-----\n` で判定することでなんとかなった

## はまりどころ 2

コードブロック以外はそのままの html でそれなりに表示されているのでそれでよしとした。
ただコードブロックはいかんともしがたく。
これはこちらのサイト側で対応。
はてなブログのコードブロックの `pre` タグ直下に `code` タグを入れて children をラップすると、ハイライトされないが改行はきちんと反映されることがわかった。
ただし、markdown で書いたコードブロックを使っているため、`pre` タグのクラス名に `code` が含まれている場合にはてなブログのコードブロックだと判定するようにした。
このサイトは `unified` を使ってマークダウンから html に変換している。
以下の plugin を追加することでコードブロックを表示できるようにした。

```ts
export const rehypeHatenaCodeBlock: Plugin = () => {
  return (tree, file) => {
    visit(tree, 'element', (node: Element) => {
      if (
        node.tagName == 'pre' &&
        node.properties?.className &&
        Array.isArray(node.properties.className) &&
        node.properties.className.includes('code')
      ) {
        const children = node.children;
        const code = {
          type: 'element',
          tagName: 'code',
          properties: {},
          children: children,
        } as ElementContent;
        node.children = [code];
      }
      return true;
    });
  };
};
```

### 今後の展望

今は全件表示されているため、次はページネーションを導入するぞい。
