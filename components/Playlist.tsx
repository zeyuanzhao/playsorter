"use client";
/* eslint-disable @next/next/no-img-element */
import { Playlist as PlaylistType } from "@spotify/web-api-ts-sdk";
import Image from "next/image";

const Playlist = (playlist: PlaylistType) => {
  if (!playlist) return null;

  const imageUrl = playlist.images && playlist.images[0]?.url;

  return (
    <div>
      <h1>Playlist</h1>
      <h2>{playlist.name}</h2>

      <Image src={imageUrl} alt={playlist.name} width={100} height={100} />
    </div>
  );
};
export default Playlist;
