import isTrackType from "@/lib/isTrackType";
import {
  Artist,
  PlaylistedTrack,
  SimplifiedArtist,
  TrackItem,
  Track as TrackType,
} from "@spotify/web-api-ts-sdk";

const Track = ({ track }: { track: TrackItem }) => {
  // check if track is a TrackType using a type guard
  if (isTrackType(track)) {
    return (
      <div className="flex flex-row justify-between">
        <p>{track.name}</p>
        <p>
          {track.artists.map((artist: SimplifiedArtist) => {
            return " " + artist.name;
          })}
        </p>
      </div>
    );
  }
};

export default Track;
