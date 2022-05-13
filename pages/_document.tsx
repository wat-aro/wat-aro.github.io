import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

const googleTagManagerId = 'GTM-MW6D56L';

const GoogleTagManager: React.FC = () => {
  return (
    <Script
      id="gtm"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.nsertBefore(j,f);})(window,document,'script','dataLayer','${googleTagManagerId}');
      `,
      }}
    />
  );
};

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <GoogleTagManager />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
