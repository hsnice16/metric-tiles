import { useMemo } from "react";
import { AreaChart, MetricTilesTileProps, PlusIcon } from "../index";

interface ViewDataProps extends MetricTilesTileProps {
  parentHasLeftBorder: boolean;
  parentHasRightBorder: boolean;
}

export function ViewData({
  metric,
  segmentValue,
  showingInfoIn,
  infoOfLast,
  snapshotValues,
  parentHasLeftBorder,
  parentHasRightBorder,
}: ViewDataProps) {
  const metricCount = useMemo(() => {
    switch (showingInfoIn) {
      case "daily":
        return `${infoOfLast}d`;
      case "weekly":
        return `${infoOfLast}w`;
      case "monthly":
        return `${infoOfLast}m`;
    }
  }, [showingInfoIn, infoOfLast]);

  return (
    <div className="flex flex-col relative h-full w-full">
      <PlusIcon direction="left" parentHasLeftBorder={parentHasLeftBorder} />

      <PlusIcon direction="right" parentHasRightBorder={parentHasRightBorder} />

      <h2 className="font-medium text-sm h-10 mr-auto">
        {metric}, {segmentValue}
      </h2>

      <div className="flex flex-1 justify-between">
        <div className="flex flex-col gap-1 self-end">
          <p className="font-medium text-3xl">52.5K</p>
          <p className="font-normal text-sm flex items-center">
            <span className="material-symbols-rounded text-primary text-lg">
              arrow_upward_alt
            </span>
            3.5%
            <span className="text-gray-800 flex items-center ml-1">
              <span className="material-symbols-rounded text-lg -mt-[2px]">
                change_history
              </span>
              {metricCount}
            </span>
          </p>
        </div>

        <AreaChart className="flex-1 -mr-[14px]" values={snapshotValues} />
      </div>
    </div>
  );
}
