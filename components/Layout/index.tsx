import { PropsWithChildren } from 'react';

export const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <article className="flex justify-center">
      <div className="w-9/12 py-4">{children}</div>
    </article>
  );
};
