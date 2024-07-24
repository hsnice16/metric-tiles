import { useMemo } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { SnapshotValue } from "../../utils";

export type ShowingInfoIn = "daily" | "weekly" | "monthly";

export interface MetricTilesTileProps {
  metric: string;
  segmentValue: string;
  showingInfoIn: ShowingInfoIn;
  infoOfLast: number;
  snapshotValues: SnapshotValue[];
}

export function MetricTilesTile({
  metric,
  segmentValue,
  showingInfoIn,
  infoOfLast,
  snapshotValues,
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

  const chatOptionsData = useMemo(() => {
    const valuesLength = snapshotValues.length;
    const data = [];

    for (let index = valuesLength - 1; index >= 0; index--) {
      const value = snapshotValues[index];
      data.push([value.date, value.value]);
    }

    return data;
  }, [snapshotValues]);

  const highChartOptions = useMemo(() => {
    return {
      title: {
        style: {
          display: "none",
        },
      },
      legend: {
        enabled: false,
      },
      xAxis: {
        visible: false,
      },
      yAxis: {
        visible: false,
      },
      series: [
        {
          marker: {
            enabled: false,
          },
          type: "area",
          data: chatOptionsData,
          color: "#119F97", // primary
          fillColor: {
            linearGradient: { x1: 0.25, x2: 1, y1: 1, y2: 0 },
            stops: [
              [0, "#119f9700"],
              [1, "#119f9775"],
            ],
          },
        },
      ],
    };
  }, [chatOptionsData]);

  return (
    <div className="min-w-56 h-32 text-primaryText flex-1 font-work-sans flex flex-col">
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
            <span className="text-darkGray flex items-center ml-1">
              <span className="material-symbols-rounded text-lg -mt-[2px]">
                change_history
              </span>
              {metricCount}
            </span>
          </p>
        </div>

        <HighchartsReact
          highcharts={Highcharts}
          options={highChartOptions}
          containerProps={{ className: "flex-1" }}
        />
      </div>
    </div>
  );
}
