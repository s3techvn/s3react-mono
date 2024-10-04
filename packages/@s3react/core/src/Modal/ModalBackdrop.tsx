import { FC } from "react";
import { modalClasses } from "./modalClasses";
import clsx from "clsx";

export interface ModalBackdropProps {
  className?: string;
  onClick?(): void;
}

export const ModalBackdrop: FC<ModalBackdropProps> = (props) => {
  const { className, onClick } = props;

  return (
    <div className={clsx(modalClasses.backdrop, className)} onClick={onClick} />
  );
};

ModalBackdrop.displayName = "ModalBackdrop";