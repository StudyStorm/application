import { useAuth, useRuntimeConfig } from "#build/imports";
import { HTTPRequest } from "@nuxtjs-alt/auth";
import { FetchError } from "ohmyfetch";

type Response<T, U> = Promise<{
  data: T | null;
  error: FetchError<U> | null;
}>;

export function useFetchAPI<DataT = never, ErrorT = never>(
  path: string,
  options: HTTPRequest
): Response<DataT, ErrorT> {
  const config = useRuntimeConfig();
  const auth = useAuth();
  return auth
    .request({
      url: path,
      baseURL: config.apiURL,
      ...options,
    })
    .then((data) => ({
      data: data as unknown as DataT,
      error: null,
    }))
    .catch((error) => ({
      data: null,
      error,
    }));
}
