import {
  ComponentProps,
  ElementType,
  forwardRef,
  ForwardRefRenderFunction,
  PropsWithChildren,
  PropsWithoutRef,
  ReactElement
} from "react";
import { cx } from "../utils/cx";
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "../types/component";
import clsx from "clsx";

export const containerClasses = {
  root: cx("Container-root"),
  sm: cx("Container-sm"),
  md: cx("Container-md"),
  lg: cx("Container-lg"),
  xl: cx("Container-xl"),
  '2xl': cx("Container-2xl"),
};

interface ContainerBaseProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
};

export type ContainerProps<C extends ElementType = 'div'> = PropsWithChildren<
  PolymorphicComponentPropWithRef<C, ContainerBaseProps>
>;

type ContainerComponent = <C extends React.ElementType = 'div'>(
  props: PropsWithChildren<ContainerProps<C>> & { ref?: PolymorphicRef<C> }
) => ReactElement;

export const Container: ContainerComponent = forwardRef((<C extends ElementType = 'div'>(
  props: ContainerProps<C>,
  ref?: PolymorphicRef<C>
) => {
  const {
    children,
    component: Component = "div",
    renderRoot,
    className: propClassName,
    size,
    ...rest
  } = props;

  const className = clsx(
    containerClasses.root,
    size && containerClasses[size],
    propClassName
  );

  if (renderRoot) {
    return renderRoot({ ...rest, ref, children, className } as PropsWithoutRef<ComponentProps<C>>);
  }

  return (
    <Component
      ref={ref}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
}) as ForwardRefRenderFunction<unknown>
) as ContainerComponent;
