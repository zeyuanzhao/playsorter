const Template = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="p-6">{children}</div>;
};

export default Template;
