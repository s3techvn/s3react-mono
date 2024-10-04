import {
  ElementType,
  forwardRef,
  ForwardRefRenderFunction,
  PropsWithChildren,
} from "react";
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "../types/component";
import { cx } from "@s3react/core/utils/cx";
import clsx from "clsx";

type MenuBaseProps = {
  paddingY?: boolean;
  paddingX?: boolean;
  border?: boolean;
  shadow?: boolean;
  rounded?: boolean;
  innerClassName?: string;
};

export type MenuProps<C extends ElementType = 'div'> =
  PolymorphicComponentPropWithRef<C, PropsWithChildren<MenuBaseProps>>;

type MenuComponent = <C extends ElementType = 'div'>(
  props: PropsWithChildren<MenuProps<C>> & { ref?: PolymorphicRef<C> }
) => React.ReactElement | null;

export const menuClasses = {
  root: cx("Menu-root"),
  border: cx("Menu-border"),
  shadow: cx("Menu-shadow"),
  paddingY: cx("Menu-paddingY"),
  paddingX: cx("Menu-paddingX"),
  rounded: cx("Menu-rounded"),
  inner: cx("Menu-inner"),
};

const MenuBase: ForwardRefRenderFunction<unknown, MenuProps<any>> = (props, ref) => {
  const {
    component: Component = "div",
    renderRoot,
    children,
    paddingY = true,
    paddingX = true,
    border = true,
    shadow = true,
    rounded = true,
    className,
    innerClassName,
    ...rest
  } = props;
  
  const classes = clsx(
    menuClasses.root,
    border && menuClasses.border,
    shadow && menuClasses.shadow,
    paddingY && menuClasses.paddingY,
    paddingX && menuClasses.paddingX,
    rounded && menuClasses.rounded,
    className
  );

  const content = (
    <div className={clsx(menuClasses.inner, innerClassName)}>
      {children}
    </div>
  );

  if (renderRoot) {
    return renderRoot({ ...rest, ref, className: classes, children: content });
  }

  return (
    <Component 
      {...rest}
      ref={ref}
      className={classes}
    >
      {content}
    </Component>
  );
};

export const Menu = forwardRef(MenuBase) as MenuComponent;
