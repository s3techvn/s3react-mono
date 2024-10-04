import { FC, PropsWithChildren } from "react";
import { modalClasses } from "./modalClasses";
import clsx from "clsx";

export interface ModalHeaderProps {
  className?: string;
}

export const ModalHeader: FC<PropsWithChildren<ModalHeaderProps>> = (props) => {
  const { className, children } = props;

  return (
    <div className={clsx(modalClasses.header, className)}>
      {children}
    </div>
  );
};

ModalHeader.displayName = "ModalHeader";
