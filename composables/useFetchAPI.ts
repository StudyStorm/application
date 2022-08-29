import { useFetch, useLazyFetch, useRuntimeConfig } from "#app";
import { NitroFetchRequest } from "nitropack";
import { AsyncData, KeyOfRes, PickFrom } from "#app/composables/asyncData";
import { Ref } from "vue";
import { FetchResult, UseFetchOptions } from "#app/composables/fetch";

export function useFetchAPI<
  ResT = void,
  ErrorT = Error,
  ReqT extends NitroFetchRequest = NitroFetchRequest,
  _ResT = ResT extends void ? FetchResult<ReqT> : ResT,
  Transform extends (res: _ResT) => any = (res: _ResT) => _ResT,
  PickKeys extends KeyOfRes<Transform> = KeyOfRes<Transform>
>(
  request: Ref<ReqT> | ReqT | (() => ReqT),
  opts?: UseFetchOptions<_ResT, Transform, PickKeys>
): AsyncData<PickFrom<ReturnType<Transform>, PickKeys>, ErrorT | null | true> {
  const config = useRuntimeConfig();
  return useFetch(request, {
    ...opts,
    baseURL: config.apiURL,
  });
}

export function useLazyFetchAPI<
  ResT = void,
  ErrorT = Error,
  ReqT extends NitroFetchRequest = NitroFetchRequest,
  _ResT = ResT extends void ? FetchResult<ReqT> : ResT,
  Transform extends (res: _ResT) => any = (res: _ResT) => _ResT,
  PickKeys extends KeyOfRes<Transform> = KeyOfRes<Transform>
>(
  request: Ref<ReqT> | ReqT | (() => ReqT),
  opts?: Omit<UseFetchOptions<_ResT, Transform, PickKeys>, "lazy">
): AsyncData<PickFrom<ReturnType<Transform>, PickKeys>, ErrorT | null | true> {
  const config = useRuntimeConfig();
  return useLazyFetch(request, {
    ...opts,
    baseURL: config.apiURL,
  });
}
