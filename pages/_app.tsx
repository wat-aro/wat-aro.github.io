import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Header } from '../components/Header';
import 'zenn-content-css';
import Script from 'next/script';

const googleTagManagerId = 'GTM-MW6D56L';
const isProduction = process.env.NODE_ENV === 'production';

const GoogleTagManager: React.FC = () => {
  return (
    <Script
      id="gtag-base"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${googleTagManagerId}');
      `,
      }}
    />
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="py-0 md:px-8 min-h-screen flex flex-col items-center">
      {isProduction && <GoogleTagManager />}
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
