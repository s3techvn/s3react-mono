import { CSSProperties, forwardRef, PropsWithChildren, useMemo } from "react";
import { modalClasses } from "./modalClasses";
import { styleValue } from "../utils/styleValue";
import clsx from "clsx";

export interface ModalRootProps {
  className?: string;
  width?: string | number;
  height?: string | number;
}

export const ModalRoot = forwardRef<HTMLDivElement, PropsWithChildren<ModalRootProps>>(
  function ModalRoot(props, ref) {
    const { className, children, width, height } = props;

    const variableStyles = useMemo(() => ({
      ["--modal-content-width"]: styleValue(width, true)!,
      ["--modal-content-height"]: styleValue(height, true)!,
    }), [width, height]);

    return (
      <div
        ref={ref}
        className={clsx(modalClasses.root, className)}
        style={variableStyles as CSSProperties}
      >
        {children}
      </div>
    );
  }
);