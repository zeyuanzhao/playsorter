"use client";

import { useRouter } from "next/navigation";
import { HeroUIProvider } from "@heroui/react";
import { createContext, Dispatch, useEffect, useState } from "react";
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

export const UserContext = createContext<
  [UserProfile | undefined, Dispatch<UserProfile>] | undefined
>(undefined);
export const TokenContext = createContext<
  [string | undefined, Dispatch<string>] | undefined
>(undefined);

export function Providers({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile>();
  const [token, setToken] = useState<string>("");
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
  }, [router, token]);

  return (
    <TokenContext.Provider value={[token, setToken]}>
      <UserContext.Provider value={[user, setUser]}>
        <HeroUIProvider navigate={router.push}>{children}</HeroUIProvider>{" "}
      </UserContext.Provider>
    </TokenContext.Provider>
  );
}
