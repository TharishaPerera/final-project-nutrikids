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
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
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

/**
 * Convert unix timestamp range to human readable format
 * @param timestampString string (ex: 1713148200000-1713149400000)
 * @returns string (ex: 11:30 AM - 11:40 AM)
 */
export const formatUnixTimestampRange = (timestampString: string): string => {
  const [startTimestamp, endTimestamp] = timestampString.split('-').map(Number);
  const startDate = new Date(startTimestamp);
  const endDate = new Date(endTimestamp);

  // Format start and end times
  const startTime = formatDate(startDate);
  const endTime = formatDate(endDate);

  return `${startTime} - ${endTime}`;
}

const formatDate = (date: Date): string => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight

  const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;

  return formattedTime;
}

/**
 * Convert any date string to Sri Lankan date time
 * @param dateString string
 * @returns LK time string
 */
export const convertToLKTime = (dateString: string): string => {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Colombo", // Sri Lanka time zone
    weekday: 'short', // Shortened weekday name
    year: 'numeric', // Full year
    month: 'short', // Shortened month name
    day: '2-digit', // Two-digit day
    hour: '2-digit', // Two-digit hour
    minute: '2-digit', // Two-digit minute
    second: '2-digit' // Two-digit second
  };

  // Convert the date to Sri Lankan time and format it accordingly
  return date.toLocaleString('en-US', options);
}
