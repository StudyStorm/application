import { HTTPRequest } from "@nuxtjs-alt/auth";
import { FetchError } from "ohmyfetch";
import { Ref, unref, UnwrapRef } from "vue";
import { useFetch } from "#app";
import useAuth from "~/composables/useAuth";

type Response<T, U> = Promise<{
  data: T | null;
  error: FetchError<U> | null;
}>;

type ResponseRef<T, U> = Promise<{
  data: Ref<UnwrapRef<T | null>>;
  error: Ref<UnwrapRef<FetchError<U> | null>>;
}>;

type FetchAPIOpts = HTTPRequest & {
  useFetch?: boolean;
};

export function useFetchAPI<DataT = never, ErrorT = never>(
  path: string,
  options?: FetchAPIOpts
): Response<DataT, ErrorT> {
  const config = useRuntimeConfig();
  if (options?.useFetch) {
    return useFetch(path, {
      ...options,
      baseURL: config.apiURL,
      initialCache: false,
      credentials: "include",
    }).then((res) => {
      return {
        data: unref(res.data),
        error: unref(res.error),
      };
    }) as Response<DataT, ErrorT>;
  }
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
  options?: FetchAPIOpts
): ResponseRef<DataT, ErrorT> {
  const { data, error } = await useFetchAPI<DataT, ErrorT>(path, options);
  return {
    data: ref(data),
    error: ref(error),
  };
}
