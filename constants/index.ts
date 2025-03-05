import { SortType } from "@/interfaces";

export const defaultSorts: SortType[] = [
  { id: "name", name: "Title", active: false, direction: "asc" },
  { id: "albumName", name: "Album", active: false, direction: "asc" },
  { id: "artists", name: "Artist", active: false, direction: "asc" },
  { id: "duration", name: "Duration", active: false, direction: "asc" },
  { id: "addedAt", name: "Added At", active: false, direction: "asc" },
  { id: "addedBy", name: "Added By", active: false, direction: "asc" },
  { id: "isLocal", name: "Local", active: false, direction: "asc" },
  { id: "explicit", name: "Explicit", active: false, direction: "asc" },
  { id: "isPlayable", name: "Playable", active: false, direction: "asc" },
  { id: "popularity", name: "Popularity", active: false, direction: "asc" },
];
