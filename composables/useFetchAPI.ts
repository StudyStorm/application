import { useFetch, useRuntimeConfig } from "#app";

export default function useFetchAPI<T>(request) {
  const config = useRuntimeConfig();
  return useFetch<T>(request, {
    baseURL: config.apiURL,
  });
}
