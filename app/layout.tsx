import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import LoadingScreen from "@/components/LoadingScreen";

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
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
