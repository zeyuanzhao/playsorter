"use client";
/* eslint-disable @next/next/no-img-element */
import { Playlist as PlaylistType } from "@spotify/web-api-ts-sdk";
import Image from "next/image";

const Playlist = (playlist: PlaylistType) => {
  if (!playlist) return null;

  const imageUrl = playlist.images && playlist.images[0]?.url;

  return (
    <div className="flex flex-col items-center w-36 h-52 border">
      <div className="mb-2">
        <Image src={imageUrl} alt={playlist.name} width={256} height={256} />
      </div>
      <div className="break-all flex flex-col items-center">
        <h2>{playlist.name}</h2>
        <p>{playlist.tracks.total} Songs</p>
      </div>
    </div>
  );
};
export default Playlist;
