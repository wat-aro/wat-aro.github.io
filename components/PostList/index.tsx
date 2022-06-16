import Link from 'next/link';
import { Post } from '../../lib/api';
import { postPath } from '../../lib/postPath';

const sortByPublishedDate = (posts: Post[]): Post[] => {
  const copied = [...posts];
  copied.sort((x, y) => {
    return new Date(x.data.published).getTime() <
      new Date(y.data.published).getTime()
      ? 1
      : -1;
  });
  return copied;
};

type Props = {
  posts: Post[];
};

export const PostList: React.FC<Props> = ({ posts }) => {
  const sorted = sortByPublishedDate(posts);

  return (
    <>
      {sorted.map((post) => (
        <Link href={postPath(post)} key={post.slug}>
          <a className="border-b-2 border-gray-200 border-opacity-0 hover:border-opacity-100">
            <div className="flex pt-2 pb-1 justify-between">
              <div className="text-xl md:w-5/6 w-9/12">{post.data.title}</div>
              <div className="text-gray-500 md:w-1/6 w-3/12 flex justify-end">
                {post.data.published}
              </div>
            </div>
          </a>
        </Link>
      ))}
    </>
  );
};
