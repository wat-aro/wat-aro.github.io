import { PropsWithChildren } from 'react';

export const MarkDownLayout: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <article className="flex justify-center container">
      <div className="znc w-9/12 py-4">{children}</div>
    </article>
  );
};
