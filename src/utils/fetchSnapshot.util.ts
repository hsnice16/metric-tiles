import axios from "axios";
import { FetchSnapshotParams, SnapshotData } from "../types";

const SNAPSHOT_URL = "https://sundial-fe-interview.vercel.app/api/snapshot";

export async function fetchSnapshot({
  metric,
  segmentKey,
  segmentId,
}: FetchSnapshotParams): Promise<SnapshotData | Record<string, never>> {
  let snapshotData = {};

  try {
    const { data } = await axios.post(SNAPSHOT_URL, {
      metric,
      segmentKey,
      segmentId,
    });

    snapshotData = data.data;
  } catch (error) {
    console.error("snapshot-error", error);
  }

  return snapshotData;
}
