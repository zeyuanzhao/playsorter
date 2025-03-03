import isTrackType from "@/lib/isTrackType";
import { TableCell, TableRow } from "@heroui/react";
import { SimplifiedArtist, TrackItem } from "@spotify/web-api-ts-sdk";

const Track = ({
  track,
  tableKey,
}: {
  track: TrackItem;
  tableKey: unknown;
}) => {
  if (isTrackType(track)) {
    return (
      <TableRow key={String(tableKey)}>
        <TableCell>
          <p>{track.name}</p>
        </TableCell>
        <TableCell>
          <p>{track.album.name}</p>
        </TableCell>
        <TableCell>
          {track.artists
            .map((artist: SimplifiedArtist) => {
              return artist.name;
            })
            .join(", ")}
        </TableCell>
      </TableRow>
    );
  }
};

export default Track;
