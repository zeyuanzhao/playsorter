"use client";

import { TokenContext } from "@/app/providers";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

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

  if (response.access_token !== undefined) {
    localStorage.setItem("access_token", response.access_token);
    return response.access_token;
  }
  return null;
};

const Callback = () => {
  const router = useRouter();
  const tokenContext = useContext(TokenContext);
  if (!tokenContext) {
    throw new Error("TokenContext must be used within a TokenProvider");
  }
  const [, setToken] = tokenContext;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code") ?? "";
    if (code === "") router.push("/auth");
    getToken(code).then((token: string) => {
      setToken(token);
      router.push("/");
    });
  }, [router, setToken]);

  return (
    <div>
      <h1 className="text-4xl">Callback</h1>
    </div>
  );
};

export default Callback;
