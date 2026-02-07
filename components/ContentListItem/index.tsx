import Link from 'next/link';
import { Entry } from '../../lib/entry';

export type Props = Entry;

export const ContentListItem: React.FC<Props> = ({
  title,
  published,
  path,
}) => {
  return (
    <Link
      href={path}
      className="border-b-2 border-gray-200 border-opacity-0 hover:border-opacity-100"
    >
      <div className="flex pt-2 pb-1 justify-between">
        <div className="text-xl md:w-5/6 w-9/12">{title}</div>
        <div className="text-gray-500 md:w-1/6 w-3/12 flex justify-end items-end">
          {published}
        </div>
      </div>
    </Link>
  );
};
