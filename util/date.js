// Get date as YEAR-MONTH-DATE
export function getFormattedDate(date) {
  // return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return date.toISOString().slice(0, 10);
}

// Get date that x number days in the past
export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
