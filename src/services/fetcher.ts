import { mutate } from "swr";
import { VITE_API_BASE_URL } from "../constants/index";
import axios from "axios";
import { FetchResponse, User } from "../types";

// axios.interceptors.request.use(function (config) {
//   config.headers["Content-Type"] = "application/json";
//   config.headers["Authorization"] = "Bearer " + localStorage.getItem("token");
//   return config;
// });

export const axiosInstance = axios.create({
  baseURL: VITE_API_BASE_URL,
  withCredentials: true
});
// axiosInstance.interceptors.request.use(function (config) {
//   config.headers.Authorization = "Bearer " + localStorage.getItem("token");
//   return config;
// });

export const fetcher = (url: string) =>
  axiosInstance
    .get(url, { signal: AbortSignal.timeout(20000) })
    .then((res) => res.data);

export async function fetchDataLocally(query: string) {
  const key = `user/bulk?filter=${query}`;

  // Programmatically fetch data and store it in SWR's cache
  const data = await mutate<FetchResponse<{ users: User[] }>>(
    key,
    () => fetcher(key),
    { revalidate: false }
  );

  return data; // Data is now cached and can be reused
}
