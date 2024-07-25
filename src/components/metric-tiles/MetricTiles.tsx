import { createContext } from "react";
import { MetricTilesTile, MetricTilesContainer } from "../index";
import { MetricTilesProps } from "../../types";

export const MetricTilesContext = createContext<
  MetricTilesProps["value"] | null
>(null);

export function MetricTiles({ children, value }: MetricTilesProps) {
  return (
    <MetricTilesContext.Provider value={value}>
      {children}
    </MetricTilesContext.Provider>
  );
}

MetricTiles.Container = MetricTilesContainer;
MetricTiles.Tile = MetricTilesTile;
