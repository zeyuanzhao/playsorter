"use client";

import LoadingScreen from "@/components/LoadingScreen";
import UserInfo from "@/components/UserInfo";
import getAPI from "@/lib/getAPI";
import { Playlist as PlaylistType, UserProfile } from "@spotify/web-api-ts-sdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Template = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [token, setToken] = useState("");
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
    <div className="p-6">
      <h1>SpotiList</h1>
      <div>
        <UserInfo user={user} />
      </div>
      {children}
    </div>
  );
};

export default Template;
