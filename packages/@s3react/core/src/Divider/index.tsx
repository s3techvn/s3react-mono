import { ElementType, forwardRef, ForwardRefRenderFunction, ReactElement } from "react";
import { PolymorphicComponentPropWithRef } from "../types/component";
import { cx } from "../utils/cx";
import clsx from "clsx";

export const dividerClasses = {
  root: cx("Divider-root"),
  horizontal: cx("Divider-horizontal"),
  vertical: cx("Divider-vertical"),
};

type DividerBaseProps = {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
};

export type DividerProps<C extends ElementType = 'hr'> = PolymorphicComponentPropWithRef<C, DividerBaseProps>;

type DividerComponent = <C extends ElementType = 'hr'>(
  props: DividerProps<C>
) => ReactElement;

const DividerComponent: ForwardRefRenderFunction<unknown, DividerProps<any>> = (props, ref) => {
  const {
    component: Component = "hr",
    renderRoot,
    orientation = 'horizontal',
    className,
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
    />
  );
};

export const Divider = forwardRef(DividerComponent) as DividerComponent;
