"use client";
/* eslint-disable @next/next/no-img-element */
import { Playlist as PlaylistType } from "@spotify/web-api-ts-sdk";
import Image from "next/image";

const Playlist = (playlist: PlaylistType) => {
  if (!playlist) return null;
  return (
    <div>
      <h1>Playlist</h1>
      <h2>{playlist.name}</h2>

      {playlist.images !== null && playlist.images[0]?.url.length > 0 ? (
        <img
          src={playlist.images[0]?.url}
          alt={playlist.name}
          width={100}
          height={100}
        />
      ) : null}
    </div>
  );
};
export default Playlist;
