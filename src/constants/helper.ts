import { VITE_API_BASE_URL } from ".";

export function customFetchRequest(
  path: string,
  options: RequestInit = {},
  isUsingToken: boolean = true
) {
  options.headers = {
    "Content-Type": "application/json",
  };
  if (isUsingToken) {
    options.credentials = "include";
    options.headers["Authorization"] = `Bearer ${localStorage.getItem(
      "token"
    )}`;
  }
  return fetch(VITE_API_BASE_URL + path, options);
}
