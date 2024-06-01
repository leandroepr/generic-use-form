import { DeepPartial } from "../types"

export type MergeObjects<T> = (currentState: T, partialState: DeepPartial<T>) => T

export function mergeObjects<T>(state: T, partialState: DeepPartial<T>): T {
  let result: any = { ...state }
  for (const key in partialState) {
    if (partialState.hasOwnProperty(key)) {
      const val = partialState[key]
      if (
        typeof val === 'object' &&
        val !== null &&
        !(val instanceof Array)
      ) {
        result[key] = mergeObjects(result[key], val)
      } else {
        result[key] = val
      }
    }
  }
  return result
}
