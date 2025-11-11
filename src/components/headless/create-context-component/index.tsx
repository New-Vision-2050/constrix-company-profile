// createContextComponent.tsx
import React, { createContext, useContext, FC, ReactNode, ComponentType } from "react";

export function createContextComponent<TProps>(Component: FC<TProps>): FC<
  TProps & { children?: ReactNode }
> & {
  useProps: () => TProps;
} {
  const Context = createContext<TProps | undefined>(undefined);

  const WrappedComponent: FC<TProps & { children?: ReactNode }> & {
    useProps: () => TProps;
  } = (props) => {
    return (
      <Context.Provider value={props}>
        <Component {...props} />
      </Context.Provider>
    );
  };

  WrappedComponent.useProps = function useProps(): TProps {
    const context = useContext(Context);
    if (context === undefined) {
      throw new Error("useProps must be used within the provider");
    }
    return context;
  };

  return WrappedComponent;
}
