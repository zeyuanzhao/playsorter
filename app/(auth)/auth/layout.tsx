"use client";

import { UserContext } from "@/app/providers";
import Navbar from "@/components/Navbar";
import { useContext } from "react";

const Template = ({ children }: { children: React.ReactNode }) => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within a UserProvider");
  }
  const [user] = userContext;
  return (
    <div className="px-6">
      <div>
        <Navbar user={user} />
      </div>
      {children}
    </div>
  );
};

export default Template;
