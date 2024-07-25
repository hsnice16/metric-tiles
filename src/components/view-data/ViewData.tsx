import { useMemo } from "react";
import { AreaChart, PlusIcon } from "../index";
import { InfoIn, KpiData, ViewDataProps } from "../../types";
import { useMetricContext } from "../../hooks";
import { getKpiId } from "../../utils";

export function ViewData({
  metric,
  metricId,
  segmentValue,
  infoOfLast,
  snapshotValues,
  parentHasLeftBorder,
  parentHasRightBorder,
  kpiId,
}: ViewDataProps) {
  const { setKpis } = useMetricContext();

  const infoIn: InfoIn = useMemo(() => {
    if (metricId?.includes("weekly")) {
      return "weekly";
    } else if (metricId?.includes("monthly")) {
      return "monthly";
    }

    return "daily";
  }, [metricId]);

  const metricCount = useMemo(() => {
    switch (infoIn) {
      case "daily":
        return `${infoOfLast}d`;
      case "weekly":
        return `${infoOfLast}w`;
      case "monthly":
        return `${infoOfLast}m`;
    }
  }, [infoIn, infoOfLast]);

  const handlePlusClick = (type: "left" | "right") => {
    setKpis((prevKpis) => {
      const clickedKpiIndex = prevKpis.findIndex((kpi) => kpi._id === kpiId);
      const newKpi = {
        _id: `${Math.random()}-new-kpi`,
        type: "edit",
        data: { ...prevKpis[clickedKpiIndex].data },
      } as KpiData;

      const newMappedPrevKpi = prevKpis.map((kpi) => {
        return {
          ...kpi,
          _id: `${Math.random()}-${getKpiId(kpi.data)}`,
        };
      });

      if (clickedKpiIndex === 0) {
        if (type === "left") {
          return [newKpi, ...newMappedPrevKpi];
        } else {
          return [newMappedPrevKpi[0], newKpi, ...newMappedPrevKpi.slice(1)];
        }
      }

      if (clickedKpiIndex === prevKpis.length - 1) {
        if (type === "right") {
          return [...newMappedPrevKpi, newKpi];
        } else {
          return [
            ...newMappedPrevKpi.slice(0, clickedKpiIndex),
            newKpi,
            newMappedPrevKpi[clickedKpiIndex],
          ];
        }
      }

      if (type === "left") {
        return [
          ...newMappedPrevKpi.slice(0, clickedKpiIndex),
          newKpi,
          newMappedPrevKpi[clickedKpiIndex],
          ...newMappedPrevKpi.slice(clickedKpiIndex + 1),
        ];
      }

      return [
        ...newMappedPrevKpi.slice(0, clickedKpiIndex),
        newMappedPrevKpi[clickedKpiIndex],
        newKpi,
        ...newMappedPrevKpi.slice(clickedKpiIndex + 1),
      ];
    });
  };

  return (
    <div className="flex flex-col relative h-full w-full">
      <PlusIcon
        direction="left"
        parentHasLeftBorder={parentHasLeftBorder}
        onClick={() => handlePlusClick("left")}
      />

      <PlusIcon
        direction="right"
        parentHasRightBorder={parentHasRightBorder}
        onClick={() => handlePlusClick("right")}
      />

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
