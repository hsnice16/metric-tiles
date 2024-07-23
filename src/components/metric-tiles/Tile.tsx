import { useMemo } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

export type ShowingInfoIn = "daily" | "weekly" | "monthly";

export interface MetricTilesTileProps {
  metric: string;
  segmentValue: string;
  showingInfoIn: ShowingInfoIn;
  infoOfLast: number;
}

export function MetricTilesTile({
  metric,
  segmentValue,
  showingInfoIn,
  infoOfLast,
}: MetricTilesTileProps) {
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
    <div className="min-w-56 h-32 text-primaryText flex-1 font-work-sans">
      <div className="flex flex-col gap-4">
        <h2 className="font-medium text-sm h-10">
          {metric}, {segmentValue}
        </h2>

        <div className="flex flex-col gap-1">
          <p className="font-medium text-3xl">52.5K</p>
          <p className="font-normal text-sm flex items-center">
            <span className="material-symbols-rounded text-primary text-lg">
              arrow_upward_alt
            </span>
            3.5%
            <span className="text-darkGray flex items-center ml-1">
              <span className="material-symbols-rounded text-lg -mt-[2px]">
                change_history
              </span>
              {metricCount}
            </span>
          </p>
        </div>
      </div>

      <HighchartsReact highcharts={Highcharts} />
    </div>
  );
}
