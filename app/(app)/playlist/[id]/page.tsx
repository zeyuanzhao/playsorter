"use client";

import LoadingScreen from "@/components/LoadingScreen";
import Track from "@/components/Track";
import getAPI from "@/lib/getAPI";
import getTracks from "@/lib/getTracks";
import {
  Page,
  Playlist as PlaylistType,
  PlaylistedTrack,
  SimplifiedTrack,
  TrackItem,
} from "@spotify/web-api-ts-sdk";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Playlist = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState<PlaylistType>();
  const [tracks, setTracks] = useState<Page<TrackItem>>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      getAPI("GET", `playlists/${id}`).then((data) => {
        setPlaylist(data);
      });
      // getTracks(id).then((data) => {
      //   setTracks(data);
      // });
      getAPI("GET", `playlists/${id}/tracks`).then((data) => {
        setTracks(data);
      });
    }
  }, []);

  if (!playlist || !tracks) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <p>Playlist ID: {id}</p>
      <p>Playlist Name: {playlist?.name}</p>
      <p>Track Limit: {tracks?.limit}</p>
      {playlist?.tracks.items.map((track: PlaylistedTrack) => (
        <Track key={track.track.id + track.added_at} track={track.track} />
      ))}
    </div>
  );
};

export default Playlist;
