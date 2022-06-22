import Link from 'next/link';
import { useRouter } from 'next/router';
import { SITENAME } from '../../lib/constant';

type MenuProps = {
  currentPath: string;
};

type MenuItemProps = {
  title: string;
  path: string;
  showPage: boolean;
};

const MenuItem: React.FC<MenuItemProps> = ({ path, showPage, title }) => {
  return (
    <li
      className={
        'h-full flex flex-col justify-end border-black ' +
        (showPage ? 'pb-3 border-b-4' : 'pb-4')
      }
    >
      <Link href={path}>{title}</Link>
    </li>
  );
};

const Menu: React.FC<MenuProps> = ({ currentPath }) => {
  const showAboutPage = currentPath === 'about';
  const showPostsPage = currentPath === 'posts';

  return (
    <ul className="flex gap-3 h-full">
      <MenuItem title="Blog" path="/posts" showPage={currentPath === 'posts'} />
      <MenuItem
        title="Slide"
        path="/slides"
        showPage={currentPath == 'slides'}
      />
      <MenuItem title="About" path="/about" showPage={currentPath == 'about'} />
    </ul>
  );
};

export const Header: React.FC = () => {
  const router = useRouter();

  return (
    <div className="top-0 bg-white w-full h-16 flex flex-row justify-between items-center px-4 border-b-2">
      <Link href="/">
        <a>
          <div className="flex items-center font-midium text-3xl h-full font-bold gap-4">
            <img
              className="rounded-full"
              src="/images/profile.jpg"
              width="48"
              height="48"
              alt="profile image"
            />
            {SITENAME}
          </div>
        </a>
      </Link>
      <Menu currentPath={router.asPath.split('/')[1]} />
    </div>
  );
};
