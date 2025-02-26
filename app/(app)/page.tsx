"use client";

import Playlist from "@/components/Playlist";
import getAPI from "@/lib/getAPI";
import { Playlist as PlaylistType } from "@spotify/web-api-ts-sdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [user, setUser] = useState([]);
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
        getAPI("GET", "me/playlists").then((data) => {
          setPlaylists(data.items);
        });
      }
    }
  }, [router]);

  return (
    <div>
      <h1>Spotilist</h1>
      <div>
        {playlists.length > 0 &&
          playlists.map((playlist) => {
            return <Playlist key={playlist.id} {...playlist} />;
          })}
      </div>
    </div>
  );
}
