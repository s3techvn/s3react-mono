import { FC, ReactNode } from "react";
import { modalClasses } from "./modalClasses";
import { IconClose } from "../SvgIcon";
import clsx from "clsx";

export interface ModalCloseProps {
  className?: string;
  onClick?(): void;
  icon?: ReactNode
}

export const ModalClose: FC<ModalCloseProps> = (props) => {
  const { className, onClick, icon } = props;

  return (
    <button className={clsx(modalClasses.close, className)} onClick={onClick}>
      {icon ? icon : <IconClose stroke={1} />}
    </button>
  );
};

ModalClose.displayName = "ModalClose";
