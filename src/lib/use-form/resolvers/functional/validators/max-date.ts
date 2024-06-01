import { format, isBefore, isValid } from "date-fns";

export function maxDate(maxDate: Date, message?: string) {
  return (value: Date) => {
    if (!isValid(maxDate)) {
      console.error('maxDate must be a valid date')
      return
    }
    const formattedDate = format(maxDate, 'yyyy-MM-dd')
    const defaultMessage = `This field must be at most ${formattedDate}`
    const dateValue = new Date(value)
    if (!isValid(dateValue)) {
      return "This field must be a valid date"
    }
    if (isBefore(maxDate, dateValue)) {
      return message || defaultMessage;
    }
  }
}
