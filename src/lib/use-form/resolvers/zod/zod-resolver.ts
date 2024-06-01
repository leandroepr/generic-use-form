import { z } from "zod"
import { ErrorMap, NestedKeyOf } from "../../types"
import { ResolverType } from "../../use-form"

export function zodResolver<T>(schema: z.Schema<T>): ResolverType<T> {
  return (values) => {
    const parsedValues = schema.safeParse(values)
    if (parsedValues.success) {
      return { success: true, data: parsedValues.data }
    } else {
      const errorMap = parsedValues.error.issues.reduce(
        (map, issue) => {
          const key = issue.path.join(".") as NestedKeyOf<T>
          const message = issue.message
          if (!map[key]) {
            map[key] = message
          }
          return map
        },
        {} as ErrorMap<T>,
      )
      return {
        success: false,
        errors: errorMap,
      }
    }
  }
}

export default zodResolver
