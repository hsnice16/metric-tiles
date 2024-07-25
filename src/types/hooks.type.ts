// ---------- Hook: useGetMetrics.ts

export interface Metric {
  id: string;
  displayName: string;
  isPercentageMetric: boolean;
}

// ---------- Hook: useGetSegments.ts

export interface SegmentValue {
  segmentId: string;
  displayName: string;
}

export interface Segment {
  segmentKey: string;
  displayName: string;
  values: SegmentValue[];
}

// ---------- Hook: useInitialData.ts

export type UseInitialDataParams = {
  metrics: Metric[];
  segments: Segment[];
};
