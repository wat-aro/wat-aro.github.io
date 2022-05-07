import Link from 'next/link';
import { SITENAME } from '../../lib/constant';

const Menu: React.FC = () => {
  return (
    <ul className="flex gap-3">
      <li>
        <Link href="/about">About</Link>
      </li>
      <li>
        <Link href="/blog">Blog</Link>
      </li>
    </ul>
  );
};

export const Header: React.FC = () => {
  return (
    <div className="sticky top-0 bg-white w-full h-6 flex flex-row justify-between items-center py-8 px-4 border-b-2">
      <div className="flex items-center font-midium text-3xl">
        <Link href="/">{SITENAME}</Link>
      </div>
      <Menu />
    </div>
  );
};
