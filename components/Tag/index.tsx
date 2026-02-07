import Link from 'next/link';
import { tagPath } from '../../lib/path';

export const Tag: React.FC<{ tag: string }> = ({ tag }) => {
  return (
    <Link href={tagPath(tag)}>
      <p className="mr-1 rounded-full px-2 py-1 border leading-none">{tag}</p>
    </Link>
  );
};
