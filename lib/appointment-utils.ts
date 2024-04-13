interface TimeSlot {
  startTime: number;
  endTime: number;
}

/**
 * Convert date time to unix timestamp
 * @param dateTime Date
 * @returns unix timestamp
 */
export const dateTimeToUnixTimestamp = (dateTime: Date) => {
  const millisecondsSinceEpoch = dateTime.getTime();
  return Math.floor(millisecondsSinceEpoch / 1000);
};

/**
 * Get full day
 * @param date number
 * @returns
 */
export const getFullDay = (dayNumber: number) => {
  switch (dayNumber) {
    case 1:
      return "Sunday";
    case 2:
      return "Monday";
    case 3:
      return "Tuesday";
    case 4:
      return "Wednesday";
    case 5:
      return "Thursday";
    case 6:
      return "Friday";
    case 7:
      return "Saturday";
    default:
      return null;
  }
};

/**
 * Generate time slots for the selected date and time period
 * @param startTime string
 * @param endTime string
 * @param selectedDate Date
 * @returns timeslots object
 */
export const generateTimeSlots = (
  startTime: string,
  endTime: string,
  selectedDate: Date
): { timeslot: string; startTimeUnix: number; endTimeUnix: number }[] => {
  const timeSlots: {
    timeslot: string;
    startTimeUnix: number;
    endTimeUnix: number;
  }[] = [];

  // Convert start and end time to UNIX timestamps
  const startDate = new Date(selectedDate);
  const startTimestamp = new Date(
    `${startDate.toDateString()} ${startTime}`
  ).getTime();
  const endTimestamp = new Date(
    `${startDate.toDateString()} ${endTime}`
  ).getTime();

  // Loop through time slots with X-minute (default 20) intervals
  const timeSlotDuration: number = parseInt(process.env.TIMESLOT_DURATION ?? "20");
  for (let i = startTimestamp; i < endTimestamp; i += timeSlotDuration * 60 * 1000) {
    const startTime = new Date(i);
    const endTime = new Date(i + timeSlotDuration * 60 * 1000);

    const startTimeFormatted = startTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const endTimeFormatted = endTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    timeSlots.push({
      timeslot: `${startTimeFormatted} - ${endTimeFormatted}`,
      startTimeUnix: startTime.getTime(),
      endTimeUnix: endTime.getTime(),
    });
  }

  return timeSlots;
};

/**
 * Generate a unique string based on the unix timestamp
 * @param timestamp number
 * @returns unique string
 */
export const generateUniqueString = (timestamp: number): string => {
  const randomString = Math.random().toString(36).substring(2);
  return `${timestamp.toString()}${randomString}`;
}