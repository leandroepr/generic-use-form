export function makeGetValues<T>(state: T) {
  function getValues(): T
  function getValues<R>(selector: (state: T) => R): R
  function getValues<R>(selector?: (state: T) => R) {
    if (selector) {
      return selector(state)
    }
    return state
  }
  return getValues
}
