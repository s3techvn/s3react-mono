/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  cloneElement,
  CSSProperties,
  FC,
  HTMLAttributes,
  MouseEvent as ReactMouseEvent,
  MutableRefObject,
  ReactElement,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { Menu } from "@s3react/core/Menu";
import { MenuItem } from "@s3react/core/MenuItem";
import clsx from "clsx";

export interface DropdownOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface DropdownProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  isOpen?: boolean;
  onClose?(): void;
  onOpen?(): void;
  onSelect?(e: ReactMouseEvent<HTMLElement>, option: DropdownOption): void;
  children: ReactElement;
  withArrow?: boolean;
  arrowSize?: number;
  arrowOffset?: number;
  options: DropdownOption[];
  autoY?: boolean;
  zIndex?: number;
  maxHeight?: number | string;
  width?: number | string;
  offset?: number;
  asModal?: boolean;
  breakpoint?: number;
  xOffset?: number;
  xPosition?: "left" | "center" | "right";
  equalAnchor?: boolean;
  renderOption?(option: DropdownOption): ReactElement;
  anchorRef?: MutableRefObject<HTMLElement | null>;
  className?: string;
  closeOnSelect?: boolean;
  value?: string | number;
  emptyOption?: ReactNode;
  componentClassName?: {
    inner?: string;
    arrowWrapper?: string;
    arrow?: string;
    content?: string;
    menu?: string;
    menuModal?: string;
    menuItem?: string;
    menuItemDisabled?: string;
    menuItemActive?: string;
    modal?: string;
    modalBackdrop?: string;
    modalBackdropOpened?: string;
    modalContent?: string;
    modalContentOpened?: string;
  };
}

const DEFAULT_ARROW_SIZE = 8;
const DEFAULT_ARROW_OFFSET = 12;
const DEFAULT_Z_INDEX = 10;
const DEFAULT_OFFSET = 2;
const DEFAULT_BREAKPOINT = 768;
const DEFAULT_X_OFFSET = 0;
const DEFAULT_X_POSITION = "left";
const DEFAULT_WIDTH = 200;

export const Dropdown: FC<DropdownProps> = (props) => {
  const {
    children,
    withArrow,
    arrowSize = DEFAULT_ARROW_SIZE,
    arrowOffset = DEFAULT_ARROW_OFFSET,
    zIndex = DEFAULT_Z_INDEX,
    offset = DEFAULT_OFFSET,
    breakpoint = DEFAULT_BREAKPOINT,
    width,
    xOffset = DEFAULT_X_OFFSET,
    xPosition = DEFAULT_X_POSITION,
    autoY = true,
    equalAnchor = true,
    options,
    maxHeight,
    asModal,
    renderOption,
    anchorRef: propAnchorRef,
    className,
    componentClassName = {},
    isOpen: propIsOpen,
    closeOnSelect = true,
    onClose,
    onOpen,
    onSelect,
    value,
    emptyOption,
    ...rest
  } = props;

  const [isOpen, setIsOpen] = useState(propIsOpen);
  const [position, setPosition] = useState<"bottom" | "top">("bottom");
  const [isModalView, setIsModalView] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<CSSProperties>({});
  const [arrowStyle, setArrowStyle] = useState<CSSProperties>({});
  const dropdownRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLElement | null>();

  useEffect(() => {
    propIsOpen === isOpen || setIsOpen(propIsOpen);
  }, [propIsOpen]);

  useEffect(() => {
    if (isOpen) {
      onOpen?.();
    } else {
      onClose?.();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!asModal || typeof window === "undefined") {
      return;
    }

    const updateModalView = () => {
      if (window.innerWidth < breakpoint) {
        setIsModalView(true);
      } else {
        setIsModalView(false);
      }
    };

    updateModalView();
    window.addEventListener("resize", updateModalView);

    return () => {
      window.removeEventListener("resize", updateModalView);
    };
  }, [asModal, breakpoint]);

  useEffect(() => {
    if (isOpen && isModalView) {
      setTimeout(() => setModalOpen(true), 5);
    } else {
      setModalOpen(false);
    }
  }, [isOpen, isModalView]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen && autoY && !isModalView) {
      const updatePosition = () => {
        const _anchorRef = propAnchorRef?.current || anchorRef.current;

        if (_anchorRef && dropdownRef.current) {
          const anchorRect = _anchorRef.getBoundingClientRect();
          const dropdownRect = dropdownRef.current.getBoundingClientRect();
          const spaceBelow = window.innerHeight - anchorRect.bottom;
          const spaceAbove = anchorRect.top;
          const totalOffset = offset + (withArrow ? arrowSize : 0);

          let newPosition: "bottom" | "top" = "bottom";
          let topValue: number = anchorRect.bottom + window.scrollY + totalOffset;
          let leftValue: number;

          if (autoY && spaceBelow < dropdownRect.height + totalOffset && spaceAbove > spaceBelow) {
            newPosition = "top";
            topValue = anchorRect.top + window.scrollY - dropdownRect.height - totalOffset;
          }

          let arrowLeftValue: number;

          switch (xPosition) {
            case "right":
              leftValue = anchorRect.right - dropdownRect.width - xOffset;
              arrowLeftValue = dropdownRect.width - arrowOffset - arrowSize;
              break;
            case "center":
              leftValue = anchorRect.left + (anchorRect.width - dropdownRect.width) / 2 + xOffset;
              arrowLeftValue = (dropdownRect.width - arrowSize) / 2;
              break;
            case "left":
            default:
              leftValue = anchorRect.left + xOffset;
              arrowLeftValue = arrowOffset;
              break;
          }

          setPosition(newPosition);

          setDropdownStyle({
            top: `${topValue}px`,
            left: `${leftValue}px`,
            zIndex: zIndex,
            width: width || (equalAnchor ? anchorRect.width : DEFAULT_WIDTH),
            boxShadow: "0 0 16px rgba(0,0,0,0.2)",
          });

          setArrowStyle({
            left: arrowLeftValue,
            [newPosition === "bottom" ? "top" : "bottom"]: newPosition === "bottom" ? -arrowSize : 0,
            filter: "drop-shadow(0px 0px 2px rgba(0,0,0,0.1))",
          });
        } else {
          setDropdownStyle({
            ...(dropdownStyle || {}),
            width:
              dropdownStyle.width || width || (equalAnchor ? _anchorRef?.getBoundingClientRect().width : DEFAULT_WIDTH),
          });
        }
      };

      updatePosition();
      window.addEventListener("scroll", updatePosition);
      window.addEventListener("resize", updatePosition);

      requestAnimationFrame(updatePosition);

      return () => {
        window.removeEventListener("scroll", updatePosition);
        window.removeEventListener("resize", updatePosition);
      };
    }

    return;
  }, [
    isOpen,
    autoY,
    zIndex,
    offset,
    xPosition,
    xOffset,
    width,
    isModalView,
    equalAnchor,
    withArrow,
    arrowSize,
    arrowOffset,
    propAnchorRef,
    options,
  ]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleClickOption = (option: DropdownOption) => (e: ReactMouseEvent<HTMLDivElement>) => {
    onSelect?.(e, option);
    closeOnSelect && setIsOpen(false);
  };

  const clonedAnchor = cloneElement(children, {
    ref: (node: HTMLElement | null) => {
      anchorRef.current = node;

      const ref = (children as any).ref;

      if (typeof ref === "function") {
        ref(node);
      } else if (ref && "current" in ref) {
        (ref as MutableRefObject<HTMLElement | null>).current = node;
      }
    },
    onClick: (e: ReactMouseEvent) => {
      toggleDropdown();
      children.props.onClick?.(e);
    },
  });

  const renderArrow = () => {
    if (!withArrow) {
      return null;
    }

    const innerArrowStyle: CSSProperties = {
      left: -arrowSize,
      borderLeft: `${arrowSize}px solid transparent`,
      borderRight: `${arrowSize}px solid transparent`,
      [position === "bottom" ? "borderBottom" : "borderTop"]: `${arrowSize}px solid white`,
    };

    return (
      <div className={clsx("absolute w-0 h-0", componentClassName.arrowWrapper)} style={arrowStyle}>
        <div className={clsx("absolute w-0 h-0", componentClassName.arrow)} style={innerArrowStyle} />
      </div>
    );
  };

  const renderContent = () => (
    <div
      className={componentClassName.content}
      style={{ maxHeight: isModalView ? "none" : maxHeight, overflowY: isModalView ? "auto" : "auto" }}
    >
      <Menu
        className={clsx(
          isModalView ? "w-full" : "",
          componentClassName.menu,
          isModalView && componentClassName.menuModal
        )}
        withBorder={false}
      >
        {options.length
          ? options.map((option) =>
              renderOption ? (
                renderOption(option)
              ) : (
                <MenuItem
                  {...option}
                  key={option.value}
                  currentValue={value}
                  className={clsx(componentClassName.menuItem, option.disabled && componentClassName.menuItemDisabled)}
                  activeClassName={componentClassName.menuItemActive}
                  onClick={handleClickOption(option)}
                >
                  {option.label}
                </MenuItem>
              )
            )
          : emptyOption}
      </Menu>
    </div>
  );

  return (
    <>
      {clonedAnchor}
      {isOpen &&
        typeof document !== "undefined" &&
        createPortal(
          isModalView ? (
            <div
              {...rest}
              className={clsx("fixed inset-0 flex items-center justify-center", componentClassName.modal)}
              style={{ zIndex }}
              onClick={() => setIsOpen(false)}
            >
              <div
                className={clsx(
                  "absolute inset-0 bg-black bg-opacity-50 transition-all",
                  modalOpen ? "opacity-100" : "opacity-0",
                  componentClassName.modalBackdrop,
                  modalOpen && componentClassName.modalBackdropOpened
                )}
                onClick={() => setIsOpen(false)}
              />
              <div
                className={clsx(
                  "bg-white rounded w-[90dvw] overflow-y-auto transition-all",
                  modalOpen ? "scale-100" : "scale-75",
                  componentClassName.modalContent,
                  modalOpen && componentClassName.modalContentOpened
                )}
                style={{
                  maxHeight: maxHeight || "100dvh",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {renderContent()}
              </div>
            </div>
          ) : (
            <div {...rest} className={clsx("absolute rounded-md", className)} ref={dropdownRef} style={dropdownStyle}>
              {renderArrow()}
              <div
                className={clsx("w-full h-full bg-white rounded-md overflow-hidden relative", componentClassName.inner)}
              >
                {renderContent()}
              </div>
            </div>
          ),
          document.body
        )}
    </>
  );
};
