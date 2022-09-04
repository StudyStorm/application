import { getCurrentInstance } from "#build/imports";
import { ComponentInternalInstance, ConcreteComponent } from "vue";

export default function useParent(
  component?: ConcreteComponent
): ComponentInternalInstance | null {
  const instance = getCurrentInstance();
  let parent = instance?.parent;
  if (component) {
    while (parent && parent.type !== component) {
      parent = parent.parent;
    }
  }
  return parent ?? null;
}
