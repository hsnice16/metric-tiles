// ---------- Util: fetchSnapshot.ts

export type FetchSnapshotParams = {
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
