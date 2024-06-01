import { pattern } from "./pattern";

export function email(message?: string) {
  const defaultMessage = `This field must be a valid email address`
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return pattern(emailPattern, message || defaultMessage);
}
