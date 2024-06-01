export function min(min: number, message?: string) {
  const defaultMessage = `This field must be at least ${min}`
  return (value: number) => {
    if (typeof value !== "number" || value < min) {
      return message ?? defaultMessage;
    }
  }
}
