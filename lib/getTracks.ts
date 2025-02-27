import { Page, TrackItem } from "@spotify/web-api-ts-sdk";
import getAPI from "./getAPI";

const getTracks = async (playlistId: string) => {
  const tracks = [];
  while (true) {
    const res: Page<TrackItem> = await getAPI(
      "GET",
      `playlists/${playlistId}/tracks`,
      {}
    );
    res.items.forEach((track) => {
      tracks.push(track);
    });
  }
};

export default getTracks;
