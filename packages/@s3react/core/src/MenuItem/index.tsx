import { ComponentType, FC, MouseEvent, PropsWithChildren, ReactNode } from "react";
import clsx from "clsx";

const menuItemSizes = {
  xs: "h-8 min-h-[32px]",
  sm: "h-10 min-h-[36px]",
  md: "h-11 min-h-[44px]",
  lg: "h-12 min-h-[48px]",
  xl: "h-14 min-h-[56px]",
};

interface MenuItemBaseProps {
  children?: ReactNode;
  className?: string;
  onClick?(e: MouseEvent<Element>): void;
}

export interface MenuItemProps {
  currentValue?: string | number;
  value: string | number;
  onClick?(e: MouseEvent<HTMLElement>, value?: string | number): void;
  disabled?: boolean;
  size?: keyof typeof menuItemSizes;
  component?: ComponentType<MenuItemBaseProps>;
  className?: string;
  activeClassName?: string;
}

export const MenuItem: FC<PropsWithChildren<MenuItemProps>> = (props) => {
  const {
    value,
    currentValue,
    size,
    onClick,
    component: Component = "button",
    children,
    className,
    disabled,
    activeClassName,
  } = props;

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    disabled || onClick?.(e, value);
  };

  return (
    <Component
      className={clsx(
        "flex items-center w-full px-4 text-left hover:bg-gray-100 cursor-pointer transition-colors",
        "duration-150 ease-in-out truncate text-sm",
        size ? menuItemSizes[size] : "h-10 min-h-[40px]",
        className,
        currentValue === value && "bg-gray-200",
        currentValue === value && activeClassName
      )}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </Component>
  );
};
