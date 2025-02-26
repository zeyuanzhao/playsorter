import { HttpMethod } from "@/interfaces";

const getAPI = async (
  method: HttpMethod,
  endpoint: string,
  params: Record<string, unknown> | null = null
) => {
  const accessToken = localStorage.getItem("access_token");

  let url = "https://api.spotify.com/v1/" + endpoint;

  if (method === "GET" && params) {
    const queryParams = new URLSearchParams(
      params as Record<string, string>
    ).toString();
    url += `?${queryParams}`;
  }

  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: method !== "GET" && params ? JSON.stringify(params) : null,
  });

  const data = await response.json();
  return data;
};

export default getAPI;
