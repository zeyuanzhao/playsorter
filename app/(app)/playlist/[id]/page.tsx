"use client";

import LoadingScreen from "@/components/LoadingScreen";
import Track from "@/components/Track";
import getAPI from "@/lib/getAPI";
import getTracks from "@/lib/getTracks";
import {
  Playlist as PlaylistType,
  PlaylistedTrack,
} from "@spotify/web-api-ts-sdk";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Playlist = () => {
  const { id }: { id: string } = useParams();
  const [playlist, setPlaylist] = useState<PlaylistType>();
  const [tracks, setTracks] = useState<PlaylistedTrack[]>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      getAPI("GET", `playlists/${id}`).then((data) => {
        setPlaylist(data);
      });
      getTracks(id).then((data) => {
        setTracks(data);
      });
    }
  }, []);

  if (!playlist || !tracks) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <h1>{playlist?.name}</h1>
      {tracks.map((track: PlaylistedTrack, i) => {
        return <Track key={i} track={track.track} />;
      })}
    </div>
  );
};

export default Playlist;
