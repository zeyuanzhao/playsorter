"use client";

import { UserContext } from "@/app/providers";
import LoadingScreen from "@/components/LoadingScreen";
import { defaultSorts } from "@/constants";
import { SortType, TrackExtracted } from "@/interfaces";
import getAPI from "@/lib/getAPI";
import getNestedProperty from "@/lib/getNestedProperty";
import getTracks from "@/lib/getTracks";
import savePlaylist from "@/lib/savePlaylist";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
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
import { useContext, useEffect, useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaSortAlphaDown,
  FaSortAlphaUp,
} from "react-icons/fa";

const Playlist = () => {
  const { id }: { id: string } = useParams();
  const [playlist, setPlaylist] = useState<PlaylistType>();
  const [tracks, setTracks] = useState<(PlaylistedTrack & { id: number })[]>();
  const [tracksExtracted, setTracksExtracted] = useState<TrackExtracted[]>([]);
  const [sorts, setSorts] = useState<SortType[]>(defaultSorts);
  const [originalTracksExtracted, setOriginalTracksExtracted] = useState<
    TrackExtracted[]
  >([]);
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within a UserProvider");
  }
  const [user] = userContext;

  const tableColumns = [
    { label: "Title", key: "name" },
    { label: "Album", key: "albumName" },
    { label: "Artist", key: "artists" },
    {
      label: "Duration",
      key: "duration",
      align: "end",
      format: (duration: number) => {
        const hours = Math.floor(duration / 3600000);
        const minutes = Math.floor(duration / 60000);
        const seconds = ((duration % 60000) / 1000).toFixed(0);
        return `${hours !== 0 ? `${hours}:` : ""}${minutes}:${seconds.padStart(
          2,
          "0"
        )}`;
      },
    },
  ];

  useEffect(() => {
    // sort the tracks using the sorts array
    let sortActive = false;
    const sortedTracks = [...tracksExtracted].sort((a, b) => {
      for (const sort of sorts) {
        if (!sort.active) continue;
        sortActive = true;
        const aValue = getNestedProperty(a, sort.id);
        const bValue = getNestedProperty(b, sort.id);
        if (typeof aValue === "string" && typeof bValue === "string") {
          if (aValue.toLowerCase() < bValue.toLowerCase()) {
            return sort.direction === "asc" ? -1 : 1;
          } else if (aValue.toLowerCase() > bValue.toLowerCase()) {
            return sort.direction === "asc" ? 1 : -1;
          }
        }
        if (aValue < bValue) {
          return sort.direction === "asc" ? -1 : 1;
        } else if (aValue > bValue) {
          return sort.direction === "asc" ? 1 : -1;
        }
      }
      return 0;
    });
    if (!sortActive) {
      setTracksExtracted(originalTracksExtracted);
      return;
    }
    setTracksExtracted(sortedTracks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorts]);

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
              uri: track.track.uri,
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
        setTracksExtracted(tempTracksExtracted);
        setOriginalTracksExtracted(tempTracksExtracted);
      });
    }
  }, [id]);

  if (!playlist || !tracks) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <div className="mb-6 flex flex-row justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-1">{playlist?.name}</h1>
          <div className="flex gap-x-2">
            <h2 className="text-xl">{playlist?.owner.display_name}</h2>
            <span className="text-xl">•</span>
            <h2 className="text-xl">{playlist?.tracks.total} Songs</h2>
          </div>
        </div>
        <div className="flex flex-col justify-end">
          <div className="flex flex-row gap-x-2">
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered">Sort by</Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Sort By"
                closeOnSelect={false}
                variant="bordered"
              >
                {sorts.map((sort, i) => (
                  <DropdownItem
                    textValue={sort.name}
                    key={sort.id}
                    endContent={
                      <div
                        className="flex flex-row justify-between items-center"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <div
                          className="ml-2 flex justify-between items-center"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <button
                            className="p-1 hover:outline outline-1 outline-gray-400 rounded-lg"
                            onClick={() => {
                              if (i > 0) {
                                const newSorts = [...sorts];
                                [newSorts[i - 1], newSorts[i]] = [
                                  newSorts[i],
                                  newSorts[i - 1],
                                ];
                                setSorts(newSorts);
                              }
                            }}
                          >
                            <FaChevronUp />
                          </button>
                          <button
                            className="p-1 hover:outline outline-1 outline-gray-400 rounded-lg"
                            onClick={() => {
                              if (i < sorts.length - 1) {
                                const newSorts = [...sorts];
                                [newSorts[i + 1], newSorts[i]] = [
                                  newSorts[i],
                                  newSorts[i + 1],
                                ];
                                setSorts(newSorts);
                              }
                            }}
                          >
                            <FaChevronDown />
                          </button>
                        </div>
                      </div>
                    }
                  >
                    {/* TODO fix stop propagation */}
                    <div
                      className="flex flex-row gap-x-2 items-center w-full"
                      onClick={() => {
                        const newSorts = [...sorts];
                        if (
                          newSorts[i].direction === "desc" &&
                          newSorts[i].active
                        ) {
                          newSorts[i].active = !sort.active;
                        } else if (!newSorts[i].active) {
                          newSorts[i].direction = "asc";
                          newSorts[i].active = true;
                        } else if (newSorts[i].direction === "asc") {
                          newSorts[i].direction = "desc";
                        }
                        setSorts(newSorts);
                      }}
                    >
                      <p>{sort.name}</p>
                      {sort.active ? (
                        sort.direction === "asc" ? (
                          <FaSortAlphaUp />
                        ) : (
                          <FaSortAlphaDown />
                        )
                      ) : null}
                    </div>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              color="primary"
              onPress={() => {
                if (user) {
                  savePlaylist(tracksExtracted, user, playlist);
                }
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
      <Table
        isStriped
        className="table-auto mb-8"
        aria-label="Tracks in playlist"
      >
        <TableHeader columns={tableColumns}>
          {(column) => (
            <TableColumn
              key={column.key}
              align={
                (column.align as "center" | "start" | "end" | undefined) ??
                "start"
              }
            >
              {column.label}
            </TableColumn>
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
                  {getNestedProperty(
                    item,
                    columnKey as string,
                    tableColumns.find((column) => column.key === columnKey)
                      ?.format
                  )}
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
