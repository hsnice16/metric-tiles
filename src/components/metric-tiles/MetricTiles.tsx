import { MetricTilesContainer, MetricTilesContainerProps } from "./Container";
import { MetricTilesTile, MetricTilesTileProps } from "./Tile";

export function MetricTiles() {
  return <></>;
}

MetricTiles.Container = function (props: MetricTilesContainerProps) {
  return <MetricTilesContainer {...props} />;
};

MetricTiles.Tile = function (props: MetricTilesTileProps) {
  return <MetricTilesTile {...props} />;
};
