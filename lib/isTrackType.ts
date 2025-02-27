import { TrackItem, Track } from "@spotify/web-api-ts-sdk";

const isTrackType = (track: TrackItem): track is Track => {
  return (track as Track).artists !== undefined;
};

export default isTrackType;
