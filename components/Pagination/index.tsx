import Link from 'next/link';

type Props = {
  currentPage: number;
  pages: number[];
  basePath: string;
};

export const Pagination: React.FC<Props> = ({
  pages,
  currentPage,
  basePath,
}) => {
  return (
    <div className="flex gap-4 py-4">
      {pages.map((p) =>
        p === currentPage ? (
          <div className="font-bold" key={p}>
            {currentPage}
          </div>
        ) : (
          <Link href={`${basePath}${p}`} key={p}>
            <a>{p}</a>
          </Link>
        )
      )}
    </div>
  );
};
