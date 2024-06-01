import { format, isBefore, isValid } from "date-fns";

export function minDate(minDate: Date, message?: string) {
  return (value: Date) => {
    if (!isValid(minDate)) {
      console.error('minDate must be a valid date')
      return
    }
    const formattedDate = format(minDate, 'yyyy-MM-dd')
    const defaultMessage = `This field must be at least ${formattedDate}`
    const dateValue = new Date(value)
    if (!isValid(dateValue)) {
      return "This field must be a valid date"
    }
    if (isBefore(dateValue, minDate)) {
      return message || defaultMessage;
    }
  }
}
