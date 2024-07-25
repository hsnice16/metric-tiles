import {
  MetricTilesTile,
  MetricTilesTileProps,
  MetricTilesContainer,
  MetricTilesContainerProps,
} from "../index";

export function MetricTiles() {
  return <></>;
}

MetricTiles.Container = function (props: MetricTilesContainerProps) {
  return <MetricTilesContainer {...props} />;
};

MetricTiles.Tile = function (props: MetricTilesTileProps) {
  return <MetricTilesTile {...props} />;
};
