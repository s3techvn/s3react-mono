import { ElementType, forwardRef, ForwardRefRenderFunction, ReactElement } from "react";
import { PolymorphicComponentPropWithRef } from "../types/component";
import { cx } from "../utils/cx";
import clsx from "clsx";

export const dividerClasses = {
  root: cx("Divider-root"),
  divider: cx("Divider-divider"),
  horizontal: cx("Divider-horizontal"),
  vertical: cx("Divider-vertical"),
};

type DividerBaseProps = {
  orientation?: 'horizontal' | 'vertical';
  dividerClassName?: string;
};

export type DividerProps<C extends ElementType = 'div'> = PolymorphicComponentPropWithRef<C, DividerBaseProps>;

type DividerComponent = <C extends ElementType = 'div'>(
  props: DividerProps<C>
) => ReactElement;

const DividerComponent: ForwardRefRenderFunction<unknown, DividerProps<any>> = (props, ref) => {
  const {
    component: Component = "div",
    renderRoot,
    orientation = 'horizontal',
    className,
    dividerClassName,
    ...rest
  } = props;
  
  const classes = clsx(
    dividerClasses.root,
    dividerClasses[orientation],
    className
  )

  if (renderRoot) {
    return renderRoot({ ...rest, ref, className: classes });
  }

  return (
    <Component 
      {...rest}
      ref={ref}
      className={classes}
    >
      <hr className={clsx(dividerClasses.divider, dividerClassName)} />
    </Component>
  );
};

export const Divider = forwardRef(DividerComponent) as DividerComponent;
