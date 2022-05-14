import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

const googleTagManagerId = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID;
const isProduction = process.env.NODE_ENV === 'production';

const GoogleTagManager: React.FC = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MW6D56L');
      `,
      }}
    />
  );
};

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        {isProduction && <GoogleTagManager />}
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <body>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-MW6D56L"
              height="0"
              width="0"
              style="display:none;visibility:hidden"
            />`,
          }}
        ></noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
