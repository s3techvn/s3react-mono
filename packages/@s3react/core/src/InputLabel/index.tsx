/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, LabelHTMLAttributes, PropsWithChildren, ReactNode } from "react";
import { PropsWithHTML } from "../types/html";
import clsx from "clsx";

type BaseLabelProps = {
  required?: boolean;
  asterisk?: ReactNode;
};

export type InputLabelProps = PropsWithHTML<
  BaseLabelProps,
  {
    labelInner?: string;
    asterisk?: string;
  },
  LabelHTMLAttributes<HTMLLabelElement>
>;

export const InputLabel = forwardRef<HTMLLabelElement, PropsWithChildren<InputLabelProps>>(function InputLabel(
  props,
  ref
) {
  const {
    component: Component = "label",
    renderRoot,
    className,
    required,
    asterisk = "*",
    componentClassName = {},
    children,
    ...rest
  } = props;

  const content = (
    <>
      <span className={componentClassName.labelInner}>{children}</span>
      {required && <span className={clsx("text-red-500 ml-1", componentClassName.asterisk)}>{asterisk}</span>}
    </>
  );

  const rootClassName = clsx("block font-semibold mb-1", className);

  if (renderRoot) {
    return renderRoot({ ...rest, className: rootClassName, children: content }, ref);
  }

  return <Component {...({ ...rest, className: rootClassName, ref } as any)}>{content}</Component>;
});
