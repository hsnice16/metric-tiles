import { SnapshotData } from "../types";

export function getKpiId(data: SnapshotData) {
  return `${data?.metric}-${data?.segmentId}-${data?.segmentKey}`;
}
