import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Header } from '../components/Header';
import 'zenn-content-css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="py-0 md:px-8 min-h-screen flex flex-col items-center">
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
