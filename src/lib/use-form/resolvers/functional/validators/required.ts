
export function required(message?: string) {
  const defaultMessage = "This field is required"
  return (value: unknown) => {
    if (value === null || value === undefined) {
      return message ?? defaultMessage;
    }
    if (typeof value === "boolean" && value !== false && value !== true) {
      return message ?? defaultMessage;
    }
    if (typeof value === "string" && value.trim().length === 0) {
      return message ?? defaultMessage;
    }
    if (typeof value === "number" && isNaN(value)) {
      return message ?? defaultMessage;
    }
    if (typeof value === "object" && Object.keys(value).length === 0) {
      return message ?? defaultMessage;
    }
    if (Array.isArray(value) && value.length === 0) {
      return message ?? defaultMessage;
    }
  }
}
