import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Header } from '../components/Header';
import 'prism-themes/themes/prism-material-light.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="py-0 px-8 min-h-screen container m-auto">
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
