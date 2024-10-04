import clsx from "clsx";
import { FC, PropsWithChildren } from "react";
import { modalClasses } from "./modalClasses";

export interface ModalTitleProps {
  className?: string;
}

export const ModalTitle: FC<PropsWithChildren<ModalTitleProps>> = (props) => {
  const { className, children } = props;

  return (
    <div className={clsx(modalClasses.title, className)}>
      {children}
    </div>
  );
};

ModalTitle.displayName = "ModalTitle";
