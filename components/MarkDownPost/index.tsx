import Link from 'next/link';
import { PropsWithChildren } from 'react';

type Props = {
  title: string;
  published: string;
  tags?: string[];
  content: string;
};

const Tag: React.FC<{ tag: string }> = ({ tag }) => {
  return (
    <Link href={`/tags/${tag}`} passHref={true}>
      <a>
        <p className="mr-1 rounded-full px-2 py-1 border leading-none">{tag}</p>
      </a>
    </Link>
  );
};

export const MarkDownPost: React.FC<Props> = ({
  title,
  published,
  tags,
  content,
}) => {
  return (
    <article className="flex justify-center container">
      <div className="w-9/12 py-4">
        <h1 className="font-bold text-3xl text-black">{title}</h1>
        <nav className="flex mt-7 items-start text-gray-500">
          <div className="mr-2 mb-4">{published}</div>
          <div className="flex flex-nowrap max-w-full overflow-x-auto">
            {tags && tags.map((tag) => <Tag tag={tag} key={tag} />)}
          </div>
        </nav>

        <div className="znc" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </article>
  );
};