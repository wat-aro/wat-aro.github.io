import Link from 'next/link';
import { postsPagePath } from '../../lib/path';

type Props = {
  currentPage: number;
  pages: number[];
};

export const Pagination: React.FC<Props> = ({ pages, currentPage }) => {
  return (
    <div className="flex gap-4 py-4 justify-center">
      {pages.map((p) =>
        p === currentPage ? (
          <div className="font-bold" key={p}>
            {currentPage}
          </div>
        ) : (
          <Link href={postsPagePath(p)} key={p}>
            <a>{p}</a>
          </Link>
        )
      )}
    </div>
  );
};
