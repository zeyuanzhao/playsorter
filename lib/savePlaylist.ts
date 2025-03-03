import { TrackExtracted } from "@/interfaces";
import { Playlist, UserProfile } from "@spotify/web-api-ts-sdk";
import getAPI from "./getAPI";

const savePlaylist = async (
  tracks: TrackExtracted[],
  user: UserProfile,
  playlist: Playlist
) => {
  const uris = tracks.map((track) => track.uri);
  const newPlaylist = getAPI("POST", `users/${user.id}/playlists`, {
    name: playlist.name + " (sorted)",
    public: playlist.public,
    collaborative: playlist.collaborative,
    description: playlist.description,
  });
  newPlaylist.then(async (data) => {
    for (let i = 0; i < uris.length; i += 100) {
      await getAPI("POST", `playlists/${data.id}/tracks`, {
        uris: uris.slice(i, i + 100),
      });
      await setTimeout(() => {}, 250);
    }
  });
};

export default savePlaylist;
