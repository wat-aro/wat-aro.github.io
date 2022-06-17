import Link from 'next/link';
import { PostWithoutContent } from '../../lib/post';
import { postPath } from '../../lib/path';

type Props = {
  post: PostWithoutContent;
};

export const PostListItem: React.FC<Props> = ({ post }) => {
  return (
    <Link href={postPath(post)}>
      <a className="border-b-2 border-gray-200 border-opacity-0 hover:border-opacity-100">
        <div className="flex pt-2 pb-1 justify-between">
          <div className="text-xl md:w-5/6 w-9/12">{post.data.title}</div>
          <div className="text-gray-500 md:w-1/6 w-3/12 flex justify-end">
            {post.data.published}
          </div>
        </div>
      </a>
    </Link>
  );
};
