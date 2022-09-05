import { InjectionKey } from '@vue/runtime-core'
import { inject, provide, reactive } from '#build/imports'
import { FormError } from '~/types/app'

export const FormKey: InjectionKey<{ errors: FormError|null }> = Symbol.for("s-form");

export function createForm(props:{
  errors: FormError;
}) {
  provide(FormKey, props)
}

export function useForm() {
  return inject(FormKey);
}
