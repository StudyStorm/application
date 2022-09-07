import { isClient, MaybeComputedRef } from "@vueuse/shared";
import { useEventListener } from "@vueuse/core";

export default function useDrop<T>(
  target: MaybeComputedRef<HTMLElement | null | undefined>,
  callback: (data: T) => void
) {
  if (!isClient) return;
  useEventListener<DragEvent>(
    target,
    "dragover",
    (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
    },
    true
  );
  useEventListener<DragEvent>(
    target,
    "drop",
    async (e) => {
      e.preventDefault();
      const raw = e.dataTransfer.getData("text");
      e.dataTransfer.clearData();
      try {
        callback(JSON.parse(raw));
      } catch {}
    },
    true
  );
}
