import axios from "axios";

const SNAPSHOT_URL = "https://sundial-fe-interview.vercel.app/api/snapshot";

type FetchSnapshotParams = {
  metric: string;
  segmentKey: string;
  segmentId: string;
};

export interface SnapshotValue {
  date: string;
  value: number;
}

export interface SnapshotData {
  metric: string;
  segmentKey: string;
  segmentId: string;
  values: SnapshotValue[];
}

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
