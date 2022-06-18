import Link from 'next/link';
import { tagPath } from '../../lib/path';

type Props = {
  title: string;
  published: string;
  tags?: string[];
  content: string;
};

const Tag: React.FC<{ tag: string }> = ({ tag }) => {
  return (
    <Link href={tagPath(tag)}>
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
    <article className="flex max-w-4xl w-full">
      <div className="py-4 w-full">
        <div className="mr-2 text-xs font-bold">{published}</div>
        <h1 className="font-bold text-3xl text-black">{title}</h1>
        <nav className="flex mt-2 mb-2 items-start text-gray-500 text-xs">
          <div className="flex flex-nowrap max-w-full overflow-x-auto">
            {tags && tags.map((tag) => <Tag tag={tag} key={tag} />)}
          </div>
        </nav>

        <div className="znc" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </article>
  );
};
