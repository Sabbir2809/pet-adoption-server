// pick valid filterable filed
const pick = <T extends Record<string, unknown>, k extends keyof T>(
  obj: T,
  keys: k[]
): Partial<T> => {
  const finalObj: Partial<T> = {};
  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      let value = obj[key];
      if (typeof value === "string" && !isNaN(Number(value))) {
        value = Number(value) as T[k];
      }
      finalObj[key] = value;
    }
  }
  return finalObj;
};

export default pick;
