import Link from 'next/link';

type Props = {
  currentPage: number;
  pages: number[];
  pathFunc: (page: number) => string;
};

export const Pagination: React.FC<Props> = ({
  pages,
  currentPage,
  pathFunc,
}) => {
  return (
    <div className="flex justify-center flex-wrap gap-4 py-4">
      {pages.map((p) =>
        p === currentPage ? (
          <div className="font-bold" key={p}>
            {currentPage}
          </div>
        ) : (
          <Link href={pathFunc(p)} key={p}>
            <a>{p}</a>
          </Link>
        )
      )}
    </div>
  );
};
