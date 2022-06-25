import { useEffect, useState } from 'react';

export type Slide = {
  title: string;
  published: string;
  tags: string[];
  slug: string;
};

export type SlideWithContent = Slide & { content: string };

export const slides: Slide[] = [
  {
    title: 'Blog つくりました',
    published: '2022/06/24',
    tags: ['JS', 'Next.js', 'Rust'],
    slug: 'new-blog',
  },
  {
    title: 'React Hooks のすすめ',
    published: '2020/10/23',
    tags: ['JS', 'React'],
    slug: 'recommendation-of-hook',
  },
  {
    title: 'Ruby に型をつけるお気持ち',
    published: '2020/01/15',
    tags: ['Ruby'],
    slug: 'feeling-to-type-ruby',
  },
  {
    title: 'Elm ことはじめ',
    published: '2019/10/28',
    tags: ['Elm'],
    slug: 'getting-started-with-elm',
  },
  {
    title: 'パイプライン演算子',
    published: '2019/06/20',
    tags: ['Functional Programming', 'Ruby'],
    slug: 'pipeline-operator',
  },
];

export const useSlide = () => {
  const [Reveal, setReveal] = useState<RevealStatic>();
  const [RevealMarkdown, setRevealMarkdown] = useState<Plugin>();
  const [Highlight, setHighlight] = useState<Plugin>();

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
  }, [Reveal, RevealMarkdown, Highlight]);
};
