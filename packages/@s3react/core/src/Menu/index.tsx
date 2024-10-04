/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ComponentType,
  DetailedHTMLProps,
  forwardRef,
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
  ReactElement,
  ReactNode,
  Ref,
  RefAttributes,
} from "react";
import clsx from "clsx";

export interface MenuBaseProps {
  children?: ReactNode;
  className?: string;
}

type MenuComponent = keyof JSX.IntrinsicElements | ComponentType<any>;

type InferComponentProps<T> = T extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[T]
  : T extends ComponentType<infer P>
  ? P
  : never;

type MenuProps<T extends MenuComponent = "div"> = InferComponentProps<T> & {
  component?: T;
  disablePadding?: boolean;
  withBorder?: boolean;
};

type MenuRef<T extends MenuComponent> = T extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[T] extends DetailedHTMLProps<React.HTMLAttributes<infer R>, any>
    ? R
    : never
  : T extends ForwardRefExoticComponent<RefAttributes<infer R>>
  ? R
  : unknown;

type MenuComponentType = <T extends MenuComponent = "div">(
  props: MenuProps<T> & RefAttributes<unknown>
) => ReactElement | null;

export const Menu: MenuComponentType = forwardRef((<T extends MenuComponent = "div">(
  props: MenuProps<T>,
  ref: Ref<MenuRef<T>>
) => {
  const { component: Component = "div", disablePadding, className, withBorder = true, children, ...rest } = props;
  return (
    <Component
      {...rest}
      ref={ref}
      className={clsx(
        "flex flex-col bg-white rounded-md shadow-lg overflow-hidden",
        withBorder && "border border-gray-200",
        !disablePadding && "py-2",
        className
      )}
    >
      {children}
    </Component>
  );
}) as ForwardRefRenderFunction<unknown, any>) as any;
