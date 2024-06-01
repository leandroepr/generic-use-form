import { ErrorMap, NestedKeyOf } from "../types";

export function makeGetError<T>(errorMap: ErrorMap<T>) {
  function getError(key: NestedKeyOf<T>): string {
    const nonNullableKey = key.replace('?.', '.') as NestedKeyOf<T>;
    return errorMap[key] || errorMap[nonNullableKey] || ''
  }
  return getError;
}
