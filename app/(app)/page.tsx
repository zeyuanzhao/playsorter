"use client";

import getAPI from "@/lib/getAPI";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [user, setUser] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("access_token") ?? "";
      setToken(storedToken);

      if (storedToken === "") {
        router.push("/auth");
      } else {
        getAPI("GET", "me").then((data) => {
          setUser(data);
        });
        getAPI("GET", "me/playlists").then((data) => {
          setPlaylists(data);
        });
      }
    }
  }, [router]);

  return (
    <div>
      <h1>Spotilist</h1>
      <p>{token}</p>
      <p>{JSON.stringify(user)}</p>
      <p>{JSON.stringify(playlists)}</p>
    </div>
  );
}
