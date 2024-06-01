import { makeGetValue } from "../../features";
import { ErrorMap, NestedKeyOf, NestedTypeOf } from "../../types";
import { ResolverType } from "../../use-form";

export type MaybeString = string | undefined | null;

export type Validators<T> = {
  [K in NestedKeyOf<T>]?: Array<(value: NestedTypeOf<T, K>, values: T) => MaybeString>
}

export function functionalResolver<T>(validators: Validators<T>): ResolverType<T> {
  return (values) => {
    const errors: ErrorMap<T> = {};
    const getValue = makeGetValue(values);
    for (const key in validators) {
      const nestedKey = key as NestedKeyOf<T>
      const validations = validators[nestedKey];
      if (!validations || validations.length === 0) continue;
      for (const validation of validations) {
        const error = validation(getValue(nestedKey), values);
        if (error) {
          errors[nestedKey] = error;
          break;
        }
      }
    }
    return Object.keys(errors).length === 0
      ? { success: true, data: values }
      : { success: false, errors };
  };
}

export default functionalResolver;
