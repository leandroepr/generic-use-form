import { ErrorMap, Setter } from "../types";

export function makeSetErrors<T>(setErrorMap: Setter<ErrorMap<T>>) {
  function setErrors(errors: ErrorMap<T>, strategy: "replace"): void
  function setErrors(partialErrors: ErrorMap<T>, strategy?: "merge"): void
  function setErrors(errors: ErrorMap<T>, strategy?: "replace" | "merge"): void {
    if (strategy === "replace") {
      return setErrorMap(errors)
    }
    return setErrorMap(state => ({ ...state, ...errors }))
  }
  return setErrors;
}
