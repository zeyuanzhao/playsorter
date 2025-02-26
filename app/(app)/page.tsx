"use client";

import getAPI from "@/lib/getAPI";
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
    getAPI("GET", "me").then((data) => {
      setUser(data);
    });
  }, []);

  return (
    <div>
      <h1>Spotilist</h1>
      <p>{token}</p>
      <p>{JSON.stringify(user)}</p>
    </div>
  );
}
