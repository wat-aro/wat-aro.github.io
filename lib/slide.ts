export type Slide = {
  title: string;
  published: string;
  tags: string[];
  slug: string;
};

export type SlideWithContent = Slide & { content: string };

export const slides: Slide[] = [
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
