import Navbar from "@/components/Navbar";

const Template = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="px-6">
      <div>
        <Navbar />
      </div>
      {children}
    </div>
  );
};

export default Template;
