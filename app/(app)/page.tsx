"use client";

import Playlist from "@/components/Playlist";
import UserInfo from "@/components/UserInfo";
import getAPI from "@/lib/getAPI";
import { Playlist as PlaylistType, UserProfile } from "@spotify/web-api-ts-sdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [user, setUser] = useState<UserProfile>();
  const [playlists, setPlaylists] = useState<PlaylistType[]>([]);

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
        getAPI("GET", "me/playlists", { limit: 5 }).then((data) => {
          console.log("Fetched playlists:", data.items);
          setPlaylists(data.items);
        });
      }
    }
  }, [router]);

  return (
    <div>
      <h1>Spotilist</h1>
      <div>{user && <UserInfo user={user}></UserInfo>}</div>
      <div>
        {playlists.map((playlist) => {
          return <Playlist key={playlist.id} {...playlist} />;
        })}
      </div>
    </div>
  );
}
