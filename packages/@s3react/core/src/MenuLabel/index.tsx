import { ElementType, forwardRef, ForwardRefRenderFunction, PropsWithChildren, ReactElement } from "react";
import { PolymorphicComponentPropWithRef } from "../types/component";
import { cx } from "../utils/cx";
import clsx from "clsx";

export type MenuLabelProps<C extends ElementType = 'span'> = PolymorphicComponentPropWithRef<C, PropsWithChildren<{}>>;

type MenuLabelComponent = <C extends ElementType = 'span'>(
  props: MenuLabelProps<C>
) => ReactElement;

export const menuLabelClasses = {
  root: cx("MenuLabel-root"),
};

const MenuLabelComponent: ForwardRefRenderFunction<unknown, MenuLabelProps<any>> = (props, ref) => {
  const {
    component,
    renderRoot,
    children,
    className: propClassName,
    ...rest
  } = props;

  const Component = component || 'span';
  const className = clsx(menuLabelClasses.root, propClassName);
  
  if (renderRoot) {
    return renderRoot({ ...rest, ref, className, children });
  }

  return (
    <Component 
      {...rest}
      ref={ref}
      className={className}
    >
      {children}
    </Component>
  );
};

export const MenuLabel = forwardRef(MenuLabelComponent) as MenuLabelComponent;
