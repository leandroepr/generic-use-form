import { MergeObjects } from "../helpers"
import { DeepPartial, Setter } from "../types"

export function makeSetValues<T>(setState: Setter<T>, mergeObjects: MergeObjects<T>) {
  function setValues(state: T, strategy: "replace"): void
  function setValues(partialState: DeepPartial<T>, strategy?: "merge"): void
  function setValues(partialState: DeepPartial<T>, strategy?: "merge" | "replace"): void {
    if (strategy === "replace") {
      setState(partialState as T)
      return
    }
    setState((currentState) => mergeObjects(currentState, partialState))
  }
  return setValues
}
