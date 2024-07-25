import { useMemo } from "react";
import { useMetricContext } from "../../hooks";
import { EditDataProps } from "../../types";
import { EditForm } from "../index";

export function EditData({ activeMetricId, activeSegmentId }: EditDataProps) {
  const { metrics, segments } = useMetricContext();

  const activeMetric = useMemo(() => {
    const metric = metrics.find((metric) => metric.id === activeMetricId);
    return metric ?? metrics[0];
  }, [activeMetricId, metrics]);

  const activeSegmentValue = useMemo(() => {
    const segmentValue = segments.find((segment) =>
      segment.values.find((value) => value.segmentId === activeSegmentId)
    );

    return segmentValue ?? segments[0].values[0];
  }, [activeSegmentId, segments]);

  return (
    <EditForm>
      <EditForm.Dropdown title={activeMetric.displayName}>
        {metrics.map((metric) => {
          return (
            <EditForm.DropdownOption key={metric.id}>
              {metric.displayName}
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
              {segment.values.map((value) => {
                return (
                  <EditForm.DropdownOption key={value.segmentId}>
                    {value.displayName}
                  </EditForm.DropdownOption>
                );
              })}
            </EditForm.DropdownOptionGroup>
          );
        })}
      </EditForm.Dropdown>

      <div className="flex justify-between items-center gap-4">
        <EditForm.Button type="cancel" />
        <EditForm.Button type="add" />
      </div>
    </EditForm>
  );
}
