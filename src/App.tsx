import { useMemo } from "react";
import { MetricTiles, ShowingInfoIn } from "./components";
import { useGetMetrics, useGetSegments, useInitialData } from "./hooks";

function App() {
  const metrics = useGetMetrics();
  const segments = useGetSegments();
  const { isLoading, initialData } = useInitialData({ metrics, segments });

  const kpis = useMemo(() => {
    if (isLoading || !initialData) {
      return [];
    }

    return [initialData, initialData, initialData, initialData];
  }, [initialData, isLoading]);

  return (
    <MetricTiles.Container>
      {isLoading ? (
        <p className="font-medium text-base text-primaryText px-8">
          Fetching initial data...
        </p>
      ) : null}

      {isLoading === false && kpis.length
        ? kpis.map((kpi, index) => {
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
          })
        : null}
    </MetricTiles.Container>
  );
}

export default App;
