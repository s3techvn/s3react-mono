/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FocusEvent,
  forwardRef,
  InputHTMLAttributes,
  MouseEvent,
  ReactNode,
  Ref,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { PropsWithHTML } from "../types/html";
import clsx from "clsx";

type BaseInputProps = {
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  rootRef?: Ref<HTMLElement>;
  onClickAdronment?(e: MouseEvent<HTMLDivElement>, position: "left" | "right"): void;
};

export type InputProps = PropsWithHTML<
  BaseInputProps,
  {
    leftSection?: string;
    rightSection?: string;
    input?: string;
  },
  InputHTMLAttributes<HTMLInputElement>
>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
  const {
    className,
    leftSection,
    rightSection,
    component: Component = "div",
    renderRoot,
    componentClassName = {},
    autoComplete = "off",
    onClickAdronment,
    onFocus,
    onBlur,
    rootRef,
    ...rest
  } = props;
  const [focused, setFocused] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => input.current as HTMLInputElement);

  const handleClickAdronment = (position: "left" | "right") => (e: MouseEvent<HTMLDivElement>) => {
    input.current?.focus();
    onClickAdronment?.(e, position);
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    onBlur?.(e);
  };

  const inputContent = (
    <>
      {!!leftSection && (
        <div
          className={clsx("flex items-center justify-center h-full px-2", componentClassName.leftSection)}
          onClick={handleClickAdronment("left")}
        >
          {leftSection}
        </div>
      )}
      <input
        {...rest}
        ref={input}
        autoComplete={autoComplete}
        className={clsx(
          "w-full h-full min-h-[40px] font-normal bg-transparent outline-none shadow-none",
          leftSection ? "pl-0" : "pl-2",
          rightSection ? "pr-0" : "pr-2",
          componentClassName.input
        )}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {!!rightSection && (
        <div
          className={clsx("flex items-center justify-center h-full px-2", componentClassName.rightSection)}
          onClick={handleClickAdronment("right")}
        >
          {rightSection}
        </div>
      )}
    </>
  );

  const rootClassName = clsx(
    "flex items-center w-full min-h-[40px] border border-blue-300 rounded-md text-sm bg-white",
    focused && "border-[#414045]",
    className
  );

  if (renderRoot) {
    return renderRoot({ className: rootClassName, children: inputContent }, rootRef);
  }

  return <Component {...({ className: rootClassName, ref: rootRef } as any)}>{inputContent}</Component>;
});
