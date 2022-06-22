import SlideRepository from '../../lib/repositories/slide';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { Layout } from '../../components/Layout';
import { Entry } from '../../lib/entry';
import { ContentList } from '../../components/ContentList';

type Props = {
  slides: Entry[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const slides = await SlideRepository.list();

  return {
    props: { slides },
  };
};

const Slides: NextPage<Props> = ({ slides }) => {
  return (
    <>
      <Head>
        <title>Slides | (wat-aro)</title>
      </Head>
      <Layout title="Slides" description="スライド一覧">
        <h1 className="text-3xl mb-4">Slides</h1>
        <ContentList entries={slides} />
      </Layout>
    </>
  );
};

export default Slides;
