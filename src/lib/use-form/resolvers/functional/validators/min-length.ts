export function minLength(min: number, message?: string) {
  const defaultMessage = `This field must be at least ${min} characters`
  return (value: string) => {
    if (typeof value !== 'string' || value.length === 0) {
      return
    }
    if (value.length < min) {
      return message ?? defaultMessage;
    }
  }
}
