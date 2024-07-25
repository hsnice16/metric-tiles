import { useEffect, useState } from "react";
import { MetricTiles } from "./components";
import { useGetMetrics, useGetSegments, useInitialData } from "./hooks";
import { KpiData } from "./types";
import { getKpiId } from "./utils";

function App() {
  const metrics = useGetMetrics();
  const segments = useGetSegments();
  const { isLoading, initialData } = useInitialData({ metrics, segments });
  const [kpis, setKpis] = useState<KpiData[]>([]);

  useEffect(() => {
    if (!isLoading && initialData) {
      setKpis([
        {
          _id: `${Math.random()}-${getKpiId(initialData)}`,
          type: "view",
          data: initialData,
        },
      ]);
    }
  }, [initialData, isLoading]);

  return (
    <MetricTiles value={{ metrics, segments, setKpis }}>
      <MetricTiles.Container>
        {isLoading ? (
          <p className="font-medium text-base text-primaryText px-8">
            Fetching initial data...
          </p>
        ) : null}

        {isLoading === false && kpis.length
          ? kpis.map((kpi) => (
              <MetricTiles.Tile
                key={`${kpi.type === "edit" ? "edit" : "view"}-${kpi._id}`}
                kpi={kpi}
              />
            ))
          : null}
      </MetricTiles.Container>
    </MetricTiles>
  );
}

export default App;
