import { useContext } from "react";
import { MetricTilesContext } from "../components";

export function useMetricContext() {
  const context = useContext(MetricTilesContext);

  if (context) {
    return context;
  }

  throw new Error("useMetricContext must be used within MetricTiles");
}
