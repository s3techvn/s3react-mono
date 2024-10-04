import { ComponentProps, ElementType, forwardRef, ForwardRefRenderFunction, PropsWithChildren, PropsWithoutRef, ReactElement } from "react";
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@s3react/core/types/component";
import { cx } from "@s3react/core/utils/cx";
import clsx from "clsx";

interface AdornmentBaseProps {
  position: 'left' | 'right';
};

export type AdornmentProps<C extends ElementType = 'span'> = PropsWithChildren<
  PolymorphicComponentPropWithRef<C, AdornmentBaseProps>
>;


type AdornmentComponent = <C extends React.ElementType = 'div'>(
  props: PropsWithChildren<AdornmentProps<C>> & { ref?: PolymorphicRef<C> }
) => ReactElement;

export const adornmentClasses = {
  root: cx("Adornment-root"),
  left: cx("Adornment-left"),
  right: cx("Adornment-right"),
};

export const Adornment: AdornmentComponent = forwardRef((<C extends ElementType = 'div'>(
    props: AdornmentProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const {
      children,
      position,
      component: Component = "div",
      renderRoot,
      className: propClassName,
      ...rest
    } = props;

    const className = clsx(
      adornmentClasses.root,
      adornmentClasses[position],
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
) as AdornmentComponent;
