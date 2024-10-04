/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, PropsWithChildren, ReactNode } from "react";
import { InputLabel } from "@s3react/core/InputLabel";
import { HelperText } from "@s3react/core/HelperText";
import { PropsWithHTML } from "../types/html";
import clsx from "clsx";

type BaseWrapperProps = {
  label?: ReactNode;
  required?: boolean;
  htmlFor?: string;
  asterisk?: ReactNode;
  error?: string;
  message?: string;
};

export type InputWrapperProps = PropsWithHTML<
  BaseWrapperProps,
  {
    label?: string;
    labelInner?: string;
    asterisk?: string;
    error?: string;
    message?: string;
  }
>;

export const InputWrapper = forwardRef<HTMLDivElement, PropsWithChildren<InputWrapperProps>>(function InputWrapper(
  props,
  ref
) {
  const {
    component: Component = "div",
    renderRoot,
    label,
    required,
    children,
    htmlFor,
    asterisk = "*",
    error,
    message,
    componentClassName,
    className,
    ...rest
  } = props;

  const content = (
    <>
      {!!label && (
        <InputLabel
          required={required}
          asterisk={asterisk}
          className={componentClassName?.label}
          componentClassName={{
            labelInner: componentClassName?.labelInner,
            asterisk: componentClassName?.asterisk,
          }}
        >
          {label}
        </InputLabel>
      )}
      {children}
      {!!error || !!message ? (
        <HelperText
          error={!!error}
          className={componentClassName?.message}
          componentClassName={{ error: componentClassName?.error }}
        >
          {error || message}
        </HelperText>
      ) : null}
    </>
  );

  const rootClassName = clsx("w-full text-sm", className);

  if (renderRoot) {
    return renderRoot({ className: rootClassName, children: content }, ref);
  }

  return <Component {...({ ...rest, className: rootClassName, ref } as any)}>{content}</Component>;
});
