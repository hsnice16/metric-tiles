import { useMemo, useState } from "react";
import { useMetricContext } from "../../hooks";
import { EditDataProps, SnapshotData } from "../../types";
import { EditForm } from "../index";
import { fetchSnapshot } from "../../utils";

export function EditData({
  activeMetricId,
  activeSegmentId,
  activeSegmentKey,
  kpiId,
}: EditDataProps) {
  const { metrics, segments, setKpis } = useMetricContext();
  const [isLoading, setIsLoading] = useState(false);
  const [newData, setNewData] = useState({
    metricId: activeMetricId,
    segmentId: activeSegmentId,
    segmentKey: activeSegmentKey,
  });

  const activeMetric = useMemo(() => {
    const metric = metrics.find((metric) => metric.id === newData.metricId);
    return metric ?? metrics[0];
  }, [metrics, newData.metricId]);

  const activeSegmentValue = useMemo(() => {
    const segment = segments.find(
      (segment) => segment.segmentKey === newData.segmentKey
    );

    const segmentValue = segment?.values.find(
      (value) => value.segmentId === newData.segmentId
    );

    return segmentValue ?? segments[0].values[0];
  }, [newData.segmentId, newData.segmentKey, segments]);

  const handleCancelClick = () => {
    setKpis((prevKpis) => {
      return prevKpis.map((prevKpi) => {
        if (prevKpi._id === kpiId) {
          return {
            ...prevKpi,
            type: "view",
          };
        }

        return prevKpi;
      });
    });
  };

  const handleSaveClick = async () => {
    if (
      newData.metricId === activeMetricId &&
      newData.segmentId === activeSegmentId &&
      newData.segmentKey === activeSegmentKey
    ) {
      return handleCancelClick();
    }

    setIsLoading(true);

    const data = await fetchSnapshot({
      metric: newData.metricId ?? "",
      segmentKey: newData.segmentKey ?? "",
      segmentId: newData.segmentId ?? "",
    });

    if (Object.keys(data).length === 0) {
      /*
        NOTE: We can show error message that we got some error 
              while fetching the data
      */

      handleCancelClick();
    } else {
      setKpis((prevKpis) => {
        return prevKpis.map((prevKpi) => {
          if (prevKpi._id === kpiId) {
            return {
              ...prevKpi,
              type: "view",
              data: data as SnapshotData,
            };
          }

          return prevKpi;
        });
      });
    }

    setIsLoading(false);
  };

  return (
    <EditForm>
      <EditForm.Dropdown title={activeMetric.displayName}>
        {metrics.map((metric, index, array) => {
          const isLast = index === array.length - 1;
          const isActive = metric.id === activeMetric.id;

          return (
            <EditForm.DropdownOption
              key={metric.id}
              isLast={isLast}
              onClick={() =>
                setNewData((prev) => ({ ...prev, metricId: metric.id }))
              }
            >
              {metric.displayName}
              {isActive ? (
                <span className="bg-primary w-1 h-1 rounded-full block" />
              ) : null}
            </EditForm.DropdownOption>
          );
        })}
      </EditForm.Dropdown>

      <EditForm.Dropdown title={activeSegmentValue.displayName}>
        {segments.map((segment) => {
          return (
            <EditForm.DropdownOptionGroup
              key={segment.segmentKey}
              title={segment.displayName}
            >
              {segment.values.map((value, index, array) => {
                const isLast = index === array.length - 1;
                const isActive =
                  value.segmentId === activeSegmentValue.segmentId;

                return (
                  <EditForm.DropdownOption
                    key={value.segmentId}
                    isLast={isLast}
                    onClick={() =>
                      setNewData((prev) => ({
                        ...prev,
                        segmentId: value.segmentId,
                        segmentKey: segment.segmentKey,
                      }))
                    }
                  >
                    {value.displayName}
                    {isActive ? (
                      <span className="bg-primary w-1 h-1 rounded-full block" />
                    ) : null}
                  </EditForm.DropdownOption>
                );
              })}
            </EditForm.DropdownOptionGroup>
          );
        })}
      </EditForm.Dropdown>

      <div className="flex justify-between items-center gap-4">
        <EditForm.Button type="cancel" onClick={handleCancelClick} />
        <EditForm.Button
          type="add"
          onClick={handleSaveClick}
          isLoading={isLoading}
          isDisabled={isLoading}
        />
      </div>
    </EditForm>
  );
}
