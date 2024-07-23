import { useMemo } from "react";
import { MetricTiles, RenderKpiTiles } from "./components";
import { useGetMetrics, useGetSegments, useInitialData } from "./hooks";
import { SnapshotData } from "./utils";

function App() {
  const metrics = useGetMetrics();
  const segments = useGetSegments();
  const { isLoading, initialData } = useInitialData({ metrics, segments });

  const kpis = useMemo(() => {
    if (isLoading || !initialData) {
      return [];
    }

    return [initialData];
  }, [initialData, isLoading]);

  return (
    <MetricTiles.Container>
      {isLoading ? (
        <p className="font-medium text-base text-primaryText">
          Fetching initial data...
        </p>
      ) : null}

      {isLoading === false && kpis.length ? (
        <RenderKpiTiles
          kpis={kpis as SnapshotData[]}
          metrics={metrics}
          segments={segments}
        />
      ) : null}
    </MetricTiles.Container>
  );
}

export default App;
