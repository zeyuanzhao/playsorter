import { HttpMethod } from "@/interfaces";

const getAPI = async (
  method: HttpMethod,
  endpoint: string,
  params: Record<string, unknown> | null = null
) => {
  const accessToken = localStorage.getItem("access_token");
  const response = await fetch("https://api.spotify.com/v1/" + endpoint, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: params ? JSON.stringify(params) : null,
  });
  const data = await response.json();
  return data;
};

export default getAPI;
