"use client";

import { useParams } from "next/navigation";

const Playlist = () => {
  const { id } = useParams();

  return (
    <div>
      <p>Playlist ID: {id}</p>
    </div>
  );
};

export default Playlist;
