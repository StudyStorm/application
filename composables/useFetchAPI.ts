import { useAuth, useRuntimeConfig } from "#build/imports";
import { HTTPRequest } from "@nuxtjs-alt/auth";
import { FetchError } from "ohmyfetch";
import { Ref, UnwrapRef } from "vue";

type Response<T, U> = Promise<{
  data: T | null;
  error: FetchError<U> | null;
}>;

type ResponseRef<T, U> = Promise<{
  data: Ref<UnwrapRef<T | null>>;
  error: Ref<UnwrapRef<FetchError<U> | null>>;
}>;

export function useFetchAPI<DataT = never, ErrorT = never>(
  path: string,
  options?: HTTPRequest
): Response<DataT, ErrorT> {
  const config = useRuntimeConfig();
  const auth = useAuth();
  return auth
    .request(
      {
        url: path,
        baseURL: config.apiURL,
        cache: "no-cache",
      },
      options
    )
    .then((data) => ({
      data: data as unknown as DataT,
      error: null,
    }))
    .catch((error) => ({
      data: null,
      error,
    }));
}

export async function useFetchAPIRef<DataT = never, ErrorT = never>(
  path: string,
  options?: HTTPRequest
): ResponseRef<DataT, ErrorT> {
  const { data, error } = await useFetchAPI<DataT, ErrorT>(path, options);
  return {
    data: ref(data),
    error: ref(error),
  };
}
