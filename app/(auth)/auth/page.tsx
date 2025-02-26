"use client";
import getCodeChallenge from "@/lib/getCodeChallenge";
import { Button } from "@heroui/react";

const authenticate = async () => {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_ID!;
  const redirectUri = `${window.location.origin}/auth/callback`;

  const scope =
    "user-read-private user-read-email user-library-modify playlist-modify-private playlist-read-private playlist-modify-public user-follow-modify user-follow-read";
  const authUrl = new URL("https://accounts.spotify.com/authorize");

  const { codeChallenge, codeVerifier } = await getCodeChallenge();
  window.localStorage.setItem("code_verifier", codeVerifier);

  const params = {
    response_type: "code",
    client_id: clientId,
    scope,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
};

const logOut = () => {
  window.localStorage.removeItem("access_token");
  window.location.reload();
};

const Auth = () => {
  return (
    <div>
      <h1 className="text-4xl">Auth</h1>
      <div></div>
      <Button onPress={authenticate}>Authenticate</Button>
      <Button onPress={logOut}>Log Out</Button>
    </div>
  );
};

export default Auth;
