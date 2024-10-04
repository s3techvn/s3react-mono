import { FocusEvent, forwardRef, InputHTMLAttributes, ReactNode, useState } from "react";
import { InputLabel } from "@s3react/core/InputLabel";
import { Adornment } from "@s3react/core/Adornment";
import { HelperText } from "@s3react/core/HelperText";
import clsx from "clsx";
import { cx } from "../utils/cx";

interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  size?: '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'base';
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  asterisk?: ReactNode;
  clearable?: boolean;
  error?: string;
  helperText?: string;
  componentClassName?: {
    label?: string;
    wrapper?: string;
    focused?: string;
    input?: string;
    leftSection?: string;
    rightSection?: string;
    helperText?: string;
    helperTextError?: string;
    error?: string;
  };
}

export const textInputClasses = {
  root: "TextInput-root",
  label: "TextInput-label",
  wrapper: "TextInput-wrapper",
  focused: "TextInput-focused",
  input: "TextInput-input",
  leftSection: "TextInput-leftSection",
  rightSection: "TextInput-rightSection",
  helperText: "TextInput-helperText",
  helperTextError: "TextInput-helperTextError",
  error: "TextInput-error",
  base: "TextInput-base",
  '3xs': "TextInput-3xs",
  '2xs': "TextInput-2xs",
  xs: "TextInput-xs",
  sm: "TextInput-sm",
  md: "TextInput-md",
  lg: "TextInput-lg",
  xl: "TextInput-xl",
  '2xl': "TextInput-2xl",
  '3xl': "TextInput-3xl",
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(props, ref) {
    const {
      className,
      label,
      id,
      asterisk,
      leftSection,
      rightSection,
      type = "text",
      helperText,
      error,
      size = 'base',
      clearable,
      componentClassName = {},
      onFocus,
      onBlur,
      ...rest
    } = props;

    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    return (
      <div 
        className={clsx(
          cx(textInputClasses.root),
          textInputClasses[size],
          isFocused && textInputClasses.focused,
          isFocused && componentClassName.focused,
          !!error && textInputClasses.error,
          !!error && componentClassName.error,
          className
        )}
      >
        {label && (
          <InputLabel
            htmlFor={id}
            asterisk={asterisk}
            className={clsx(textInputClasses.label, componentClassName.label)}
          >
            {label}
          </InputLabel>
        )}
        <div className={clsx(textInputClasses.wrapper, componentClassName.wrapper)}>
          {!!leftSection && (
            <Adornment position="left" className={clsx(textInputClasses.leftSection, componentClassName.leftSection)}>
              {leftSection}
            </Adornment>
          )}
          <input
            {...rest}
            ref={ref}
            id={id}
            type={type}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={clsx(textInputClasses.input, componentClassName.input)}
          />
          {!!rightSection || clearable && (
            <Adornment position="right" className={clsx(textInputClasses.rightSection, componentClassName.rightSection)}>
              {clearable && <button>Clear</button>}
              {rightSection}
            </Adornment>
          )}
        </div>
        {(helperText || error) && (
          <HelperText
            error={!!error}
            className={clsx(
              textInputClasses.helperText,
              componentClassName.helperText,
              !!error && textInputClasses.helperTextError,
              !!error && componentClassName.helperTextError,
            )}
          >
            {error || helperText}
          </HelperText>
        )}
      </div>
    );
  }
);
