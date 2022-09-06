import { useAttrs } from "#imports";

export default function useTypedAttrs<T extends Record<string, unknown>>(): T {
  return useAttrs() as T;
}
