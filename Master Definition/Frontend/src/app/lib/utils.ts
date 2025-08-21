export function getDaysDifference(dateString1: string, dateString2: string) {
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);

  const time1 = date1.getTime();
  const time2 = date2.getTime();

  const diffInMs = Math.abs(time2 - time1);
  const msInOneDay = 1000 * 60 * 60 * 24;

  return Math.floor(diffInMs / msInOneDay);
}

export function removeNullValues<T extends object>(obj: T): Partial<T> {
  const newObj: Partial<T> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];

      if (value !== null && typeof value !== "undefined" && value !== "") {
        newObj[key] = value;
      }
    }
  }
  return newObj;
}

export function convertEmptyStringsToNull<T extends Record<string, any>>(obj: T): T {
  const newObj: T = { ...obj }; // Create a shallow copy to avoid mutating the original object

  for (const key in newObj) {
    if (Object.prototype.hasOwnProperty.call(newObj, key)) {
      const value = newObj[key];

      // Check if the value is a string and, after trimming, is empty
      if (typeof value === "string" && value.trim() === "") {
        newObj[key] = null;
      }
    }
  }
  return newObj;
}
