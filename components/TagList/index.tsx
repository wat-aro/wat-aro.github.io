import { Tag } from '../Tag';

type Props = {
  tags: string[];
};

export const TagList: React.FC<Props> = ({ tags }) => {
  return (
    <nav className="flex mt-2 mb-2 items-start text-gray-500 text-xs">
      <div className="flex flex-wrap max-w-full overflow-x-auto gap-2">
        {tags.map((tag) => (
          <Tag tag={tag} key={tag} />
        ))}
      </div>
    </nav>
  );
};
