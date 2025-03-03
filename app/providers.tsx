"use client";

import { useRouter } from "next/navigation";
import { HeroUIProvider } from "@heroui/react";
import { createContext, useEffect, useState } from "react";
import { UserProfile } from "@spotify/web-api-ts-sdk";
import getAPI from "@/lib/getAPI";

// Only if using TypeScript
declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export const UserContext = createContext<UserProfile | undefined>(undefined);

export function Providers({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile>();
  const [, setToken] = useState("");
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

  return (
    <UserContext.Provider value={user}>
      <HeroUIProvider navigate={router.push}>{children}</HeroUIProvider>{" "}
    </UserContext.Provider>
  );
}
