import { TrackExtracted } from "@/interfaces";
import { Playlist, UserProfile } from "@spotify/web-api-ts-sdk";
import getAPI from "./getAPI";

const savePlaylist = (
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
  newPlaylist.then((data) => {
    getAPI("POST", `playlists/${data.id}/tracks`, {
      uris,
    });
  });
};

export default savePlaylist;
