import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SpotiList",
  description: "Edit Spotify Playlists",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
