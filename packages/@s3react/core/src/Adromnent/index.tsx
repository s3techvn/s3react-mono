import { ElementType, forwardRef, ForwardRefRenderFunction } from "react";
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@s3react/core/types/component";
import clsx from "clsx";

export type AdornmentProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    position: 'left' | 'right';
    renderRoot?: (props: { children: React.ReactNode; className: string }) => React.ReactElement;
  }
>;

type AdornmentComponent = <C extends React.ElementType = 'div'>(
  props: AdornmentProps<C>
) => React.ReactElement | null;

export const adronmentClasses = {
  root: "Adornment-root",
  left: "Adornment-left",
  right: "Adornment-right",
};

export const Adornment: AdornmentComponent = forwardRef((<C extends ElementType = 'div'>(
    props: AdornmentProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const {
      children,
      position,
      component,
      renderRoot,
      className: propClassName,
      ...others
    } = props;

    const Component = component || 'div';
    const className = clsx(adronmentClasses.root, adronmentClasses[position], propClassName);

    if (renderRoot) {
      return renderRoot({ children, className });
    }

    return (
      <Component
        ref={ref}
        className={clsx(adronmentClasses.root, adronmentClasses[position], className)}
        {...others}
      >
        {children}
      </Component>
    );
  }) as ForwardRefRenderFunction<unknown>
) as AdornmentComponent;
