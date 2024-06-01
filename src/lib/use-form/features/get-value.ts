import { NestedKeyOf, NestedTypeOf } from "../types"

export function makeGetValue<T>(state: T) {
  function getValue<K extends NestedKeyOf<T>>(key: K): NestedTypeOf<T, K>
  function getValue<
    K extends NestedKeyOf<T>,
    D extends NonNullable<NestedTypeOf<T, K>>,
  >(key: K, defaultValue: D): NonNullable<NestedTypeOf<T, K>>
  function getValue<K extends NestedKeyOf<T>, D>(
    key: K,
    defaultValue?: D,
  ): NestedTypeOf<T, K> | D {
    if (!key) return defaultValue as D
    const keys = key.replace('?.', '.').split('.')
    let current: any = state
    for (const k of keys) {
      if (current === undefined || current === null) {
        break
      }
      current = current[k]
    }
    return current === undefined ? defaultValue : current
  }
  return getValue
}
