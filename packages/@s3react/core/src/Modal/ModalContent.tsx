import clsx from "clsx";
import { FC, PropsWithChildren } from "react";
import { modalClasses } from "./modalClasses";

export type AnimationType = "fade" | "slide" | "zoom";

export interface ModalContentProps {
  className?: string;
  isBuzzing?: boolean;
  animation?: AnimationType;
}

export const ModalContent: FC<PropsWithChildren<ModalContentProps>> = (props) => {
  const { className, isBuzzing, animation = "slide", children } = props;

  return (
    <div className={clsx(modalClasses.content, modalClasses[animation], isBuzzing && modalClasses.buzzable, className)}>
      {children}
    </div>
  );
};

ModalContent.displayName = "ModalContent";