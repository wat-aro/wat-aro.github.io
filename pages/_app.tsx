import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Header } from '../components/Header';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="py-0 px-8 min-h-screen container m-auto">
      {/* 先頭のスペース */}
      <div className="h-4 md:h-12"></div>
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
