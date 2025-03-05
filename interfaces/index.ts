export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface SortType {
  id: keyof TrackExtracted;
  name: string;
  active: boolean;
  direction: "asc" | "desc";
}

export interface TrackExtracted {
  id: number;
  uri: string;
  name: string;
  albumName: string;
  artists: string;
  addedAt: string;
  addedBy: string;
  isLocal: boolean;
  duration: number;
  explicit: boolean;
  isPlayable: boolean;
  popularity: number;
}
