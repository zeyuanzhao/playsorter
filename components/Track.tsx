import isTrackType from "@/lib/isTrackType";
import { SimplifiedArtist, TrackItem } from "@spotify/web-api-ts-sdk";

const Track = ({ track }: { track: TrackItem }) => {
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
