/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from "react";
import { PropsWithHTML } from "../types/html";
import clsx from "clsx";

type BaseProps = {
  error?: boolean;
};

export type HelperTextProps = PropsWithHTML<
  BaseProps,
  {
    error?: string;
  }
>;

export const HelperText = forwardRef<HTMLDivElement, HelperTextProps>(function HelperText(props, ref) {
  const {
    error,
    component: Component = "div",
    componentClassName = {},
    className,
    children,
    renderRoot,
    ...rest
  } = props;

  const rootClassName = clsx(
    "text-xs mt-1",
    error ? "text-red-500" : "text-gray-400",
    className,
    !!error && componentClassName.error
  );

  if (renderRoot) {
    return renderRoot({ ...rest, className: rootClassName, children }, ref);
  }

  return <Component {...({ ...rest, className: rootClassName, ref } as any)}>{children}</Component>;
});
