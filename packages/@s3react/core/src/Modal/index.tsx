import {
  forwardRef,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from "react";
import { createPortal } from "react-dom";
import { useTimeoutProgress } from "@s3react/core/hooks/useTimeoutProgress";
import { modalClasses } from "./modalClasses";
import { ModalRoot } from "./ModalRoot";
import { ModalBackdrop } from "./ModalBackdrop";
import { ModalContent, ModalContentProps } from "./ModalContent";
import { ModalHeader } from "./ModalHeader";
import { ModalTitle } from "./ModalTitle";
import { ModalClose } from "./ModalClose";
import { ModalBody } from "./ModalBody";
import { ModalFooter } from "./ModalFooter";

export interface ModalProps extends Omit<ModalContentProps, 'isBuzzing'> {
  isOpen?: boolean;
  onClose?(): void;
  closeable?: boolean;
  buzzable?: boolean;
  title?: ReactNode;
  footer?: ReactNode;
  hideClose?: boolean;
  iconClose?: ReactNode;
  width?: string | number;
  height?: string | number;
  componentClassName?: {
    backdrop?: string;
    content?: string;
    buzzable?: string;
    slide?: string;
    zoom?: string;
    fade?: string;
    header?: string;
    title?: string;
    close?: string;
    body?: string;
    footer?: string;
  };
}

const ANIMATION_DURATION = 300;
const DELAY_TIME = 20;

export interface ModalRef {
  open(): void;
  close(): void;
}

const ModalBase = forwardRef<ModalRef, PropsWithChildren<ModalProps>>(
  function Modal(props, ref) {
    const {
      children,
      isOpen:
      propIsOpen,
      onClose,
      animation = "slide",
      closeable,
      buzzable,
      className,
      componentClassName = {},
      title,
      footer,
      hideClose,
      iconClose,
      width,
      height,
    } = props;

    const [ isOpen, setIsOpen ] = useState(propIsOpen);
    const { isProgress, triggerProgress } = useTimeoutProgress(true);
  
    const rootRef = useRef<HTMLDivElement>(null);
    const mounted = useRef(false);

    const handleClose = useCallback(() => {
      rootRef.current?.classList.remove(modalClasses.opened);
      setTimeout(() => {
        mounted.current && setIsOpen(false);
        onClose?.();
      }, ANIMATION_DURATION);
    }, [onClose]);

    useEffect(() => {
      if (propIsOpen) {
        setIsOpen(true);
      } else {
        handleClose();
      }
    }, [propIsOpen, handleClose]);

    useEffect(() => {
      if (isOpen) {
        setTimeout(() => {
          mounted.current && rootRef.current?.classList.add(modalClasses.opened);
        }, DELAY_TIME);
      }
    }, [isOpen]);

    useEffect(() => {
      mounted.current = true;

      return () => {
        mounted.current = false;
      };
    }, []);

    useImperativeHandle(ref, () => ({
      open() {
        setIsOpen(true);
      },
      close() {
        handleClose();
      },
    }));

    const handleClickBackdrop = () => {
      if (closeable) {
        handleClose();
      } else if (buzzable) {
        triggerProgress();
      }
    };

    return typeof document !== "undefined" && isOpen
      ? createPortal(
        <ModalRoot ref={rootRef} className={className} width={width} height={height}>
          <ModalBackdrop className={componentClassName.backdrop} onClick={handleClickBackdrop} />
          <ModalContent animation={animation} isBuzzing={isProgress} className={componentClassName.content}>
            {!!title ? (
              <ModalHeader className={componentClassName.header}>
                {(
                  <ModalTitle className={componentClassName.title}>
                    {title}
                  </ModalTitle>
                )}
                {!hideClose && (
                  <ModalClose icon={iconClose} onClick={handleClose} className={componentClassName.close} />
                )}
              </ModalHeader>
            ) : !hideClose && (
              <ModalClose icon={iconClose} onClick={handleClose} className={componentClassName.close} />
            )}
            <ModalBody className={componentClassName.body}>
              {children}
            </ModalBody>
            {!!footer && (
              <ModalFooter className={componentClassName.footer}>
                {footer}
              </ModalFooter>
            )}
          </ModalContent>
        </ModalRoot>
      , document.body)
      : null;
  }
);

type ModalComponent = typeof ModalBase & {
  Content: typeof ModalContent;
  Header: typeof ModalHeader;
  Title: typeof ModalTitle;
  Close: typeof ModalClose;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
  Backdrop: typeof ModalBackdrop;
  Root: typeof ModalRoot;
};

export const Modal =Object.assign(ModalBase, {
  Content: ModalContent,
  Header: ModalHeader,
  Title: ModalTitle,
  Close: ModalClose,
  Body: ModalBody,
  Footer: ModalFooter,
  Backdrop: ModalBackdrop,
  Root: ModalRoot,
}) as ModalComponent;
