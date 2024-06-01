import { DeepPartial, NestedKeyOf, NestedTypeOf } from "../types"

export type Objectify<T> = <K extends NestedKeyOf<T>>(key: K, value: NestedTypeOf<T, K>) => DeepPartial<T>

export function objectify<T, K extends NestedKeyOf<T>>(
  key: K,
  value: NestedTypeOf<T, K>,
): DeepPartial<T> {
  const keys = key.replace('?.', '.').split('.')
  let result: any = {}
  let current = result
  keys.forEach((k, i) => {
    if (i === keys.length - 1) {
      current[k] = value
    } else {
      if (!current[k]) {
        current[k] = {}
      }
      current = current[k]
    }
  })
  return result
}
