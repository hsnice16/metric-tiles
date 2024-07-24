import { ReactNode } from "react";

export interface MetricTilesContainerProps {
  children: ReactNode;
}

export function MetricTilesContainer(props: MetricTilesContainerProps) {
  return (
    <div className="max-w-4xl rounded-2xl m-auto bg-white overflow-hidden p-8 flex flex-wrap gap-x-6 gap-y-8 relative">
      {props.children}
    </div>
  );
}
