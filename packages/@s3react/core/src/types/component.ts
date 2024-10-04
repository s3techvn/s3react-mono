import {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  ReactElement
} from "react";

export type RenderRootFunction<C extends ElementType> = (props: ComponentPropsWithoutRef<C>) => ReactElement;

export type PropsWithComponent<C extends ElementType> = {
  component?: C;
  renderRoot?: RenderRootFunction<C>;
};

export type PropsToOmit<C extends ElementType, P> = keyof (PropsWithComponent<C> & P);

export type PolymorphicComponentProp<
C extends ElementType,
Props = {}
> = PropsWithComponent<C> &
Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>> &
Props;

export type PolymorphicRef<C extends ElementType> = ComponentPropsWithRef<C>['ref'];

export type PolymorphicComponentPropWithRef<
  C extends ElementType,
  Props = {}
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };
