"use client";

import LoadingScreen from "@/components/LoadingScreen";
import Track from "@/components/Track";
import { TrackExtracted } from "@/interfaces";
import getAPI from "@/lib/getAPI";
import getTracks from "@/lib/getTracks";
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import {
  Playlist as PlaylistType,
  Track as TrackType,
  PlaylistedTrack,
  SimplifiedArtist,
} from "@spotify/web-api-ts-sdk";
import { assert } from "console";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const getNestedProperty = (obj: any, path: string) => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

const Playlist = () => {
  const { id }: { id: string } = useParams();
  const [playlist, setPlaylist] = useState<PlaylistType>();
  const [tracks, setTracks] = useState<(PlaylistedTrack & { id: number })[]>();
  const [tracksExtracted, setTracksExtracted] = useState<TrackExtracted[]>([]);

  const tableColumns = [
    { label: "Title", key: "name" },
    { label: "Album", key: "albumName" },
    { label: "Artist", key: "artists" },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      getAPI("GET", `playlists/${id}`).then((data) => {
        setPlaylist(data);
      });
      getTracks(id).then((data) => {
        const tempTracksExtracted: TrackExtracted[] = [];

        setTracks(
          data.map((track, i) => {
            tempTracksExtracted.push({
              id: i,
              name: track.track.name,
              albumName: (track.track as TrackType).album.name,
              artists: (track.track as TrackType).artists
                .map((artist: SimplifiedArtist) => {
                  return artist.name;
                })
                .join(", "),
              addedAt: track.added_at,
              addedBy: track.added_by.id,
              isLocal: track.is_local,
              duration: (track.track as TrackType).duration_ms,
              explicit: (track.track as TrackType).explicit,
              isPlayable: (track.track as TrackType).is_playable ?? true,
              popularity: (track.track as TrackType).popularity,
            });
            return {
              ...track,
              id: i,
            };
          })
        );
        console.log(tempTracksExtracted);
        setTracksExtracted(tempTracksExtracted);
      });
    }
  }, [id]);

  if (!playlist || !tracks) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-1">{playlist?.name}</h1>
      <div className="flex gap-x-2 mb-8">
        <h2 className="text-xl">{playlist?.owner.display_name}</h2>
        <span className="text-xl">•</span>
        <h2 className="text-xl">{playlist?.tracks.total} Songs</h2>
      </div>
      <Table isStriped className="table-auto mb-8">
        <TableHeader columns={tableColumns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No songs in playlist."}
          items={tracksExtracted}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {getNestedProperty(item, columnKey as string)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Playlist;
