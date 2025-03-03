"use client";

import LoadingScreen from "@/components/LoadingScreen";
import Track from "@/components/Track";
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
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const getNestedProperty = (obj: any, path: string) => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

const Playlist = () => {
  const { id }: { id: string } = useParams();
  const [playlist, setPlaylist] = useState<PlaylistType>();
  const [tracks, setTracks] = useState<(PlaylistedTrack & { id: number })[]>();

  const tableColumns = [
    { label: "Title", key: "track.name" },
    { label: "Album", key: "track.album.name" },
    { label: "Artist", key: "track.artists[0].name" },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      getAPI("GET", `playlists/${id}`).then((data) => {
        setPlaylist(data);
      });
      getTracks(id).then((data) => {
        setTracks(
          data.map((track, i) => ({
            ...track,
            id: i,
          }))
        );
      });
    }
  }, [id]);

  if (!playlist || !tracks) {
    return <LoadingScreen />;
  }

  // TODO fix accessing nested properties and display artists in a list

  return (
    <div>
      <h1 className="text-4xl font-bold mb-1">{playlist?.name}</h1>
      <div className="flex gap-x-2 mb-8">
        <h2 className="text-xl">{playlist?.owner.display_name}</h2>
        <span className="text-xl">•</span>
        <h2 className="text-xl">{playlist?.tracks.total} Songs</h2>
      </div>
      <Table className="table-auto">
        <TableHeader columns={tableColumns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={tracks}>
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
