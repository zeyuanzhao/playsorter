"use client";
/* eslint-disable @next/next/no-img-element */
import { Playlist as PlaylistType } from "@spotify/web-api-ts-sdk";
import Image from "next/image";

const Playlist = (playlist: PlaylistType) => {
  if (!playlist) return null;

  const imageUrl = playlist.images && playlist.images[0]?.url;

  return (
    <div className="flex flex-col items-center w-36 h-56 border">
      <div className="mb-2 w-36 h-36">
        {imageUrl ? (
          <Image src={imageUrl} alt={playlist.name} width={256} height={256} />
        ) : (
          <svg
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            className="e-9640-icon"
            data-testid="playlist"
            viewBox="0 0 24 24"
          >
            <path d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z"></path>
          </svg>
        )}
      </div>
      <div className="break-all flex flex-col items-center px-1">
        <h2 className="line-clamp-2">{playlist.name}</h2>
        <p>{playlist.tracks.total} Songs</p>
      </div>
    </div>
  );
};
export default Playlist;
