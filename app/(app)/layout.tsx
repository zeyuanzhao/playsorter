"use client";

import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import getAPI from "@/lib/getAPI";
import { UserProfile } from "@spotify/web-api-ts-sdk";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext<UserProfile | undefined>(undefined);

const Template = ({ children }: { children: React.ReactNode }) => {
  const [, setToken] = useState("");
  const [user, setUser] = useState<UserProfile>();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("access_token") ?? "";
      setToken(storedToken);

      if (storedToken === "") {
        router.push("/auth");
      } else {
        getAPI("GET", "me").then((data) => {
          if (data.error) {
            router.push("/auth");
          }
          setUser(data);
        });
      }
    }
  }, [router]);

  if (!user) {
    return <LoadingScreen />;
  }

  return (
    <div className="px-6">
      <UserContext.Provider value={user}>
        <div>
          <Navbar user={user} />
        </div>
        {children}
      </UserContext.Provider>
    </div>
  );
};

export default Template;
