import {
  ComponentProps,
  ElementType,
  forwardRef,
  ForwardRefRenderFunction,
  PropsWithChildren,
  PropsWithoutRef,
  ReactElement,
  ReactNode
} from "react";
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "../types/component";
import { Adornment } from "../Adornment";
import { cx } from "../utils/cx";
import clsx from "clsx";

type MenuItemBaseProps = {
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  size?: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl';
  value?: string | number;
  currentValue?: string | number;
  disabled?: boolean;
  secondary?: ReactNode;
  componentClassName?: {
    leftSection?: string;
    rightSection?: string;
    inner?: string;
    primary?: string;
    secondary?: string;
    selected?: string;
    disabled?: string;
  };
};

export type MenuItemProps<C extends ElementType = 'button'> = PolymorphicComponentPropWithRef<C, MenuItemBaseProps>;

type MenuItemComponent = <C extends ElementType = 'button'>(
  props: PropsWithChildren<MenuItemProps<C>> & { ref?: PolymorphicRef<C> }
) => ReactElement;

export const menuItemClasses = {
  root: cx("MenuItem-root"),
  inner: cx("MenuItem-inner"),
  base: cx("MenuItem-base"),
  xs: cx("MenuItem-xs"),
  sm: cx("MenuItem-sm"),
  md: cx("MenuItem-md"),
  lg: cx("MenuItem-lg"),
  xl: cx("MenuItem-xl"),
  selected: cx("MenuItem-selected"),
  disabled: cx("MenuItem-disabled"),
  primary: cx("MenuItem-primary"),
  secondary: cx("MenuItem-secondary"),
  leftSection: cx("MenuItem-leftSection"),
  rightSection: cx("MenuItem-rightSection"),
};

export const MenuItem = forwardRef(
  (<C extends ElementType = 'button'>(props: MenuItemProps<C>, ref: PolymorphicRef<C>) => {
    const {
      component: Component = "button",
      renderRoot,
      leftSection,
      rightSection,
      children,
      size = 'base',
      value,
      currentValue,
      disabled,
      secondary,
      componentClassName = {},
      className,
      ...rest
    } = props;

    const content = (
      <>
        {leftSection && (
          <Adornment
            component="span"
            position="left"
            className={clsx(menuItemClasses.leftSection, componentClassName.leftSection)}
          >
            {leftSection}
          </Adornment>
        )}
        <span className={clsx(menuItemClasses.inner, componentClassName.inner)}>
          <span className={clsx(menuItemClasses.primary, componentClassName.primary)}>
            {children}
          </span>
          {secondary && (
            <span className={clsx(menuItemClasses.secondary, componentClassName.secondary)}>
              {secondary}
            </span>
          )}
        </span>
        {rightSection && (
          <Adornment
            component="span"
            position="right"
            className={clsx(menuItemClasses.rightSection, componentClassName.rightSection)}
          >
            {rightSection}
          </Adornment>
        )}
      </>
    );

    const isSelected = value !== undefined && currentValue !== undefined && value === currentValue;

    const rootClassName = clsx(
      menuItemClasses.root,
      menuItemClasses[size],
      isSelected && menuItemClasses.selected,
      isSelected && componentClassName.selected,
      disabled && menuItemClasses.disabled,
      disabled && componentClassName.disabled,
      className
    );

    if (renderRoot) {
      return renderRoot({
        ...rest,
        ref,
        className: rootClassName,
        children: content
      } as PropsWithoutRef<ComponentProps<C>>);
    }

    const others: any = Component === "button" ? { type: "button" } : {};

    return (
      <Component 
        {...rest}
        {...others}
        ref={ref}
        className={rootClassName}
      >
        {content}
      </Component>
    );
  }) as ForwardRefRenderFunction<unknown>
) as MenuItemComponent;
