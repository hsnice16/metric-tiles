import { Metric, Segment } from "../../hooks";
import { SnapshotData } from "../../utils";
import { MetricTiles, ShowingInfoIn } from "../index";

interface RenderKpiTilesProps {
  metrics: Metric[];
  segments: Segment[];
  kpis: SnapshotData[];
}

export function RenderKpiTiles({
  metrics,
  segments,
  kpis,
}: RenderKpiTilesProps) {
  return kpis.map((kpi, index) => {
    const metric = metrics.find((metric) => metric.id === kpi.metric);
    const segment = segments.find(
      (segment) => segment.segmentKey === kpi.segmentKey
    );
    const segmentValue = segment?.values.find(
      (value) => value.segmentId === kpi.segmentId
    );

    let infoIn: ShowingInfoIn = "daily";
    if (kpi.metric?.includes("weekly")) {
      infoIn = "weekly";
    } else if (kpi.metric?.includes("monthly")) {
      infoIn = "monthly";
    }

    return (
      <MetricTiles.Tile
        key={`${index}-kpi-snapshot-data`}
        metric={metric?.displayName ?? ""}
        segmentValue={segmentValue?.displayName ?? ""}
        showingInfoIn={infoIn}
        infoOfLast={kpi.values.length}
        snapshotValues={kpi.values}
      />
    );
  });
}
