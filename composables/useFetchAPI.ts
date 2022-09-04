import { useFetch, useLazyFetch, useRuntimeConfig } from "#app";
import { NitroFetchRequest } from "nitropack";
import { AsyncData, KeyOfRes, PickFrom } from "#app/composables/asyncData";
import { Ref } from "vue";
import { FetchResult, UseFetchOptions } from "#app/composables/fetch";
import { FetchError } from "ohmyfetch";

export function useFetchAPI<
  ResT = void,
  ErrorT = void,
  ReqT extends NitroFetchRequest = NitroFetchRequest,
  _ResT = ResT extends void ? FetchResult<ReqT> : ResT,
  Transform extends (res: _ResT) => any = (res: _ResT) => _ResT,
  PickKeys extends KeyOfRes<Transform> = KeyOfRes<Transform>
>(
  request: Ref<ReqT> | ReqT | (() => ReqT),
  opts?: UseFetchOptions<_ResT, Transform, PickKeys>
) {
  const config = useRuntimeConfig();
  return useFetch(request, {
    ...opts,
    baseURL: config.apiURL,
    initialCache: false,
    credentials: "include",
  }) as AsyncData<
    PickFrom<ReturnType<Transform>, PickKeys>,
    FetchError<ErrorT> | null
  >;
}

export function useLazyFetchAPI<
  ResT = void,
  ErrorT = void,
  ReqT extends NitroFetchRequest = NitroFetchRequest,
  _ResT = ResT extends void ? FetchResult<ReqT> : ResT,
  Transform extends (res: _ResT) => any = (res: _ResT) => _ResT,
  PickKeys extends KeyOfRes<Transform> = KeyOfRes<Transform>
>(
  request: Ref<ReqT> | ReqT | (() => ReqT),
  opts?: Omit<UseFetchOptions<_ResT, Transform, PickKeys>, "lazy">
) {
  const config = useRuntimeConfig();
  return useLazyFetch(request, {
    ...opts,
    baseURL: config.apiURL,
    initialCache: false,
    credentials: "include",
  }) as AsyncData<
    PickFrom<ReturnType<Transform>, PickKeys>,
    FetchError<ErrorT> | null
  >;
}
