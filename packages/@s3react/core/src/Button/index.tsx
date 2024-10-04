import { forwardRef, PropsWithChildren } from "react";
import clsx from "clsx";

export interface ButtonProps {
  className?: string;
}

export const buttonClasses = {
  root: "Button-root",
  inner: "Button-inner",
};

export const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(
  function Button(props, ref) {
    const { children, className } = props;

    return (
      <button ref={ref} className={clsx(buttonClasses.root, className)}>
        <span className={buttonClasses.inner}>{children}</span>
      </button>
    );
  }
);
