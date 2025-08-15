export function getDaysDifference(dateString1: string, dateString2: string) {
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);

  const time1 = date1.getTime();
  const time2 = date2.getTime();

  const diffInMs = Math.abs(time2 - time1);
  const msInOneDay = 1000 * 60 * 60 * 24;

  return Math.floor(diffInMs / msInOneDay);
}
