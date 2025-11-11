"use client";
import LoadingBackdrop from "@/components/loading-backdrop";
import { Icon } from "@iconify/react";
import { Tooltip } from "@mui/material";
import React, { createContext, useContext, useState, ReactNode } from "react";

type ViewRendererProps<T> = {
  renderContainer?: ({ children }: { children: ReactNode }) => ReactNode;
  renderContent: ({ data }: { data: T }) => ReactNode;
};

type ViewRendererContextType<K extends string, T> = {
  setView: (viewKey: K) => void;
  currentView: K;
  setCurrentView: (key: K) => void;
  views: Record<K, ViewRendererProps<T>>;
  renderSelection?: ({}: {
    selectView: (view: K) => void;
    currentView: K;
  }) => ReactNode;
  loading?: boolean;
  renderLoading?: (props: { loading: boolean }) => ReactNode;
  data?: T;
};

export function createViewRendererProvider<K extends string, T>() {
  const ViewRendererContext = createContext<ViewRendererContextType<
    K,
    T
  > | null>(null);

  function ViewRendererProvider({
    children,
    views,
    defaultView,
    renderSelection,
    data,
    loading,
    renderLoading,
  }: {
    children: ReactNode;
    views: Record<K, ViewRendererProps<T>>;
    defaultView: K;
    renderSelection?: ({
      selectView,
    }: {
      selectView: (view: K) => void;
    }) => ReactNode;
    data?: T;
    loading?: boolean;
    renderLoading?: (props: { loading: boolean }) => ReactNode;
  }) {
    const [currentView, setCurrentView] = useState<K>(defaultView);

    const setView = (viewKey: K) => {
      if (views[viewKey]) {
        setCurrentView(viewKey);
      }
    };

    return (
      <ViewRendererContext.Provider
        value={{
          setView,
          currentView,
          setCurrentView,
          views,
          renderSelection,
          data,
          loading,
          renderLoading,
        }}
      >
        {children}
      </ViewRendererContext.Provider>
    );
  }

  const defaultViews: { prefix: string; icon: string }[] = [
    { icon: "mingcute:rows-3-fill", prefix: "list" },
    { icon: "mingcute:columns-3-fill", prefix: "kanban" },
    { icon: "mingcute:grid-fill", prefix: "grid" },
    { icon: "hugeicons:structure-folder-circle", prefix: "tree" },
    { icon: "hugeicons:table", prefix: "table" },
  ];

  function SelectView() {
    const context = useContext(ViewRendererContext);
    if (!context) {
      throw new Error("SelectView must be used within a ViewRendererProvider");
    }
    const { setView, renderSelection, setCurrentView, views, currentView } =
      context;
    return renderSelection ? (
      renderSelection({
        selectView: setCurrentView,
        currentView: context.currentView,
      })
    ) : (
      <div className="flex flex-row gap-1 w-fit">
        {Object.entries(views).map(([key]: [any, any]) => {
          const found = defaultViews.find((view) =>
            (key as string).toLowerCase().includes(view.prefix)
          );
          if (found)
            return (
              <Tooltip title={key} key={key} arrow>
                <button
                  onClick={() => setView(key)}
                  className="group mask mask-blob flex h-8 w-8 items-center justify-center transition-colors duration-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                >
                  <Icon
                    icon={found.icon}
                    className={`h-5 w-5 ${
                      currentView === key
                        ? "text-slate-500 dark:text-slate-100"
                        : "text-slate-300 group-hover:text-slate-500 dark:text-slate-600 dark:group-hover:text-slate-100"
                    }`}
                  />
                </button>
              </Tooltip>
            );
        })}
      </div>
    );
  }

  function CurrentView() {
    const context = useContext(ViewRendererContext);
    if (!context) {
      throw new Error("CurrentView must be used within a ViewRendererProvider");
    }
    const { currentView, views, data, loading } = context;
    const { renderContainer, renderContent } = views[currentView] ?? {};
    const Content = renderContent;
    const Container =
      renderContainer ?? (({ children }) => <div>{children}</div>);

    return (
      <Container>
        <LoadingBackdrop open={loading || false} />
        {data && <Content data={data} />}
      </Container>
    );
  }

  ViewRendererProvider.SelectView = SelectView;
  ViewRendererProvider.CurrentView = CurrentView;

  return ViewRendererProvider;
}
