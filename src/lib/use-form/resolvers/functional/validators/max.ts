export function max(max: number, message?: string) {
  const defaultMessage = `This field must be at most ${max}`
  return (value: number) => {
    if (value > max) {
      return message ?? defaultMessage;
    }
  }
}
