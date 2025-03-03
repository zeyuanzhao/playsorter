export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export type SortType = keyof TrackExtracted;

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
