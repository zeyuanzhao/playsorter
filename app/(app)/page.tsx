"use client";

import LoadingScreen from "@/components/LoadingScreen";
import PlaylistCard from "@/components/PlaylistCard";
import getAPI from "@/lib/getAPI";
import { Playlist as PlaylistType } from "@spotify/web-api-ts-sdk";
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

  if (!playlists) {
    return <LoadingScreen />;
  }

  return (
    <div className="px-4 pt-4 pb-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {playlists?.length > 0 &&
          playlists.map((playlist) => {
            return <PlaylistCard key={playlist.id} {...playlist} />;
          })}
      </div>
    </div>
  );
}
