import { MergeObjects, Objectify } from "../helpers"
import { NestedKeyOf, NestedTypeOf, Setter } from "../types"


export function makeSetValue<T>(setState: Setter<T>, objectify: Objectify<T>, mergeObjects: MergeObjects<T>) {
  function setValue<K extends NestedKeyOf<T>>(
    key: K,
  ): (value: NestedTypeOf<T, K>) => void
  function setValue<K extends NestedKeyOf<T>>(
    key: K,
    value: NestedTypeOf<T, K>,
  ): void
  function setValue<K extends NestedKeyOf<T>>(
    key: K,
    value?: NestedTypeOf<T, K>,
  ) {
    const updateState = (newValue: NestedTypeOf<T, K>) => {
      const partialState = objectify(key, newValue)
      setState((currentState) => mergeObjects(currentState, partialState))
    }
    if (value === undefined) {
      return updateState
    }
    updateState(value)
  }
  return setValue
}
