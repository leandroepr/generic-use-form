export function maxLength(max: number, message?: string) {
  const defaultMessage = `This field must be at most ${max} characters`
  return (value: string) => {
    if (typeof value !== 'string' || value.length === 0) {
      return
    }
    if (value.length > max) {
      return message ?? defaultMessage;
    }
  }
}
