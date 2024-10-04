import clsx from "clsx";

export function cx(...classes: string[]) {
  return clsx(classes.map((c) => c ? `s3react-${c}` : ""));
}
