// utils/factories/index.ts
import { Button, InputField, Card } from '../../components';
import React, { ComponentType, ReactElement, PropsWithChildren } from 'react';

type ComponentMap = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: ComponentType<any>;
};

const componentMap: ComponentMap = {
  Button,
  InputField,
  Card,
  // Add more components here
};

export function createComponent<T extends keyof ComponentMap>(
  componentName: T,
  props: PropsWithChildren<React.ComponentProps<ComponentMap[T]>>
): ReactElement {
  const Component = componentMap[componentName];
  if (!Component) {
    throw new Error(`Component ${componentName} not found`);
  }
  // Use typeof Component to refer to it as a type
  return React.createElement(Component as unknown as React.JSXElementConstructor<PropsWithChildren<React.ComponentProps<ComponentMap[T]>>>, props);
}
