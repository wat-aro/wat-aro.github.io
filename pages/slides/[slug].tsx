import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { slides, SlideWithContent, useSlide } from '../../lib/slide';
import SlideRepository from '../../lib/repositories/slide';
import { Layout } from '../../components/Layout';
import { Slide as SlideComponent } from '../../components/Slide';

type Params = {
  slug: string;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = slides.map((slide) => ({ params: { slug: slide.slug } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const slide = await SlideRepository.findBySlug(params!.slug);

  return {
    props: { slide },
  };
};

type Props = { slide: SlideWithContent };

const Slide: NextPage<Props> = ({ slide }) => {
  useSlide();

  return (
    <>
      <Layout>
        <div className="top-0 left-0 w-full h-full">
          <SlideComponent content={slide.content} />
        </div>
      </Layout>
    </>
  );
};

export default Slide;
