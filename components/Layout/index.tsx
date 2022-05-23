import Head from 'next/head';
import { useRouter } from 'next/router';

type Props = {
  title: string;
  ogImage: string;
  description: string;
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({
  title,
  description,
  ogImage,
  children,
}) => {
  const metaTitle = `${title} | (wat-aro)`;
  const router = useRouter();
  const origin = 'https://wat-aro.dev';
  const currentUrl = `${origin}${router.asPath}`;

  return (
    <>
      <Head>
        <meta name="title" content={metaTitle} />
        <meta name="description" content={description} />
        <meta property="og:locale" content="ja_jp" />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="(wat-aro)" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={currentUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@wat_aro" />
        <meta name="twitter:creator" content="@wat_aro" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Head>
      <div className="flex md:justify-center justify-between w-full">
        <div className="flex flex-col sm:max-w-sm md:max-w-4xl w-full py-4 px-4">
          {children}
        </div>
      </div>
    </>
  );
};
