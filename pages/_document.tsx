import { Html, Head, Main, NextScript } from 'next/document';

const googleTagManagerId = 'GTM-MW6D56L';

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
