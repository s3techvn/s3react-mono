export function styleValue(value: string | number | undefined, important?: boolean) {
  if (typeof value === "undefined") {
    return undefined;
  }

  const valueString = typeof value === "number" ? `${value}px` : value;
  return important ? `${valueString}!important` : valueString;
}