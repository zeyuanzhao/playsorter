"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const getToken = async (code: string) => {
  const codeVerifier = localStorage.getItem("code_verifier") ?? "";
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_ID!;
  const redirectUri = `${window.location.origin}/auth/callback`;

  const url = "https://accounts.spotify.com/api/token";
  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  };

  const body = await fetch(url, payload);
  const response = await body.json();

  if (response.access_token !== undefined)
    localStorage.setItem("access_token", response.access_token);
};

const Callback = () => {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code") ?? "";
    if (code === "") router.push("/auth");
    getToken(code).then(() => {
      router.push("/");
    });
  }, [router]);

  return (
    <div>
      <h1 className="text-4xl">Callback</h1>
    </div>
  );
};

export default Callback;
