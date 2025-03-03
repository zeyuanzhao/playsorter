"use client";

import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import { useContext } from "react";
import { UserContext } from "../providers";

const Template = ({ children }: { children: React.ReactNode }) => {
  const user = useContext(UserContext);

  if (!user) {
    return <LoadingScreen />;
  }

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
