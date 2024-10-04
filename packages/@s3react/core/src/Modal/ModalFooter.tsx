import clsx from "clsx";
import { FC, PropsWithChildren } from "react";
import { modalClasses } from "./modalClasses";

export interface ModalFooterProps {
  className?: string;
}

export const ModalFooter: FC<PropsWithChildren<ModalFooterProps>> = (props) => {
  const { className, children } = props;

  return (
    <div className={clsx(modalClasses.footer, className)}>
      {children}
    </div>
  );
};
