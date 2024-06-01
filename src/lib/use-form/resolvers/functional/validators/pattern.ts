export function pattern(pattern: RegExp, message?: string) {
  const defaultMessage = `This field is invalid`
  return (value: string) => {
    if (typeof value !== 'string' || value.length === 0) {
      return
    }
    if (!pattern.test(value)) {
      return message || defaultMessage;
    }
  }
}
