import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { slides, SlideWithContent } from '../../lib/slide';
import SlideRepository from '../../lib/repositories/slide';
import { Layout } from '../../components/Layout';
import { useEffect, useState } from 'react';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/white.css';
import 'reveal.js/plugin/highlight/zenburn.css';

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
  const [Reveal, setReveal] = useState<RevealStatic>();
  const [RevealMarkdown, setRevealMarkdown] = useState<Plugin>();
  const [Highlight, setHighlight] = useState<Plugin>();

  const { slug } = slide;

  useEffect(() => {
    const clientSideInitialization = async () => {
      if (Reveal == null) {
        setReveal(await (await import('reveal.js')).default);
      } else if (RevealMarkdown == null) {
        setRevealMarkdown(
          await (
            await import('reveal.js/plugin/markdown/markdown.esm')
          ).default
        );
      } else if (Highlight == null) {
        setHighlight(
          await (
            await import('reveal.js/plugin/highlight/highlight.esm')
          ).default
        );
      } else {
        await Reveal.initialize({
          plugins: [RevealMarkdown, Highlight],
          embedded: true,
          shuffle: false,
          history: true,
        });
      }
    };
    clientSideInitialization();
  }, [slug, Reveal, RevealMarkdown, Highlight]);

  return (
    <>
      <Layout>
        <div className="top-0 left-0 w-full h-full slide">
          <div className="reveal">
            <div
              className="slides"
              dangerouslySetInnerHTML={{
                __html: `
                <section data-markdown data-separator-vertical="^===\n">
                  <textarea data-template>
                    ${slide.content}
                  </textarea>
                </section>
            `,
              }}
            />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Slide;
