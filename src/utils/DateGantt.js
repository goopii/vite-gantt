export class DateGantt {
  constructor(year, month, date, isEndDate = false) {
    // Convert string inputs to numbers (handles leading zeros)
    const yearNum = Number(year);
    const monthNum = Number(month);
    const dateNum = Number(date);

    // For end dates: add 1 to date (since Gantt end dates are exclusive)
    // For start dates: no adjustment needed
    const adjustedDate = isEndDate ? dateNum + 1 : dateNum;
    this.date = new Date(yearNum, monthNum - 1, adjustedDate);
    return this.date;
  }

  // Get the underlying Date object
  getDate() {
    return this.date;
  }
} 