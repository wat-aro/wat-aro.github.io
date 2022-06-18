import { TagList } from '../TagList';

type Props = {
  title: string;
  published: string;
  tags?: string[];
  content: string;
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
        {tags && <TagList tags={tags} />}

        <div className="znc" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </article>
  );
};
