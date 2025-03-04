"use client";

import { UserContext } from "@/app/providers";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import { useContext, useEffect, useState } from "react";

const Template = ({ children }: { children: React.ReactNode }) => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within a UserProvider");
  }
  const [user] = userContext;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("access_token") &&
      !user
    ) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
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
