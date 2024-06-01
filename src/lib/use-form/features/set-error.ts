import { ErrorMap, NestedKeyOf, Setter } from "../types";

export function makeSetError<T>(setErrorMap: Setter<ErrorMap<T>>) {
  function setError<K extends NestedKeyOf<T>>(
    key: K,
    errorMessage: string,
  ): void {
    setErrorMap((state) => ({ ...state, [key]: errorMessage }))
  }
  return setError;
}
