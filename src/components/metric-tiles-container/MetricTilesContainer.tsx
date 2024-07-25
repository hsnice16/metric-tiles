import { ReactNode } from "react";

export interface MetricTilesContainerProps {
  children: ReactNode;
}

export function MetricTilesContainer(props: MetricTilesContainerProps) {
  return (
    <div className="max-w-4xl rounded-2xl m-auto bg-white overflow-hidden py-8 flex flex-wrap gap-y-8 relative">
      {props.children}
    </div>
  );
}
