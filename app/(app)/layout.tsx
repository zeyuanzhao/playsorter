"use client";

import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import { useContext, useEffect } from "react";
import { UserContext } from "../providers";
import { useRouter } from "next/navigation";

const Template = ({ children }: { children: React.ReactNode }) => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within a UserProvider");
  }
  const [user] = userContext;
  const router = useRouter();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !localStorage.getItem("access_token")
    ) {
      router.push("/auth");
    }
  }, [router]);

  if (!user) {
    debugger;
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
