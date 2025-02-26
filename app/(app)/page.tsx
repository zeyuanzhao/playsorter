"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [token, setToken] = useState(
    localStorage.getItem("access_token") ?? ""
  );
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (token === "") {
      router.push("/auth");
    }
  }, []);

  return (
    <div>
      <h1>Spotilist</h1>
      <p>{token}</p>
    </div>
  );
}
