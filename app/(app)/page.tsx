"use client";

import Playlist from "@/components/Playlist";
import UserInfo from "@/components/UserInfo";
import getAPI from "@/lib/getAPI";
import { Playlist as PlaylistType, UserProfile } from "@spotify/web-api-ts-sdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [playlists, setPlaylists] = useState<PlaylistType[]>([]);

  useEffect(() => {
    getAPI("GET", "me/playlists", { limit: 50 }).then((data) => {
      setPlaylists(data.items);
    });
  }, [router]);

  return (
    <div className="px-4 pt-4">
      <div className="flex flex-row flex-wrap gap-4">
        {playlists?.length > 0 &&
          playlists.map((playlist) => {
            return <Playlist key={playlist.id} {...playlist} />;
          })}
      </div>
    </div>
  );
}
