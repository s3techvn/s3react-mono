import clsx from "clsx";
import { FC, PropsWithChildren } from "react";
import { modalClasses } from "./modalClasses";

export interface ModalBodyProps {
  className?: string;
}

export const ModalBody: FC<PropsWithChildren<ModalBodyProps>> = (props) => {
  const { className, children } = props;

  return (
    <div className={clsx(modalClasses.body, className)}>
      {children}
    </div>
  );
};

ModalBody.displayName = "ModalBody";
