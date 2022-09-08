import { useEventBus } from "@vueuse/core";

type Events =
  | "classroom:created"
  | "deck:created"
  | "folder:created"
  | "classroom:deleted";
export function useAppBus() {
  return useEventBus<Events>("studystorm");
}
