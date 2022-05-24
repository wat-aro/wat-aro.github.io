---
title: Playwright で OGP 画像を生成する
published: '2022/05/24'
tags:
  - Next.js
  - TypeScript
---

ブログ記事のインポートをしたかったはずなのに json parser を作る yak shaving が楽しい。  
次は Scheme のインタプリタを作りたくなってきた。危ない。

さて、表題のとおりブログの OGP 画像を [Playwright](https://github.com/microsoft/playwright) で生成するようにした。  
このサイトは [Next.js](https://nextjs.org/) で作って、[GitHub Pages](https://docs.github.com/ja/pages/getting-started-with-github-pages/about-github-pages) でホスティングしている。  
ソースコードは[ここ](https://github.com/wat-aro/wat-aro.github.io)にある。

ブログ記事のタイトルと slug から OGP 画像を生成している。

```ts
import { chromium } from 'playwright';
import { getHtml } from './getHtml';

type Params = {
  title: string;
  slug: string;
};

export const takeScreenshot = async ({ title, slug }: Params) => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1200, height: 600 },
  });
  const page = await context.newPage();
  const html = getHtml({ title });
  await page.setContent(html, { waitUntil: 'load' });
  await page.screenshot({
    path: `public/og-images/${slug}.png`,
    fullPage: true,
  });
  await browser.close();
};
```

`await page.setContent(html, { waitUntil: 'load' });` の `load` を指定するのが味噌。  
また、`setContent` に渡す html 内で画像を使う場合は[データ URL](https://developer.mozilla.org/ja/docs/Web/HTTP/Basics_of_HTTP/Data_URLs) に base64 エンコードされた画像を渡す必要がある。  
`setContent` には文字列を渡しているだけなためファイルパスでは Playwright は画像を特定できない。  
後は html と css を書いたら完成。  
これくらいの用途だと Playwright でも Puppeteer でも変わらないね。

まだまだサイトに実装しないといけないことが盛り沢山なのでがんばるぞい
