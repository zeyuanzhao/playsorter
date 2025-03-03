export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
export interface TrackExtracted {
  id: number;
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
