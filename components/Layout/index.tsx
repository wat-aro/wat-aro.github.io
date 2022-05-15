type Props = {
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex md:justify-center justify-between w-full">
      <div className="flex flex-col sm:max-w-sm md:max-w-4xl w-full py-4 px-4">
        {children}
      </div>
    </div>
  );
};
