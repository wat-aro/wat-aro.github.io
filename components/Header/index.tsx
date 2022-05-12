import Link from 'next/link';
import { useRouter } from 'next/router';
import { SITENAME } from '../../lib/constant';

type MenuProps = {
  currentPath: string;
};

const Menu: React.FC<MenuProps> = ({ currentPath }) => {
  const showAboutPage = currentPath === 'about';
  const showPostsPage = currentPath === 'posts';

  return (
    <ul className="flex gap-3 h-full">
      <li
        className={
          'h-full  flex flex-col justify-end border-black ' +
          (showAboutPage ? 'pb-3 border-b-4' : 'pb-4')
        }
      >
        <Link href="/about">About</Link>
      </li>
      <li
        className={
          'h-full  flex flex-col justify-end border-black ' +
          (showPostsPage ? 'pb-3 border-b-4' : 'pb-4')
        }
      >
        <Link href="/posts">Blog</Link>
      </li>
    </ul>
  );
};

export const Header: React.FC = () => {
  const router = useRouter();

  return (
    <div className="sticky top-0 bg-white w-full h-16 flex flex-row justify-between items-center px-4 border-b-2">
      <div className="flex items-center font-midium text-3xl h-full">
        <Link href="/">{SITENAME}</Link>
      </div>
      <Menu currentPath={router.asPath.split('/')[1]} />
    </div>
  );
};
