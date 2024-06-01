import { ErrorMap } from "../types";

export function makeGetErrors<T>(errorMap: ErrorMap<T>) {
  function getErrors() {
    return errorMap
  }
  return getErrors;
}
