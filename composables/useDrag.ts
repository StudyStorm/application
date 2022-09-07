import { Awaitable, isClient, MaybeComputedRef } from "@vueuse/shared";
import { unrefElement, useEventListener } from "@vueuse/core";
import { onMounted } from "#build/imports";

export default function useDrag(
  target: MaybeComputedRef<HTMLElement | null | undefined>,
  callback: () => Awaitable<unknown>
) {
  if (!isClient) return;
  useEventListener<DragEvent>(target, "dragstart", (e) => {
    const data = JSON.stringify(callback());
    e.dataTransfer.setData("text/plain", data);
  });
  onMounted(() => {
    unrefElement(target).draggable = true;
  });
}
