import { Page, PlaylistedTrack } from "@spotify/web-api-ts-sdk";
import getAPI from "./getAPI";
import isTrackType from "./isTrackType";

const getTracks = async (playlistId: string) => {
  const tracks: PlaylistedTrack[] = [];
  const LIMIT = 100;
  let offset = 0;
  while (true) {
    const res: Page<PlaylistedTrack> = await getAPI(
      "GET",
      `playlists/${playlistId}/tracks`,
      { limit: LIMIT, offset }
    );
    res.items.forEach((track: PlaylistedTrack) => {
      if (isTrackType(track.track)) tracks.push(track);
    });
    offset += LIMIT;
    if (res.next === null) {
      break;
    }
  }

  return tracks;
};

export default getTracks;
