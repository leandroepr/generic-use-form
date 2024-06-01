import { useEffect, useState } from 'react'
import {
  makeGetError,
  makeGetErrors,
  makeGetValue,
  makeGetValues,
  makeSetError,
  makeSetErrors,
  makeSetValue,
  makeSetValues,
} from './features'
import { mergeObjects, objectify } from './helpers'
import {
  DeepPartial,
  ErrorMap,
  NestedKeyOf,
  NestedTypeOf,
  Setter,
} from './types'

export type WithSetter<T> = T & { setValues: Setter<T> }

export type StateManager<T> = [state: T, setter: Setter<T>]

export type ResolverType<T> = (
  values: T,
) => { success: true; data: T } | { success: false; errors: ErrorMap<T> }

export type RefineFn<T> = {
  [K in NestedKeyOf<T>]?: (
    value: NestedTypeOf<T, K>,
    state: T,
  ) => DeepPartial<T>
}

type DefaultValueOrFullState<T> = T | StateManager<T>
function useDefaultValueOrFullState<T>(
  defaultValueOrFullState: DefaultValueOrFullState<T>,
): StateManager<T> {
  const [internalState, setInternalState] = useState<T>(() => {
    return Array.isArray(defaultValueOrFullState)
      ? defaultValueOrFullState[0]
      : defaultValueOrFullState
  })
  if (Array.isArray(defaultValueOrFullState)) {
    return defaultValueOrFullState
  }
  return [internalState, setInternalState]
}

const getEmptyResolver = <T>(): ResolverType<T> => {
  return (data: T) => ({ success: true, data })
}

export type UseFormProps<T> = {
  state: DefaultValueOrFullState<T>
  error?: DefaultValueOrFullState<ErrorMap<T>>
  resolver?: ResolverType<T>
  refine?: RefineFn<T>
}
export default function useForm<T extends Record<string, unknown> = any>(
  params?: UseFormProps<T>,
) {
  const [state, setState] = useDefaultValueOrFullState(
    params?.state || ({} as T),
  )
  const [errorMap, setErrorMap] = useDefaultValueOrFullState(
    params?.error || ({} as ErrorMap<T>),
  )
  const [isSubmitted, setIsSubmitted] = useState(false)
  const resolver = params?.resolver ?? getEmptyResolver<T>()

  useEffect(() => {
    if (!isSubmitted) return
    const parsedValues = resolver(state)
    if (parsedValues.success) {
      setErrors({}, "replace")
    } else {
      setErrors(parsedValues.errors, "replace")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitted, JSON.stringify(state)])

  const objectifyOrRefine = <K extends NestedKeyOf<T>>(
    key: K,
    value: NestedTypeOf<T, K>,
  ): DeepPartial<T> => {
    const refine = params?.refine?.[key]
    if (refine) {
      return refine(value, state)
    }
    return objectify(key, value)
  }

  const getValue = makeGetValue(state)
  const setValue = makeSetValue(setState, objectifyOrRefine, mergeObjects)
  const getValues = makeGetValues(state)
  const setValues = makeSetValues(setState, mergeObjects)
  const getError = makeGetError(errorMap)
  const setError = makeSetError(setErrorMap)
  const getErrors = makeGetErrors(errorMap)
  const setErrors = makeSetErrors(setErrorMap)

  function handleSubmit(submit: (values: T) => void): () => void {
    return () => {
      const parsedValues = resolver(state)
      if (parsedValues.success) {
        submit(parsedValues.data)
      } else {
        setErrorMap(parsedValues.errors)
      }
      setIsSubmitted(true)
    }
  }

  function register<K extends NestedKeyOf<T>>(key: K) {
    return {
      value: getValue(key),
      onChange: setValue(key),
      error: getError(key),
    }
  }

  function resetErrors() {
    setErrorMap({} as ErrorMap<T>)
    setIsSubmitted(false)
  }

  return {
    getValue,
    setValue,
    getValues,
    setValues,
    getError,
    setError,
    getErrors,
    setErrors,
    register,
    handleSubmit,
    resetErrors,
    formState: {
      state,
      errorMap,
      isSubmitted,
    },
  }
}
